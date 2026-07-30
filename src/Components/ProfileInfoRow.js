import React, { useRef, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const ProfileInfoRow = props => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (props?.isEditing && props?.autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props?.isEditing, props?.autoFocus]);

  if (!props?.label) {
    return null;
  }

  const isEditable = props?.editable === true;

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
          {isEditable ? (
            <TextInput
              ref={inputRef}
              style={styles.valueInput}
              value={props?.value}
              onChangeText={props?.onChangeText}
              editable={!props?.isSaving}
              numberOfLines={1}
            />
          ) : (
            <Text
              style={[styles.valueInput, styles.valueInputDisabled]}
              numberOfLines={1}
            >
              {props?.value ?? ''}
            </Text>
          )}
        </View>
      </View>

      {props?.showEditAction ? (
        <View style={styles.actions}>
          {props?.isEditing ? (
            <>
              {props?.isSaving ? (
                <ActivityIndicator size="small" color={Colors.green} />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={props?.onPressSave}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.saveText}>{Strings.save}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={props?.onPressCancel}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={styles.cancelBtn}
                  >
                    <Text style={styles.cancelText}>{Strings.cancel}</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : (
            <TouchableOpacity
              onPress={props?.onPressEdit}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon name="edit-2" size={wp(4.5)} color={Colors.mediumGrey} />
            </TouchableOpacity>
          )}
        </View>
      ) : null}
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
  valueInputDisabled: {
    color: Colors.zinc,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs1,
    color: Colors.green,
  },
  cancelBtn: {
    marginLeft: wp(3),
  },
  cancelText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs1,
    color: Colors.mediumGrey,
  },
});

export default ProfileInfoRow;
