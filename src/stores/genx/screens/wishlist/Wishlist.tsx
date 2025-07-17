/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../../shared/constants/colors'
import AppHeader from '../../../../shared/component/AppHeader'
import ProductCard from '../product/component/ProductCard'
import { getWishlist } from './wishlistApi'
import { warn } from '../../../../shared/utils/log'
import EmptyContent from '../../../../shared/component/EmptyContent'

const Wishlist = () => {

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Array<any>>([])
  const [totalData, setTotalData] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getData()
  }, [page])

  const getData = () => {
    if (!hasMore) {
      return
    }
    if (!refreshing) {
      setLoading(true);
    }

    getWishlist(page)
      .then((res) => {
        if (res?.success) {
          const data = res?.data?.wishlist_data ?? []
          const total = res?.data?.total_data ?? 0
          if (!refreshing) {
            setProducts(prev => [...prev, ...data])
          } else {
            setProducts(data)
          }
          setTotalData(total)
          // setHasMore(data?.length > 0)
          setHasMore(false)
        }
      })
      .catch((error) => {
        warn(error);
      }).finally(() => {
        setLoading(false)
        setRefreshing(false)
      })
  };



  const renderItem = useCallback(({ item, index }: { item: any, index: number }) => {
    return (
      <ProductCard
        data={item}
        cardDividingRatio={2.3}
      />
    )
  }, [])

  const separator = useCallback(() => {
    return (
      <View style={styles.separator} />
    )
  }, [])

  const emptycontent = useCallback(() => {
    if (loading || refreshing) return null;
    return <EmptyContent type='wishlist' />;
  }, [loading, refreshing]);

  const footerComponent = useCallback(() => {
    if (loading)
      return <ActivityIndicator size={'small'} color={colors.black} />
    return null
  }, [loading])

  return (
    <View style={styles.container}>
      <AppHeader showBack showNotification showCart title="Wishlist" subTitle={totalData + ' Items'} />
      <FlatList
        data={products}
        keyExtractor={(item: any, index) => item?.product_id + index + ""}
        renderItem={renderItem}
        numColumns={2}
        initialNumToRender={6}
        maxToRenderPerBatch={4}
        windowSize={4}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
        ItemSeparatorComponent={separator}
        ListEmptyComponent={emptycontent}
        ListFooterComponent={footerComponent}
        // onEndReached={() => setPage(p => p + 1)}
        // onEndReachedThreshold={0.5}        
        refreshing={refreshing}
        onRefresh={() => {
          if (hasMore) {
            setRefreshing(true)
            setPage(1)
          } else {
            return
          }
        }}
      />
    </View>
  )
}

export default Wishlist

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 50
  },
  columnWrapperStyle: {
    justifyContent: 'space-evenly'
  },
  separator: {
    marginTop: 10
  }
})