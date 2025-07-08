import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../../../shared/constants/fonts';
import { colors } from '../../../shared/constants/colors';

interface TimerInterface {
    onPressResend?: () => void;
}

const Timer: FC<TimerInterface> = ({ onPressResend }) => {    
    const [time, setTime] = useState(60);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const clearTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startTimer = useCallback(() => {
        clearTimer();
        intervalRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearTimer();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [clearTimer]);

    useEffect(() => {
        startTimer();
        return clearTimer;
    }, [startTimer, clearTimer]);

    const handleResend = useCallback(() => {
        setTime(60);
        startTimer();
        onPressResend?.();
    }, [onPressResend]);

    const formatTime = (value: number) => value.toString().padStart(2, '0');

    return (
        <View style={styles.container}>
            {time === 0 ? (
                <TouchableOpacity style={styles.btn} onPress={handleResend}>
                    <Text allowFontScaling={false} style={styles.text}>
                        Didn’t Receive Code?{' '}
                        <Text allowFontScaling={false} style={styles.resendText}>Resend OTP</Text>
                    </Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.timerRow}>
                    <Text allowFontScaling={false} style={styles.text}>Resend OTP in </Text>
                    <Text allowFontScaling={false} style={[styles.text]}><Text allowFontScaling={false} style={{ fontFamily: fonts.bold }}>00 : {formatTime(time)}</Text> Seconds</Text>
                </View>
            )}
        </View>
    );
};

export default Timer;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        alignItems: 'center',
        paddingVertical: 5,
    },
    text: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.grey26,
    },
    resendText: {
        color: colors.black,
        fontFamily: fonts.bold,
    },
    timerRow: {
        flexDirection: 'row',
    },
    btn: {
        paddingVertical: 5,
    },
});
