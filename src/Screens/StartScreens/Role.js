import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../Assets';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import RoleComponent from '../../Components/RoleComponent';
import { ROLES } from '../../Constants/roleConfig';
import { MyStyling } from '../../Constants/Styling';
import { useRole } from '../../Context/RoleContext';

const Role = () => {
  const navigation = useNavigation();
  const { setRole } = useRole();

  const goToLogin = role => {
    setRole(role);
    navigation.navigate('AuthNavigation');
  };

  return (
    <View style={MyStyling.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.mint} />
      <Text style={styles.title} numberOfLines={1}>{Strings.chooseYourRole}</Text>

      <View style={styles.rolesWrapper}>
        <RoleComponent
          image={Images.StaffRole}
          title={Strings.staff}
          description={Strings.staffDescription}
          numberofLines={2}
          borderColor={Colors.blue}
          arrowBg={Colors.lightBlue}
          arrowColor={Colors.blue}
          moveTextUp
          onPress={() => goToLogin(ROLES.STAFF)}
        />

        <RoleComponent
          image={Images.ManagerRole}
          title={Strings.manager}
          description={Strings.branchOperation}
          numberofLines={2}
          borderColor={Colors.green}
          arrowBg={Colors.lightGreen}
          arrowColor={Colors.green}
          moveTextUp
          onPress={() => goToLogin(ROLES.MANAGER)}
        />

        <RoleComponent
          image={Images.ASMRole}
          title={Strings.asm}
          description={Strings.asmDescription}
          borderColor={Colors.orange}
          arrowBg={Colors.lightOrange}
          arrowColor={Colors.orange}
          numberofLines={3}
          onPress={() => goToLogin(ROLES.ASM)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Fontsize.ml,
    fontFamily: Fonts.poppinsBold,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: hp(4),
    marginLeft:wp(15),
    maxWidth:wp(60),
  },
  rolesWrapper: {
    gap: hp(2),
  },
});

export default Role;
