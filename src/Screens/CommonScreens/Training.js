import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import {
  trainingCustomerData,
  trainingProductData,
  trainingDisplayData,
} from '../../Constants/DummyData';
import TrainingHeader from '../../Components/TrainingHeader';
import TrainingTabs from '../../Components/TrainingTabs';
import TrainingStatusChips from '../../Components/TrainingStatusChips';
import TrainingDisplayCategories from '../../Components/TrainingDisplayCategories';
import TrainingCustomerCard from '../../Components/TrainingCustomerCard';
import TrainingProductCard from '../../Components/TrainingProductCard';
import TrainingDisplayCard from '../../Components/TrainingDisplayCard';
import TrainingDetailModal from '../../Components/TrainingDetailModal';

const Training = () => {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState(route.params?.tab || 'Customer');
  const [activeStatus, setActiveStatus] = useState('New');
  const [activeCategory, setActiveCategory] = useState('Unstitched');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (route.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route.params?.tab, route.params?.ts]);

  const openDetail = product => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

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
          trainingCustomerData.map(item => (
            <TrainingCustomerCard key={item.id} item={item} />
          ))}

        {activeTab === 'Product' &&
          trainingProductData.map(item => (
            <TrainingProductCard
              key={item.id}
              item={item}
              onViewDetail={openDetail}
            />
          ))}

        {activeTab === 'Display' &&
          trainingDisplayData.map(item => (
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
});

export default Training;
