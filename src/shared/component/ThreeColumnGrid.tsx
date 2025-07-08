import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { useScaledDimensions } from '../hooks/useScaledDimensions';

interface ThreeColumnGridProps {
    data: any[];
    renderItem: (item: any, index: number) => React.ReactElement;
    columnSpacing?: number;
    rowSpacing?: number;
}

const ThreeColumnGrid: FC<ThreeColumnGridProps> = ({
    data,
    renderItem,
    columnSpacing = 30,
    rowSpacing = 15,
}) => {

    const { width } = useScaledDimensions()
    const totalSpacing = columnSpacing * 2;
    const itemWidth = (width - totalSpacing ) / 3;

    const getRows = () => {
        const rows = [];
        for (let i = 0; i < data.length; i += 3) {
            rows.push(data.slice(i, i + 3));
        }
        return rows;
    };

    const rows = getRows();

    if(!data.length) return null
    return (
        <View style={styles.container}>
            {rows.map((row, rowIndex) => {
                const isLastRow = rowIndex === rows.length - 1;
                const isSingle = row.length === 1;
                const isDouble = row.length === 2;

                return (
                    <View
                        key={rowIndex}
                        style={[
                            styles.row,
                            { marginBottom: rowSpacing },
                            isLastRow && (isSingle || isDouble)
                                ? { justifyContent: isSingle ? 'center' : 'center' }
                                : null,
                        ]}
                    >
                        {row.map((item, index) => (
                            <View key={index} style={[{ width: itemWidth}, isDouble && {marginRight: rowSpacing}]}>
                                {renderItem(item, rowIndex * 3 + index)}
                            </View>
                        ))}
                    </View>
                );
            })}
        </View>
    )
}

export default ThreeColumnGrid

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});