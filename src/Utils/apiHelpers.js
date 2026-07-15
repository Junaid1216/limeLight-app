import Toast from 'react-native-simple-toast';
import { isApiSuccess } from '../Services/Api_services';

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
    return normalizeMessage(
      error?.response?.data?.message ??
        error?.response?.data?.error ??
        (typeof error?.response?.data === 'string'
          ? error.response.data
          : null) ??
        error?.message,
    );
  }

  return normalizeMessage(response?.data?.message);
};

export const showApiMessageToast = (response, error) => {
  const message = getApiMessage(response, error);

  if (message) {
    Toast.show(message, Toast.LONG);
  }
};

export const notifyApiFailure = (response, error) => {
  if (error || !isApiSuccess(response)) {
    showApiMessageToast(response, error);
    return true;
  }

  return false;
};
