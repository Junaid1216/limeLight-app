const FILTER_TO_CATEGORY = {
  All: '',
  HR: 'hr',
  Performance: 'performance',
  Promotions: 'promotions',
};

export const getAnnouncementCategoryParam = filter =>
  FILTER_TO_CATEGORY[filter] ?? '';

export const getAnnouncementList = responseData => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  const payload = responseData?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  return payload?.announcements ?? responseData?.announcements ?? [];
};

const formatAnnouncementDate = value => {
  if (!value) {
    return '';
  }

  const text = String(value).trim();

  if (!text.includes('-')) {
    return text;
  }

  const date = new Date(text);

  if (Number.isNaN(date.getTime())) {
    return text;
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const mapAnnouncementItem = (item, index) => ({
  id: String(item?.id ?? `announcement-${index}`),
  category: item?.category_label ?? item?.category ?? '',
  categoryKey: String(item?.category ?? '').toLowerCase(),
  title: item?.title ?? '',
  description: item?.description ?? '',
  date: formatAnnouncementDate(
    item?.date ?? item?.created_at ?? item?.published_at ?? '',
  ),
});

export const mapAnnouncements = data =>
  getAnnouncementList(data).map(mapAnnouncementItem);
