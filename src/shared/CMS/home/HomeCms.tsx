import { FlatList, StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import ComponentRenderer from './component/ComponentRenderer';
import { log } from '../../utils/log';

interface HomeCmsInterface {
    data?: Array<any>
}

const HomeCms: FC<HomeCmsInterface> = ({
    data
}) => {

    const renderItem = ({ item }: { item: any }) => (
        <ComponentRenderer data={item} />
    );

    useEffect(() => {
        log('HomeCms component rendered')
    }, [])

    if (data?.length === 0) return null
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
        />
    )
}

export default React.memo(HomeCms)


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 30
    }
})