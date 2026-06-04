import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

import { Colors } from '../Constants/Colors';
import { hp, wp } from '../Assets/Responsive';
import { Fonts } from '../Constants/Fonts';

const staffData = [
  {
    id: '1',
    initials: 'MU',
    name: 'Mudassar',
    g: 10,
    u: 20,
    a: 20,
    color: '#CFF5EA',
  },
  {
    id: '2',
    initials: 'AT',
    name: 'Atique',
    g: 15,
    u: 25,
    a: 25,
    color: '#DDE3FF',
  },
  {
    id: '3',
    initials: 'ZA',
    name: 'Zain',
    g: 20,
    u: 30,
    a: 30,
    color: '#FFE8BF',
  },
  {
    id: '4',
    initials: 'KO',
    name: 'Komal',
    g: 25,
    u: 35,
    a: 35,
    color: '#F2D8FF',
  },
  {
    id: '5',
    initials: 'AY',
    name: 'Ayesha',
    g: 30,
    u: 40,
    a: 40,
    color: '#FFD8E3',
  },
  {
    id: '6',
    initials: 'AZ',
    name: 'Azhar',
    g: 35,
    u: 45,
    a: 50,
    color: '#D4F5E9',
  },
  {
    id: '7',
    initials: 'RI',
    name: 'Rizwan',
    g: 25,
    u: 45,
    a: 60,
    color: '#D8E1FF',
  },
  {
    id: '8',
    initials: 'RI',
    name: 'Rizwan',
    g: 25,
    u: 45,
    a: 60,
    color: '#D8E1FF',
  },
  {
    id: '9',
    initials: 'RI',
    name: 'Rizwan',
    g: 25,
    u: 45,
    a: 60,
    color: '#D8E1FF',
  },
];

const MonthlyTargetAssignment = () => {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.nameContainer}>
        <View style={[styles.avatar, { backgroundColor: item.color }]}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>

        <Text style={styles.name}>{item.name}</Text>
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.inputText}>{item.g}</Text>
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.inputText}>{item.u}</Text>
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.inputText}>{item.a}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.boxContainer}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <View
            style={{
              backgroundColor: '#F59E0B26',
              width: 28,
              height: 28,
              borderRadius: 7,
            }}
          >
            <Image
              source={require('../Assets/Icons/MultiplePeople.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Monthly Target Assignment</Text>
            <Text style={styles.subHeading}>Distribute Among Sales Staff</Text>
          </View>
        </View>

        <View style={styles.countBox}>
          <Text style={styles.countText}>7</Text>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 1.6 }]}>NAME</Text>

        <Text style={styles.headerText}>GARMENTS</Text>
        <Text style={styles.headerText}>UNSTITCHED</Text>
        <Text style={styles.headerText}>ACCESSORIES</Text>
      </View>

      <FlatList
        data={staffData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MonthlyTargetAssignment;

const styles = StyleSheet.create({
  boxContainer: {
    marginTop: wp(4),
    width: wp(89),
    height: hp(35), // ya hp(50)
    borderRadius: wp(5),
    backgroundColor: Colors.white,
    elevation: wp(0.7),
    padding: wp(4),
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(2),
  },

  heading: {
    fontSize: 14,
    fontFamily: Fonts.poppinsBold,
  },

  subHeading: {
    fontSize: 11,
    color: '#9CA3AF',

    fontFamily: Fonts.poppinsRegular,
  },

  countBox: {
    width: wp(6.5),
    height: wp(7),
    borderRadius: wp(2),
    backgroundColor: '#119C7D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp(-4),
  },

  countText: {
    color: Colors.white,
    fontSize: 11,
    fontFamily: Fonts.poppinsRegular,
  },

  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: wp(3),
    marginBottom: wp(1),
    alignItems: 'flex-end',
    marginTop: wp(4),
  },

  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: wp(2.4),
    color: '#9CA3AF',
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(3),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  nameContainer: {
    flex: 1.6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },

  avatarText: {
    fontSize: wp(2.5),
    fontWeight: '700',
    color: '#10B981',
  },

  name: {
    fontSize: wp(3.5),
    color: '#111827',
    fontWeight: '500',
  },

  inputBox: {
    flex: 1,
    height: wp(8),
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(0.5),
  },

  inputText: {
    fontSize: wp(3.2),
    fontWeight: '600',
    color: '#111827',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {
    marginLeft: wp(2),
  },

  icon: {
    width: 15,
    height: 15,
    marginLeft: wp(1.8),
    marginTop: wp(2),
  },
});
