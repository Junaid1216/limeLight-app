import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { hp, wp } from '../Assets/Responsive';
import { Images } from '../Assets';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

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

const TrainingProductCard = ({ item, onViewDetail }) => (
  <View style={styles.productCard}>
    <View style={styles.productTopRow}>
      <View style={[styles.productSwatch, { backgroundColor: item.swatch }]} />

      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.productCode}>{item.code}</Text>

        <View style={styles.tagWrap}>
          {item.tags.map((tag, i) => (
            <ProductTag key={i} tag={tag} />
          ))}
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{item.price}</Text>
          <TouchableOpacity style={styles.miniPlayBtn} activeOpacity={0.9}>
            <Ionicons name="play" size={wp(3.4)} color={Colors.amber} />
          </TouchableOpacity>
        </View>
      </View>
    </View>

    {item.highlight ? (
      <View style={styles.highlightBox}>
        <Image
          source={Images.SvgMargin}
          style={styles.highlightIcon}
          resizeMode="contain"
        />
        <Text style={styles.highlightText}>{item.highlight}</Text>
      </View>
    ) : null}

    <View style={styles.productDivider} />

    <View style={styles.productFooter}>
      <View style={styles.audioInline}>
        <Feather name="headphones" size={wp(4)} color={Colors.grey} />
        <Text style={styles.audioInlineText}>Audio guide · {item.audio}</Text>
      </View>

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

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.softDivider,
    padding: wp(3.5),
    marginBottom: hp(2),
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
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.m,
    color: Colors.black,
  },
  miniPlayBtn: {
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
  },
  audioInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  audioInlineText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs2,
    color: Colors.grey,
  },
  viewDetailBtn: {
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
