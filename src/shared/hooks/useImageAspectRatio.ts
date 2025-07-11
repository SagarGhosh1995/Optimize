/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Image, ImageResolvedAssetSource } from 'react-native';
import { warn } from '../utils/log';

type ImageSource = string | number | null | undefined;

export const useImageAspectRatio = (source: ImageSource, fallback = 1) => {
  const [aspectRatio, setAspectRatio] = useState(fallback);

  useEffect(() => {
    if (!source) return;

    // Remote image (uri string)
    if (typeof source === 'string') {
      Image.getSize(
        source,
        (width, height) => setAspectRatio(width / height),
        (error) => {
          warn('Failed to get image size (remote):', error);
          setAspectRatio(fallback);
        }
      );
    }

    // Local image (require)
    if (typeof source === 'number') {
      const resolved: ImageResolvedAssetSource | undefined = Image.resolveAssetSource(source);
      if (resolved?.width && resolved?.height) {
        setAspectRatio(resolved.width / resolved.height);
      } else {
        warn('Failed to get image size (local)');
        setAspectRatio(fallback);
      }
    }
  }, [source]);

  return aspectRatio;
};
