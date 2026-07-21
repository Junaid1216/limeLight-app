import { Colors } from '../Constants/Colors';

const RANK_COLORS = {
  1: Colors.mintGreen,
  2: Colors.brightBlue,
  3: Colors.vividAmber,
};

const formatCommission = value =>
  `Rs. ${Number(value ?? 0).toLocaleString('en-US')}`;

const getRankColor = rank => RANK_COLORS[rank] ?? Colors.mediumGrey;

const mapStaffRow = (item, index) => {
  const rank = item?.rank ?? index + 1;

  return {
    id: item?.staff_id != null ? String(item.staff_id) : `staff-row-${index}`,
    staff_id: item?.staff_id,
    rank,
    name: item?.name ?? '',
    target: Number(item?.target ?? 0),
    achieved: Number(
      item?.achievement_percentage ?? item?.achieved_percentage ?? 0,
    ),
    commission: formatCommission(item?.commission),
    rankColor: getRankColor(rank),
  };
};

export const mapSalesStaffComparison = data => {
  const yourRaw = data?.your_data ?? data?.yourData ?? {};
  const staffList = data?.staff ?? [];

  const yourData = {
    id: yourRaw?.staff_id != null ? String(yourRaw.staff_id) : 'you',
    staff_id: yourRaw?.staff_id,
    rank: yourRaw?.rank ?? 0,
    name: yourRaw?.name ?? '',
    target: Number(yourRaw?.target ?? 0),
    achieved: Number(yourRaw?.achievement_percentage ?? 0),
    unitsAchieved: Number(yourRaw?.achieved ?? 0),
    remaining: Number(yourRaw?.remaining_percentage ?? 0),
    commission: formatCommission(yourRaw?.commission),
  };

  const rankData = staffList.map(mapStaffRow);
  const topPerformer =
    rankData.find(item => item.rank === 1) ?? rankData[0] ?? null;

  return { yourData, rankData, topPerformer };
};
