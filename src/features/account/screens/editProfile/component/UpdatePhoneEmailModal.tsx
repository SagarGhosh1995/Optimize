import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    useState,
    useCallback,
} from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SCREEN_HEIGHT } from '../../../../../shared/constants/dimensions';
import { colors } from '../../../../../shared/constants/colors';
import { images } from '../../../../../shared/constants/images';
import { fonts } from '../../../../../shared/constants/fonts';
import InternationalPhoneInput from '../../../../auth/component/InternationalPhoneInput';
import CustomButton from '../../../../../shared/component/CustomButton';

export interface UpdatePhoneEmailModalRef {
    open: () => void;
    close: () => void;
}

interface UpdatePhoneEmailModalProps {
    isPhone?: boolean;
    contact?: string;
    onClose: () => void
}

const UpdatePhoneEmailModal = forwardRef<UpdatePhoneEmailModalRef, UpdatePhoneEmailModalProps>(
    ({ isPhone = false, contact = '', onClose }, ref) => {

        const sheetRef = useRef<{ open: () => void; close: () => void }>(null);
        const [otpSend, setOtpSend] = useState(false)
        const [countryCode, setCountryCode] = useState('')
        const [newcontact, setNewContact] = useState('')
        const [loading, setLoading] = useState(false)

        useImperativeHandle(ref, () => ({
            open: () => sheetRef.current?.open(),
            close: () => sheetRef.current?.close(),
        }));

        const handlePhoneChange = useCallback((data: any) => {
            setCountryCode(data?.code || '');
            setNewContact(data?.number || '');
        }, []);

        return (
            <RBSheet
                ref={sheetRef}
                useNativeDriver={false}
                height={SCREEN_HEIGHT / 2}
                draggable
                closeOnPressBack={false}
                customStyles={{
                    wrapper: styles.wrapper,
                    container: styles.container,
                    draggableIcon: styles.draggableIcon,
                }}
            >
                <View style={styles.content}>
                    <Image source={images.otp} resizeMode='contain' style={styles.image} />
                    <Text style={styles.heading}>
                        {
                            otpSend ? 'Enter verification code' :
                                isPhone ?
                                    'Enter New Mobile number'
                                    :
                                    !isPhone ?
                                        'Enter New Email ID'
                                        : null
                        }
                    </Text>
                    <Text style={styles.subHeading}>
                        {
                            otpSend ?
                                `We’ve sent a code to ${isPhone ? countryCode + newcontact : newcontact}`
                                :
                                `Update ${isPhone ? 'mobile number' : 'email'} ${contact ? 'from ' + contact + ' to' : ''}`
                        }
                    </Text>
                    {
                        !otpSend && isPhone &&
                        <InternationalPhoneInput
                            label='Enter new Mobile number'
                            initialValue={contact}
                            disabled={otpSend}
                            onChangePhoneNumber={handlePhoneChange}
                            inputContainerStyle={styles.phoneInputContainerStyle}
                            containerStyle={styles.mt15}
                        />
                    }
                    <View style={[styles.buttonContainer]}>
                        <CustomButton
                            label="Cancel"
                            containerStyle={[styles.offwhiteBtn]}
                            headingStyle={{ color: colors.black }}
                            onPress={onClose}
                        />
                        <CustomButton
                            label="Save"
                            isLoading={loading}
                            containerStyle={styles.defaultBtn}
                        // onPress={handleSubmit}
                        />
                    </View>
                </View>
            </RBSheet>
        );
    }
);

export default UpdatePhoneEmailModal

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.transparentBlack2,
    },
    mt15: {
        marginTop: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        borderTopColor: colors.grey22,
        borderTopWidth: 0.7
    },
    container: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 10,
        backgroundColor: colors.white,
    },
    draggableIcon: {
        backgroundColor: colors.grey19,
        width: 134,
    },
    content: {
        flex: 1,
        // backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    image: {
        width: 70,
        height: 70,
        alignSelf: 'center'
    },
    heading: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.black,
        textAlign: 'center',
        marginTop: 20
    },
    subHeading: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.black,
        textAlign: 'center',
        marginTop: 10
    },
    phoneInputContainerStyle: {
        borderColor: colors.grey22,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 8
    },
    offwhiteBtn: {
        flex: 0.5,
        height: 38,
        backgroundColor: colors.offwhite2,
        borderColor: colors.grey25,
        borderWidth: 1
    },
    defaultBtn: {
        flex: 0.5,
        marginLeft: 10,
        height: 38
    },
});
