import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { SCREEN_HEIGHT } from '../constants/dimensions';

interface CustomDropdownInterface {
  selectedValue?: string,
  data?: any,
  containerStyle?: any,
  label?: string,
  placeholder?: string,
  disable?: boolean,
  onSelect?: (item: { label: string; value: string }) => void;
  customStyle?: any,
  search?: boolean,
  mode?: any,
  maxHeight?: number
}

const CustomDropdown: FC<CustomDropdownInterface> = ({
  selectedValue = "",
  data = [],
  containerStyle,
  label = "",
  placeholder = "Select item",
  // disable = false,
  onSelect,
  customStyle,
  search = true,
  mode = "default",
  maxHeight = 300
}) => {

  const [value, setValue] = useState<any>(null);
  // const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    setValue(selectedValue)
  }, [selectedValue])

  const handleChange = (item: { label: string; value: string }) => {
    setValue(item.value);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {
        label &&
        <Text style={styles.label}>{label}</Text>
      }
      <Dropdown
        mode={mode}
        keyboardAvoiding
        style={[styles.dropdown, customStyle]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={[styles.containerStyle, mode === "modal" && { height: SCREEN_HEIGHT / 2 }]}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        maxHeight={maxHeight}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        // onFocus={() => setIsFocus(true)}
        // onBlur={() => setIsFocus(false)}
        onChange={handleChange}
      // disable={disable}
      />
    </View>
  )
}

export default React.memo(CustomDropdown)

const styles = StyleSheet.create({
  container: {
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.black
  },
  dropdown: {
    height: 40,
    borderColor: colors.grey22,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 8
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.black
  },
  selectedTextStyle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.black
  },
  containerStyle: {
    borderRadius: 12,
  },
  itemTextStyle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.black
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: colors.black
  },
})