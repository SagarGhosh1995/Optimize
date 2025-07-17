/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppHeader from '../../../../shared/component/AppHeader'
import { colors } from '../../../../shared/constants/colors'
import { getAddressList } from './addressApi'
import { useAppSelector } from '../../../../globalRedux/useTypedHooks'
import AddressCard from './component/AddressCard'
import EmptyContent from '../../../../shared/component/EmptyContent'

const Address = () => {

    const onEndReachedCalledDuringMomentum = useRef(true)
    const storeAddress = useAppSelector(state => state?.address?.address)
    const [loading, setLoading] = useState(true)           // Initial load
    const [refreshing, setRefreshing] = useState(false)     // Pull-to-refresh
    const [footerLoader, setFooterLoader] = useState(false) // Scroll-to-load-more
    const [address, setAddress] = useState<any>([])
    const [page, setPage] = useState(1)
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        getAddress({ isInitial: true })
    }, [])

    useEffect(() => {
        if (page > 1) {
            getAddress({ isLoadMore: true })
        }
    }, [page])

    useEffect(() => {
        setAddress(storeAddress)
    }, [storeAddress])

    const getAddress = useCallback(async ({
        isInitial = false,
        isLoadMore = false,
        isRefresh = false
    }: {
        isInitial?: boolean
        isLoadMore?: boolean
        isRefresh?: boolean
    }) => {
        if (isInitial) setLoading(true)
        if (isLoadMore) setFooterLoader(true)
        if (isRefresh) setRefreshing(true)

        getAddressList(page).then(_res => {
        }).finally(() => {
            setLoading(false)
            setFooterLoader(false)
            setRefreshing(false)
        })
    }, [page])

    const handleRefresh = useCallback(() => {
        setPage(1)
        getAddress({ isRefresh: true })
    }, [getAddress])

    const handleEndReached = useCallback(() => {
        if (!onEndReachedCalledDuringMomentum.current && !footerLoader && !loading && !refreshing) {
            setPage(prev => prev + 1)
            onEndReachedCalledDuringMomentum.current = true
        }
    }, [footerLoader, loading, refreshing])

    const handleMomentumScrollBegin = useCallback(() => {
        onEndReachedCalledDuringMomentum.current = false
    }, [])

    const renderItem = useCallback(({ item, index }: { item: any, index: Number }) => {
        return <AddressCard
            data={item}
            isSelected={selectedId === item._id}
            onSelect={() => setSelectedId(item._id)}
            showEdit
        />
    }, [selectedId])

    const renderFooter = useCallback(() => {
        if (!footerLoader) return null
        return <ActivityIndicator color={colors.black} size="small" style={styles.footerLoader} />
    }, [footerLoader])

    const renderEmpty = useCallback(() => {
        if (loading) return null
        return (
            <EmptyContent type='address' />
        )
    }, [loading])

    const renderSeparator = useCallback(() => <View style={styles.separator} />, [])

    return (
        <View style={styles.container}>
            <AppHeader showBack showNotification showCart title="Address" />
            {
                (loading && !refreshing) ?
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={colors.black} />
                    </View>
                    :
                    <FlatList
                        data={address}
                        keyExtractor={(item, index) => item?._id ?? index + ''}
                        renderItem={renderItem}
                        initialNumToRender={3}
                        maxToRenderPerBatch={4}
                        windowSize={4}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={renderEmpty}
                        ItemSeparatorComponent={renderSeparator}
                        contentContainerStyle={styles.content}
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

export default Address

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgcolor
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerLoader: {
        paddingVertical: 10,
        marginTop: 15
    },
    separator: {
        marginTop: 20
    },
})