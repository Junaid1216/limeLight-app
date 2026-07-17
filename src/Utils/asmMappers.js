import { formatApiAppResponse } from '../Services/Api_services';
import { getStaffIdFromRawApiItem } from './staffHelpers';

export { formatApiAppResponse };

const getCategoryKey = categoryName =>
  categoryName?.toLowerCase?.().replace(/\s+/g, '') ?? '';

export const logApiRequest = (label, endpoint, meta) => {
  if (meta) {
    console.log(`${label} Request:`, endpoint, meta);
    return;
  }

  console.log(`${label} Request:`, endpoint);
};

export const logApiResponse = (label, data) => {
  console.log(label, JSON.stringify(data, null, 2));
};

export const logApiAppResponse = (label, response, data) => {
  console.log(
    label,
    JSON.stringify(formatApiAppResponse(response, data), null, 2),
  );
};

const mapAsmBranchRow = (branch, suffix = '') => ({
  rank: branch?.rank ?? 0,
  name: suffix
    ? `${branch?.branch_name ?? branch?.branch ?? ''} (${suffix})`
    : branch?.branch_name ?? branch?.branch ?? '',
  achieved: branch?.achievement_percentage ?? branch?.achievement ?? 0,
  remaining: branch?.remaining_percentage ?? branch?.remaining ?? 0,
});

const mapAsmRegionRow = (region, suffix = '') => ({
  rank: region?.rank ?? 0,
  name: suffix
    ? `${region?.region ?? ''} (${suffix})`
    : region?.region ?? '',
  achieved: region?.achievement_percentage ?? region?.achievement ?? 0,
  remaining: region?.remaining_percentage ?? region?.remaining ?? 0,
});

const getCategoryItem = (categories, categoryName) =>
  (categories ?? []).find(
    item => getCategoryKey(item?.category) === getCategoryKey(categoryName),
  );

export const mapAsmBranchComparison = data => {
  const categories = data ?? [];

  const mapCategoryBlock = categoryItem => ({
    rows: (categoryItem?.branches ?? []).map(branch => mapAsmBranchRow(branch)),
    yoursRow: categoryItem?.your_branch
      ? mapAsmBranchRow(categoryItem.your_branch, 'Yours')
      : { rank: 0, name: '', achieved: 0, remaining: 0 },
  });

  const garmentsBlock = mapCategoryBlock(getCategoryItem(categories, 'Garments'));
  const unstitchedBlock = mapCategoryBlock(
    getCategoryItem(categories, 'Unstitched'),
  );
  const accessoriesBlock = mapCategoryBlock(
    getCategoryItem(categories, 'Accessories'),
  );

  return {
    garmentsData: garmentsBlock.rows,
    unstitchedData: unstitchedBlock.rows,
    accessoriesData: accessoriesBlock.rows,
    garmentsYoursRow: garmentsBlock.yoursRow,
    unstitchedYoursRow: unstitchedBlock.yoursRow,
    accessoriesYoursRow: accessoriesBlock.yoursRow,
  };
};

export const mapAsmRegionComparison = data => {
  const categories = data ?? [];
  const garments = getCategoryItem(categories, 'Garments');
  const unstitched = getCategoryItem(categories, 'Unstitched');
  const accessories = getCategoryItem(categories, 'Accessories');

  const mapCategoryBlock = categoryItem => ({
    rows: (categoryItem?.regions ?? []).map(region => mapAsmRegionRow(region)),
    yoursRow: categoryItem?.your_region
      ? mapAsmRegionRow(categoryItem.your_region, 'Yours')
      : { rank: 0, name: '', achieved: 0, remaining: 0 },
  });

  const garmentsBlock = mapCategoryBlock(garments);
  const unstitchedBlock = mapCategoryBlock(unstitched);
  const accessoriesBlock = mapCategoryBlock(accessories);

  return {
    garmentsData: garmentsBlock.rows,
    unstitchedData: unstitchedBlock.rows,
    accessoriesData: accessoriesBlock.rows,
    garmentsYoursRow: garmentsBlock.yoursRow,
    unstitchedYoursRow: unstitchedBlock.yoursRow,
    accessoriesYoursRow: accessoriesBlock.yoursRow,
    yoursAchievementRow: garmentsBlock.yoursRow,
  };
};

export const mapAsmStaffComparison = data =>
  (data ?? []).map(branch => ({
    id: branch?.branch_id ?? branch?.branch_name,
    name: branch?.branch_name ?? '',
    staff: (branch?.staff ?? []).map((member, index) => {
      const staffId = getStaffIdFromRawApiItem(member);

      return {
        id: staffId != null ? String(staffId) : `staff-row-${index}`,
        staff_id: staffId,
        sale_staff_id: staffId,
        rank: member?.rank ?? index + 1,
        name: member?.name ?? '',
        achieved: Number(member?.achieved ?? 0),
        remaining: Number(member?.remaining ?? 0),
        commission:
          member?.commission != null ? `Rs ${member.commission}` : 'Rs 0',
      };
    }),
  }));

const mapConversionRow = (item, options = {}) => ({
  rank: item?.rank ?? 0,
  name:
    options.yoursSuffix && (item?.region ?? item?.branch)
      ? `${item?.region ?? item?.branch} (${options.yoursSuffix})`
      : item?.branch ?? item?.region ?? item?.branch_name ?? '',
  traffic: Number(item?.traffic ?? 0),
  invoices: Number(item?.invoices ?? 0),
  conv: Number(item?.conversion_percentage ?? 0),
});

export const mapAsmBranchConversion = data =>
  (data?.branches ?? []).map(branch => mapConversionRow(branch));

export const mapAsmRegionConversion = data => ({
  rows: (data?.regions ?? []).map(region => mapConversionRow(region)),
  yoursRow: data?.your_region
    ? mapConversionRow(data.your_region, { yoursSuffix: 'Yours' })
    : null,
});

export const mapAsmBranchTargets = data =>
  (data ?? []).map(branch => {
    const staff = (branch?.staff ?? []).map((member, index) => ({
      id: member?.staff_id ?? String(index + 1),
      name: member?.name ?? '',
      garments: Number(member?.garments ?? 0),
      unstitched: Number(member?.unstitched ?? 0),
      accessories: Number(member?.accessories ?? 0),
    }));

    const totals = staff.reduce(
      (acc, item) => ({
        garments: acc.garments + item.garments,
        unstitched: acc.unstitched + item.unstitched,
        accessories: acc.accessories + item.accessories,
      }),
      { garments: 0, unstitched: 0, accessories: 0 },
    );

    return {
      id: branch?.branch_id ?? branch?.branch_name,
      name: branch?.branch_name ?? '',
      staff,
      totals,
    };
  });
