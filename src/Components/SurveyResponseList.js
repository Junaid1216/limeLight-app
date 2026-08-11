import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { wp } from '../Assets/Responsive';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Colors } from '../Constants/Colors';
import ScreenLoader from './ScreenLoader';
import { SurveyResponseContext } from './SurveyResponseContext';

const SurveyResponseList = () => {
  const { responses, isLoading } = useContext(SurveyResponseContext);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>

          <View
            style={[
              styles.statusBadge,
              item.status === 'Pending' && styles.pendingBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === 'Pending' && styles.pendingStatusText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.code}>
          {item.code}
          {item.location ? ` · ${item.location}` : ''}
        </Text>

        {item.date ? <Text style={styles.date}>{item.date}</Text> : null}
        {item.time ? <Text style={styles.time}>{item.time}</Text> : null}
      </View>
    </View>
  );

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!responses.length) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>No responses found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={responses}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default SurveyResponseList;

const styles = StyleSheet.create({
  list: {
    backgroundColor: Colors.white,
  },
  listContent: {
    padding: wp(3.5),
    marginLeft: wp(1),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderColor: Colors.cardBorderGray,
    borderRadius: wp(2.9),
    borderWidth: wp(0.2),
    padding: wp(3.4),
    marginBottom: wp(1.9),
    minHeight: wp(25.4),
    elevation: 0.5,
  },
  avatar: {
    backgroundColor: Colors.avatarMintBg,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(9.7),
    height: wp(9.7),
    borderRadius: wp(4.8),
    marginTop: wp(1.4),
  },
  avatarText: {
    fontSize: Fontsize.xs4,
    color: Colors.jadeGreen,
  },
  details: {
    flex: 1,
    marginLeft: wp(3),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: Fontsize.sm2,
    color: Colors.charcoalText,
    marginRight: wp(1.9),
  },
  statusBadge: {
    backgroundColor: Colors.statusMintBg,
    borderRadius: wp(2.4),
    paddingHorizontal: wp(1.9),
    paddingVertical: wp(0.7),
  },
  pendingBadge: {
    backgroundColor: Colors.whiteOrange,
  },
  statusText: {
    color: Colors.jadeGreen,
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsMedium,
  },
  pendingStatusText: {
    color: Colors.vividAmber,
  },
  code: {
    marginTop: wp(1.0),
    fontSize: Fontsize.xs1,
    color: Colors.warmGray,
  },
  date: {
    fontSize: Fontsize.xx0,
    color: Colors.warmGray,
    marginTop: wp(1.9),
  },
  time: {
    marginTop: wp(1.0),
    fontSize: Fontsize.xs1,
    color: Colors.warmGray,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  emptyText: {
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
  },
});
