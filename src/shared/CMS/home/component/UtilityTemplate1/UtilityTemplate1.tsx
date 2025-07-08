import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import Heading from '../../../../component/Heading'
import { colors } from '../../../../constants/colors'
import { getFilteredData } from '../../../cmsApi'
import ThreeColumnGrid from '../../../../component/ThreeColumnGrid'
import UtilityBlock from './component/UtilityBlock'

interface UtilityTemplate1Interface {
    data?: any
}

const UtilityTemplate1: FC<UtilityTemplate1Interface> = ({
    data
}) => {

    const [utility, setUtility] = useState<Array<any>>([])

    useEffect(() => {
        _getUtility()
    }, [])

    const _getUtility = async () => {
        let ids = data?.data?.ids?.map((item: any) => item?.id).join('","')
        ids = '["' + ids + '"]'
        getFilteredData(data?.section_name, ids).then(res => {
            if (res?.success) {
                setUtility(res?.data?.response?.data ?? [])
            }

        }).catch(err => {
        })
    }

    const renderItem = useCallback((item: any, index: number) => {
        return <UtilityBlock data={item} />;
    }, []);

    if (!data) return null
    return (
        <View style={styles.container}>
            <Heading
                heading={data?.data?.sub_heading}
                subHeading={data?.data?.heading}
                headingStyle={styles.headingStyle}
                subHeadingStyle={styles.subHeadingStyle}
                tintColor={colors.white}
            />
            {
                !!utility.length && (
                    <ThreeColumnGrid
                        data={utility}
                        renderItem={renderItem}
                    />
                )}
        </View>
    )
}

export default UtilityTemplate1

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingVertical: 40,
        paddingHorizontal: 15,
        backgroundColor: colors.black
    },
    headingStyle: {
        color: colors.white
    },
    subHeadingStyle: {
        color: colors.white
    }
})