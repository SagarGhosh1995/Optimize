import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Modal from 'react-native-modal';
import { colors } from '../../../../../shared/constants/colors';
import CacheImage from '../../../../../shared/component/CacheImage';
import { useImageAspectRatio } from '../../../../../shared/hooks/useImageAspectRatio';

interface FullScapeImageViewModalInterface {
    isModalVisible?: boolean,
    toggleModal?: () => void,
    uri?: string | number | null
}

const FullScapeImageViewModal: FC<FullScapeImageViewModalInterface> = ({
    isModalVisible = false,
    toggleModal,
    uri = null
}) => {

    const aspectRatio = useImageAspectRatio(uri)


    if (!uri || typeof uri === 'number') return null
    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={styles.modal}
            animationIn={'fadeIn'}
            animationInTiming={800}
            animationOut={'fadeOut'}
            animationOutTiming={200}
            backdropTransitionOutTiming={10}
        >
            <View style={styles.modalContent}>
                <View style={[styles.imageContainer, { aspectRatio }]}>
                    <CacheImage
                        uri={uri}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </View>
            </View>
        </Modal>
    )
}

export default React.memo(FullScapeImageViewModal)

const styles = StyleSheet.create({
    modal: {
        margin: 0, // makes it fullscreen
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparentWhite2
    },
    modalContent: {
        backgroundColor: colors.white,
        width: '90%',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12
    },
    imageContainer: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',        
    }
})