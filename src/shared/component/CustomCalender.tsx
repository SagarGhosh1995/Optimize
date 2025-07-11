import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { isIOS } from '../constants/dimensions';
import { icons } from '../constants/icons';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';

interface CustomCalenderInterface {
    containerStyle?: any;
    label?: string;
    placeholder?: string;
    value?: string;
    onChangeDate?: (date: string) => void;
}

const CustomCalender: FC<CustomCalenderInterface> = ({
    containerStyle,
    label,
    placeholder,
    value = '',
    onChangeDate,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [_date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        if (value !== '') {
            const parsedDate = moment(value).isValid() ? moment(value).toDate() : null;
            setDate(parsedDate);
        }
    }, [value]);

    const _setDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const { type } = event;

        if (!selectedDate) return;

        const formattedDate = moment(selectedDate).format('DD-MM-YYYY');
        const isoString = moment(formattedDate, 'DD-MM-YYYY').toISOString();

        if (type === 'set') {
            setDate(selectedDate);
            if (!isIOS) {
                onChangeDate?.(isoString);
                setOpenModal(false);
            }
        }

        if (type === 'dismissed') {
            setOpenModal(false);
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity style={styles.field} onPress={() => setOpenModal(true)}>
                {openModal ? (
                    <RNDateTimePicker
                        value={_date || new Date()}
                        mode="date"
                        display="default"
                        maximumDate={new Date()}
                        onChange={_setDate}
                    />
                ) : (
                    <Text style={styles.value}>
                        {_date
                            ? moment(_date).format('DD-MM-YYYY')
                            : value
                                ? moment(value).format('DD-MM-YYYY')
                                : placeholder}
                    </Text>
                )}

                <Image source={icons.calender} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

export default React.memo(CustomCalender);

const styles = StyleSheet.create({
    container: {},
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        borderColor: colors.grey22,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 8,
        paddingHorizontal: 10,
    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.black,
    },
    value: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.black,
    },
});
