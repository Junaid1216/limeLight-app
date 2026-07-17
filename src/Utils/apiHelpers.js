import Toast from 'react-native-simple-toast';

const normalizeMessage = message => {
  if (message == null || message === '') {
    return null;
  }

  if (typeof message === 'string') {
    const trimmed = message.trim();
    return trimmed || null;
  }

  if (typeof message === 'object' && message?.message) {
    return normalizeMessage(message.message);
  }

  return String(message);
};

export const getApiMessage = (response, error) => {
  if (error) {
    const data = error?.response?.data;

    return normalizeMessage(
      data?.message ??
        data?.error ??
        (typeof data === 'string' ? data : null) ??
        (typeof data?.data === 'string' ? data.data : null) ??
        error?.message,
    );
  }

  const data = response?.data;

  return normalizeMessage(
    data?.message ?? (typeof data?.data === 'string' ? data.data : null),
  );
};

export const showApiMessageToast = (response, error) => {
  const message = getApiMessage(response, error);

  if (message) {
    Toast.show(message, Toast.LONG);
  }
};

export const notifyApiFailure = (response, error) => {
  if (error || response?.status != 200) {
    showApiMessageToast(response, error);
    return true;
  }

  return false;
};
