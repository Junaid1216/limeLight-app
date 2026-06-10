import { Colors } from '../Constants/Colors';
import { Strings } from '../Constants/Strings';
import { Images } from '../Assets';
import { wp } from '../Assets/Responsive';

export const garmentsCard = {
  title: Strings.garments,
  achievement: '75% Achievement',
  target: 100,
  achieved: 75,
  remaining: 25,
  iconSource: Images.Garments,
  iconBg: Colors.darkgreen,
  progressColor: Colors.branchGreen,
  borderColor: Colors.lightGray,
  borderRadius: wp(2.67),
  achievedColor: Colors.branchGreen,
};

export const unstitchedCard = {
  title: Strings.unstitched,
  achievement: '67% Achievement',
  target: 100,
  achieved: 65,
  remaining: 35,
  iconSource: Images.unstiched,
  iconBg: Colors.whiteOrange,
  progressColor: Colors.vividAmber,
  borderColor: Colors.lightGray,
  iconTintColor: Colors.vividAmber,
  borderRadius: wp(2.67),
  achievedColor: Colors.vividAmber,
};

export const accessoriesCard = {
  title: Strings.accessories,
  achievement: '80% Achievement',
  target: 50,
  achieved: 40,
  remaining: 10,
  iconSource: Images.Accesories,
  iconBg: Colors.lightBlue,
  progressColor: Colors.brightBlue,
  borderColor: Colors.lightGray,
  iconTintColor: Colors.brightBlue,
  borderRadius: wp(2.67),
  achievedColor: Colors.brightBlue,
};
