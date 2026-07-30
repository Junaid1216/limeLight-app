import Config from '../Services/Config';

export const getProfileImagePath = data =>
  data?.profile_image ?? data?.image ?? data?.avatar ?? null;

export const getAvatarDisplayUri = image => {
  if (!image) {
    return null;
  }

  if (typeof image !== 'string') {
    return image.uri ?? null;
  }

  const value = image.trim();

  if (
    value.startsWith('file:') ||
    value.startsWith('content:') ||
    value.startsWith('http://') ||
    value.startsWith('https://')
  ) {
    return value;
  }

  let path = value.replace(/^\//, '');

  if (!path.startsWith('public/')) {
    path = `public/${path}`;
  }

  return `${Config.domain}${path}`;
};

export const getUserAvatarUri = userData => {
  if (!userData) {
    return null;
  }

  return getAvatarDisplayUri(
    userData.avatarUri ??
      userData.image ??
      userData.profile_image ??
      userData.avatar,
  );
};
