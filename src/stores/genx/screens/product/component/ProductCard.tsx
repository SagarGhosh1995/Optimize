import React, { FC, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useScaledDimensions } from '../../../../../shared/hooks/useScaledDimensions';
import { useImageAspectRatio } from '../../../../../shared/hooks/useImageAspectRatio';
import CacheImage from '../../../../../shared/component/CacheImage';
import { images } from '../../../../../shared/constants/images';
import { colors } from '../../../../../shared/constants/colors';
import { fonts } from '../../../../../shared/constants/fonts';

interface ProductCardInterface {
  data?: any;
  containerStyle?: any;
  onCallBack?: (action_type?: string) => void;
  showWishIcon?: boolean;
  cardDividingRatio?: number,
  fixedAspectRatio?: number
}

const ProductCard: FC<ProductCardInterface> = ({
  data,
  containerStyle,
  onCallBack,
  showWishIcon = true,
  cardDividingRatio = 2.6,
  fixedAspectRatio
}) => {
  const { width } = useScaledDimensions();

  const imageUri = useMemo(() => {
    return (
      data?.main_img ??
      data?.product_image ??
      data?.product_images?.main_img ??
      null
    );
  }, [data]);
  
  const aspectRatio = fixedAspectRatio ??( useImageAspectRatio(imageUri) || 1);

  const brandName =
    data?.brand_name ??
    data?.product_brands?.brand_name ??
    data?.brand?.brand_name ??
    '';

  const itemName =
    data?.product_details?.item_name ?? data?.item_name ?? '';

  const listPrice = data?.inventory?.list_price ?? data?.list_price ?? 0;
  const mrp = data?.inventory?.max_retail_price ?? 0;
  const hasDiscount = !!data?.inventory?.discount_percent;

  if (!data) return null;

  return (
    <View style={[styles.container, containerStyle, { width: width / cardDividingRatio }]}>
      <View style={[styles.imageContainer, { aspectRatio }]}>
        <CacheImage uri={imageUri} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.details}>
        {showWishIcon && (
          <Pressable
            style={styles.iconWrapper}
            onPress={() => onCallBack?.('cart_icon_pressed')}
          >
            <Image
              source={images.productcardcarticon}
              style={styles.icon}
              resizeMode="contain"
            />
          </Pressable>
        )}

        <Text allowFontScaling={false} style={styles.brand} numberOfLines={1} ellipsizeMode="tail">
          {brandName}
        </Text>

        <Text allowFontScaling={false} style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
          {itemName}
        </Text>

        <View style={styles.priceRow}>
          <Text allowFontScaling={false} style={styles.listPrice}>₹{listPrice}</Text>
          {hasDiscount && (
            <Text allowFontScaling={false} style={styles.mrp} numberOfLines={1}>
              ₹{mrp}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  container: {
    // height: 250,
    // backgroundColor: 'red'
  },
  imageContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  details: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    marginTop: -43,
  },
  icon: {
    width: 72,
    height: 72,
  },
  brand: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
  },
  itemName: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
    marginTop: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  listPrice: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
  },
  mrp: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.black,
    textDecorationLine: 'line-through',
    textAlign: 'center',
    marginLeft: 10,
  },
});
