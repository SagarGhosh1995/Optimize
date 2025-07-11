import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInputProps,
} from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';
import { colors } from '../../../shared/constants/colors';
import { fonts } from '../../../shared/constants/fonts';
import { icons } from '../../../shared/constants/icons';

interface PhoneData {
  code: string;
  number: string;
}

interface InternationalPhoneInputInterface extends Omit<TextInputProps, 'onChangeText'> {
  initialValue?: string;
  disabled?: boolean;
  onPressEdit?: () => void;
  label?: string;
  containerStyle?: any;
  inputContainerStyle?: any;
  onChangePhoneNumber?: (data: PhoneData) => void;
}

const InternationalPhoneInput: FC<InternationalPhoneInputInterface> = ({
  initialValue = '',
  onChangePhoneNumber,
  disabled = false,
  onPressEdit,
  label,
  containerStyle,
  inputContainerStyle,
  ...rest
}) => {
  const [text, setText] = useState<string>(initialValue);
  const [country, setCountry] = useState<ICountry | undefined>();
  const [countryCode, setCountryCode] = useState('+91');

  const isControlled = rest?.value !== undefined;

  useEffect(() => {
    if (!isControlled) {
      setText(initialValue ?? '');
    }
  }, [initialValue, isControlled]);

  useEffect(() => {
    if (isControlled) {
      setText(rest.value?.toString() ?? '');
    }
  }, [rest.value, isControlled]);

  const handleEndEditing = useCallback(() => {
    const number = text.replace(/\s/g, '');
    onChangePhoneNumber?.({ code: countryCode, number });
  }, [text, countryCode, onChangePhoneNumber]);

  const handleSelectedCountry = (selected: ICountry) => {
    setCountry(selected);
    setCountryCode(selected.callingCode);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label} allowFontScaling={false}>{label}</Text>}

      <View style={[inputContainerStyle]}>
        <PhoneInput
          value={text}
          placeholder="Enter Mobile Number"
          defaultCountry="IN"
          disabled={disabled}
          placeholderTextColor={colors.grey23}
          onChangePhoneNumber={(val) => {
            if (!isControlled) setText(val);
          }}
          onEndEditing={handleEndEditing}
          selectedCountry={country}
          onChangeSelectedCountry={handleSelectedCountry}
          phoneInputStyles={{
            container: {
              borderWidth: 0,
              backgroundColor: colors.white,
            },
            divider: {
              width: 0,
            },
            callingCode: {
              fontFamily: fonts.regular,
              fontSize: 14,
              color: colors.black,
              marginLeft: -15,
              marginTop: 1,
            },
            input: {
              flex: 1,
              fontFamily: fonts.regular,
              fontSize: 14,
              color: colors.black,
            },
            flagContainer: {
              backgroundColor: colors.white,
              borderRightColor: colors.grey25,
              borderRightWidth: 1,
            },
            flag: {
              fontSize: 16,
            },
          }}
          modalStyles={{
            searchInput: {
              fontFamily: fonts.regular,
              fontSize: 12,
              color: colors.black,
            },
            callingCode: {
              fontFamily: fonts.regular,
              fontSize: 12,
              color: colors.black,
            },
            countryName: {
              fontFamily: fonts.regular,
              fontSize: 12,
              color: colors.black,
            },
          }}
        />
      </View>

      {disabled && (
        <TouchableOpacity style={styles.editButton} onPress={onPressEdit}>
          <Image source={icons.penciledit} style={styles.editIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InternationalPhoneInput;

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.black,
    marginBottom: 4,
  },
  editButton: {
    zIndex: 999,
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
});
