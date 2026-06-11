import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { hp, wp } from '../Assets/Responsive';
import { Images } from '../Assets';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import { trainingWaveform } from '../Constants/DummyData';

const TrainingDetailModal = ({ visible, product, onClose }) => {
  if (!product) {
    return null;
  }
  const detail = product.detail || {};

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      backdropOpacity={0.45}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.modalCard}>
        <View style={styles.modalHandle} />

        <View style={styles.modalHeader}>
          <View style={styles.modalHeaderLeft}>
            <View style={styles.greenDot} />
            <Text style={styles.modalHeaderTitle}>PRODUCT TRAINING</Text>
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            activeOpacity={0.8}
            onPress={onClose}
          >
            <Feather name="x" size={wp(4.5)} color={Colors.grey} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.modalScroll}
        >
          <View style={styles.modalTopRow}>
            <View
              style={[styles.modalSwatch, { backgroundColor: product.swatch }]}
            >
              <View style={styles.colorBadge}>
                <MaterialCommunityIcons
                  name="palette"
                  size={wp(3.2)}
                  color={Colors.white}
                />
                <Text style={styles.colorBadgeText}>{detail.color}</Text>
              </View>
            </View>

            <View style={styles.modalProductInfo}>
              <Text style={styles.modalProductTitle}>{product.title}</Text>
              <Text style={styles.modalPrice}>{product.price}</Text>
              <View style={styles.codeBadge}>
                <Text style={styles.codeBadgeText}># {product.code}</Text>
              </View>
              <View style={styles.modalTagWrap}>
                {(detail.detailTags || []).map((tag, i) => (
                  <View
                    key={i}
                    style={[
                      styles.modalTag,
                      tag.solid ? styles.modalTagSolid : styles.modalTagOutline,
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalTagText,
                        tag.solid && styles.modalTagTextSolid,
                      ]}
                    >
                      {tag.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.specRow}>
            <View style={styles.specBox}>
              <View style={styles.specLabelRow}>
                <MaterialCommunityIcons
                  name="tshirt-crew-outline"
                  size={wp(3.8)}
                  color={Colors.grey}
                />
                <Text style={styles.specLabel}>SHIRT</Text>
              </View>
              <Text style={styles.specValue}>{detail.shirt}</Text>
              <Text style={styles.specFabric}>Fabric: {detail.fabric}</Text>
            </View>

            <View style={styles.specBox}>
              <View style={styles.specLabelRow}>
                <MaterialCommunityIcons
                  name="content-cut"
                  size={wp(3.8)}
                  color={Colors.grey}
                />
                <Text style={styles.specLabel}>BOTTOM</Text>
              </View>
              <Text style={styles.specValue}>{detail.bottom}</Text>
              <Text style={styles.specFabric}>Fabric: {detail.fabric}</Text>
            </View>
          </View>

          <View style={styles.sectionHeaderRow}>
            <Image
              source={Images.SvgMargin}
              style={styles.sectionHeaderIcon}
              resizeMode="contain"
            />
            <Text style={styles.sectionHeaderText}>Key Highlights</Text>
          </View>
          {(detail.highlights || []).map((point, i) => (
            <View key={i} style={styles.highlightRow}>
              <View style={styles.checkCircle}>
                <Feather name="check" size={wp(3)} color={Colors.white} />
              </View>
              <Text style={styles.highlightPoint}>{point}</Text>
            </View>
          ))}

          <View style={styles.audioSectionHeader}>
            <View style={styles.sectionHeaderRow}>
              <Feather name="headphones" size={wp(4.2)} color={Colors.green} />
              <Text style={styles.sectionHeaderText}>Audio Training</Text>
            </View>
            <View style={styles.guideBadge}>
              <Text style={styles.guideBadgeText}>Guide</Text>
            </View>
          </View>

          <View style={styles.modalAudioBox}>
            <View style={styles.micCircle}>
              <Feather name="mic" size={wp(4)} color={Colors.amber} />
            </View>
            <View style={styles.waveformRow}>
              {trainingWaveform.map((h, i) => (
                <View key={i} style={[styles.waveBar, { height: hp(h) }]} />
              ))}
            </View>
            <Text style={styles.modalAudioTime}>{detail.audio}</Text>
            <TouchableOpacity style={styles.modalPlayBtn} activeOpacity={0.9}>
              <Ionicons name="play" size={wp(4.2)} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.completeBtn}
          activeOpacity={0.9}
          onPress={onClose}
        >
          <Text style={styles.completeBtnText}>Mark as Completed</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    paddingHorizontal: wp(5),
    paddingTop: hp(1.2),
    paddingBottom: hp(3),
    maxHeight: hp(88),
  },
  modalHandle: {
    width: wp(12),
    height: hp(0.6),
    borderRadius: wp(1),
    backgroundColor: Colors.platinum,
    alignSelf: 'center',
    marginBottom: hp(1.5),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  greenDot: {
    width: wp(2.2),
    height: wp(2.2),
    borderRadius: wp(1.1),
    backgroundColor: Colors.green,
  },
  modalHeaderTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs2,
    color: Colors.green,
    letterSpacing: 0.5,
  },
  closeBtn: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScroll: {
    paddingBottom: hp(1),
  },
  modalTopRow: {
    flexDirection: 'row',
    marginBottom: hp(2.2),
  },
  modalSwatch: {
    width: wp(28),
    height: wp(34),
    borderRadius: wp(3),
    marginRight: wp(4),
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: wp(2),
  },
  colorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderRadius: wp(4),
    gap: wp(1),
  },
  colorBadgeText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xm2,
    color: Colors.white,
  },
  modalProductInfo: {
    flex: 1,
  },
  modalProductTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.m,
    color: Colors.black,
    marginBottom: hp(0.6),
  },
  modalPrice: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.mm,
    color: Colors.amber,
    marginBottom: hp(1),
  },
  codeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: wp(2),
    marginBottom: hp(1.2),
  },
  codeBadgeText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs1,
    color: Colors.grey,
  },
  modalTagWrap: {
    flexDirection: 'row',
    gap: wp(2),
  },
  modalTag: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(2),
  },
  modalTagSolid: {
    backgroundColor: Colors.green,
  },
  modalTagOutline: {
    borderWidth: 1,
    borderColor: Colors.paleGray,
  },
  modalTagText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xm2,
    color: Colors.grey,
  },
  modalTagTextSolid: {
    color: Colors.white,
  },
  specRow: {
    flexDirection: 'row',
    gap: wp(3),
    marginBottom: hp(2.5),
  },
  specBox: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: wp(3),
    padding: wp(3.5),
  },
  specLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    marginBottom: hp(1),
  },
  specLabel: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xm2,
    color: Colors.grey,
    letterSpacing: 0.5,
  },
  specValue: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm,
    color: Colors.black,
    marginBottom: hp(0.4),
  },
  specFabric: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs1,
    color: Colors.mediumGrey,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(1.5),
  },
  sectionHeaderIcon: {
    width: wp(4.6),
    height: wp(4.6),
  },
  sectionHeaderText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm1,
    color: Colors.black,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
    marginBottom: hp(1.4),
  },
  checkCircle: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightPoint: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs5,
    color: Colors.dimGray,
  },
  audioSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
  },
  guideBadge: {
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: wp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
  },
  guideBadgeText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xm2,
    color: Colors.green,
  },
  modalAudioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.softDivider,
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.4),
    gap: wp(2.5),
  },
  micCircle: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.cornsilk,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveformRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(0.8),
    height: hp(4),
  },
  waveBar: {
    width: wp(0.9),
    borderRadius: wp(0.5),
    backgroundColor: Colors.amber,
  },
  modalAudioTime: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xs1,
    color: Colors.grey,
  },
  modalPlayBtn: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.amber,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp(0.6),
  },
  completeBtn: {
    backgroundColor: Colors.green,
    borderRadius: wp(3),
    paddingVertical: hp(1.9),
    alignItems: 'center',
    marginTop: hp(2),
  },
  completeBtnText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm1,
    color: Colors.white,
  },
});

export default TrainingDetailModal;
