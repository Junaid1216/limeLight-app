import { Colors } from './Colors';
import { hp, wp } from '../Assets/Responsive';

export const MyStyling = {
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.mint,
    paddingHorizontal: wp(5),
    paddingTop: hp(8),
  },

  container1: {
    flex: 1,
    backgroundColor: Colors.mint,
  },
  container2:{
    flex: 1,
    backgroundColor:Colors.white
  }
};
