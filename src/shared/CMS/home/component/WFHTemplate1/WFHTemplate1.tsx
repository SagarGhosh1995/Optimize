import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { getFilteredData } from '../../../cmsApi';
import Heading from '../../../../component/Heading';
import { colors } from '../../../../constants/colors';
import CacheImage from '../../../../component/CacheImage';
import { useImageAspectRatio } from '../../../../hooks/useImageAspectRatio';
import CategoryBlock from './component/CategoryBlock';
import ThreeColumnGrid from '../../../../component/ThreeColumnGrid';

interface WFHTemplate1Interface {
  data?: any;
}

const WFHTemplate1: FC<WFHTemplate1Interface> = ({ data }) => {
  const [category, setCategory] = useState<Array<any>>([]);

  const banner = useMemo(() => data?.data?.mob_image ?? null, [data]);
  const bannerAspectRatio = useImageAspectRatio(banner) || 1;

  useEffect(() => {
    if (data?.section_name && !!data?.data?.ids?.length) {
      let ids = data?.data?.ids?.map((item: any) => item?.id).join('","')
      ids = '["' + ids + '"]'
      getFilteredData(data.section_name, ids).then((res) => {
        if (res?.success) {
          setCategory(res?.data?.response?.data ?? []);
        }
      });
    }
  }, [data]);
  const renderItem = useCallback((item: any, index: number) => {
    return <CategoryBlock data={item} />;
  }, []);

  if (!data) return null

  return (
    <View style={styles.container}>
      <Heading
        heading={data?.data?.sub_heading}
        subHeading={data?.data?.heading}
      />

      {banner && (
        <TouchableOpacity style={[styles.banner, { aspectRatio: bannerAspectRatio }]}>
          <CacheImage uri={banner} style={styles.bannerImage} resizeMode="contain" />
        </TouchableOpacity>
      )}

      {
        !!category.length && (
          <ThreeColumnGrid
            data={category}
            renderItem={renderItem}
          />
        )}
    </View>
  );
};

export default React.memo(WFHTemplate1);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    paddingTop: 40,
    paddingBottom: 20,
  },
  banner: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 25,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});
