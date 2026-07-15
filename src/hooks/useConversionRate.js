import { useCallback, useEffect, useState } from 'react';
import Api, { isApiSuccess } from '../Services/Api_services';
import { showApiMessageToast } from '../Utils/apiHelpers';

const formatApiDate = date => {
  if (!date) {
    return '';
  }

  const value = new Date(date);
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getConversionList = responseData => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.chart)) {
    return responseData.chart;
  }

  if (Array.isArray(responseData?.data?.chart)) {
    return responseData.data.chart;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

export const useConversionRate = (fromDate, toDate) => {
  const [conversionData, setConversionData] = useState(null);

  const fetchConversionRate = useCallback(async () => {
    if (!fromDate || !toDate) {
      setConversionData(null);
      return;
    }

    const fromParam = formatApiDate(fromDate);
    const toParam = formatApiDate(toDate);

    try {
      const res = await Api.getConversionRate(fromParam, toParam);
      const resJson = res?.data;

      if (isApiSuccess(res)) {
        console.log(
          'Conversion Rate Backend Response:',
          JSON.stringify(resJson, null, 2),
        );

        const appResponse = getConversionList(resJson);
        console.log(
          'Conversion Rate App Response:',
          JSON.stringify(appResponse, null, 2),
        );

        setConversionData(appResponse);
      } else {
        console.log('Conversion Rate Error Response:', resJson);
        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'Conversion Rate API Error:',
        error?.response?.data ?? error?.message ?? error,
      );
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchConversionRate();
  }, [fetchConversionRate]);

  return {
    conversionData,
    refetch: fetchConversionRate,
  };
};
