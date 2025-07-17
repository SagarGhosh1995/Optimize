import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { FC, useCallback } from 'react'
import { order_filter_menu } from '../../../../../shared/constants/orderFilters'
import { colors } from '../../../../../shared/constants/colors'
import { fonts } from '../../../../../shared/constants/fonts'

interface FiltersInterface {
  onFilterChange?: (data: any) => void
  selectedFilterSlug?: string
}

const Filters: FC<FiltersInterface> = ({
  onFilterChange,
  selectedFilterSlug = 'all'
}) => {

  const handlePress = useCallback((item: any) => {
    if (item.slug !== selectedFilterSlug) {
      onFilterChange?.(item)
    }
  }, [selectedFilterSlug, onFilterChange])

  const renderItem = useCallback(({ item }: { item: any }) => {
    const isActive = item.slug === selectedFilterSlug

    return (
      <TouchableOpacity
        style={[styles.menu, isActive && styles.activeBtn]}
        onPress={() => handlePress(item)}
      >
        <Image
          source={item.icon}
          style={item.slug === 'all' ? styles.shopicon : styles.icon}
          tintColor={isActive ? colors.white : colors.black}
        />
        <Text style={[styles.btnLabel, isActive && styles.activeLabel]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    )
  }, [selectedFilterSlug, handlePress])

  const separator = useCallback(() => <View style={styles.separator} />, [])

  return (
    <View>
      <FlatList
        data={order_filter_menu}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
        horizontal
        ItemSeparatorComponent={separator}
        style={styles.container}
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Filters

const styles = StyleSheet.create({
  container: {},
  content: {
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  menu: {
    height: 35,
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.grey22
  },
  shopicon: {
    width: 15,
    height: 15
  },
  icon: {
    width: 20,
    height: 20
  },
  btnLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    marginLeft: 10,
    color: colors.black
  },
  activeBtn: {
    backgroundColor: colors.black
  },
  activeLabel: {
    color: colors.white
  },
  separator: {
    marginLeft: 10
  }
})
