import { Strings } from './Strings';

export const ROLES = {
  STAFF: 'staff',
  MANAGER: 'manager',
  ASM: 'asm',
};

export const getTrainingApiRole = role => {
  switch (role) {
    case ROLES.MANAGER:
      return 'branch_manager';
    case ROLES.ASM:
      return 'asm';
    default:
      return 'sales_staff';
  }
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

export const mapProfileData = (apiData = {}, role) => {
  const fallback = getProfileInfo(role);
  const roleLabel =
    apiData.role_name ??
    apiData.role ??
    getRoleDisplayLabel(apiData.type || role);

  return {
    name: apiData.name ?? fallback.name,
    branchLabel: fallback.branchLabel,
    branchValue:
      apiData.branch_name ?? apiData.branch ?? fallback.branchValue,
    roleTag: roleLabel,
    roleValue: roleLabel,
    designation: apiData.designation ?? fallback.designation,
  };
};
