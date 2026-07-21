import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Colors } from '../Constants/Colors';
import {
  resolveRemoteImageSources,
  toMediaUrl,
} from '../Utils/trainingMappers';

const TrainingThumbnail = ({
  thumbnail,
  image,
  imageUrl,
  imageUrls = [],
  style,
  resizeMode = 'cover',
}) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const localSource = useMemo(() => {
    if (typeof image === 'number') {
      return image;
    }

    if (typeof thumbnail === 'number') {
      return thumbnail;
    }

    return null;
  }, [image, thumbnail]);

  const remoteSources = useMemo(() => {
    const urls = [
      ...(Array.isArray(imageUrls) ? imageUrls : []),
      imageUrl,
      image?.uri,
      thumbnail?.uri,
    ]
      .map(value => toMediaUrl(value) || value)
      .filter(Boolean);

    const uniqueUrls = [...new Set(urls)];

    return uniqueUrls.flatMap(url => resolveRemoteImageSources(url));
  }, [imageUrl, imageUrls, image?.uri, thumbnail?.uri]);

  useEffect(() => {
    setSourceIndex(0);
    setHasError(false);
  }, [localSource, remoteSources]);

  if (localSource != null && !hasError) {
    return (
      <Image
        source={localSource}
        style={style}
        resizeMode={resizeMode}
        onError={() => setHasError(true)}
      />
    );
  }

  const remoteSource = remoteSources[sourceIndex];

  if (remoteSource && !hasError) {
    return (
      <Image
        key={`${remoteSource.uri}-${sourceIndex}`}
        source={remoteSource}
        style={style}
        resizeMode={resizeMode}
        onError={() => {
          if (sourceIndex < remoteSources.length - 1) {
            setSourceIndex(current => current + 1);
            return;
          }

          setHasError(true);
        }}
      />
    );
  }

  return <View style={[style, styles.placeholder]} />;
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: Colors.inputGrey,
  },
});

export default TrainingThumbnail;
