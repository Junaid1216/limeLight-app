import { useMemo, useState } from 'react';

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const useDateRangePicker = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const today = useMemo(getToday, []);
  const formatDate = date => date?.toLocaleDateString('en-GB');

  const handleDateChange = (event, selectedDate) => {
    setActiveField(null);

    const isDismissed = event.type === 'dismissed' || !selectedDate;
    if (isDismissed) return;

    const setDateByField = {
      from: () => {
        setFromDate(selectedDate);
        toDate && selectedDate > toDate && setToDate(selectedDate);
      },
      to: () => setToDate(selectedDate),
    };

    setDateByField[activeField]?.();
  };

  const isFromField = activeField === 'from';
  const pickerValue = (isFromField ? fromDate : toDate || fromDate) || today;

  return {
    fromDate,
    toDate,
    formatDate,
    openFromPicker: () => setActiveField('from'),
    openToPicker: () => setActiveField('to'),
    datePicker: activeField && {
      mode: 'date',
      value: pickerValue,
      minimumDate: isFromField ? today : fromDate || today,
      display: 'default',
      onChange: handleDateChange,
    },
  };
};
