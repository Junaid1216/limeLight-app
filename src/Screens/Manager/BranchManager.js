import React from 'react';

import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import CategoryBreakdownCard from '../../Components/CategoryBreakdownCard';

import HomeHeaderComponent from '../../Components/HomeHeaderComponent';

import ManagerCategoryCard from '../../Components/ManagerCategoryCard';

import ManagerLiveStatusCard from '../../Components/ManagerLiveStatusCard';

import StaffConversionChartCard from '../../Components/StaffConversionChartCard';

import { hp, wp } from '../../Assets/Responsive';

import { Colors } from '../../Constants/Colors';

import {

  managerAccessoriesPerformance,

  managerGarmentsPerformance,

  managerUnstitchedPerformance,

} from '../../Constants/DummyData';

import { Fontsize } from '../../Constants/Fontsize';

import { Fonts } from '../../Constants/Fonts';

import { Strings } from '../../Constants/Strings';

import { MyStyling } from '../../Constants/Styling';

import { useDateRangePicker } from '../../hooks/useDateRangePicker';



const BranchManager = props => {

  const params = props?.route?.params;

  const garmentsPerformance =

    params?.garmentsPerformance ?? managerGarmentsPerformance;

  const unstitchedPerformance =

    params?.unstitchedPerformance ?? managerUnstitchedPerformance;

  const accessoriesPerformance =

    params?.accessoriesPerformance ?? managerAccessoriesPerformance;



  const {

    fromDate,

    toDate,

    formatDate,

    openFromPicker,

    openToPicker,

    datePicker,

  } = useDateRangePicker();



  return (

    <View style={MyStyling.container2}>

      <StatusBar barStyle="light-content" backgroundColor={Colors.darkNavy} />

      <View style={styles.headerArea}>

        <HomeHeaderComponent />

      </View>



      <ScrollView

        contentContainerStyle={styles.content}

        showsVerticalScrollIndicator={false}

        keyboardShouldPersistTaps="handled">

        <Text style={styles.screenTitle} numberOfLines={1}>

          {Strings.myPerformance}

        </Text>



        <ManagerLiveStatusCard />



        <Text style={styles.sectionTitle} numberOfLines={1}>

          {Strings.categoryPerformance}

        </Text>



        <ManagerCategoryCard item={garmentsPerformance} />

        <ManagerCategoryCard item={unstitchedPerformance} />

        <ManagerCategoryCard item={accessoriesPerformance} />



        <CategoryBreakdownCard />



        <StaffConversionChartCard

          labels={Strings}

          fromDate={fromDate}

          toDate={toDate}

          formatDate={formatDate}

          onPressFrom={openFromPicker}

          onPressTo={openToPicker}

        />



        {datePicker ? <DateTimePicker {...datePicker} /> : null}

      </ScrollView>

    </View>

  );

};



const styles = StyleSheet.create({

  headerArea: {

    backgroundColor: Colors.darkNavy,

  },

  content: {

    paddingHorizontal: wp(4),

    paddingTop: hp(2.3),

    paddingBottom: hp(3),

    backgroundColor: Colors.white,

  },

  screenTitle: {

    fontFamily: Fonts.poppinsBold,

    fontSize: Fontsize.mm,

    color: Colors.black,

    textAlign: 'center',

    marginBottom: hp(2.1),

  },

  sectionTitle: {

    fontFamily: Fonts.poppinsBold,

    fontSize: Fontsize.m,

    color: Colors.black,

    marginBottom: hp(1.5),

    marginLeft: wp(0.5),

  },

});



export default BranchManager;

