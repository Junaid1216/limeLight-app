import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { hp, wp } from '../Assets/Responsive';
import { Images } from '../Assets';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import { getVideoSource } from '../Utils/trainingMappers';
import TrainingThumbnail from './TrainingThumbnail';

const formatTime = seconds => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${String(secs).padStart(2, '0')}`;
};

const ProductTag = ({ tag }) => (
  <View
    style={[
      styles.productTag,
      tag.accent && styles.productTagAccent,
      tag.dotColor && styles.productTagDotWrap,
    ]}
  >
    {tag.dotColor && (
      <View style={[styles.tagDot, { backgroundColor: tag.dotColor }]} />
    )}
    <Text
      style={[
        styles.productTagText,
        tag.accent && styles.productTagTextAccent,
        tag.dotColor && { color: tag.dotColor },
      ]}
    >
      {tag.label}
    </Text>
  </View>
);

const ProductImage = ({ image, imageUrl, imageUrls, swatch }) => (
  <TrainingThumbnail
    thumbnail={image}
    image={image}
    imageUrl={imageUrl}
    imageUrls={imageUrls}
    style={styles.productSwatch}
    resizeMode="cover"
  />
);

const ProductCardAudio = ({ audioUrl, apiDuration, children }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const source = getVideoSource(audioUrl);

  useEffect(() => {
    setIsPlaying(false);
    setDuration(0);
    setPosition(0);
  }, [audioUrl]);

  const resolvedDuration =
    apiDuration || (duration > 0 ? formatTime(duration) : '');

  const guideText =
    isPlaying && duration > 0
      ? `Audio guide · ${formatTime(position)} / ${formatTime(duration)}`
      : resolvedDuration
        ? `Audio guide · ${resolvedDuration}`
        : 'Audio guide';

  return (
    <>
      {source ? (
        <Video
          ref={playerRef}
          source={source}
          paused={!isPlaying}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          onLoad={data => setDuration(data?.duration ?? 0)}
          onProgress={data => setPosition(data?.currentTime ?? 0)}
          onEnd={() => {
            setIsPlaying(false);
            setPosition(0);
            playerRef.current?.seek(0);
          }}
          onError={() => setIsPlaying(false)}
          style={styles.hiddenPlayer}
        />
      ) : null}
      {children({
        guideText,
        isPlaying,
        onTogglePlay: () => {
          if (source) {
            setIsPlaying(current => !current);
          }
        },
      })}
    </>
  );
};

const TrainingProductCard = ({ item, onViewDetail }) => {
  const hasPrice = Boolean(item?.price);
  const hasAudio = Boolean(item?.audioUrl);
  const hasHighlight = Boolean(item?.highlight);

  const renderCardBody = audioProps => (
    <View style={styles.productCard}>
      <View style={styles.productTopRow}>
        <ProductImage
          image={item?.image}
          imageUrl={item?.imageUrl}
          imageUrls={item?.imageUrls}
          swatch={item?.swatch}
        />

        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.productCode} numberOfLines={1}>
            {item.code}
          </Text>

          {(item.tags ?? []).length ? (
            <View style={styles.tagWrap}>
              {item.tags.map((tag, i) => (
                <ProductTag key={i} tag={tag} />
              ))}
            </View>
          ) : null}

          {hasPrice || hasAudio ? (
            <View style={styles.priceRow}>
              {hasPrice ? (
                <Text style={styles.priceText} numberOfLines={1}>
                  {item.price}
                </Text>
              ) : (
                <View style={styles.priceSpacer} />
              )}
              {hasAudio ? (
                <TouchableOpacity
                  style={styles.miniPlayBtn}
                  activeOpacity={0.9}
                  onPress={audioProps?.onTogglePlay}
                >
                  <Ionicons
                    name={audioProps?.isPlaying ? 'pause' : 'play'}
                    size={wp(3.4)}
                    color={Colors.amber}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>

      {hasHighlight ? (
        <View style={styles.highlightBox}>
          <Image
            source={Images.SvgMargin}
            style={styles.highlightIcon}
            resizeMode="contain"
          />
          <Text style={styles.highlightText} numberOfLines={2}>
            {item.highlight}
          </Text>
        </View>
      ) : null}

      <View style={styles.productDivider} />

      <View style={styles.productFooter}>
        {hasAudio ? (
          <View style={styles.audioInline}>
            <Feather name="headphones" size={wp(4)} color={Colors.grey} />
            <Text
              style={styles.audioInlineText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {audioProps?.guideText ?? 'Audio guide'}
            </Text>
          </View>
        ) : (
          <View style={styles.audioInlinePlaceholder} />
        )}

        <TouchableOpacity
          style={styles.viewDetailBtn}
          activeOpacity={0.9}
          onPress={() => onViewDetail(item)}
        >
          <Text style={styles.viewDetailText}>View Detail</Text>
          <Feather name="arrow-right" size={wp(3.8)} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!hasAudio) {
    return renderCardBody(null);
  }

  return (
    <ProductCardAudio audioUrl={item.audioUrl} apiDuration={item?.audio}>
      {audioProps => renderCardBody(audioProps)}
    </ProductCardAudio>
  );
};

const styles = StyleSheet.create({
  hiddenPlayer: {
    width: 0,
    height: 0,
    position: 'absolute',
  },
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.softDivider,
    padding: wp(3.5),
    marginBottom: hp(2),
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  productTopRow: {
    flexDirection: 'row',
  },
  productSwatch: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(3),
    marginRight: wp(3.5),
  },
  productInfo: {
    flex: 1,
    minWidth: 0,
  },
  productTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm,
    color: Colors.black,
    marginBottom: hp(0.3),
  },
  productCode: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs1,
    color: Colors.mediumGrey,
    marginBottom: hp(1),
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(1.5),
    marginBottom: hp(1),
  },
  productTag: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    borderRadius: wp(1.5),
    backgroundColor: Colors.lightGrey,
  },
  productTagAccent: {
    backgroundColor: Colors.lightGreen,
  },
  productTagDotWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lavender,
    gap: wp(1),
  },
  tagDot: {
    width: wp(1.8),
    height: wp(1.8),
    borderRadius: wp(0.9),
  },
  productTagText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xm2,
    color: Colors.grey,
  },
  productTagTextAccent: {
    color: Colors.green,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.m,
    color: Colors.black,
  },
  priceSpacer: {
    flex: 1,
  },
  miniPlayBtn: {
    flexShrink: 0,
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: Colors.whiteOrange,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp(0.5),
  },
  highlightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mintCream,
    borderRadius: wp(2.5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
    marginTop: hp(1.5),
    gap: wp(2),
  },
  highlightIcon: {
    width: wp(4.2),
    height: wp(4.2),
  },
  highlightText: {
    flex: 1,
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs2,
    color: Colors.dimGray,
  },
  productDivider: {
    height: 1,
    backgroundColor: Colors.softDivider,
    marginVertical: hp(1.6),
  },
  productFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: wp(2),
  },
  audioInline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    minWidth: 0,
  },
  audioInlinePlaceholder: {
    flex: 1,
  },
  audioInlineText: {
    flex: 1,
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs2,
    color: Colors.grey,
  },
  viewDetailBtn: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.1),
    borderRadius: wp(6),
    gap: wp(1.5),
  },
  viewDetailText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs2,
    color: Colors.white,
  },
});

export default TrainingProductCard;
