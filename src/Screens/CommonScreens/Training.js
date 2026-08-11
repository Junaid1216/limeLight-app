import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { getTrainingApiRole, getProductTrainingRoleCandidates } from '../../Constants/roleConfig';
import TrainingCustomerCard from '../../Components/TrainingCustomerCard';
import TrainingDetailModal from '../../Components/TrainingDetailModal';
import TrainingDisplayCard from '../../Components/TrainingDisplayCard';
import TrainingDisplayCategories from '../../Components/TrainingDisplayCategories';
import TrainingHeader from '../../Components/TrainingHeader';
import TrainingProductCard from '../../Components/TrainingProductCard';
import TrainingStatusChips from '../../Components/TrainingStatusChips';
import TrainingTabs from '../../Components/TrainingTabs';
import TrainingVideoModal from '../../Components/TrainingVideoModal';
import ScreenLoader from '../../Components/ScreenLoader';
import { useRole } from '../../Context/RoleContext';
import Api, { isApiSuccess } from '../../Services/Api_services';
import { showApiMessageToast } from '../../Utils/apiHelpers';
import {
  isExternalVideoLink,
  mapProductTraining,
  mapTrainingDisplay,
  mapTrainingVideos,
  toDisplayApiCategory,
} from '../../Utils/trainingMappers';

const filterByStatus = (items, status) =>
  items.filter(
    item =>
      !item?.status ||
      item.status === status ||
      item.status?.toLowerCase() === status.toLowerCase(),
  );

const getTrainingVideoStatusParam = status => {
  const normalized = String(status ?? 'New').trim().toLowerCase();

  if (normalized === 'pending') {
    return 'pending';
  }

  if (normalized === 'completed' || normalized === 'complete') {
    return 'completed';
  }

  return 'new';
};

const Training = () => {
  const route = useRoute();
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState(route.params?.tab || 'Customer');
  const [activeStatus, setActiveStatus] = useState(
    route.params?.status || 'New',
  );
  const [activeCategory, setActiveCategory] = useState('Unstitched');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrainingVideos = useCallback(async () => {
    if (activeTab !== 'Customer') {
      return;
    }

    const apiStatus = getTrainingVideoStatusParam(activeStatus);

    try {
      console.log(
        'Training Videos Request:',
        JSON.stringify({ status: apiStatus }, null, 2),
      );

      const res = await Api.getTrainingVideos(apiStatus);
      const resJson = res?.data ?? {};

      console.log(
        'Training Videos Response:',
        JSON.stringify(resJson, null, 2),
      );

      if (isApiSuccess(res)) {
        const mapped = mapTrainingVideos(resJson?.data ?? resJson);

        console.log(
          'Training Videos Mapped Response:',
          JSON.stringify(mapped, null, 2),
        );

        setCustomerData(mapped.customer);
      } else {
        console.log(
          'Training Videos Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'Training Videos API Error:',
        JSON.stringify(error?.response?.data ?? error?.message ?? error, null, 2),
      );
    }
  }, [activeStatus, activeTab]);

  const fetchProductTraining = useCallback(async () => {
    if (!role) {
      return;
    }

    const apiRole = getTrainingApiRole(role);
    const roleCandidates = getProductTrainingRoleCandidates(role);

    try {
      let products = [];
      let hasLoggedResponse = false;

      for (const candidate of roleCandidates) {
        const res = await Api.getProductTraining(candidate);
        const resJson = res?.data ?? {};

        if (res?.status == 200) {
          if (!hasLoggedResponse) {
            console.log(
              'Product Training Response:',
              JSON.stringify(resJson, null, 2),
            );
            hasLoggedResponse = true;
          }

          products = mapProductTraining(resJson, candidate || apiRole);

          if (products.length) {
            break;
          }
        }
      }

      setProductData(products);
    } catch (error) {
      console.log(
        'Product Training API Error:',
        JSON.stringify(error?.response?.data ?? error?.message ?? error, null, 2),
      );
    }
  }, [role]);

  const fetchDisplayTraining = useCallback(async (category = activeCategory) => {
    const apiCategory = toDisplayApiCategory(category);

    console.log('api categoty',apiCategory);
    

    try {
      const res = await Api.getTrainingDisplay(apiCategory);
      const resJson = res?.data ?? {};

      if (res?.status == 200) {
        console.log(
          'Training Display Response:',
          JSON.stringify(resJson, null, 2),
        );

        setDisplayData(mapTrainingDisplay(resJson, category));
      } else {
        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'Training Display API Error:',
        JSON.stringify(error?.response?.data ?? error?.message ?? error, null, 2),
      );
    }
  }, [activeCategory]);

  const loadTrainingData = useCallback(async () => {
    if (!role) {
      return;
    }

    setIsLoading(true);

    try {
      if (activeTab === 'Customer') {
        await fetchTrainingVideos();
      }

      if (activeTab === 'Product') {
        await fetchProductTraining();
      }

      if (activeTab === 'Display') {
        await fetchDisplayTraining(activeCategory);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    role,
    activeTab,
    activeCategory,
    activeStatus,
    fetchTrainingVideos,
    fetchProductTraining,
    fetchDisplayTraining,
  ]);

  useFocusEffect(
    useCallback(() => {
      loadTrainingData();
    }, [loadTrainingData]),
  );

  useEffect(() => {
    if (route.params?.tab) {
      setActiveTab(route.params.tab);
    }
    if (route.params?.status) {
      setActiveStatus(route.params.status);
    }
  }, [route.params?.tab, route.params?.status, route.params?.ts]);

  const openDetail = product => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleMarkCompleted = product => {
    if (product?.id) {
      setProductData(prev =>
        prev.map(item =>
          item.id === product.id ? { ...item, status: 'Completed' } : item,
        ),
      );
    }

    setModalVisible(false);
    setSelectedProduct(null);
    setActiveTab('Product');
    setActiveStatus('Completed');
  };

  const handlePlayVideo = async item => {
    if (!item?.videoUrl) {
      Toast.show('Video not available', Toast.LONG);
      return;
    }

    console.log(
      'Training Video Clicked:',
      JSON.stringify(
        {
          id: item?.id ?? null,
          title: item?.title ?? '',
          videoUrl: item?.videoUrl,
        },
        null,
        2,
      ),
    );

    if (item?.id) {
      try {
        const statusPayload = { status: 'complete' };

        console.log(
          'Training Video Status Request:',
          JSON.stringify(
            {
              videoId: item.id,
              ...statusPayload,
            },
            null,
            2,
          ),
        );

        const res = await Api.updateTrainingVideoStatus(item.id, statusPayload);
        const resJson = res?.data ?? {};

        console.log(
          'Training Video Status Backend Response:',
          JSON.stringify(resJson, null, 2),
        );

        if (isApiSuccess(res)) {
          setCustomerData(prev =>
            prev.map(video =>
              video.id === item.id ? { ...video, status: 'Completed' } : video,
            ),
          );
        } else {
          console.log(
            'Training Video Status Error Response:',
            JSON.stringify(resJson, null, 2),
          );
        }
      } catch (error) {
        console.log(
          'Training Video Status API Error:',
          JSON.stringify(
            error?.response?.data ?? error?.message ?? error,
            null,
            2,
          ),
        );
      }
    }

    if (isExternalVideoLink(item.videoUrl)) {
      try {
        await Linking.openURL(item.videoUrl);
      } catch (error) {
        Toast.show('Unable to open video', Toast.LONG);
      }
      return;
    }

    setActiveVideo(item);
  };

  const filteredCustomer = filterByStatus(customerData, activeStatus);
  const filteredProduct = filterByStatus(productData, activeStatus);
  const filteredDisplay = filterByStatus(displayData, activeStatus);

  const activeList =
    activeTab === 'Customer'
      ? filteredCustomer
      : activeTab === 'Product'
        ? filteredProduct
        : filteredDisplay;

  const emptyMessage =
    activeTab === 'Product'
      ? 'No product training available'
      : activeTab === 'Display'
        ? 'No display training available'
        : 'No training videos available';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.headerArea}>
        <TrainingHeader />
        <TrainingTabs
          active={activeTab}
          onChange={setActiveTab}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading ? (
          <ScreenLoader />
        ) : (
          <>
            {activeTab === 'Display' && (
              <TrainingDisplayCategories
                active={activeCategory}
                onChange={setActiveCategory}
              />
            )}

            <TrainingStatusChips active={activeStatus} onChange={setActiveStatus} />

            {activeTab === 'Customer' &&
              filteredCustomer.map(item => (
                <TrainingCustomerCard
                  key={item.id}
                  item={item}
                  onPlay={handlePlayVideo}
                />
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

            {!activeList.length ? (
              <Text style={styles.emptyText}>{emptyMessage}</Text>
            ) : null}
          </>
        )}
      </ScrollView>

      <TrainingDetailModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
        onMarkCompleted={handleMarkCompleted}
      />

      <TrainingVideoModal
        visible={Boolean(activeVideo)}
        title={activeVideo?.title ?? ''}
        videoUrl={activeVideo?.videoUrl}
        onClose={() => setActiveVideo(null)}
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
  emptyText: {
    textAlign: 'center',
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs2,
    color: Colors.mediumGrey,
    marginTop: hp(4),
  },
});

export default Training;
