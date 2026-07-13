import { Images } from '../Assets';
import { Colors } from '../Constants/Colors';
import { categoryColorMap } from '../Constants/CategoryColors';
import { Strings } from '../Constants/Strings';

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

const formatCommission = value => String(value ?? 0);

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

const mapWeeklyPerformance = (weeklyPerformance, weeklyTargets) =>
  WEEK_KEYS.map((key, index) => {
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

export const mapBranchManagerCommission = items =>
  (items ?? []).map((item, index) => ({
    id: item?.category ?? String(index + 1),
    categoryName: item?.category ?? '',
    target: String(item?.target ?? 0),
    achieved: String(item?.achieved ?? 0),
    commission: formatCommission(item?.commission ?? 0),
    dotColor: getCategoryDotColor(item?.category),
  }));

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

    return {
      id: categoryKey || String(index + 1),
      title: item?.category ?? '',
      target,
      achieved: Number(item?.achieved ?? 0),
      remaining: Number(item?.remaining ?? Math.max(0, target - Number(item?.achieved ?? 0))),
      achievementPercent: Number(
        item?.achievement_percentage ?? item?.achievementPercent ?? 0,
      ),
      ...style,
      branchTargets: mapWeeklyTargets(weeklyTargets, target),
      weeklyPerformance: mapWeeklyPerformance(weeklyPerformance, weeklyTargets),
      sortOrder: CATEGORY_ORDER.indexOf(categoryKey),
    };
  });

  return mapped.sort((a, b) => {
    const orderA = a.sortOrder === -1 ? CATEGORY_ORDER.length : a.sortOrder;
    const orderB = b.sortOrder === -1 ? CATEGORY_ORDER.length : b.sortOrder;
    return orderA - orderB;
  });
};
