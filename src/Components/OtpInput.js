import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

// 1 OTP = 6 digits (6 boxes)
const OtpInput = ({ value, onChange, error }) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const refs = [ref1, ref2, ref3, ref4, ref5, ref6];

  const onDigit = (index, text) => {
    const newOtp = [...value];
    newOtp[index] = text === '' ? '' : text.slice(-1);
    onChange(newOtp);

    if (newOtp[index] && index < 5) {
      refs[index + 1].current.focus();
    }
  };

  const onBackspace = index => e => {
    if (e.nativeEvent.key !== 'Backspace') {
      return;
    }
    if (value[index] || index === 0) {
      return;
    }

    const newOtp = [...value];
    newOtp[index - 1] = '';
    onChange(newOtp);
    refs[index - 1].current.focus();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.otpRow}>
      <TextInput
        ref={ref1}
        style={[styles.otpBox, error && styles.otpBoxError]}
        value={value[0]}
        onChangeText={text => onDigit(0, text)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref2}
        style={[styles.otpBox, error && styles.otpBoxError]}
        value={value[1]}
        onChangeText={text => onDigit(1, text)}
        onKeyPress={onBackspace(1)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref3}
        style={[styles.otpBox, error && styles.otpBoxError]}
        value={value[2]}
        onChangeText={text => onDigit(2, text)}
        onKeyPress={onBackspace(2)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref4}
        style={[styles.otpBox, error && styles.otpBoxError]}
        value={value[3]}
        onChangeText={text => onDigit(3, text)}
        onKeyPress={onBackspace(3)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref5}
        style={[styles.otpBox, error && styles.otpBoxError]}
        value={value[4]}
        onChangeText={text => onDigit(4, text)}
        onKeyPress={onBackspace(4)}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        ref={ref6}
        style={[styles.otpBox, error && styles.otpBoxError]}
        value={value[5]}
        onChangeText={text => onDigit(5, text)}
        onKeyPress={onBackspace(5)}
        keyboardType="number-pad"
        maxLength={1}
      />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp(2),
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  otpBoxError: {
    borderColor: Colors.brightRed,
  },
  errorText: {
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.brightRed,
    marginTop: hp(0.5),
  },
});

export default OtpInput;
