import React from 'react';
import { ROLES } from '../Constants/roleConfig';
import { useRole } from '../Context/RoleContext';
import ASMDrawerNavigator from './ASM/ASMDrawerNavigator';
import BranchManagerDrawerNavigator from './BranchManager/BranchManagerDrawerNavigator';
import SalesStaffDrawerNavigator from './SalesStaff/SalesStaffDrawerNavigator';

const DrawerNavigator = () => {
  const { role } = useRole();

  if (role === ROLES.MANAGER) {
    return <BranchManagerDrawerNavigator />;
  }

  if (role === ROLES.ASM) {
    return <ASMDrawerNavigator />;
  }

  return <SalesStaffDrawerNavigator />;
};

export default DrawerNavigator;
