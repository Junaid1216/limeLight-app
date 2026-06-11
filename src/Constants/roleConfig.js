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

export const getProfileInfo = role => {
  switch (role) {
    case ROLES.MANAGER:
      return {
        name: 'M.Khan',
        roleTag: Strings.branchManager,
        branchLabel: Strings.profileBranch,
        branchValue: 'DHA',
        roleValue: Strings.branchManager,
        designation: 'Junior Branch Manager',
      };
    case ROLES.ASM:
      return {
        name: 'M.Umair',
        roleTag: Strings.asm,
        branchLabel: Strings.region,
        branchValue: 'Lahore',
        roleValue: Strings.asm,
        designation: 'Account Sales Manager',
      };
    default:
      return {
        name: 'M.Saleem',
        roleTag: Strings.salesStaff,
        branchLabel: Strings.profileBranch,
        branchValue: 'DHA Branch',
        roleValue: Strings.salesStaff,
        designation: Strings.seniorSalesStaff,
      };
  }
};
