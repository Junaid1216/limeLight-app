import Config from '../Services/Config';
import { getAuthToken } from '../Services/Api_services';

const VIDEO_EXTENSION_REGEX = /\.(mp4|mov|m4v|webm|mkv|avi|3gp)(\?.*)?$/i;

const isVideoPath = value => {
  const text = String(value ?? '').trim().toLowerCase();

  if (!text) {
    return false;
  }

  return (
    VIDEO_EXTENSION_REGEX.test(text) ||
    text.includes('/storage/') ||
    text.includes('/uploads/') ||
    text.includes('/videos/')
  );
};

export const toMediaUrl = value => {
  if (value == null || value === '') {
    return '';
  }

  const text = String(value).trim();

  if (!text) {
    return '';
  }

  if (
    text.startsWith('http://') ||
    text.startsWith('https://') ||
    text.startsWith('file:') ||
    text.startsWith('content:')
  ) {
    return text
      .replace(/rangrezbeta\.in\/limeight/gi, 'ranglerzbeta.in/limelight')
      .replace(/rangrezbeta\.in\/limelight/gi, 'ranglerzbeta.in/limelight');
  }

  let normalized = text.startsWith('/') ? text.slice(1) : text;

  if (normalized.startsWith('limelight/')) {
    normalized = normalized.slice('limelight/'.length);
  }

  return `${Config.domain}${normalized}`;
};

const withAuthHeaders = url => {
  const source = { uri: url };
  const token = getAuthToken();

  if (token) {
    source.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return source;
};

export const getVideoSource = url => {
  if (!url) {
    return null;
  }

  return withAuthHeaders(url);
};

export const getAuthenticatedImageSource = url => {
  if (!url) {
    return null;
  }

  return withAuthHeaders(url);
};

export const getImageSource = url => {
  if (!url) {
    return null;
  }

  const normalized = toMediaUrl(url) || String(url).trim();

  if (!normalized) {
    return null;
  }

  return getAuthenticatedImageSource(normalized);
};

export const resolveRemoteImageSources = url => {
  const normalized = toMediaUrl(url) || String(url ?? '').trim();

  if (!normalized) {
    return [];
  }

  const sources = [];
  const isPublicAsset = normalized.includes('/public/');

  if (isPublicAsset) {
    sources.push({ uri: normalized });
  }

  const authed = getAuthenticatedImageSource(normalized);

  if (authed?.headers?.Authorization) {
    sources.push(authed);
  }

  if (!isPublicAsset) {
    sources.push({ uri: normalized });
  }

  return sources;
};

export const isExternalVideoLink = url =>
  /youtube\.com|youtu\.be|vimeo\.com/i.test(String(url ?? ''));

export const getYouTubeVideoId = url => {
  const text = String(url ?? '');

  const watchMatch = text.match(/[?&]v=([^&]+)/);
  if (watchMatch?.[1]) {
    return watchMatch[1];
  }

  const shortMatch = text.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch?.[1]) {
    return shortMatch[1];
  }

  const embedMatch = text.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (embedMatch?.[1]) {
    return embedMatch[1];
  }

  return null;
};

export const getYouTubeThumbnailUrl = url => {
  const videoId = getYouTubeVideoId(url);

  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

export const toImageSource = value => {
  const url = toMediaUrl(value);

  return url ? getImageSource(url) : null;
};

export const getMediaDisplayUri = value => {
  if (value == null || value === '') {
    return null;
  }

  if (typeof value === 'string') {
    const text = value.trim();

    if (
      text.startsWith('file:') ||
      text.startsWith('content:') ||
      text.startsWith('http://') ||
      text.startsWith('https://')
    ) {
      return text;
    }

    return `${Config.domain}${text.startsWith('/') ? text.slice(1) : text}`;
  }

  if (typeof value === 'object') {
    return getMediaDisplayUri(value?.url ?? value?.path ?? value?.file);
  }

  return null;
};

const isVideoFile = value =>
  VIDEO_EXTENSION_REGEX.test(String(value ?? '').trim().toLowerCase());

const getThumbnailRawValue = item => {
  const candidates = [
    item?.thumbnail,
    item?.thumbnail_url,
    item?.thumbnail_path,
    item?.video_thumbnail,
    item?.thumb,
    item?.thumb_url,
    item?.image,
    item?.image_url,
    item?.poster,
    item?.media?.thumbnail,
    item?.media?.image,
    item?.file?.thumbnail,
    item?.file?.thumb,
  ];

  for (const candidate of candidates) {
    if (candidate == null || candidate === '') {
      continue;
    }

    if (typeof candidate === 'string') {
      if (!isVideoFile(candidate)) {
        return candidate;
      }
      continue;
    }

    if (typeof candidate === 'object') {
      const nested = candidate?.url ?? candidate?.path ?? candidate?.file;

      if (nested && !isVideoFile(nested)) {
        return nested;
      }
    }
  }

  return null;
};

const getVideoUrl = item => {
  const candidates = [
    item?.video,
    item?.video_url,
    item?.videoUrl,
    item?.video_path,
    item?.video_link,
    item?.training_video,
    item?.file_url,
    item?.media_url,
    item?.attachment,
    item?.attachment_url,
    typeof item?.video === 'object'
      ? item?.video?.url ?? item?.video?.path ?? item?.video?.file
      : null,
    typeof item?.file === 'object'
      ? item?.file?.video ?? item?.file?.video_url ?? item?.file?.path
      : null,
    typeof item?.media === 'object'
      ? item?.media?.video ?? item?.media?.url ?? item?.media?.path
      : null,
    isVideoFile(item?.file) ? item?.file : null,
    isVideoFile(item?.media) ? item?.media : null,
    isVideoPath(item?.url) ? item?.url : null,
  ];

  for (const candidate of candidates) {
    const url = toMediaUrl(candidate);

    if (url) {
      return url;
    }
  }

  return '';
};

const getThumbnailSource = item => {
  const apiThumbnail = getMediaDisplayUri(getThumbnailRawValue(item));

  if (apiThumbnail) {
    return getImageSource(apiThumbnail);
  }

  const youtubeThumbnail = getYouTubeThumbnailUrl(getVideoUrl(item));

  return youtubeThumbnail ? { uri: youtubeThumbnail } : null;
};

const normalizeStatus = value => {
  const status = String(value ?? 'New').trim();

  if (/complete/i.test(status)) {
    return 'Completed';
  }

  if (/pending/i.test(status)) {
    return 'Pending';
  }

  return 'New';
};

export const formatTrainingDate = value => {
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
  });
};

const normalizeTags = tags => {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags.map(tag => {
    if (typeof tag === 'string') {
      return { label: tag };
    }

    return tag;
  });
};

const splitCategoryValues = value => {
  if (value == null || value === '') {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(entry => splitCategoryValues(entry));
  }

  const text = String(value).trim();

  if (!text) {
    return [];
  }

  if (text.startsWith('[')) {
    try {
      const parsed = JSON.parse(text);

      if (Array.isArray(parsed)) {
        return parsed.flatMap(entry => splitCategoryValues(entry));
      }
    } catch (error) {
      console.log('Product training tags parse error:', error?.message);
    }
  }

  return text
    .split(/[,|/·]/)
    .map(part => part.trim())
    .filter(Boolean);
};

const PRODUCT_COLOR_NAMES = new Set([
  'purple',
  'green',
  'blue',
  'red',
  'orange',
  'yellow',
  'olive',
  'beige',
  'black',
  'white',
  'pink',
  'brown',
  'grey',
  'gray',
]);

const buildProductTrainingTags = item => {
  if (Array.isArray(item?.tags) && item.tags.length) {
    return normalizeTags(item.tags);
  }

  if (Array.isArray(item?.product_tags) && item.product_tags.length) {
    return normalizeTags(item.product_tags);
  }

  const values = [
    ...splitCategoryValues(item?.product_category),
    ...splitCategoryValues(item?.product_category_2),
    ...splitCategoryValues(item?.product_category_3),
    ...splitCategoryValues(item?.category),
    ...splitCategoryValues(item?.category_2),
    ...splitCategoryValues(item?.category_3),
    ...splitCategoryValues(item?.second_category),
    ...splitCategoryValues(item?.third_category),
    ...splitCategoryValues(item?.sub_category),
    ...splitCategoryValues(item?.product_sub_category),
    ...splitCategoryValues(item?.fabric_type),
    ...splitCategoryValues(item?.product_fabric),
    ...splitCategoryValues(item?.fabric),
    ...splitCategoryValues(item?.season),
    ...splitCategoryValues(item?.product_season),
    ...splitCategoryValues(item?.product_type),
    ...splitCategoryValues(item?.material),
    ...splitCategoryValues(item?.product_material),
    ...splitCategoryValues(item?.categories),
    ...splitCategoryValues(item?.product_categories),
    ...splitCategoryValues(item?.tag_1),
    ...splitCategoryValues(item?.tag_2),
    ...splitCategoryValues(item?.tag_3),
    ...splitCategoryValues(item?.weave_type),
    ...splitCategoryValues(item?.style),
    ...splitCategoryValues(item?.collection),
  ];

  const uniqueLabels = [
    ...new Set(values.map(value => String(value).trim()).filter(Boolean)),
  ];

  const namedColorHex = {
    purple: '#9333EA',
    green: '#27C58B',
    blue: '#3B82F6',
    red: '#EF4444',
    orange: '#F59E0B',
    yellow: '#EAB308',
    olive: '#808000',
    beige: '#E6DCC6',
    black: '#111111',
    white: '#F5F5F5',
    pink: '#EC4899',
    brown: '#92400E',
    grey: '#9CA3AF',
    gray: '#9CA3AF',
  };

  const nonColorLabels = uniqueLabels.filter(
    label => !PRODUCT_COLOR_NAMES.has(label.toLowerCase()),
  );

  return uniqueLabels.map(label => {
    const lower = label.toLowerCase();
    const isColor = PRODUCT_COLOR_NAMES.has(lower);
    const isLastNonColor =
      !isColor &&
      label === nonColorLabels[nonColorLabels.length - 1];

    return {
      label,
      ...(isColor ? { dotColor: namedColorHex[lower] ?? '#9333EA' } : {}),
      ...(isLastNonColor && nonColorLabels.length > 1 ? { accent: true } : {}),
    };
  });
};

const isHttpUrl = value => /^https?:\/\//i.test(String(value ?? '').trim());

const isAudioPath = value =>
  /\.mp3(\?.*)?$/i.test(String(value ?? '').trim());

const IMAGE_EXTENSION_REGEX = /\.(jpe?g|png|webp|gif|bmp)(\?.*)?$/i;

const isLikelyImagePath = value => {
  const text = String(value ?? '').trim();

  if (!text || text.length < 4) {
    return false;
  }

  if (PRODUCT_COLOR_NAMES.has(text.toLowerCase())) {
    return false;
  }

  if (isAudioPath(text) || isVideoFile(text)) {
    return false;
  }

  if (isHttpUrl(text)) {
    return (
      IMAGE_EXTENSION_REGEX.test(text) ||
      text.includes('/storage/') ||
      text.includes('/uploads/') ||
      text.includes('/public/') ||
      text.includes('/assets/images/')
    );
  }

  if (text.startsWith('/') || text.includes('/')) {
    return true;
  }

  return IMAGE_EXTENSION_REGEX.test(text);
};

const getProductImageRawValue = item => {
  const detail = item?.detail && typeof item.detail === 'object' ? item.detail : {};
  const candidates = [
    item?.product_image,
    item?.product_image_url,
    item?.product_img,
    item?.image_path,
    item?.image_url,
    item?.image,
    item?.thumbnail,
    item?.thumbnail_url,
    item?.photo,
    item?.product_photo,
    item?.product_thumb,
    item?.thumb,
    detail?.product_image,
    detail?.image,
    detail?.image_url,
    item?.media?.image,
    item?.file?.image,
  ];

  for (const candidate of candidates) {
    if (candidate == null || candidate === '') {
      continue;
    }

    if (typeof candidate === 'string') {
      if (!isLikelyImagePath(candidate)) {
        continue;
      }

      return candidate;
    }

    if (typeof candidate === 'object') {
      const nested = candidate?.url ?? candidate?.path ?? candidate?.file;

      if (nested && isLikelyImagePath(nested)) {
        return nested;
      }
    }
  }

  return null;
};

const getProductImageSource = item => {
  const urls = resolveProductImageUrls(item);

  return urls[0] ? getImageSource(urls[0]) : null;
};

const resolveProductImageUrls = item => {
  const urls = [];
  const raw = getProductImageRawValue(item);

  if (raw) {
    pushUniqueImageUrl(urls, raw);

    const text = String(raw);

    if (text.includes('/images/users/')) {
      pushUniqueImageUrl(urls, text.replace('/images/users/', '/images/'));
    }
  }

  return urls;
};

const pushUniqueImageUrl = (list, value) => {
  if (!value || typeof value !== 'string') {
    return;
  }

  const normalized = toMediaUrl(value) || value;

  if (!normalized || !isLikelyImagePath(normalized)) {
    return;
  }

  if (!list.includes(normalized)) {
    list.push(normalized);
  }
};

const resolveDisplayImageUrls = item => {
  const urls = [];
  const fieldCandidates = [
    item?.image,
    item?.image_url,
    item?.display_image,
    item?.cover_image,
    item?.thumbnail,
    item?.thumbnail_url,
    item?.photo,
    item?.banner,
    item?.banner_image,
    item?.media?.image,
    item?.file?.image,
  ];

  for (const candidate of fieldCandidates) {
    if (candidate == null || candidate === '') {
      continue;
    }

    if (typeof candidate === 'number') {
      return { localImage: candidate, urls: [] };
    }

    const uri = getMediaDisplayUri(candidate);

    if (!uri) {
      continue;
    }

    pushUniqueImageUrl(urls, uri);

    if (String(uri).includes('/images/users/')) {
      pushUniqueImageUrl(urls, String(uri).replace('/images/users/', '/images/'));
    }
  }

  const audioUrl = getProductAudioUrl(item);

  if (audioUrl) {
    const basenameMatch = audioUrl.match(/\/([^/?#]+)\.mp3(?:\?.*)?$/i);

    if (basenameMatch?.[1]) {
      const basename = basenameMatch[1];

      pushUniqueImageUrl(
        urls,
        audioUrl.replace(
          /\/training_videos\/[^/?#]+\.mp3(?:\?.*)?$/i,
          `/images/${basename}.jpg`,
        ),
      );
      pushUniqueImageUrl(
        urls,
        audioUrl.replace(
          /\/training_videos\/[^/?#]+\.mp3(?:\?.*)?$/i,
          `/training_images/${basename}.jpg`,
        ),
      );
      pushUniqueImageUrl(
        urls,
        `${Config.domain}public/admin/assets/images/${basename}.jpg`,
      );
    }
  }

  return { localImage: null, urls };
};

const getDisplayImageUrl = item => {
  const resolved = resolveDisplayImageUrls(item);

  if (resolved.localImage != null) {
    return resolved.localImage;
  }

  return resolved.urls[0] || '';
};

const getDisplayImageSource = item => {
  const imageUrl = getDisplayImageUrl(item);

  if (typeof imageUrl === 'number') {
    return imageUrl;
  }

  return imageUrl ? getImageSource(imageUrl) : null;
};

const getProductAudioUrl = item => {
  const candidates = [
    item?.audio,
    item?.audio_url,
    item?.audio_file,
    item?.audio_link,
    item?.audio_path,
  ];

  for (const candidate of candidates) {
    if (candidate == null || candidate === '') {
      continue;
    }

    const text = String(candidate).trim();

    if (isHttpUrl(text) || /\.mp3(\?.*)?$/i.test(text)) {
      const url = toMediaUrl(text);

      if (url) {
        return url;
      }
    }
  }

  return '';
};

const formatAudioDurationLabel = value => {
  if (value == null || value === '') {
    return '';
  }

  const text = String(value).trim();

  if (!text || isHttpUrl(text) || isAudioPath(text)) {
    return '';
  }

  if (/^\d{1,2}:\d{2}$/.test(text)) {
    return text;
  }

  const num = Number(text);

  if (Number.isFinite(num) && num > 0) {
    const mins = Math.floor(num / 60);
    const secs = Math.floor(num % 60);

    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  return text;
};

const getProductAudioDuration = item =>
  formatAudioDurationLabel(
    item?.audio_duration ??
      item?.duration ??
      item?.audio_time ??
      item?.audio_length ??
      item?.audio_duration_text,
  );

const getProductAudioLabel = item => {
  const duration = getProductAudioDuration(item);

  if (duration) {
    return duration;
  }

  return '';
};

const formatProductPrice = value => {
  if (value == null || value === '') {
    return '';
  }

  const text = String(value).trim();

  if (/rs/i.test(text)) {
    return text.replace(/\.00$/, '');
  }

  const num = Number(text);

  if (Number.isFinite(num)) {
    return `Rs. ${num.toLocaleString('en-US')}`;
  }

  return text;
};

export const mapCustomerList = list =>
  (list ?? []).map((item, index) => {
    const title = item?.title ?? item?.name ?? '';

    return {
      id: String(item?.id ?? `c-${index}`),
      thumbnail: getThumbnailSource(item),
      videoUrl: getVideoUrl(item),
      title,
      description: item?.description ?? '',
      date: formatTrainingDate(
        item?.date ?? item?.published_at ?? item?.created_at ?? '',
      ),
      status: normalizeStatus(item?.status),
    };
  });

export const mapProductList = list =>
  (list ?? []).map((item, index) => {
    const title =
      item?.title ?? item?.name ?? item?.product_name ?? '';
    const category = item?.product_category ?? item?.category ?? '';
    const tags = item?.tags?.length
      ? normalizeTags(item.tags)
      : category
        ? [{ label: category }]
        : [];
    const priceValue = item?.price ?? item?.product_price ?? '';
    const audioUrl = getProductAudioUrl(item);
    const audioLabel = getProductAudioLabel(item);

    return {
      id: String(item?.id ?? `p-${index}`),
      swatch:
        item?.swatch ?? item?.color_code ?? item?.product_color ?? '#E6DCC6',
      title,
      code: item?.code ?? item?.product_code ?? '',
      tags,
      price: formatProductPrice(priceValue),
      audio: audioLabel,
      audioUrl,
      highlight:
        item?.highlight ?? item?.description ?? item?.product_description ?? '',
      videoUrl: getVideoUrl(item),
      thumbnail: getThumbnailSource(item),
      status: normalizeStatus(item?.status),
      detail: item?.detail ?? {
        color: item?.color ?? item?.product_color ?? '',
        shirt: item?.shirt ?? item?.shirt_detail ?? '',
        bottom: item?.bottom ?? item?.bottom_detail ?? '',
        fabric: item?.fabric ?? '',
        detailTags: tags.map(tag => ({ label: tag.label, solid: true })),
        highlights: Array.isArray(item?.highlights)
          ? item.highlights
          : item?.description
            ? [item.description]
            : [],
        audio: audioLabel,
        audioUrl,
      },
    };
  });

export const getProductTrainingList = (responseData, apiRole = '') => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  const payload = responseData?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const roleKeys = [
      apiRole,
      'sales_staff',
      'staff',
      'asm',
      'branch_manager',
      'manager',
    ].filter(Boolean);

    for (const key of roleKeys) {
      if (Array.isArray(payload[key])) {
        return payload[key];
      }
    }

    if (Array.isArray(payload.products)) {
      return payload.products;
    }

    if (Array.isArray(payload.product)) {
      return payload.product;
    }

    if (Array.isArray(payload.product_training)) {
      return payload.product_training;
    }

    if (Array.isArray(payload.list)) {
      return payload.list;
    }

    if (Array.isArray(payload.items)) {
      return payload.items;
    }

    if (Array.isArray(payload.records)) {
      return payload.records;
    }
  }

  if (Array.isArray(responseData?.products)) {
    return responseData.products;
  }

  if (Array.isArray(responseData?.product)) {
    return responseData.product;
  }

  if (Array.isArray(responseData?.product_training)) {
    return responseData.product_training;
  }

  return [];
};

export const getProductTrainingItemsFromVideos = data => {
  if (!data) {
    return [];
  }

  if (Array.isArray(data?.product)) {
    return data.product;
  }

  if (Array.isArray(data?.product_training)) {
    return data.product_training;
  }

  const list = data?.videos ?? data?.training_videos ?? (Array.isArray(data) ? data : []);

  if (!Array.isArray(list)) {
    return [];
  }

  return list.filter(item => {
    const type = String(
      item?.type ??
        item?.training_type ??
        item?.tab ??
        item?.category_type ??
        item?.video_type ??
        '',
    ).toLowerCase();

    return type.includes('product');
  });
};

const parseStringList = value => {
  if (Array.isArray(value)) {
    return value.map(entry => String(entry).trim()).filter(Boolean);
  }

  if (value == null || value === '') {
    return [];
  }

  const text = String(value).trim();

  if (!text) {
    return [];
  }

  if (text.startsWith('[')) {
    try {
      const parsed = JSON.parse(text);

      if (Array.isArray(parsed)) {
        return parsed.map(entry => String(entry).trim()).filter(Boolean);
      }
    } catch (error) {
      // ignore invalid JSON list
    }
  }

  if (text.includes('\n')) {
    return text
      .split('\n')
      .map(entry => entry.trim())
      .filter(Boolean);
  }

  if (text.includes('|')) {
    return text
      .split('|')
      .map(entry => entry.trim())
      .filter(Boolean);
  }

  return [text];
};

const buildProductHighlights = item => {
  const combined = [
    ...parseStringList(item?.key_highlights),
    ...parseStringList(item?.highlights),
    ...parseStringList(item?.product_highlights),
    ...parseStringList(item?.training_highlights),
    ...parseStringList(item?.features),
    ...parseStringList(item?.key_points),
    ...parseStringList(item?.product_features),
    ...parseStringList(item?.key_highlight),
    item?.highlight_1,
    item?.highlight_2,
    item?.highlight_3,
    item?.key_highlight_1,
    item?.key_highlight_2,
    item?.key_highlight_3,
    item?.feature_1,
    item?.feature_2,
    item?.feature_3,
  ]
    .map(entry => String(entry ?? '').trim())
    .filter(Boolean);

  return [...new Set(combined)];
};

const joinProductDetailParts = parts =>
  parts
    .map(part => String(part ?? '').trim())
    .filter(Boolean)
    .join(' · ');

const firstProductDetailValue = parts => {
  for (const part of parts) {
    const text = String(part ?? '').trim();

    if (text) {
      return text;
    }
  }

  return '';
};

const resolveProductSwatch = item => {
  const colorName = resolveProductColorName(item);
  const raw = item?.color_code ?? item?.swatch ?? '';
  const text = String(raw).trim();

  if (text.startsWith('#')) {
    return text;
  }

  const namedColors = {
    purple: '#9333EA',
    green: '#27C58B',
    blue: '#3B82F6',
    red: '#EF4444',
    orange: '#F59E0B',
    yellow: '#EAB308',
    olive: '#808000',
    beige: '#E6DCC6',
    black: '#111111',
    white: '#F5F5F5',
    pink: '#EC4899',
    brown: '#92400E',
    grey: '#9CA3AF',
    gray: '#9CA3AF',
  };

  if (text && namedColors[text.toLowerCase()]) {
    return namedColors[text.toLowerCase()];
  }

  if (colorName) {
    return namedColors[colorName.toLowerCase()] ?? '#E6DCC6';
  }

  return '#E6DCC6';
};

const resolveProductColorName = item => {
  const fromField = String(item?.color_name ?? item?.color ?? '').trim();

  if (fromField && !fromField.startsWith('#')) {
    return fromField;
  }

  return '';
};

const buildModalDetailTags = (tags, colorName) => {
  const normalizedColor = String(colorName ?? '').trim().toLowerCase();

  return tags
    .filter(tag => {
      const label = String(tag?.label ?? '').trim().toLowerCase();

      return (
        label !== normalizedColor &&
        !tag?.dotColor &&
        !tag?.colorDot &&
        !PRODUCT_COLOR_NAMES.has(label)
      );
    })
    .slice(0, 2)
    .map((tag, index) => ({
      label: tag.label,
      solid: index === 0,
    }));
};

const filterCardDisplayTags = (tags, colorName) => {
  const normalizedColor = String(colorName ?? '').trim().toLowerCase();

  return tags.filter(tag => {
    const label = String(tag?.label ?? '').trim().toLowerCase();

    return (
      label !== normalizedColor &&
      !tag?.dotColor &&
      !tag?.colorDot &&
      !PRODUCT_COLOR_NAMES.has(label)
    );
  });
};

const resolveModalColorName = source => {
  const explicit = resolveProductColorName(source);

  if (explicit) {
    return explicit;
  }

  const productColor = String(source?.product_color ?? '').trim();

  if (productColor && !productColor.startsWith('#')) {
    return productColor;
  }

  return '';
};

const mapProductTrainingItem = (item, index) => {
  const detailPayload =
    item?.detail && typeof item.detail === 'object' ? item.detail : {};
  const nestedDetail =
    item?.product_detail && typeof item.product_detail === 'object'
      ? item.product_detail
      : {};
  const source = { ...detailPayload, ...nestedDetail, ...item };
  const allTags = buildProductTrainingTags(source);
  const colorName = resolveModalColorName(source);
  const cardTags = filterCardDisplayTags(allTags, colorName);
  const category = cardTags[0]?.label ?? String(source?.product_category ?? '').trim();
  const audioUrl = getProductAudioUrl(source);
  const priceRaw = source?.price ?? source?.product_price;
  const imageUrls = resolveProductImageUrls(source);
  const imageUrl = imageUrls[0] || '';
  const productImage = imageUrl ? getImageSource(imageUrl) : null;
  const audioLabel = getProductAudioDuration(source);
  const highlights = buildProductHighlights(source);
  const description = String(
    source?.description ?? source?.product_description ?? '',
  ).trim();
  const shirt = firstProductDetailValue([
    source?.shirt,
    source?.shirt_detail,
    source?.shirt_description,
    source?.product_shirt,
    source?.shirt_info,
    joinProductDetailParts([
      source?.shirt_type ?? source?.shirt_print,
      source?.shirt_meter ?? source?.shirt_length,
    ]),
  ]);
  const bottom = firstProductDetailValue([
    source?.bottom,
    source?.bottom_detail,
    source?.bottom_description,
    source?.product_bottom,
    source?.bottom_info,
    joinProductDetailParts([
      source?.bottom_type ?? source?.bottom_print,
      source?.bottom_meter ?? source?.bottom_length,
    ]),
  ]);
  const fabric = String(
    source?.fabric ?? source?.fabric_type ?? source?.product_fabric ?? '',
  ).trim();

  const detail = {
    color: colorName,
    shirt,
    bottom,
    fabric,
    description,
    detailTags: buildModalDetailTags(allTags, colorName),
    highlights,
    audioUrl,
    audio: audioLabel,
    imageUrl,
    imageUrls,
    image: productImage,
  };

  const swatch = colorName
    ? resolveProductSwatch({ ...source, color_name: colorName, color: colorName })
    : resolveProductSwatch(source);

  return {
    id: String(source?.id ?? `p-${index}`),
    trainingType: source?.training_type ?? '',
    title: source?.product_name ?? source?.title ?? '',
    code: source?.product_code ?? source?.code ?? '',
    category,
    tags: cardTags,
    price:
      priceRaw != null && priceRaw !== ''
        ? formatProductPrice(priceRaw)
        : '',
    audioUrl,
    audio: audioLabel,
    imageUrl,
    imageUrls,
    image: productImage,
    swatch,
    highlight:
      highlights[0] ??
      String(source?.description ?? source?.product_description ?? '').trim(),
    status: source?.status ? normalizeStatus(source.status) : '',
    detail,
    raw: item,
  };
};

export const mapProductTraining = (responseData, apiRole = '') =>
  getProductTrainingList(responseData, apiRole).map(mapProductTrainingItem);

export const toDisplayApiCategory = category =>
  String(category ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');

const formatDisplayCategoryLabel = category =>
  category
    ? `${String(category).trim().toUpperCase()} DISPLAY GUIDE`
    : '';

const mapDisplayTrainingItem = (item, index, categoryLabel = '') => {
  const title = item?.title ?? item?.name ?? '';
  const audioUrl = getProductAudioUrl(item);
  const audioDuration = getProductAudioDuration(item);
  const { localImage, urls: imageUrls } = resolveDisplayImageUrls(item);
  const imageUrl = imageUrls[0] || '';
  const imageSource =
    localImage != null ? localImage : imageUrl ? getImageSource(imageUrl) : null;

  return {
    id: String(item?.id ?? `d-${index}`),
    imageUrl,
    imageUrls,
    thumbnail: imageSource,
    image: imageSource,
    audioUrl,
    videoUrl: getVideoUrl(item),
    location: String(
      item?.location ?? item?.section ?? item?.display_section ?? '',
    ).trim(),
    category:
      String(item?.category ?? item?.category_name ?? '').trim() ||
      formatDisplayCategoryLabel(categoryLabel),
    title,
    description: String(item?.description ?? '').trim(),
    progress: Number(item?.progress ?? 0),
    duration: audioDuration,
    status: item?.status ? normalizeStatus(item.status) : '',
    trainingType: item?.training_type ?? 'display',
    raw: item,
  };
};

export const getTrainingDisplayList = responseData => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  const payload = responseData?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  return payload?.display ?? responseData?.display ?? [];
};

export const mapTrainingDisplay = (responseData, categoryLabel = '') =>
  getTrainingDisplayList(responseData).map((item, index) =>
    mapDisplayTrainingItem(item, index, categoryLabel),
  );

export const mapDisplayList = list =>
  (list ?? []).map((item, index) => mapDisplayTrainingItem(item, index));

const partitionTrainingList = list => {
  const customer = [];
  const product = [];
  const display = [];

  (list ?? []).forEach((item, index) => {
    const type = String(
      item?.type ??
        item?.training_type ??
        item?.tab ??
        item?.category_type ??
        item?.video_type ??
        '',
    ).toLowerCase();

    if (type.includes('product')) {
      product.push(mapProductList([item])[0]);
      return;
    }

    if (type.includes('display') || type.includes('merchandis')) {
      display.push(mapDisplayList([item])[0]);
      return;
    }

    if (type.includes('customer') || type.includes('service') || !type) {
      customer.push(mapCustomerList([item])[0]);
    }
  });

  return { customer, product, display };
};

export const mapTrainingVideos = data => {
  const empty = { customer: [], product: [], display: [] };

  if (!data) {
    return empty;
  }

  if (Array.isArray(data)) {
    return partitionTrainingList(data);
  }

  if (
    data?.customer ||
    data?.customer_service ||
    data?.product ||
    data?.product_training ||
    data?.display ||
    data?.display_training
  ) {
    return {
      customer: mapCustomerList(data?.customer ?? data?.customer_service ?? []),
      product: mapProductList(data?.product ?? data?.product_training ?? []),
      display: mapDisplayList(data?.display ?? data?.display_training ?? []),
    };
  }

  const list = data?.videos ?? data?.training_videos ?? [];

  if (Array.isArray(list)) {
    return partitionTrainingList(list);
  }

  return empty;
};
