import {
  staffComparisonFootfallData,
  staffComparisonInvoiceData,
} from '../Constants/DummyData';

const DEFAULT_CHART_SECTIONS = 4;

const getApiChartMaxValue = maxValue => {
  const padded = Math.ceil(maxValue * 1.25);

  if (padded <= 5) {
    return 5;
  } else if (padded <= 10) {
    return 10;
  } else if (padded <= 20) {
    return 20;
  } else if (padded <= 50) {
    return 50;
  } else if (padded <= 100) {
    return 100;
  } else if (padded <= 200) {
    return 200;
  } else if (padded <= 500) {
    return 500;
  } else if (padded <= 1000) {
    return 1000;
  } else if (padded <= 5000) {
    return 5000;
  } else {
    return Math.ceil(padded / 1000) * 1000;
  }
};

const getApiChartSections = maxValue => {
  if (maxValue <= 100) {
    return 4;
  } else if (maxValue <= 500) {
    return 5;
  } else {
    return 5;
  }
};

const toNumber = value => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getSummaryDay = item =>
  item?.day ?? item?.date ?? item?.summary_date ?? '';

const getSummaryFootfall = item =>
  item?.total_transactions ?? item?.transactions ?? item?.footfall ?? 0;

const getSummaryInvoices = item =>
  item?.total_items ?? item?.items ?? item?.invoices ?? 0;

const formatDay = day => {
  const date = new Date(day);
  return Number.isNaN(date.getTime())
    ? day
    : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
};

const getDummyTimeLabel = index => {
  if (index === 0) {
    return '10:00';
  } else if (index === 2) {
    return '02:00';
  } else if (index === 4) {
    return '06:00';
  } else if (index === 6) {
    return '10:00';
  } else if (index === 8) {
    return '12:00';
  } else {
    return '';
  }
};

const getSparseLabelIndices = length => {
  if (length <= 1) {
    return [0];
  } else if (length <= 7) {
    return Array.from({ length }, (_, index) => index);
  } else {
    const lastIndex = length - 1;
    return [
      0,
      Math.round(lastIndex * 0.25),
      Math.round(lastIndex * 0.5),
      Math.round(lastIndex * 0.75),
      lastIndex,
    ].filter((value, index, array) => array.indexOf(value) === index);
  }
};

const isInDateRange = (day, fromDate, toDate) => {
  const itemDate = new Date(day);
  itemDate.setHours(0, 0, 0, 0);

  if (fromDate) {
    const from = new Date(fromDate);
    from.setHours(0, 0, 0, 0);
    if (itemDate < from) {
      return false;
    }
  }

  if (toDate) {
    const to = new Date(toDate);
    to.setHours(0, 0, 0, 0);
    if (itemDate > to) {
      return false;
    }
  }

  return true;
};

const buildDummyChartData = () => {
  const chartData = staffComparisonFootfallData.map((point, index) => {
    const invoices = staffComparisonInvoiceData[index]?.value || 0;
    const label = getDummyTimeLabel(index);

    return {
      value: point.value,
      label,
      customData: {
        footfall: point.value,
        invoices,
        rate: point.value > 0 ? Math.round((invoices / point.value) * 100) : 0,
        day: label,
      },
    };
  });

  return {
    chartData,
    chartData2: staffComparisonInvoiceData.map(point => ({ value: point.value })),
    chartMaxValue: 5000,
    chartSections: 5,
  };
};

const buildEmptyChartData = () => ({
  chartData: [],
  chartData2: [],
  chartMaxValue: 10,
  chartSections: DEFAULT_CHART_SECTIONS,
});

const buildApiChartData = list => {
  const labelIndices = new Set(getSparseLabelIndices(list.length));

  const chartData = list.map((item, index) => {
    const footfall = toNumber(item?.total_transactions);
    const invoices = Math.round(toNumber(item?.total_items));
    const day = formatDay(item?.day);
    const label = labelIndices.has(index) ? day : '';

    return {
      value: footfall,
      label,
      customData: {
        footfall,
        invoices,
        rate: footfall > 0 ? Math.round((invoices / footfall) * 100) : 0,
        day,
      },
    };
  });

  const chartData2 = list.map(item => ({
    value: Math.round(toNumber(item?.total_items)),
  }));

  const maxValue = Math.max(
    ...chartData.map(item => item.value),
    ...chartData2.map(item => item.value),
    1,
  );

  const chartMaxValue = getApiChartMaxValue(maxValue);

  return {
    chartData,
    chartData2,
    chartMaxValue,
    chartSections: getApiChartSections(chartMaxValue),
  };
};

export const buildOutletChartData = (transactionSummary, fromDate, toDate) => {
  if (transactionSummary == null) {
    return buildDummyChartData();
  }

  const list = (transactionSummary || [])
    .map(item => ({
      day: getSummaryDay(item),
      total_transactions: getSummaryFootfall(item),
      total_items: getSummaryInvoices(item),
    }))
    .filter(item => item.day && isInDateRange(item.day, fromDate, toDate))
    .sort((a, b) => new Date(a.day) - new Date(b.day));

  if (!list.length) {
    return buildEmptyChartData();
  } else {
    return buildApiChartData(list);
  }
};
