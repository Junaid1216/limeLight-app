import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import Feather from 'react-native-vector-icons/Feather';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import {
  getVideoSource,
  isExternalVideoLink,
} from '../Utils/trainingMappers';

const TrainingVideoModal = ({ visible, title, videoUrl, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [visible, videoUrl]);

  const handleOpenExternal = async () => {
    if (!videoUrl) {
      return;
    }

    try {
      const canOpen = await Linking.canOpenURL(videoUrl);

      if (canOpen) {
        await Linking.openURL(videoUrl);
      }
    } catch (error) {
      console.log('Training video open error:', error);
    }
  };

  const showExternalOnly = isExternalVideoLink(videoUrl);
  const videoSource = getVideoSource(videoUrl);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      backdropOpacity={0.55}
      useNativeDriver={false}
      hideModalContentWhileAnimating={false}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Feather name="x" size={wp(4.5)} color={Colors.grey} />
          </TouchableOpacity>
        </View>

        {!videoUrl ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>Video not available</Text>
          </View>
        ) : showExternalOnly ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>
              Open this training video in your browser.
            </Text>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleOpenExternal}
              activeOpacity={0.88}
            >
              <Text style={styles.actionBtnText}>Open Video</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.playerWrap}>
            <Video
              key={videoUrl}
              source={videoSource}
              style={styles.video}
              controls
              resizeMode="contain"
              paused={!visible}
              playInBackground={false}
              playWhenInactive={false}
              onLoadStart={() => {
                setIsLoading(true);
                setHasError(false);
              }}
              onLoad={() => {
                setIsLoading(false);
              }}
              onReadyForDisplay={() => {
                setIsLoading(false);
              }}
              onError={error => {
                console.log(
                  'Training video playback error:',
                  JSON.stringify(
                    {
                      videoUrl,
                      error: error?.error ?? error,
                    },
                    null,
                    2,
                  ),
                );
                setIsLoading(false);
                setHasError(true);
              }}
            />

            {isLoading ? (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={Colors.white} />
              </View>
            ) : null}

            {hasError ? (
              <View style={styles.errorOverlay}>
                <Text style={styles.errorText}>Unable to play video</Text>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={handleOpenExternal}
                  activeOpacity={0.88}
                >
                  <Text style={styles.actionBtnText}>Open in Browser</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.softDivider,
  },
  title: {
    flex: 1,
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm,
    color: Colors.black,
    marginRight: wp(2),
  },
  closeBtn: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerWrap: {
    width: '100%',
    height: hp(28),
    backgroundColor: Colors.black,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.72)',
    paddingHorizontal: wp(6),
  },
  errorText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs2,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: hp(1.5),
  },
  emptyWrap: {
    minHeight: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
  },
  emptyText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs2,
    color: Colors.grey,
    textAlign: 'center',
    marginBottom: hp(1.5),
  },
  actionBtn: {
    backgroundColor: Colors.green,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: wp(6),
  },
  actionBtnText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs2,
    color: Colors.white,
  },
});

export default TrainingVideoModal;
