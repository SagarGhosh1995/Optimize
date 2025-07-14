import React, { memo, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Linking,
    FlatList,
    ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../../../shared/constants/colors';
import { fonts } from '../../../../../shared/constants/fonts';
import { getCurrentAppVersion } from '../../../../../shared/constants/appversion';
import { icons } from '../../../../../shared/constants/icons';
// import { menus } from '../../../../../shared/constants/profilemenu';
import useAuthenticated from '../../../../../shared/hooks/useAuthenticated';
import { isIOS } from '../../../../../shared/constants/dimensions';
import { useProfileMenus } from '../hooks/useProfileMenus';

const MenuItem = memo(({ item }: { item: any }) => (
    <TouchableOpacity style={styles.menuCard} onPress={item.onPress}>
        <Image source={item.icon} style={styles.icon} />
        <View style={styles.itemTextWrap}>
            <Text style={styles.title}>{item.heading}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <Image source={icons.right} style={styles.icon} />
    </TouchableOpacity>
));

const Section = memo(
    ({ section }: { section: any }) => {
        const renderItem: ListRenderItem<any> = ({ item }) => <MenuItem item={item} />;

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.heading}>{section.title}</Text>
                <FlatList
                    data={section.menu}
                    keyExtractor={(_, idx) => `${section.title}-${idx}`}
                    renderItem={renderItem}
                    style={styles.cardWrapper}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>
        );
    },
    // shallow compare section reference; prevents re‑renders unless props change
    (prev, next) => prev.section === next.section
);

const ProfileMenus = () => {

    const menus = useProfileMenus();
    const navigation = useNavigation<any>();
    const isAuthenticated = useAuthenticated();

    /* -------- external link handlers are memoised -------- */
    const handleDelete = useCallback(
        () => Linking.openURL('https://www.21genx.com/user/delete'),
        []
    );
    const handleLogout = useCallback(
        () => navigation.navigate('logout'),
        [navigation]
    );

    const renderSection: ListRenderItem<any> = ({ item }) => <Section section={item} />;

    return (
        <View style={styles.container}>
            {/* menu sections */}
            <FlatList
                data={menus}
                keyExtractor={(_, idx) => `section-${idx}`}
                renderItem={renderSection}
                scrollEnabled={false}
            />

            {/* auth‑only actions */}
            {isAuthenticated && (
                <>
                    {
                        isIOS &&
                        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
                            <Image source={icons.delete} style={styles.icon} />
                            <Text style={[styles.title, styles.redText]}>Delete Your Account</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
                        <Image source={icons.logout} style={styles.icon} />
                        <Text style={[styles.title, styles.redText]}>Logout</Text>
                    </TouchableOpacity>
                </>
            )}

            {/* version info */}
            <View style={styles.versionContainer}>
                <Text style={styles.version}>Version: {getCurrentAppVersion().version_code}</Text>
                <Text style={styles.version}>Version Name: {getCurrentAppVersion().version_name}</Text>
            </View>
        </View>
    );
};

export default memo(ProfileMenus);

const styles = StyleSheet.create({
    container: { marginTop: 15, paddingBottom: 30 },
    sectionContainer: { paddingVertical: 10 },
    heading: { fontFamily: fonts.bold, fontSize: 16, color: colors.grey26, marginBottom: 15 },
    cardWrapper: { backgroundColor: colors.white, borderRadius: 8 },
    menuCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 15 },
    separator: { height: 1, backgroundColor: colors.grey24 },
    icon: { width: 20, height: 20 },
    itemTextWrap: { flex: 1, marginLeft: 10 },
    title: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.black },
    subtitle: { fontFamily: fonts.regular, fontSize: 10, color: colors.grey23 },
    actionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, backgroundColor: colors.white, borderRadius: 8, marginTop: 15 },
    redText: { marginLeft: 10, color: colors.red2 },
    versionContainer: { marginTop: 15, alignItems: 'flex-end' },
    version: { fontFamily: fonts.regular, fontSize: 10, color: colors.black },
});
