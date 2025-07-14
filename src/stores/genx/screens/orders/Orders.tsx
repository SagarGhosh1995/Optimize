import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AppHeader from '../../../../shared/component/AppHeader'
import { colors } from '../../../../shared/constants/colors'
import Filters from './component/Filters'

const Orders = () => {

    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<Array<any>>([])
    const [page, setPage] = useState(1)

    return (
        <View style={styles.container}>
            <AppHeader showBack showNotification showCart title="My Orders" />
            <Filters />
        </View>
    )
}

export default Orders


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgcolor
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        // backgroundColor:'red'
    }
})