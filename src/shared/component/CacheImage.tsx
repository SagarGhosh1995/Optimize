import React, { FC } from 'react';
import FastImage, { FastImageProps, ImageStyle } from '@d11/react-native-fast-image';

interface FastCachedImageProps extends Partial<FastImageProps> {
    uri: string;
    style?: ImageStyle | any;
    resizeMode?: keyof typeof FastImage.resizeMode;
    fallbackComponent?: React.ReactNode;
}

const FastCachedImage: FC<FastCachedImageProps> = ({
    uri,
    style,
    resizeMode = 'cover',
    fallbackComponent,
    ...rest
}) => {

    // console.log(uri);


    if (!uri) return fallbackComponent || null;

    return (
        <FastImage
            {...rest}
            source={{
                uri,
                cache: FastImage.cacheControl.immutable, // Ensures aggressive caching
                priority: FastImage.priority.normal,
            }}
            style={style}
            resizeMode={FastImage.resizeMode[resizeMode]}
        />
    );
};

export default React.memo(FastCachedImage);
