import React, { FC, useState, memo, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { fonts } from '../../../../../shared/constants/fonts';
import { colors } from '../../../../../shared/constants/colors';
import { icons } from '../../../../../shared/constants/icons';

const options = [
  { value: 'Home', label: 'Home' },
  { value: 'Office', label: 'Office' },
  { value: 'Others', label: 'Others' },
];

interface AddressTypeOptionsProps {
  addressType?: string;
  containerStyle?: ViewStyle;
  onChangeType?: (value: string) => void;
}

const AddressTypeOptions: FC<AddressTypeOptionsProps> = ({
  addressType = '',
  containerStyle,
  onChangeType,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(addressType);

  useEffect(() => {
    setSelectedOption(addressType)
  },[addressType])
  
  const onPressButton = (value: string) => {
    setSelectedOption(value);
    onChangeType?.(value);
  };

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <Text style={styles.heading}>Type of Address *</Text>
      <View style={styles.optionsRow}>
        {options.map((item) => (
          <TouchableOpacity
            style={styles.button}
            key={item.value}
            onPress={() => onPressButton(item.value)}
            activeOpacity={0.7}
          >
            <Image
              source={selectedOption === item.value ? icons.radioactive : icons.radioinactive}
              style={styles.radioIcon}
            />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default memo(AddressTypeOptions);

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.black,
    marginLeft: 5,
  },
  radioIcon: {
    width: 20,
    height: 20,
  },
});
