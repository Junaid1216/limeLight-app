import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const ProfileInfoRow = props => {
  if (!props?.label) {
    return null;
  }

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          {props?.iconSource ? (
            <Image
              source={props?.iconSource}
              style={styles.iconImage}
              resizeMode="contain"
              tintColor={Colors.slateGrey}
            />
          ) : (
            <Icon
              name={props?.iconName}
              size={wp(4.2)}
              color={Colors.slateGrey}
            />
          )}
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.label} numberOfLines={1}>
            {props?.label}
          </Text>
          <TextInput
            style={styles.valueInput}
            value={props?.value}
            onChangeText={props?.onChangeText}
            editable={props?.editable !== false}
            numberOfLines={1}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: wp(2),
  },
  iconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: Colors.cloudGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: wp(5),
    height: wp(5),
  },
  textWrap: {
    marginLeft: wp(3),
    flex: 1,
  },
  label: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs1,
    color: Colors.zinc,
    marginBottom: hp(0.25),
  },
  valueInput: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xs2,
    color: Colors.black,
    padding: 0,
    margin: 0,
  },
});

export default ProfileInfoRow;
