import { Images } from '../Assets';
import { wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';

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

const getInitials = name => {
  if (!name) {
    return '';
  }

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase() ?? '')
    .join('');
};

const mapStaffCategoryCard = (categories, categoryName) => {
  const item = (categories ?? []).find(
    category =>
      getCategoryKey(category?.category) === getCategoryKey(categoryName),
  );
  const categoryKey = getCategoryKey(categoryName);
  const style = categoryStyleMap[categoryKey] ?? categoryStyleMap.garments;
  const target = Number(item?.target ?? 0);
  const achieved = Number(item?.achieved ?? 0);
  const achievementPercent = Number(
    item?.achievement_percentage ??
      (target ? Math.round((achieved / target) * 100) : 0),
  );
  const remaining = Number(
    item?.remaining ?? Math.max(0, target - achieved),
  );

  return {
    title: categoryName,
    achievement: `${achievementPercent}% Achievement`,
    target,
    achieved,
    remaining,
    iconSource: style.iconSource,
    iconBg: style.iconBg,
    borderRadius: wp(2.67),
    progressColor: style.progressColor,
    borderColor: Colors.lightGray,
    achievedColor: style.progressColor,
    iconTintColor: style.iconTintColor,
  };
};

export const mapStaffDetails = data => {
  const staffName = data?.staff_name ?? data?.name ?? '';
  const categories = data?.category_performance ?? data?.categories ?? [];

  return {
    profile: {
      name: staffName,
      designation: data?.designation ?? '',
      roleBadge: data?.designation ?? '',
      branch: data?.branch ?? '',
      target: data?.target ?? 0,
      achieved: data?.achieved ?? 0,
      remaining: data?.remaining ?? 0,
      initials: getInitials(staffName),
    },
    garmentsCard: mapStaffCategoryCard(categories, 'Garments'),
    unstitchedCard: mapStaffCategoryCard(categories, 'Unstitched'),
    accessoriesCard: mapStaffCategoryCard(categories, 'Accessories'),
  };
};
