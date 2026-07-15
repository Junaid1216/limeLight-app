import { Images } from '../Assets';
import { Colors } from '../Constants/Colors';
import { categoryColorMap } from '../Constants/CategoryColors';
import { Strings } from '../Constants/Strings';
import { getStaffIdFromRawApiItem } from './staffHelpers';

const CATEGORY_ORDER = ['garments', 'unstitched', 'accessories'];

const categoryStyleMap = {
  garments: {
    iconSource: Images.Garments,
    iconBg: Colors.darkgreen,
    progressColor: Colors.branchGreen,
    iconTintColor: Colors.branchGreen,
  },
  unstitched: {
    iconSource: Images.unstiched,
    iconBg: Colors.whiteOrange,
    progressColor: Colors.vividAmber,
    iconTintColor: Colors.vividAmber,
  },
  accessories: {
    iconSource: Images.Accesories,
    iconBg: Colors.lightBlue,
    progressColor: Colors.brightBlue,
    iconTintColor: Colors.brightBlue,
  },
};

const getCategoryKey = categoryName =>
  categoryName?.toLowerCase?.().replace(/\s+/g, '') ?? '';

const getCategoryDotColor = categoryName => {
  const key = getCategoryKey(categoryName);
  return categoryColorMap[key] || Colors.blueGrey;
};

const formatCommission = value => `Rs ${value ?? 0}`;

const WEEK_LABELS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
const WEEK_SHORT_LABELS = ['W1', 'W2', 'W3', 'W4'];
const WEEK_KEYS = ['week1', 'week2', 'week3', 'week4'];

const getStatusColor = status => {
  const normalized = status?.toLowerCase?.() ?? '';

  if (normalized.includes('done')) {
    return Colors.branchGreen;
  }

  if (normalized.includes('early') || normalized.includes('cf')) {
    return Colors.vividAmber;
  }

  if (normalized.includes('active')) {
    return Colors.brightBlue;
  }

  return Colors.black;
};

const mapWeeklyTargets = (weeklyTargets, totalTarget) =>
  WEEK_KEYS.map((key, index) => {
    const units = Number(weeklyTargets?.[key] ?? 0);
    const badgePercent = totalTarget
      ? Math.round((units / totalTarget) * 100)
      : 0;

    return {
      week: WEEK_LABELS[index],
      units,
      badge: `${badgePercent}%`,
    };
  });

const mapWeeklyPerformance = (weeklyPerformance, weeklyTargets, totalAchieved = 0) => {
  const hasWeeklyPerformance =
    weeklyPerformance && Object.keys(weeklyPerformance).length > 0;

  if (!hasWeeklyPerformance && Number(totalAchieved) > 0) {
    return WEEK_KEYS.map((key, index) => {
      const targetUnits = Number(weeklyTargets?.[key] ?? 0);
      const units = index === 0 ? Number(totalAchieved) : 0;
      const percent = targetUnits
        ? Math.round((units / targetUnits) * 100)
        : 0;

      return {
        week: WEEK_SHORT_LABELS[index],
        progress: Math.min(1, Math.max(0, percent / 100)),
        percent,
        units,
        status: units > 0 ? Strings.active : 'Next',
        statusColor: getStatusColor(units > 0 ? Strings.active : 'Next'),
      };
    });
  }

  return WEEK_KEYS.map((key, index) => {
    const weekData = weeklyPerformance?.[key] ?? weeklyPerformance?.[index];
    const targetUnits = Number(weeklyTargets?.[key] ?? 0);
    const units = Number(weekData?.achieved ?? weekData?.units ?? 0);
    const percent = Number(
      weekData?.percentage ??
        weekData?.achievement_percentage ??
        weekData?.percent ??
        (targetUnits ? Math.round((units / targetUnits) * 100) : 0),
    );
    const progress = Math.min(1, Math.max(0, percent / 100));
    const status = weekData?.status ?? (units > 0 ? Strings.active : 'Next');

    return {
      week: WEEK_SHORT_LABELS[index],
      progress,
      percent,
      units,
      status,
      statusColor: getStatusColor(status),
    };
  });
};

export const mapBranchManagerCommission = items =>
  (items ?? []).map((item, index) => ({
    id: item?.category ?? String(index + 1),
    categoryName: item?.category ?? '',
    target: String(item?.target ?? 0),
    achieved: String(item?.achieved ?? 0),
    commission: formatCommission(item?.commission ?? 0),
    dotColor: getCategoryDotColor(item?.category),
  }));

const mapBranchAchievementRow = (branch, suffix = '') => ({
  rank: branch?.rank ?? 0,
  name: suffix
    ? `${branch?.branch ?? branch?.branch_name ?? ''} (${suffix})`
    : branch?.branch ?? branch?.branch_name ?? '',
  achieved: branch?.achievement ?? branch?.achievement_percentage ?? 0,
  remaining: branch?.remaining ?? branch?.remaining_percentage ?? 0,
});

export const mapBranchManagerStaffComparison = items =>
  (items ?? []).map((item, index) => {
    const staffId = getStaffIdFromRawApiItem(item);

    return {
      id: staffId != null ? String(staffId) : `staff-row-${index}`,
      staff_id: staffId,
      rank: item?.rank ?? index + 1,
      name: item?.staff_name ?? '',
      achieved: item?.achieved_percentage ?? 0,
      remaining: item?.remaining_percentage ?? 0,
      commission: formatCommission(item?.commission ?? 0),
      target: item?.target ?? 0,
    };
  });

export const mapBranchManagerBranchComparison = data => {
  const categories = data ?? [];
  const getCategoryItem = categoryName =>
    categories.find(
      item => getCategoryKey(item?.category) === getCategoryKey(categoryName),
    );

  const mapCategoryBlock = categoryItem => ({
    rows: (categoryItem?.branches ?? []).map(branch =>
      mapBranchAchievementRow(branch),
    ),
    yoursRow: categoryItem?.your_branch
      ? mapBranchAchievementRow(categoryItem.your_branch, 'Team')
      : { rank: 0, name: '', achieved: 0, remaining: 0 },
  });

  const garmentsBlock = mapCategoryBlock(getCategoryItem('Garments'));
  const unstitchedBlock = mapCategoryBlock(getCategoryItem('Unstitched'));
  const accessoriesBlock = mapCategoryBlock(getCategoryItem('Accessories'));

  return {
    garmentsData: garmentsBlock.rows,
    unstitchedData: unstitchedBlock.rows,
    accessoriesData: accessoriesBlock.rows,
    garmentsYoursRow: garmentsBlock.yoursRow,
    unstitchedYoursRow: unstitchedBlock.yoursRow,
    accessoriesYoursRow: accessoriesBlock.yoursRow,
    teamAchievementRow: garmentsBlock.yoursRow,
  };
};

const parseCommissionAmount = value => {
  if (value == null || value === '') {
    return 0;
  }

  const numeric = String(value).replace(/[^\d.]/g, '');
  const parsed = Number(numeric);

  return Number.isFinite(parsed) ? parsed : 0;
};

export const mapBetaDashboardToManagerSummary = dashboard => {
  const commission = dashboard?.commission ?? {};
  const branchMonthlyTarget = Number(commission?.target ?? 0);
  const achieved = Number(commission?.sale ?? 0);

  return {
    branchMonthlyTarget,
    achieved,
    remaining: Math.max(0, branchMonthlyTarget - achieved),
    commission: parseCommissionAmount(commission?.commission),
    achievedPercent: Number(commission?.achieved_percentage ?? 0),
    remainingPercent: Number(commission?.remaining_percentage ?? 0),
  };
};

export const mapDashboardTargetToCategoryRaw = items =>
  (items ?? []).map(item => {
    const target = Number(item?.target ?? 0);
    const achieved = Number(item?.achieved ?? 0);
    const weeklyUnit = target ? Math.round(target / 4) : 0;

    return {
      category: item?.category,
      target,
      achieved,
      remaining: Math.max(0, target - achieved),
      achievement_percentage: Number(item?.achieved_percentage ?? 0),
      weekly_targets: {
        week1: weeklyUnit,
        week2: weeklyUnit,
        week3: weeklyUnit,
        week4: Math.max(0, target - weeklyUnit * 3),
      },
    };
  });

export const mapBranchManagerDashboard = data => ({
  branchMonthlyTarget: data?.branch_monthly_target ?? 0,
  achieved: data?.achieved ?? 0,
  remaining: data?.remaining ?? 0,
  commission: data?.commission ?? 0,
  achievedPercent: data?.achieved_percentage ?? 0,
  remainingPercent: data?.remaining_percentage ?? 0,
});

export const mapBranchManagerPerformanceSummary = items => {
  const list = items ?? [];
  const branchMonthlyTarget = list.reduce(
    (sum, item) => sum + Number(item?.target ?? 0),
    0,
  );
  const achieved = list.reduce(
    (sum, item) => sum + Number(item?.achieved ?? 0),
    0,
  );
  const commission = list.reduce(
    (sum, item) => sum + Number(item?.commission ?? 0),
    0,
  );
  const remaining = Math.max(0, branchMonthlyTarget - achieved);
  const achievedPercent = branchMonthlyTarget
    ? Math.round((achieved / branchMonthlyTarget) * 100)
    : 0;
  const remainingPercent = Math.max(0, 100 - achievedPercent);

  return {
    branchMonthlyTarget,
    achieved,
    remaining,
    commission,
    achievedPercent,
    remainingPercent,
  };
};

export const mapBranchManagerCategoryPerformance = items => {
  const mapped = (items ?? []).map((item, index) => {
    const categoryKey = getCategoryKey(item?.category);
    const style = categoryStyleMap[categoryKey] ?? categoryStyleMap.garments;
    const weeklyTargets = item?.weekly_targets ?? item?.weeklyTargets ?? {};
    const weeklyPerformance =
      item?.weekly_performance ?? item?.weeklyPerformance ?? {};
    const target = Number(item?.target ?? 0);
    const achieved = Number(item?.achieved ?? 0);

    return {
      id: categoryKey || String(index + 1),
      title: item?.category ?? '',
      target,
      achieved,
      remaining: Number(item?.remaining ?? Math.max(0, target - achieved)),
      achievementPercent: Number(
        item?.achievement_percentage ?? item?.achievementPercent ?? 0,
      ),
      ...style,
      branchTargets: mapWeeklyTargets(weeklyTargets, target),
      weeklyPerformance: mapWeeklyPerformance(
        weeklyPerformance,
        weeklyTargets,
        achieved,
      ),
      sortOrder: CATEGORY_ORDER.indexOf(categoryKey),
    };
  });

  return mapped.sort((a, b) => {
    const orderA = a.sortOrder === -1 ? CATEGORY_ORDER.length : a.sortOrder;
    const orderB = b.sortOrder === -1 ? CATEGORY_ORDER.length : b.sortOrder;
    return orderA - orderB;
  });
};

export const buildCategoryWeeklyChartData = categoryItem => {
  const targets = categoryItem?.branchTargets ?? [];
  const performance = categoryItem?.weeklyPerformance ?? [];

  if (!targets.length) {
    return {
      chartData: [],
      chartData2: [],
      chartMaxValue: 10,
      chartSections: 4,
    };
  }

  const chartData = targets.map((target, index) => {
    const achievedUnits = Number(performance[index]?.units ?? 0);
    const targetUnits = Number(target?.units ?? 0);
    const label = target?.week?.replace?.('Week ', 'W') ?? `W${index + 1}`;
    const rate = targetUnits
      ? Math.round((achievedUnits / targetUnits) * 100)
      : 0;

    return {
      value: targetUnits,
      label,
      customData: {
        footfall: targetUnits,
        invoices: achievedUnits,
        rate,
        day: label,
      },
    };
  });

  const chartData2 = performance.map(item => ({
    value: Number(item?.units ?? 0),
  }));

  const maxValue = Math.max(
    ...chartData.map(item => item.value),
    ...chartData2.map(item => item.value),
    1,
  );

  const chartMaxValue =
    maxValue <= 5
      ? 5
      : maxValue <= 10
        ? 10
        : maxValue <= 25
          ? 25
          : maxValue <= 50
            ? 50
            : maxValue <= 100
              ? 100
              : Math.ceil(maxValue / 10) * 10;

  return {
    chartData,
    chartData2,
    chartMaxValue,
    chartSections: chartMaxValue <= 25 ? 4 : 5,
  };
};
