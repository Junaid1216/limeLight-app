import { useMemo, useState } from 'react';

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getPreviousDate = (daysBefore = 1) => {
  const date = getToday();
  date.setDate(date.getDate() - daysBefore);
  return date;
};

export const useDateRangePicker = () => {
  const [fromDate, setFromDate] = useState(() => getPreviousDate());
  const [toDate, setToDate] = useState(() => getToday());
  const [activeField, setActiveField] = useState(null);

  const today = useMemo(getToday, []);
  const formatDate = date => date?.toLocaleDateString('en-GB');

  const handleDateChange = (event, selectedDate) => {
    setActiveField(null);

    const isDismissed = event.type === 'dismissed' || !selectedDate;
    if (isDismissed) {
      return;
    } else {
      const normalizedDate = new Date(selectedDate);
      normalizedDate.setHours(0, 0, 0, 0);

      if (activeField === 'from') {
        setFromDate(normalizedDate);
        if (toDate && normalizedDate > toDate) {
          setToDate(normalizedDate);
        }
      } else if (activeField === 'to') {
        setToDate(normalizedDate);
      } else {
        return;
      }
    }
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
      minimumDate: isFromField ? undefined : fromDate || getPreviousDate(),
      maximumDate: isFromField ? toDate || today : today,
      display: 'default',
      onChange: handleDateChange,
    },
  };
};
