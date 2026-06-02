import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

// 1 OTP = 6 digits (6 boxes)
const OtpInput = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const refs = [ref1, ref2, ref3, ref4, ref5, ref6];

  const onDigit = (index, text) => {
    const newOtp = [...otp];
    newOtp[index] = text === '' ? '' : text.slice(-1);
    setOtp(newOtp);

    if (newOtp[index] && index < 5) {
      refs[index + 1].current.focus();
    }
  };

  const onBackspace = index => e => {
    if (e.nativeEvent.key !== 'Backspace') {
      return;
    }
    if (otp[index] || index === 0) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index - 1] = '';
    setOtp(newOtp);
    refs[index - 1].current.focus();
  };

  return (
    <View style={styles.otpRow}>
      <TextInput
        ref={ref1}
        style={styles.otpBox}
        value={otp[0]}
        onChangeText={text => onDigit(0, text)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref2}
        style={styles.otpBox}
        value={otp[1]}
        onChangeText={text => onDigit(1, text)}
        onKeyPress={onBackspace(1)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref3}
        style={styles.otpBox}
        value={otp[2]}
        onChangeText={text => onDigit(2, text)}
        onKeyPress={onBackspace(2)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref4}
        style={styles.otpBox}
        value={otp[3]}
        onChangeText={text => onDigit(3, text)}
        onKeyPress={onBackspace(3)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref5}
        style={styles.otpBox}
        value={otp[4]}
        onChangeText={text => onDigit(4, text)}
        onKeyPress={onBackspace(4)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref6}
        style={styles.otpBox}
        value={otp[5]}
        onChangeText={text => onDigit(5, text)}
        onKeyPress={onBackspace(5)}
        keyboardType="number-pad"
        maxLength={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  otpBox: {
    width: wp(12),
    height: wp(12),
    borderWidth: wp(0.35),
    borderColor: Colors.teal,
    borderRadius: wp(1.5),
    backgroundColor: Colors.white,
    textAlign: 'center',
    fontSize: Fontsize.m,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.black,
    padding: 0,
  },
});

export default OtpInput;
