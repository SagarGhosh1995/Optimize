import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../../shared/constants/images';
import { colors } from '../../../shared/constants/colors';
import { fonts } from '../../../shared/constants/fonts';

const Header = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <View style={styles.headerRow}>
                <View style={styles.sideSpacer} />
                <View style={styles.logoContainer}>
                    <Image source={images.logo} style={styles.logo} resizeMode="contain" />
                </View>
                <TouchableOpacity style={styles.skipButton}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.heading}>Go ahead and set up your account</Text>
                <Text style={styles.subHeading}>
                    Sign in-up to enjoy the best shopping experience
                </Text>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    sideSpacer: {
        width: 40,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    skipButton: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipText: {
        color: colors.white,
        fontFamily: fonts.semiBold,
        fontSize: 14,
        textAlign: 'center',
    },
    textContainer: {
        marginTop: 'auto',
        marginBottom: 30,
    },
    heading: {
        color: colors.white,
        fontSize: 24,
        fontFamily: fonts.bold,
    },
    subHeading: {
        color: colors.offwhite,
        fontSize: 12,
        fontFamily: fonts.medium,
        marginTop: 10,
    },
});
