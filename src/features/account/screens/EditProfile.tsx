import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppHeader from '../../../shared/component/AppHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ProfileImageReplacer from '../component/ProfileImageReplacer'
import CustomIconInput from '../../../shared/component/CustomIconInput'
import CustomDropdown from '../../../shared/component/CustomDropdown'
import CustomCalender from '../../../shared/component/CustomCalender'
import CustomButton from '../../../shared/component/CustomButton'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import UpdatePhoneEmailModal, { UpdatePhoneEmailModalRef } from '../component/UpdatePhoneEmailModal'
import { useAppSelector } from '../../../globalRedux/useTypedHooks'
import { profileUpdate, userProfileDetails } from '../accountApi'
import { showToast } from '../../../shared/utils/toast'
import { warn } from '../../../shared/utils/log'
import { genders } from '../../../shared/constants/genders'
import { colors } from '../../../shared/constants/colors'
import { icons } from '../../../shared/constants/icons'
import { fonts } from '../../../shared/constants/fonts'


const EditProfile = () => {

    const modalRef = useRef<UpdatePhoneEmailModalRef>(null);
    const navigation = useNavigation<any>()
    const userdata = useAppSelector((state) => state?.user?.user)
    const [image, setImage] = useState<string | null>(null)
    const [name, setName] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [dob, setDob] = useState('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [isEditingPhone, setIsEditingPhone] = useState(false)


    useEffect(() => {
        setName(userdata?.name ?? '')
        setGender(userdata?.gender ?? '')
        setImage(userdata?.avatar ?? null)
        setDob(userdata?.dob ?? '')
        setPhone(userdata?.phone ?? '')
        setEmail(userdata?.email ?? '')

    }, [userdata?.avatar, userdata?.dob, userdata?.gender, userdata?.name, userdata?.phone, userdata?.email])

    const handleNameChange = useCallback((e: string) => {
        setName(e)
    }, [])

    const handleGenderSelect = useCallback((item: { label: string; value: string }) => {
        setGender(item.value);
    }, [])

    const handleDateChange = useCallback((date: string) => {
        setDob(date);
    }, []);

    const handleSubmit = useCallback(() => {
        const param = {
            'name': name,
            'gender': gender ?? '',
            'dob': dob ? moment(dob).format('YYYY-MM-DD') : '',
            'avatar': image ?? ''
        }
        setLoading(true)
        profileUpdate(param).then(res => {
            if (res.success) {
                userProfileDetails()
                showToast('success', res?.message)
            } else {
                showToast('error', res?.message)
            }
        }).catch(err => {
            warn('profile update err => ', err)
        }).finally(() => setLoading(false))

    }, [name, gender, dob, image])

    const handleOpenModal = useCallback((isPhone: boolean) => {
        setIsEditingPhone(isPhone)
        modalRef?.current?.open()
    }, [])

    const handleCloseModal = useCallback(() => {
        modalRef?.current?.close()
    }, [])

    return (
        <View style={styles.container}>
            <AppHeader showBack showNotification showCart title="Edit Profile" />
            <KeyboardAwareScrollView enableOnAndroid extraHeight={200} contentContainerStyle={styles.content}>

                <ProfileImageReplacer onChange={setImage} />

                <Text style={styles.heading}>Basic Details</Text>

                <CustomIconInput
                    label='Name:'
                    placeholder="Enter Your Name"
                    value={name}
                    onTypingComplete={handleNameChange}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputParentcontainerStyle}
                />

                <View style={[styles.row,  styles.mt15]}>
                    <CustomDropdown
                        data={genders}
                        label="Gender:"
                        selectedValue={gender}
                        search={false}
                        placeholder={'Select gender'}
                        containerStyle={styles.dropdownContainer}
                        onSelect={handleGenderSelect}
                    />
                    <CustomCalender
                        value={dob ?? ''}
                        label="DOB:"
                        placeholder={'dd-mm-yyyy'}
                        containerStyle={styles.dobContainer}
                        onChangeDate={handleDateChange}
                    />
                </View>

                <View style={[styles.row,styles.justofyBetween, styles.mt25]}>
                    <CustomButton
                        label="Cancel"
                        containerStyle={[styles.offwhiteBtn]}
                        labelStyle={{ color: colors.black }}
                        onPress={() => navigation.goBack()}
                    />
                    <CustomButton
                        label="Save"
                        isLoading={loading}
                        containerStyle={styles.defaultBtn}
                        onPress={handleSubmit}
                    />
                </View>

                <Text style={[styles.heading, styles.mt25]}>Contact Details</Text>

                <CustomIconInput
                    label='Phone number:'
                    placeholder="Enter Your Phone"
                    value={phone}
                    editable={false}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputParentcontainerStyle}
                    rightIcon={<Image source={icons.penciledit} style={styles.inputIcon} />}
                    onPressRightButton={() => handleOpenModal(true)}
                />

                <CustomIconInput
                    label='Email id:'
                    placeholder="Enter Your Email"
                    value={email}
                    editable={false}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputParentcontainerStyle}
                    rightIcon={<Image source={icons.penciledit} style={styles.inputIcon} />}
                    onPressRightButton={() => handleOpenModal(false)}
                />


            </KeyboardAwareScrollView>
            <UpdatePhoneEmailModal
                ref={modalRef}
                isPhone={isEditingPhone}
                contact={isEditingPhone ? phone : email}
                onClose={handleCloseModal}
            />
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgcolor
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    justofyBetween:{
        justifyContent: 'space-between'
    },
    mt15: {
        marginTop: 15
    },
    mt25: {
        marginTop: 25
    },
    heading: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.black,
        marginTop: 20
    },
    inputContainer: {
        backgroundColor: colors.bgcolor,
    },
    inputStyle: {
        height: 40
    },
    inputParentcontainerStyle: {
        marginTop: 15
    },
    dropdownContainer: {
        flex: 0.5,
        marginRight: 15,
        borderRadius: 8,
    },
    dobContainer: {
        flex: 0.5,
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
    inputIcon: {
        width: 20,
        height: 20
    }
})