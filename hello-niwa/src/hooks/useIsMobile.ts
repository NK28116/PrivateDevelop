import { useWindowDimensions, Platform } from 'react-native';

export default function useIsMobile() {
  const { width, height } = useWindowDimensions();

  const isPortrait = height >= width;

  // 想定スマホ条件
  const maxMobileWidth = 480;  // iPhone SE 〜 iPhone Pro Max, Pixel, Galaxy など
  const maxMobileHeight = 1000;

  const isMobileSize = width <= maxMobileWidth && height <= maxMobileHeight;

  // Web or nativeでも機種対応可能な判定
  const isMobile =
    Platform.OS === 'ios' ||
    Platform.OS === 'android' ||
    Platform.OS === 'web';

  return isMobile && isPortrait && isMobileSize;
}
