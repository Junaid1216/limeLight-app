import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';

const MonthlyTargetCalculator = () => {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <Image
            source={require('../Assets/Icons/Calculator.png')}
            style={styles.icon}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Monthly Target Calculator</Text>
          <Text style={styles.subtitle}>Category-wise distribution</Text>
        </View>
      </View>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.categoryText]}>CATEGORY</Text>

        <Text style={styles.headerText}>TARGET</Text>

        <Text style={[styles.headerText, { marginLeft: wp(1) }]}>ASSIGNED</Text>

        <Text style={[styles.headerText, { paddingLeft: wp(2) }]}>LEFT</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.rowItem}>
        <View style={styles.categoryContainer}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../Assets/Icons/Garments.png')}
              style={styles.GarmentsStyle}
            />
          </View>

          <Text style={styles.categoryName}>Garments</Text>
        </View>

        <View style={styles.targetBox}>
          <Text style={styles.targetText}>300</Text>
        </View>

        <View style={styles.assignedBox}>
          <Text style={styles.assignedText}>160</Text>
        </View>

        <View style={styles.leftBox}>
          <Text style={styles.leftText}>140</Text>
        </View>
      </View>
      <View style={styles.dividertwo} />
      <View style={styles.rowItem}>
        <View style={styles.categoryContainer}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../Assets/Icons/Garments.png')}
              style={styles.GarmentsStyle}
            />
          </View>

          <Text style={styles.categoryName}>Garments</Text>
        </View>

        <View style={styles.targetBox}>
          <Text style={styles.targetText}>300</Text>
        </View>

        <View style={styles.assignedBox}>
          <Text style={styles.assignedText}>160</Text>
        </View>

        <View style={styles.leftBox}>
          <Text style={styles.leftText}>140</Text>
        </View>
      </View>
      <View style={styles.dividertwo} />
      <View style={styles.rowItem}>
        <View style={styles.categoryContainer}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../Assets/Icons/Garments.png')}
              style={styles.GarmentsStyle}
            />
          </View>

          <Text style={styles.categoryName}>Garments</Text>
        </View>

        <View style={styles.targetBox}>
          <Text style={styles.targetText}>300</Text>
        </View>

        <View style={styles.assignedBox}>
          <Text style={styles.assignedText}>160</Text>
        </View>

        <View style={styles.leftBox}>
          <Text style={styles.leftText}>140</Text>
        </View>
      </View>
      <View style={styles.dividertwo} />

      <View style={styles.totalRow}>
        <Text style={styles.totalAssignedText}>Total Assigned</Text>

        <Text style={styles.totalValue}>660</Text>
      </View>
    </View>
  );
};

export default MonthlyTargetCalculator;

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: Colors.darkblue,
    width: wp(89),
    height: wp(88),
    borderRadius: wp(5),
    paddingTop: wp(6),
    paddingHorizontal: wp(6),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconBox: {
    backgroundColor: Colors.darkgreen,
    borderRadius: wp(2),
    width: wp(8.6),
    height: wp(8.6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },

  icon: {
    width: wp(4),
    height: wp(4),
    resizeMode: 'contain',
  },
  GarmentsStyle: {
    width: wp(4),
    height: wp(4),
    resizeMode: 'contain',
    marginLeft: wp(1.2),
    marginTop: wp(2),
  },

  title: {
    color: Colors.white,
    fontSize: wp(4),
    fontFamily: Fonts.poppinsRegular,
  },
  textContainer: {
    flex: 1,
  },

  subtitle: {
    color: Colors.white,
    fontSize: wp(3),
    fontFamily: Fonts.poppinsRegular,
    marginTop: wp(0),
  },

  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(8),
    paddingBottom: wp(3),
  },

  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(8),
    paddingBottom: wp(3),
  },

  headerText: {
    flex: 1,
    color: '#8A94B3',
    fontSize: wp(2.5), // thoda chhota
    fontFamily: Fonts.poppinsRegular,
    textAlign: 'center',
  },

  categoryText: {
    flex: 2.2,
    textAlign: 'left',
    marginLeft: wp(2),
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginTop: wp(0.5),
    marginHorizontal: wp(2.7),
  },

  dividertwo: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginTop: wp(3),
    marginHorizontal: wp(2.7),
  },

  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(3),
    marginLeft: wp(2),
  },

  iconWrapper: {
    backgroundColor: '#20C9971F',
    width: wp(8),
    height: wp(8),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },

  GarmentsStyle: {
    width: wp(4),
    height: wp(4),
    resizeMode: 'contain',
  },

  categoryName: {
    color: Colors.white,
    fontSize: wp(3.2),
    fontFamily: Fonts.poppinsRegular,
    marginLeft: wp(2),
  },

  categoryContainer: {
    flex: 2.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(3),
    marginHorizontal: wp(2),
  },

  targetBox: {
    backgroundColor: '#123F47',
    minWidth: 34,
    height: 22,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: wp(4),
    marginRight: wp(6),
  },

  assignedBox: {
    backgroundColor: '#1B3D8A',
    minWidth: 34,
    height: 22,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: wp(1),
    marginRight: wp(3.5),
  },

  leftBox: {
    backgroundColor: '#6B4A00',
    minWidth: 34,
    height: 22,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
  },

  targetText: {
    color: '#20C997',
    fontSize: 12,
    fontFamily: Fonts.poppinsRegular,
  },

  assignedText: {
    color: '#4D8DFF',
    fontSize: 12,
    fontFamily: Fonts.poppinsRegular,
  },

  leftText: {
    color: '#F4B942',
    fontSize: 12,
    fontFamily: Fonts.poppinsRegular,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp(3),
    marginHorizontal: wp(2.6),
  },

  totalAssignedText: {
    color: Colors.white,
    fontFamily: Fonts.poppinsRegular,
    fontSize: 11,
  },

  totalValue: {
    color: Colors.white,
    fontFamily: Fonts.poppinsRegular, // agar hai
    fontSize: 11,
  },
});
