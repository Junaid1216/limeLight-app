import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import { getVideoSource } from '../Utils/trainingMappers';

const formatTime = seconds => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${String(secs).padStart(2, '0')}`;
};

const parseTimeLabel = label => {
  const text = String(label ?? '').trim();

  if (!/^\d{1,2}:\d{2}$/.test(text)) {
    return 0;
  }

  const [mins, secs] = text.split(':').map(Number);

  return mins * 60 + secs;
};

export const buildAudioWaveform = (seed = '', barCount = 20) => {
  const text = String(seed);
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }

  return Array.from({ length: barCount }, (_, index) => {
    const n = ((hash >> (index % 16)) & 7) / 10;

    return 0.9 + n + (index % 3) * 0.35;
  });
};

const TrainingAudioPlayer = ({
  audioUrl,
  variant = 'button',
  initialLabel = 'Audio guide',
  apiDuration = '',
  waveform = [],
}) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isMetadataReady, setIsMetadataReady] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const resolvedApiDuration =
    parseTimeLabel(apiDuration) || parseTimeLabel(initialLabel);
  const bars =
    waveform.length > 0 ? waveform : buildAudioWaveform(audioUrl);

  useEffect(() => {
    setIsPlaying(false);
    setDuration(resolvedApiDuration);
    setPosition(0);
    setHasCompleted(false);
    setIsMetadataReady(resolvedApiDuration > 0);
  }, [audioUrl, resolvedApiDuration]);

  if (!audioUrl) {
    return null;
  }

  const source = getVideoSource(audioUrl);
  const totalDuration = duration > 0 ? duration : resolvedApiDuration;

  const getTotalDurationLabel = () => {
    if (totalDuration > 0) {
      return formatTime(totalDuration);
    }

    const label = apiDuration || initialLabel;

    if (label && label !== '0:00' && label !== 'Audio guide') {
      return label;
    }

    return '--:--';
  };

  const fileDuration = duration > 0 ? duration : resolvedApiDuration;

  const getPlayedBars = () => {
    if (hasCompleted) {
      return bars.length;
    }

    if (!isPlaying && position <= 0) {
      return 0;
    }

    if (fileDuration <= 0) {
      return 0;
    }

    const progress = Math.min(Math.max(position / fileDuration, 0), 1);

    if (progress >= 0.98) {
      return bars.length;
    }

    return Math.ceil(progress * bars.length);
  };

  const togglePlayback = () => {
    if (!source) {
      return;
    }

    if (hasCompleted) {
      setHasCompleted(false);
      setPosition(0);
      playerRef.current?.seek(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying(current => !current);
  };

  const handleLoad = data => {
    const loadedDuration = data?.duration ?? 0;

    if (loadedDuration > 0) {
      setDuration(loadedDuration);
    }

    setIsMetadataReady(true);
  };

  const handleProgress = data => {
    const currentTime = data?.currentTime ?? 0;
    const seekableDuration = data?.seekableDuration ?? 0;

    setPosition(currentTime);

    if (seekableDuration > 0) {
      setDuration(current =>
        Math.abs(current - seekableDuration) > 0.25
          ? seekableDuration
          : current,
      );
    }
  };

  const renderHiddenPlayer = () =>
    source ? (
      <Video
        ref={playerRef}
        source={source}
        paused={!isPlaying}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch="ignore"
        progressUpdateInterval={250}
        onLoad={handleLoad}
        onProgress={handleProgress}
        onEnd={() => {
          setIsPlaying(false);
          setHasCompleted(true);
          setPosition(fileDuration > 0 ? fileDuration : position);
        }}
        onError={error => {
          console.log('Product training audio error:', audioUrl, error);
          setIsPlaying(false);
        }}
        style={styles.hiddenPlayer}
      />
    ) : null;

  if (variant === 'modal') {
    const playedBars = getPlayedBars();

    return (
      <View style={styles.modalAudioBox}>
        {renderHiddenPlayer()}

        <View style={styles.micCircle}>
          <Feather name="mic" size={wp(4.2)} color={Colors.amber} />
        </View>

        <View style={styles.waveformTrack}>
          <View style={styles.waveformRow}>
            {bars.map((height, index) => (
              <View
                key={index}
                style={[
                  styles.waveBar,
                  {
                    height: hp(height),
                    backgroundColor:
                      index < playedBars ? Colors.amber : Colors.platinum,
                  },
                ]}
              />
            ))}
          </View>
          <Text style={styles.modalTimeText} numberOfLines={1}>
            {!isMetadataReady && totalDuration <= 0 ? '...' : getTotalDurationLabel()}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.modalPlayBtn}
          activeOpacity={0.9}
          onPress={togglePlayback}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={wp(4.4)}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      {renderHiddenPlayer()}
      <TouchableOpacity
        style={styles.miniPlayBtn}
        activeOpacity={0.9}
        onPress={togglePlayback}
      >
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={wp(3.4)}
          color={Colors.amber}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hiddenPlayer: {
    width: 1,
    height: 1,
    opacity: 0,
    position: 'absolute',
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
  modalAudioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.softDivider,
    borderRadius: wp(4),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.5),
    gap: wp(3),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  micCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.cornsilk,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveformTrack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
    minWidth: 0,
  },
  waveformRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(4.2),
    minWidth: 0,
  },
  waveBar: {
    width: wp(0.85),
    borderRadius: wp(1),
    minHeight: hp(0.8),
  },
  modalTimeText: {
    flexShrink: 0,
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xs2,
    color: Colors.grey,
    minWidth: wp(9),
    textAlign: 'right',
  },
  modalPlayBtn: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: Colors.amber,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp(0.6),
  },
});

export default TrainingAudioPlayer;
