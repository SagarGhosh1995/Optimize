import { View, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { fonts } from '../../../../shared/constants/fonts';
import { colors } from '../../../../shared/constants/colors';
import { isIOS } from '../../../../shared/constants/dimensions';

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const { options } = descriptors[route.key];
                let label: React.ReactNode;
                const tabBarLabel = options.tabBarLabel;

                if (typeof tabBarLabel === 'function') {
                    label = tabBarLabel({
                        focused: isFocused,
                        color: colors.text,
                        position: 'below-icon',
                        children: route.name,
                    });
                } else {
                    label = null; 
                }

                let icon: React.ReactNode = null;
                if (typeof options.tabBarIcon === 'function') {
                    icon = options.tabBarIcon({
                        focused: isFocused,
                        color: isFocused ? colors.primary : colors.text,
                        size: 24,
                    });
                }

                // Handle badge
                const badge = options.tabBarBadge;


                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <PlatformPressable
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        style={styles.button}
                        key={route.name}
                    >
                        <View style={styles.tabContent}>
                            <View style={styles.iconWrapper}>
                                {icon}
                                {badge != null && (
                                    <View style={styles.badgeContainer}>
                                        <Text style={styles.badgeText} allowFontScaling={false}>
                                            {typeof badge === 'boolean' && badge === true ? '' : badge}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            {
                                label &&
                                label
                            }
                        </View>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: colors.white,
    },
    button: {
        flex: 1,
    },
    buttonLabel: {
        fontFamily: fonts.regular,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 2
    },
    tabContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        position: 'relative',
    },
    badgeContainer: {
        position: 'absolute',
        top: -4,
        right: -10,
        backgroundColor: colors.black,
        borderRadius: 8,
        paddingHorizontal: 5,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: colors.white,
        fontSize: 10,
        fontFamily: fonts.bold
    },
})