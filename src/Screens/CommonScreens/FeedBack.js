import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import Customtextinput from '../../Components/Customtextinput';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';

const FeedBack = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [feedback, setFeedback] = useState('');

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <MainHeaderComponent
          title={Strings.feedbackHeader}
          notificationCount={5}
        />

        <Text style={styles.heading} numberOfLines={1}>
          {Strings.shareYourFeedback}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {Strings.feedbackSubtitle}
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Customtextinput
              feedbackStyle
              keyboardType="number-pad"
              icon={Images.Hash}
              label={Strings.codeLabel}
              value={code}
              onChangeText={setCode}
              wrapperStyle={styles.halfInput}
            />
            <Customtextinput
              feedbackStyle
              label={Strings.nameLabel}
              icon={Images.Person}
              value={name}
              onChangeText={setName}
              wrapperStyle={styles.halfInput}
            />
          </View>

          <Customtextinput
            feedbackStyle
            label={Strings.branchLabel}
            icon={Images.Branch}
            value={branch}
            onChangeText={setBranch}
            iconTint={Colors.branchGreen}
            wrapperStyle={styles.inputSideSpace}
          />

          <Customtextinput
            feedbackStyle
            label={Strings.yourFeedbackLabel}
            labelRight={Strings.required}
            multiline
            value={feedback}
            onChangeText={setFeedback}
            wrapperStyle={[styles.inputSideSpace, styles.lastInput]}
          />

          <View style={[styles.noteRow, styles.inputSideSpace]}>
            <Image
              source={Images.Info}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={styles.noteText} numberOfLines={2}>
              {Strings.feedbackNote}
            </Text>
          </View>
        </View>

        <Btn
          title={Strings.submitFeedback}
          onPress={() => {}}
          style={styles.submitBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(4),
  },
  heading: {
    fontSize: Fontsize.l,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
  },
  subtitle: {
    fontSize: Fontsize.xs1,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    marginBottom: hp(2),
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    elevation: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  halfInput: {
    width: wp(33),
  },
  inputSideSpace: {
    paddingHorizontal: wp(2),
  },
  lastInput: {
    marginBottom: hp(1),
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp(0.5),
  },
  infoIcon: {
    width: wp(4),
    height: wp(4),
    marginRight: wp(2),
    marginTop: hp(0.2),
  },
  noteText: {
    flex: 1,
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    lineHeight: hp(2.2),
  },
  submitBtn: {
    marginTop: hp(2.5),
  },
});

export default FeedBack;
