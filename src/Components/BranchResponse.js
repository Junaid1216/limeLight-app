import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import Customtextinput from '../Components/Customtextinput';
import { Images } from '../Assets';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';

const BranchResponse = () => {
  const [branch, setBranch] = useState(' ');

  return (
    <View style={styles.container}>
      <Customtextinput
        label="Branch"
        value={branch}
        onChangeText={setBranch}
        icon={Images.Branch}
        iconBg={'red'}
        iconTint
        inputBoxStyle={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB',
        }}
      />
      <View style={styles.responseCard}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>Total Responses</Text>

          <View style={styles.countRow}>
            <Text style={styles.count}>6</Text>
            <Text style={styles.total}> / 8</Text>
          </View>

          <Text style={styles.rate}>↗ 75% response rate</Text>
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={require('../Assets/Icons/Assignment.png')}
            style={{ width: 15, height: 15 }}
          />
        </View>
      </View>
    </View>
  );
};

export default BranchResponse;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  responseCard: {
    marginTop: 1.3,
    borderRadius: 7,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1FAF9A',
  },

  leftContent: {
    // flex: 1,
  },

  title: {
    color: '#E8F8F5',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 7,
  },

  countRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  count: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 35,
  },

  total: {
    color: '#D8F3EE',
    fontSize: 16,
    marginBottom: 6,
    fontFamily: Fonts.regular,
  },

  rate: {
    color: '#E8F8F5',
    fontSize: 11,
    marginTop: 7,
  },

  iconContainer: {
    width: 84,
    height: 84,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
