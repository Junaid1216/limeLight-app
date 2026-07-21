import { createSelector } from '@reduxjs/toolkit';
import {
  ROLES,
  getProfileInfo,
  mapProfileData,
  normalizeAuthUser,
} from '../../Constants/roleConfig';

export const selectAuthUser = state => state?.AUTH?.userData ?? null;

export const selectFeedbackProfile = createSelector(
  [selectAuthUser, (_, role) => role],
  (userData, role) => {
    const normalized = normalizeAuthUser(userData);
    const profile = normalized
      ? mapProfileData(normalized, role)
      : getProfileInfo(role);

    const code =
      normalized?.employee_id ??
      normalized?.code ??
      normalized?.login ??
      '';

    const location =
      role === ROLES.ASM
        ? normalized?.region_name ??
          normalized?.region ??
          profile?.branchValue ??
          ''
        : profile?.branchValue ?? '';

    return {
      code,
      name: profile?.name ?? '',
      location,
    };
  },
);
