import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const Customtextinput = props => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={[styles.wrapper, props?.wrapperStyle]}>
      {(props?.label || props?.labelRight) ? (
        <View style={styles.labelRow}>
          {props?.label ? (
            <Text style={[styles.label, props?.feedbackStyle && styles.feedbackLabel]}>
              {props?.label}
            </Text>
          ) : null}
          {props?.labelRight ? (
            <Text style={[styles.labelRight, props?.feedbackStyle && styles.feedbackLabel]}>
              {props?.labelRight}
            </Text>
          ) : null}
        </View>
      ) : null}

      <View
        style={[
          styles.inputBox,
          props?.feedbackStyle && styles.feedbackInputBox,
          props?.multiline && styles.feedbackMultilineBox,
          props?.error && styles.inputBoxError,
          props?.inputBoxStyle,
        ]}>
        {props?.icon ? (
          <View
            style={[
              styles.iconWrap,
              props?.iconBg === Colors.lightBlue && styles.iconWrapBlue,
              props?.iconBg === Colors.lightGreen && styles.iconWrapGreen,
              props?.feedbackStyle && styles.iconWrapFeedback,
            ]}>
            <Image
              source={props?.icon}
              style={[
                styles.icon,
                props?.feedbackStyle && styles.feedbackIcon,
                props?.icon === Images.Password && styles.passwordIcon,
                props?.iconTint && styles.branchIcon,
              ]}
              resizeMode="contain"
            />
          </View>
        ) : null}

        <TextInput
          style={[
            styles.input,
            props?.multiline && styles.multilineInput,
            props?.editable === false && styles.inputDisabled,
          ]}
          placeholder={props?.placeholder}
          placeholderTextColor={Colors.grey}
          value={props?.value}
          onChangeText={props?.onChangeText}
          secureTextEntry={props?.secureTextEntry ? hidePassword : false}
          keyboardType={props?.keyboardType}
          multiline={props?.multiline}
          textAlignVertical={props?.multiline ? 'top' : 'center'}
          editable={props?.editable !== false}
        />

        {props?.secureTextEntry ? (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Feather
              name={hidePassword ? 'eye-off' : 'eye'}
              size={wp(5)}
              color={Colors.coolGrey}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {props?.error ? (
        <Text style={styles.errorText}>{props.error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp(2),
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  label: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsMedium,
    color: Colors.slateGrey,
  },
  labelRight: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
  },
  feedbackLabel: {
    color: Colors.zinc,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: wp(0.3),
    borderColor: Colors.paleBlue,
    borderRadius: wp(4),
    paddingHorizontal: wp(3),
    height: hp(6.5),
    backgroundColor: Colors.skyBlue,
  },
  feedbackInputBox: {
    backgroundColor: Colors.inputGrey,
    borderColor: Colors.inputGrey,
    borderRadius: wp(2.5),
    height: hp(6),
  },
  feedbackMultilineBox: {
    height: hp(16),
    alignItems: 'flex-start',
    paddingVertical: hp(1.5),
  },
  iconWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2.5),
  },
  iconWrapBlue: {
    backgroundColor: Colors.lightBlue,
  },
  iconWrapGreen: {
    backgroundColor: Colors.lightGreen,
  },
  iconWrapFeedback: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(1.5),
    marginRight: wp(2),
    backgroundColor: 'transparent',
  },
  icon: {
    width: wp(4.5),
    height: wp(4.5),
    tintColor: Colors.royalBlue,
  },
  feedbackIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: Colors.mediumGrey,
  },
  passwordIcon: {
    tintColor: Colors.teal,
  },
  branchIcon: {
    tintColor: Colors.branchGreen,
  },
  input: {
    flex: 1,
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.black,
    padding: 0,
  },
  multilineInput: {
    minHeight: hp(12),
  },
  inputDisabled: {
    color: Colors.zinc,
  },
  eyeIcon: {
    marginLeft: wp(2),
  },
  inputBoxError: {
    borderColor: Colors.brightRed,
  },
  errorText: {
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.brightRed,
    marginTop: hp(0.5),
  },
});

export default Customtextinput;
