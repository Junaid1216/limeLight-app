const CATEGORY_ICON_MAP = {
  surveys: 'Survey',
  survey: 'Survey',
  training: 'Assignment',
  announcements: 'MegaAssignment',
  announcement: 'MegaAssignment',
  feedback: 'Feedback',
  performance: 'Assignment',
  hr: 'Assignment',
  promotions: 'MegaAssignment',
};

const resolveNotificationIcon = item => {
  const explicit = item?.icon ?? item?.icon_name ?? item?.iconName;

  if (explicit) {
    return explicit;
  }

  const category = String(
    item?.category ?? item?.category_label ?? item?.type ?? '',
  ).toLowerCase();

  return CATEGORY_ICON_MAP[category] ?? 'Assignment';
};

const formatNotificationTime = value => {
  if (!value) {
    return '';
  }

  const text = String(value).trim();

  if (!text.includes('-') && !text.includes('T')) {
    return text;
  }

  const date = new Date(text);

  if (Number.isNaN(date.getTime())) {
    return text;
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) {
    return 'Just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays === 1) {
    return 'Yesterday';
  }

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
};

export const getNotificationList = responseData => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  const payload = responseData?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  return (
    payload?.notifications ??
    responseData?.notifications ??
    payload?.items ??
    []
  );
};

export const mapNotificationItem = (item, index) => ({
  id: String(item?.id ?? `notification-${index}`),
  title: item?.title ?? item?.subject ?? '',
  description: item?.description ?? item?.message ?? item?.body ?? '',
  category: item?.category_label ?? item?.category ?? item?.type ?? '',
  time: formatNotificationTime(
    item?.time ??
      item?.time_ago ??
      item?.created_at ??
      item?.updated_at ??
      '',
  ),
  icon: resolveNotificationIcon(item),
  isRead: Boolean(
    item?.is_read ?? item?.isRead ?? item?.read ?? item?.is_seen,
  ),
});

export const mapNotifications = data =>
  getNotificationList(data).map(mapNotificationItem);

export const getUnreadNotificationCount = notifications =>
  (notifications ?? []).filter(item => !item?.isRead).length;
