import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-simple-toast';
import Api from '../Services/Api_services';

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

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
  const [isLoading, setIsLoading] = useState(false);

  const fetchConversionRate = useCallback(async () => {
    if (!fromDate) {
      return;
    }

    const to = toDate || getToday();
    const fromParam = formatApiDate(fromDate);
    const toParam = formatApiDate(to);

    setIsLoading(true);

    try {
      console.log('Conversion Rate Request:', {
        from: fromParam,
        to: toParam,
      });

      const res = await Api.getConversionRate(fromParam, toParam);

      if (res?.status == 200) {
        const parsedData = getConversionList(res?.data);

        console.log(
          'Conversion Rate Success:',
          JSON.stringify(res?.data, null, 2),
        );
        console.log(
          'Conversion Rate Parsed Data:',
          JSON.stringify(parsedData, null, 2),
        );

        if (res?.data?.message) {
          Toast.show(res?.data?.message, Toast.LONG);
        }

        setConversionData(parsedData);
      } else {
        Toast.show(res?.data?.message, Toast.LONG);
      }
    } catch (error) {
      console.log('Conversion Rate API Error:', error?.response?.data || error);
      Toast.show(
        error?.response?.data?.message || 'Failed to load conversion rate',
        Toast.LONG,
      );
    } finally {
      setIsLoading(false);
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchConversionRate();
  }, [fetchConversionRate]);

  return {
    conversionData,
    isLoading,
    refetch: fetchConversionRate,
  };
};
