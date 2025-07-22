/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppHeader from '../../../../shared/component/AppHeader'
import { colors } from '../../../../shared/constants/colors'
import Filters from './component/Filters'
import { getOrders } from './orderApis'
import OrderProductListCard from './component/OrderProductListCard'
import { warn } from '../../../../shared/utils/log'

const Orders = () => {
    const [loading, setLoading] = useState(true)           // Initial load
    const [refreshing, setRefreshing] = useState(false)     // Pull-to-refresh
    const [footerLoader, setFooterLoader] = useState(false) // Scroll-to-load-more
    const [orders, setOrders] = useState<Array<any>>([])
    const [page, setPage] = useState(1)
    const [selectedFilterSlug, setSelectedFilterSlug] = useState('all')
    const [hasMore, setHasMore] = useState(true)

    const onEndReachedCalledDuringMomentum = useRef(true)

    useEffect(() => {
        fetchOrders({ isInitial: true })
    }, [selectedFilterSlug])

    useEffect(() => {
        if (page > 1) {
            fetchOrders({ isLoadMore: true })
        }
    }, [page])

    const fetchOrders = useCallback(
        async ({
            isInitial = false,
            isLoadMore = false,
            isRefresh = false
        }: {
            isInitial?: boolean
            isLoadMore?: boolean
            isRefresh?: boolean
        }) => {
            if (!hasMore) return
            try {
                if (isInitial) setLoading(true)
                if (isLoadMore) setFooterLoader(true)
                if (isRefresh) setRefreshing(true)

                const response = await getOrders(selectedFilterSlug, isLoadMore ? page : 1)
                if (response?.success) {
                    const data = response?.data
                    // console.log(data);
                    
                    if (isLoadMore) {
                        setOrders(prev => [...prev, ...data])
                    } else {
                        setOrders(data)
                    }
                    if (+orders.length >= +response?.data?.total_orders) {
                        setHasMore(false)
                    }
                }
            } catch (err) {
                warn('Fetch orders failed:', err)
            } finally {
                setLoading(false)
                setFooterLoader(false)
                setRefreshing(false)
            }
        },
        [selectedFilterSlug, page]
    )

    const handleFilterChange = useCallback((filterItem: any) => {
        setSelectedFilterSlug(filterItem.slug)
        setHasMore(true)
        setPage(1)
    }, [])

    const handleRefresh = useCallback(() => {
        setPage(1)
        setHasMore(true)
        fetchOrders({ isRefresh: true })
    }, [fetchOrders])

    const handleEndReached = useCallback(() => {
        if (!onEndReachedCalledDuringMomentum.current && !footerLoader && !loading && !refreshing) {
            setPage(prev => prev + 1)
            onEndReachedCalledDuringMomentum.current = true
        }
    }, [footerLoader, loading, refreshing])

    const handleMomentumScrollBegin = useCallback(() => {
        onEndReachedCalledDuringMomentum.current = false
    }, [])

    const keyExtractor = useCallback((_: any, index: number) => index.toString(), [])

    const renderItem = useCallback(({ item }: { item: any }) => {
        return (
            <OrderProductListCard
                data={item}
                showShadow={false}
                containerStyle={styles.orderCardContainer}
            />
        )
    }, [])

    const renderSeparator = useCallback(() => <View style={styles.separator} />, [])

    const renderFooter = useCallback(() => {
        if (!footerLoader) return null
        return <ActivityIndicator color={colors.black} size="small" style={styles.footerLoader} />
    }, [footerLoader])

    const renderEmpty = useCallback(() => {
        if (loading) return null
        return (
            <View style={styles.empty}>
                <Text style={{ color: colors.grey22 }}>No orders found.</Text>
            </View>
        )
    }, [loading])

    return (
        <View style={styles.container}>
            <AppHeader showBack showNotification showCart title="My Orders" />
            <Filters
                selectedFilterSlug={selectedFilterSlug}
                onFilterChange={handleFilterChange}
            />
            {
                (loading && !refreshing) ?
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={colors.black} />
                    </View>
                    :
                    <FlatList
                        data={orders}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        initialNumToRender={3}
                        maxToRenderPerBatch={4}
                        windowSize={4}
                        contentContainerStyle={styles.listContent}
                        ItemSeparatorComponent={renderSeparator}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={renderEmpty}
                        onEndReached={handleEndReached}
                        onMomentumScrollBegin={handleMomentumScrollBegin}
                        onEndReachedThreshold={0.5}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                tintColor={colors.black}
                            />
                        }
                    />
            }
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgcolor
    },
    listContent: {
        flexGrow: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        paddingBottom: 80
    },
    separator: {
        marginTop: 30
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderCardContainer: {
        paddingHorizontal: 15,
    },
    footerLoader: {
        paddingVertical: 10,
        marginTop: 15
        // backgroundColor: 'red'
    }
})
