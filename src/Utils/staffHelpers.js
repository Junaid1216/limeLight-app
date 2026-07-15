import { ROLES } from '../Constants/roleConfig';

let lastSelectedStaff = null;

export const getStaffIdFromApiItem = item => {
  if (item?.staff_id != null && item?.staff_id !== '') {
    return item.staff_id;
  }

  if (item?.sale_staff_id != null && item?.sale_staff_id !== '') {
    return item.sale_staff_id;
  }

  return null;
};

export const getStaffIdFromRawApiItem = item => {
  const candidates = [
    item?.staff_id,
    item?.sale_staff_id,
    item?.id,
    item?.employee_id,
    item?.user_id,
    item?.staffId,
  ];

  for (const value of candidates) {
    const staffId = normalizeStaffId(value);

    if (staffId) {
      return staffId;
    }
  }

  return null;
};

export const normalizeStaffId = value => {
  if (value == null || value === '') {
    return null;
  }

  const numeric = Number(String(value).trim());

  if (!Number.isInteger(numeric) || numeric <= 0) {
    return null;
  }

  return numeric;
};

export const getValidStaffId = member => getStaffIdFromRawApiItem(member);

export const setLastSelectedStaff = member => {
  const staffId = getValidStaffId(member);

  if (!staffId) {
    return;
  }

  lastSelectedStaff = {
    ...member,
    staff_id: staffId,
    id: staffId,
  };
};

export const getLastSelectedStaffMember = () => lastSelectedStaff;

export const resolveStaffId = (params, userData, role) => {
  const fromParams = getValidStaffId({
    staff_id:
      params?.staffId ??
      params?.member?.staff_id ??
      params?.member?.sale_staff_id,
  });

  if (fromParams) {
    return fromParams;
  }

  const fromLast = getValidStaffId(lastSelectedStaff);

  if (fromLast && role !== ROLES.STAFF) {
    return fromLast;
  }

  if (role === ROLES.STAFF) {
    return normalizeStaffId(userData?.staff_id);
  }

  return null;
};

export const getStaffDetailsEndpoint = (staffId, role) => {
  if (role === ROLES.ASM) {
    return `asm-staff-details/${staffId}`;
  }

  if (role === ROLES.MANAGER) {
    return `staff-details/${staffId}`;
  }

  return `staff-details/${staffId}`;
};
