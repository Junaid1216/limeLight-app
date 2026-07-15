import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Images } from '../../Assets';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import {
  trainingCustomerData,
  trainingDisplayData,
  trainingProductData,
} from '../../Constants/DummyData';
import { getTrainingApiRole } from '../../Constants/roleConfig';
import TrainingCustomerCard from '../../Components/TrainingCustomerCard';
import TrainingDetailModal from '../../Components/TrainingDetailModal';
import TrainingDisplayCard from '../../Components/TrainingDisplayCard';
import TrainingDisplayCategories from '../../Components/TrainingDisplayCategories';
import TrainingHeader from '../../Components/TrainingHeader';
import TrainingProductCard from '../../Components/TrainingProductCard';
import TrainingStatusChips from '../../Components/TrainingStatusChips';
import TrainingTabs from '../../Components/TrainingTabs';
import { useRole } from '../../Context/RoleContext';
import Api, { isApiSuccess } from '../../Services/Api_services';
import { showApiMessageToast } from '../../Utils/apiHelpers';

const customerImages = [
  Images.CustomerService,
  Images.GreetingCustomers,
  Images.HandlingComplaints,
];

const displayImages = [Images.WindowDisplay, Images.VisualMerchandising];

const toImageSource = (value, fallback) => {
  if (!value) {
    return fallback;
  }

  if (typeof value === 'string') {
    return { uri: value };
  }

  return value;
};

const normalizeStatus = value => {
  const status = String(value ?? 'New').trim();

  if (/complete/i.test(status)) {
    return 'Completed';
  }

  if (/pending/i.test(status)) {
    return 'Pending';
  }

  return 'New';
};

const mapTrainingVideos = data => {
  const empty = { customer: [], product: [], display: [] };

  if (!data) {
    return empty;
  }

  if (Array.isArray(data)) {
    return partitionTrainingList(data);
  }

  if (
    data?.customer ||
    data?.customer_service ||
    data?.product ||
    data?.product_training ||
    data?.display ||
    data?.display_training
  ) {
    return {
      customer: mapCustomerList(data?.customer ?? data?.customer_service ?? []),
      product: mapProductList(data?.product ?? data?.product_training ?? []),
      display: mapDisplayList(data?.display ?? data?.display_training ?? []),
    };
  }

  const list = data?.videos ?? data?.training_videos ?? [];

  if (Array.isArray(list)) {
    return partitionTrainingList(list);
  }

  return empty;
};

const mapCustomerList = list =>
  list.map((item, index) => ({
    id: String(item?.id ?? `c-${index}`),
    image: toImageSource(
      item?.image ?? item?.thumbnail ?? item?.video_thumbnail,
      customerImages[index % customerImages.length],
    ),
    title: item?.title ?? item?.name ?? '',
    description: item?.description ?? '',
    date: item?.date ?? item?.created_at?.slice(0, 10) ?? '',
    status: normalizeStatus(item?.status),
  }));

const mapProductList = list =>
  list.map((item, index) => ({
    id: String(item?.id ?? `p-${index}`),
    swatch: item?.swatch ?? item?.color_code ?? '#E6DCC6',
    title: item?.title ?? item?.name ?? '',
    code: item?.code ?? item?.product_code ?? '',
    tags: item?.tags ?? [],
    price: item?.price ?? '',
    audio: item?.audio ?? item?.audio_duration ?? '',
    highlight: item?.highlight ?? item?.description ?? '',
    status: normalizeStatus(item?.status),
    detail: item?.detail ?? item,
  }));

const mapDisplayList = list =>
  list.map((item, index) => ({
    id: String(item?.id ?? `d-${index}`),
    image: toImageSource(
      item?.image ?? item?.thumbnail ?? item?.video_thumbnail,
      displayImages[index % displayImages.length],
    ),
    location: item?.location ?? item?.section ?? '',
    category: item?.category ?? item?.category_name ?? '',
    title: item?.title ?? item?.name ?? '',
    description: item?.description ?? '',
    progress: Number(item?.progress ?? 0),
    duration: item?.duration ?? item?.audio_duration ?? '',
    status: normalizeStatus(item?.status),
  }));

const partitionTrainingList = list => {
  const customer = [];
  const product = [];
  const display = [];

  list.forEach((item, index) => {
    const type = String(
      item?.type ??
        item?.training_type ??
        item?.tab ??
        item?.category_type ??
        item?.video_type ??
        '',
    ).toLowerCase();

    if (type.includes('product')) {
      product.push(mapProductList([item])[0]);
      return;
    }

    if (type.includes('display') || type.includes('merchandis')) {
      display.push(mapDisplayList([item])[0]);
      return;
    }

    if (
      type.includes('customer') ||
      type.includes('service') ||
      !type
    ) {
      customer.push(mapCustomerList([item])[0]);
    }
  });

  return { customer, product, display };
};

const filterByStatus = (items, status) =>
  items.filter(
    item =>
      !item?.status ||
      item.status === status ||
      item.status?.toLowerCase() === status.toLowerCase(),
  );

const filterDisplayByCategory = (items, category) =>
  items.filter(
    item =>
      !item?.category ||
      item.category.toLowerCase().includes(category.toLowerCase()),
  );

const Training = () => {
  const route = useRoute();
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState(route.params?.tab || 'Customer');
  const [activeStatus, setActiveStatus] = useState('New');
  const [activeCategory, setActiveCategory] = useState('Unstitched');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerData, setCustomerData] = useState(trainingCustomerData);
  const [productData, setProductData] = useState(trainingProductData);
  const [displayData, setDisplayData] = useState(trainingDisplayData);

  const fetchTrainingVideos = useCallback(async () => {
    if (!role) {
      return;
    }

    const apiRole = getTrainingApiRole(role);

    try {
      console.log('Training Videos Request:', `training-videos?role=${apiRole}`, {
        role: apiRole,
      });
      const res = await Api.getTrainingVideos(apiRole);
      console.log(
        'Training Videos Response:',
        JSON.stringify(res?.data, null, 2),
      );

      if (isApiSuccess(res)) {
        const mapped = mapTrainingVideos(res?.data?.data ?? res?.data);
        console.log('Training Videos Success:', JSON.stringify(mapped, null, 2));

        if (
          mapped.customer.length ||
          mapped.product.length ||
          mapped.display.length
        ) {
          setCustomerData(mapped.customer);
          setProductData(mapped.product);
          setDisplayData(mapped.display);
        }
      } else {
        showApiMessageToast(res);
      }
    } catch (error) {
      console.log('Training Videos API Error:', {
        status: error?.response?.status,
        url: `training-videos?role=${apiRole}`,
        data: error?.response?.data || error,
      });
    }
  }, [role]);

  useFocusEffect(
    useCallback(() => {
      fetchTrainingVideos();
    }, [fetchTrainingVideos]),
  );

  useEffect(() => {
    if (route.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route.params?.tab, route.params?.ts]);

  const openDetail = product => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const filteredCustomer = filterByStatus(customerData, activeStatus);
  const filteredProduct = filterByStatus(productData, activeStatus);
  const filteredDisplay = filterByStatus(
    filterDisplayByCategory(displayData, activeCategory),
    activeStatus,
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.headerArea}>
        <TrainingHeader />
        <TrainingTabs active={activeTab} onChange={setActiveTab} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'Display' && (
          <TrainingDisplayCategories
            active={activeCategory}
            onChange={setActiveCategory}
          />
        )}

        <TrainingStatusChips active={activeStatus} onChange={setActiveStatus} />

        {activeTab === 'Customer' &&
          filteredCustomer.map(item => (
            <TrainingCustomerCard key={item.id} item={item} />
          ))}

        {activeTab === 'Product' &&
          filteredProduct.map(item => (
            <TrainingProductCard
              key={item.id}
              item={item}
              onViewDetail={openDetail}
            />
          ))}

        {activeTab === 'Display' &&
          filteredDisplay.map(item => (
            <TrainingDisplayCard key={item.id} item={item} />
          ))}
      </ScrollView>

      <TrainingDetailModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerArea: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1.5),
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(3),
  },
  loader: {
    marginTop: hp(4),
  },
});

export default Training;
