import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { EditAddressScreenParams } from './types'
import { colors } from '../../../../shared/constants/colors'
import AppHeader from '../../../../shared/component/AppHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomIconInput from '../../../../shared/component/CustomIconInput'
import { icons } from '../../../../shared/constants/icons'
import AddressTypeOptions from './component/AddressTypeOptions'
import CustomButton from '../../../../shared/component/CustomButton'
import { showToast } from '../../../../shared/utils/toast'

const EditAddress = () => {

    const route = useRoute();
    const { isEditingAddress = false, editableAddress = null }: EditAddressScreenParams = route?.params ?? {}

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [pin, setPin] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [landmark, setLandmark] = useState('')
    const [city, setCity] = useState('')
    const [deliveryInstruc, setDeliveryInstru] = useState('')
    const [addressType, setAddressType] = useState('')
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!isEditingAddress || !editableAddress) return;
        // console.log(editableAddress);
        setName(editableAddress?.name)
        setPhone(editableAddress?.mobile)
        setPin(editableAddress?.pincode)
        setAddress1(editableAddress?.area_address)
        setAddress2(editableAddress?.house_address)
        setLandmark(editableAddress?.landmark)
        setCity(editableAddress?.city)
        setDeliveryInstru(editableAddress?.delevery_instruction)
        setAddressType(editableAddress?.addressType)
    }, [editableAddress])


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!phone || phone.length !== 10) newErrors.phone = 'Phone must be 10 digits';
        if (!pin || pin.length !== 6) newErrors.pin = 'Pincode must be 6 digits';
        if (!address1.trim()) newErrors.address1 = 'Locality is required';
        if (!address2.trim()) newErrors.address2 = 'Address is required';
        if (!city.trim()) newErrors.city = 'City is required';
        if (!addressType.trim()) newErrors.addressType = 'Address type is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            // Proceed with form submission
            console.log('Saving address...', {
                name, phone, pin, address1, address2, landmark, city, deliveryInstruc, addressType
            });
        }
    };

    return (
        <View style={styles.container}>
            <AppHeader showBack showNotification showCart title={isEditingAddress ? "Edit Address" : "Add Address"} />
            <KeyboardAwareScrollView
                contentContainerStyle={styles.content}
                extraScrollHeight={100}
                enableOnAndroid
            >

                <CustomIconInput
                    leftIcon={icons.userfill}
                    placeholder="Full Name"
                    value={name}
                    onTypingComplete={setName}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                <CustomIconInput
                    leftIcon={icons.phonefill}
                    placeholder="Phone number"
                    value={phone}
                    maxLength={10}
                    keyboardType="phone-pad"
                    onTypingComplete={setPhone}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.mt_15}
                />
                {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

                <CustomIconInput
                    leftIcon={icons.hash}
                    placeholder="Pincode"
                    value={pin}
                    keyboardType="numeric"
                    maxLength={6}
                    onTypingComplete={setPin}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.mt_15}
                />
                {errors.pin && <Text style={styles.error}>{errors.pin}</Text>}

                <CustomIconInput
                    leftIcon={icons.locationfill}
                    placeholder="Locality"
                    value={address1}
                    onTypingComplete={setAddress1}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.mt_15}
                />
                {errors.address1 && <Text style={styles.error}>{errors.address1}</Text>}

                <CustomIconInput
                    leftIcon={icons.locationfill}
                    placeholder="Area or house address"
                    value={address2}
                    onTypingComplete={setAddress2}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.mt_15}
                />
                {errors.address2 && <Text style={styles.error}>{errors.address2}</Text>}

                <CustomIconInput
                    leftIcon={icons.locationfill}
                    placeholder="Landmark"
                    value={landmark}
                    onTypingComplete={setLandmark}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.mt_15}
                />

                <CustomIconInput
                    leftIcon={icons.locationfill}
                    placeholder="City"
                    value={city}
                    onTypingComplete={setCity}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.mt_15}
                />
                {errors.city && <Text style={styles.error}>{errors.city}</Text>}

                <CustomIconInput
                    label="Delivery instructions (optional)"
                    value={deliveryInstruc}
                    multiline
                    maxLength={130}
                    numberOfLines={4}
                    onTypingComplete={setDeliveryInstru}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.textAreaStyle}
                    containerStyle={styles.mt_15}
                />

                <AddressTypeOptions
                    addressType={addressType}
                    containerStyle={styles.mt_15}
                    onChangeType={setAddressType}
                />
                {errors.addressType && <Text style={styles.error}>{errors.addressType}</Text>}


                <View style={styles.buttonContainer}>
                    <CustomButton
                        label='Cancel'
                        containerStyle={[styles.button, styles.btnCancel]}
                        labelStyle={styles.btnCancelLabel}
                    />
                    <CustomButton
                        label='Save'
                        containerStyle={[styles.button]}
                        onPress={handleSave}
                    />
                </View>

            </KeyboardAwareScrollView>
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgcolor
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        paddingBottom: 50
    },
    inputContainerStyle: {
        alignItems: 'stretch'
    },
    inputStyle: {
        height: 40,
        backgroundColor: colors.bgcolor,
        paddingLeft: 15,
        fontSize: 12
    },
    textAreaStyle: {
        height: 150,
        backgroundColor: colors.bgcolor,
        paddingLeft: 15,
        fontSize: 12,
        textAlignVertical: 'top',
    },
    mt_15: {
        marginTop: 15
    },
    buttonContainer: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: '48%'
    },
    btnCancel: {
        backgroundColor: colors.offwhite2,
        borderColor: colors.grey25,
        borderWidth: 1,
    },
    btnCancelLabel: {
        color: colors.black
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
})