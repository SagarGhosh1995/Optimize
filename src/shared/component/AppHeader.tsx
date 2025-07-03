import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { images } from '../constants/images';
import { icons } from '../constants/icons';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

interface AppHeaderProps {
  title?: string | number;
  subTitle?: string | number;
  showBack?: boolean,
  showLogo?: boolean;
  showCart?: boolean;
  showShare?: boolean,
  showNotification?: boolean;
}

const AppHeader: FC<AppHeaderProps> = ({
  title,
  subTitle,
  showBack,
  showCart,
  showLogo,
  showShare,
  showNotification,
}) => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const screen = route.name;

  const renderMenuItem = (icon: any, badgeText?: string, style?: Object | null, onPress?: () => void) => (
    <TouchableOpacity style={[styles.iconContainer]} onPress={onPress}>
      <Image source={icon} resizeMode="contain" style={[styles.icon, style]} />
      {badgeText && <View style={styles.badge}>
        <Text style={styles.badgeLabel} numberOfLines={1}>{badgeText}</Text>
      </View>}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, height: 50 + insets.top }]}>
      <View style={styles.leftIconsContainer} >
        {showBack && renderMenuItem(icons.back, '', { width: '25%', height: '25%' })}
      </View>
      <View style={styles.logoContainer} >
        {
          showLogo &&
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />
        }
      </View>
      <View style={styles.rightIconsContainer} >
        {showCart && renderMenuItem(icons.bag, '10')}
        {showNotification && renderMenuItem(icons.bell)}
        {showShare && renderMenuItem(icons.share)}
      </View>
    </View>
  );
};

export default React.memo(AppHeader, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.subTitle === next.subTitle &&
    prev.showBack === next.showBack &&
    prev.showShare === next.showShare &&
    prev.showCart === next.showCart &&
    prev.showLogo === next.showLogo &&
    prev.showNotification === next.showNotification
  );
});


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftIconsContainer: {
    // position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  logoContainer: {
    position: 'absolute',
    height: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  logo: {
    width: 35,
    height: 35,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  icon: {
    width: '33%',
    height: '33%',
    alignSelf: 'center'
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 0,
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingHorizontal: 5,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLabel: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.white
  }
})