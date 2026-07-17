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
  if (!item) {
    return null;
  }

  const nested =
    item?.sale_staff ??
    item?.sales_staff ??
    item?.staff ??
    item?.employee ??
    item?.user;

  if (nested && typeof nested === 'object') {
    const nestedId = getStaffIdFromRawApiItem(nested);

    if (nestedId) {
      return nestedId;
    }
  }

  const candidates = [
    item?.staff_id,
    item?.sale_staff_id,
    item?.sales_staff_id,
    item?.employee_id,
    item?.user_id,
    item?.staffId,
    item?.id,
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

const normalizeStaffName = value => {
  if (value == null) {
    return '';
  }

  const trimmed = String(value).trim();
  return trimmed || '';
};

export const getStaffNameFromRawApiItem = item => {
  if (!item) {
    return '';
  }

  const nested =
    item?.sale_staff ??
    item?.sales_staff ??
    item?.staff ??
    item?.employee ??
    item?.user ??
    {};

  const firstName = normalizeStaffName(
    item?.first_name ?? nested?.first_name,
  );
  const lastName = normalizeStaffName(item?.last_name ?? nested?.last_name);
  const combinedName = [firstName, lastName].filter(Boolean).join(' ');

  const candidates = [
    item?.staff_name,
    item?.sale_staff_name,
    item?.sales_staff_name,
    item?.name,
    item?.employee_name,
    item?.full_name,
    item?.user_name,
    item?.staffName,
    nested?.staff_name,
    nested?.sale_staff_name,
    nested?.name,
    nested?.employee_name,
    nested?.full_name,
    combinedName,
  ];

  for (const value of candidates) {
    const normalized = normalizeStaffName(value);

    if (normalized) {
      return normalized;
    }
  }

  return '';
};

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
