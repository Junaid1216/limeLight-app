import { Strings } from './Strings';

export const ROLES = {
  STAFF: 'staff',
  MANAGER: 'manager',
  ASM: 'asm',
};

export const getRoleDisplayLabel = role => {
  switch (role) {
    case ROLES.MANAGER:
      return Strings.branchManager;
    case ROLES.ASM:
      return Strings.asm;
    default:
      return Strings.salesStaff;
  }
};

export const getHomeBranchLabel = role => {
  switch (role) {
    case ROLES.MANAGER:
      return Strings.branchManagerHomeBranch;
    case ROLES.ASM:
      return Strings.asmHomeBranch;
    default:
      return Strings.homeUserBranch;
  }
};
