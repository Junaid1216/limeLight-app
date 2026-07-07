import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export { wp, hp };

export const useOrientation = () => {
  const [screen, setScreen] = useState(() => Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreen(window);
    });

    return () => subscription?.remove();
  }, []);

  return {
    width: screen.width,
    height: screen.height,
    isLandscape: screen.width > screen.height,
  };
};
