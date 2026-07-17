import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import { Colors } from '../Constants/Colors';
import { wp } from '../Assets/Responsive';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const MonthlyTargetAssignment = ({ rows = [], onUpdateField }) => {
  const updateField = (id, field, value) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    onUpdateField?.(id, field, cleaned);
  };

  const renderRow = item => (
    <View style={styles.row} key={item.id}>
      <View style={styles.nameContainer}>
        <View style={[styles.avatar, { backgroundColor: item.color }]}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>

        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
      </View>

      <TextInput
        style={styles.inputBox}
        value={item.garments}
        onChangeText={text => updateField(item.id, 'garments', text)}
        keyboardType="number-pad"
        textAlign="center"
        maxLength={4}
        placeholder="0"
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        style={styles.inputBox}
        value={item.unstitched}
        onChangeText={text => updateField(item.id, 'unstitched', text)}
        keyboardType="number-pad"
        textAlign="center"
        maxLength={4}
        placeholder="0"
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        style={styles.inputBox}
        value={item.accessories}
        onChangeText={text => updateField(item.id, 'accessories', text)}
        keyboardType="number-pad"
        textAlign="center"
        maxLength={4}
        placeholder="0"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );

  return (
    <View style={styles.boxContainer}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.iconWrap}>
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
          <Text style={styles.countText}>{rows.length}</Text>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 1.6 }]}>NAME</Text>

        <Text style={styles.headerText}>GARMENTS</Text>
        <Text style={styles.headerText}>UNSTITCHED</Text>
        <Text style={styles.headerText}>ACCESSORIES</Text>
      </View>

      {rows.map(renderRow)}
    </View>
  );
};

export default MonthlyTargetAssignment;

const styles = StyleSheet.create({
  boxContainer: {
    marginTop: wp(4),
    width: wp(89),
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
    fontSize: wp(3.5),
    fontFamily: Fonts.poppinsBold,
  },

  subHeading: {
    fontSize: wp(2.9),
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
    fontSize: wp(2.9),
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
    fontSize: Fontsize.x0,
    color: '#9CA3AF',
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
    fontSize: Fontsize.xm0,
    color: '#10B981',
  },

  name: {
    flex: 1,
    flexShrink: 1,
    fontSize: Fontsize.xs4,
    fontFamily: Fonts.poppinsMedium,
    color: '#111827',
  },

  inputBox: {
    flex: 1,
    height: wp(8),
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: wp(2),
    marginHorizontal: wp(0.5),
    paddingVertical: 0,
    fontSize: Fontsize.xs1,
    fontFamily: Fonts.poppinsMedium,
    color: '#111827',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {
    marginLeft: wp(2),
  },

  iconWrap: {
    backgroundColor: '#F59E0B26',
    width: 28,
    height: 28,
    borderRadius: 7,
  },

  icon: {
    width: wp(3.6),
    height: wp(3.6),
    marginLeft: wp(1.8),
    marginTop: wp(2),
  },
});
