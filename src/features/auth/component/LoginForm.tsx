import React, { useState, useCallback, FC } from 'react';
import { View, StyleSheet, Image, Keyboard } from 'react-native';
import { colors } from '../../../shared/constants/colors';
import { icons } from '../../../shared/constants/icons';
import LoginOptions from './LoginOptions';
import InternationalPhoneInput from './InternationalPhoneInput';
import CustomIconInput from '../../../shared/component/CustomIconInput';
import CustomOtpInput from './CustomOtpInput';
import CustomButton from '../../../shared/component/CustomButton';
import SocialLogin from './SocialLogin';
import { sendUserOtp, verifyUserOtp } from '../authApi';
import { showToast } from '../../../shared/utils/toast';


interface LoginFormInterface {
    containerStyle?: any,
    onSamePageLogin?: () => void
}

const LoginForm: FC<LoginFormInterface> = ({
    containerStyle,
    onSamePageLogin
}) => {
    const [activeOption, setActiveOption] = useState(1);
    const [contact, setContact] = useState('');
    const [otpSend, setOtpSend] = useState(false);
    const [code, setCode] = useState('');
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)

    const handleOptionChange = useCallback((idx: number) => {
        setContact('');
        setActiveOption(idx);
        setOtpSend(false);
    }, []);

    const handlePhoneChange = useCallback((data: any) => {
        setCode(data?.code || '');
        setContact(data?.number || '');
    }, []);

    const handleEmailChange = useCallback((e: string) => {
        setContact(e)
    }, [])

    const handleEditPress = useCallback(() => {
        setOtpSend(false);
    }, []);

    const handleSetOtp = useCallback((e: string) => {
        setOtp(e)
    }, [])

    const onResendOtp = useCallback(() => {

    }, [])

    const handleSubmit = () => {
        if (otpSend) {
            verifyOtp()
        } else {
            sendOtp()
        }
    }

    const sendOtp = () => {
        Keyboard.dismiss()
        if (contact === '') {
            showToast('error', `Please Provide Your ${activeOption === 1 ? 'Phone Number' : 'Email'}`)
            return
        }
        setLoading(true)
        sendUserOtp(activeOption === 1 ? code + contact : contact.toLowerCase()).then(res => {
            if (res?.success) {
                showToast('success', res?.message)
                setOtpSend(true)
            } else {
                showToast('error', res?.message)
            }
        }).catch(err => {
            console.log("sendUserOtp => ", err);
        }).finally(() => {
            setLoading(false)
        })
    }

    const verifyOtp = () => {
        const param = {
            contact: activeOption === 1 ? code + contact : contact.toLowerCase(),
            otp: otp
        }
        setLoading(true)
        verifyUserOtp(param).then(res => {
            console.log(res);            
            if (res?.success) {

            } else {
                showToast('error', res?.message)
            }
        }).catch(err => {
            console.log("verifyOtp => ", err);
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <View style={[styles.container, containerStyle]}>
            <LoginOptions onChooseMenu={handleOptionChange} />

            <View style={styles.formInputContainer}>
                {activeOption === 1 ? (
                    <InternationalPhoneInput
                        disabled={otpSend}
                        onPressEdit={handleEditPress}
                        onChangePhoneNumber={handlePhoneChange}
                    />
                ) : (
                    <CustomIconInput
                        placeholder="Enter Email Id"
                        value={contact}
                        keyboardType="email-address"
                        onChangeText={handleEmailChange}
                        inputContainerStyle={styles.emailInputContainer}
                        rightIcon={
                            otpSend ? (
                                <Image source={icons.penciledit} style={styles.iconStyle} />
                            ) : undefined
                        }
                        onPressRightButton={handleEditPress}
                    />
                )}
            </View>

            {otpSend && (
                <CustomOtpInput
                    onFillOTP={handleSetOtp}
                    onPressResend={onResendOtp}
                />
            )}

            <CustomButton
                isLoading={loading}
                disabled={loading}
                label={otpSend ? 'Confirm' : 'Login'}
                containerStyle={styles.button}
                headingStyle={styles.buttonText}
                onPress={handleSubmit}
            />

            <SocialLogin containerStyle={styles.socialLoginContainer} />
        </View>
    );

};

export default LoginForm;
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingBottom: 30,
        paddingTop: 40,
        backgroundColor: colors.white,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    formInputContainer: {
        marginTop: 25,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.grey22,
    },
    emailInputContainer: {
        borderWidth: 0,
    },
    iconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    button: {
        width: '100%',
        height: 48,
        marginTop: 30,
    },
    buttonText: {
        fontSize: 16,
    },
    socialLoginContainer: {
        marginTop: 25,
    },
});
