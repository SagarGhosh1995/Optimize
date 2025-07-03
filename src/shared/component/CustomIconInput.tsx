import React, { JSX, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputProps,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

interface CustomIconInputProps extends Omit<TextInputProps, 'onChangeText'> {
  label?: string;
  intialValue?: any,
  leftIcon?: ImageSourcePropType | null;
  rightIcon?: JSX.Element | null;
  showRightButton?: boolean;
  rightButtonLabel?: string;
  showInlineUpdate?: boolean;
  showUpperLineUpdate?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onPressRightButton?: () => void;
  onPressInlineUpdate?: () => void;
  onPressUpperlineUpdate?: () => void;
  onTypingComplete?: (text: string) => void;
}

const CustomIconInput: React.FC<CustomIconInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  showRightButton = false,
  rightButtonLabel = '',
  showInlineUpdate = false,
  showUpperLineUpdate = false,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  onPressRightButton,
  onPressInlineUpdate,
  onPressUpperlineUpdate,
  onTypingComplete,
  intialValue,
  ...rest
}) => {
  
  const [text, setText] = useState(intialValue);
  const isControlled = rest?.value !== undefined;
  const inputValue = isControlled ? rest?.value : text;

  const handleEndEditing = useCallback(() => {
    onTypingComplete?.(inputValue  ?? '');
  }, [inputValue, onTypingComplete]);

  return (
    <View style={[styles.container, containerStyle]}>
      {(label || showUpperLineUpdate) && (
        <View style={styles.row}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showUpperLineUpdate && (
            <TouchableOpacity onPress={onPressUpperlineUpdate}>
              <Text style={styles.textBtn}>Update</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={[styles.inputContainer, inputContainerStyle]}>
        {leftIcon && (
          <View style={styles.iconWrapper}>
            <Image source={leftIcon} style={styles.icon} />
          </View>
        )}

        <TextInput
          {...rest}
          value={inputValue}
          style={[styles.input, inputStyle]}
          placeholderTextColor={colors.grey2}
          onChangeText={setText}
          onEndEditing={handleEndEditing}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={onPressRightButton}>
            {rightIcon}
          </TouchableOpacity>
        )}

        {showInlineUpdate && (
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={onPressInlineUpdate}>
            <Text style={styles.textBtn}>Update</Text>
          </TouchableOpacity>
        )}

        {showRightButton && (
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={onPressRightButton}>
            <Text style={styles.textBtn}>{rightButtonLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

function areEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.value === nextProps.value &&
    prevProps.label === nextProps.label &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.editable === nextProps.editable &&
    prevProps.leftIcon === nextProps.leftIcon &&
    prevProps.rightIcon === nextProps.rightIcon &&
    prevProps.showRightButton === nextProps.showRightButton &&
    prevProps.rightButtonLabel === nextProps.rightButtonLabel &&
    prevProps.inputStyle === nextProps.inputStyle &&
    prevProps.inputContainerStyle === nextProps.inputContainerStyle
  );
}

export default React.memo(CustomIconInput, areEqual);

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.black,
  },
  textBtn: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.black,
    textDecorationLine: 'underline',
  },
  inputContainer: {    
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.grey22,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  iconWrapper: {
    paddingHorizontal: 10,
    // backgroundColor: colors.grey12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  buttonWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
