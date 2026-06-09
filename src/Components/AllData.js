import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { wp } from '../Assets/Responsive';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Colors } from '../Constants/Colors';

const data = [
  {
    id: '1',
    initials: 'ZA',
    name: 'Zain',
    code: 'SS-002',
    location: 'DHA',
    time: '11:02 AM',
  },
  {
    id: '2',
    initials: 'AY',
    name: 'Ayesha',
    code: 'SS-003',
    location: 'DHA',
    time: '12:15 PM',
  },
  {
    id: '3',
    initials: 'HA',
    name: 'Haris',
    code: 'SS-004',
    location: 'DHA',
    time: '1:48 PM',
  },
  {
    id: '4',
    initials: 'KO',
    name: 'Komal',
    code: 'SS-005',
    location: 'DHA',
    time: '2:30 PM',
  },
  {
    id: '5',
    initials: 'AT',
    name: 'Atiq',
    code: 'SS-006',
    location: 'DHA',
    time: '3:55 PM',
  },
];

const AllData = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Completed</Text>
          </View>
        </View>

        <Text style={styles.code}>
          {item.code} · {item.location}
        </Text>

        <Text style={styles.date}>Submitted 12 Mar,</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default AllData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
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
    fontSize: wp(3.5),
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
    fontSize: wp(4.3),
    color: Colors.charcoalText,
    marginRight: wp(1.9),
  },
  statusBadge: {
    backgroundColor: Colors.statusMintBg,
    borderRadius: wp(2.4),
    paddingHorizontal: wp(1.9),
    paddingVertical: wp(0.7),
  },
  statusText: {
    color: Colors.jadeGreen,
    fontSize: wp(2.7),
    fontFamily: Fonts.poppinsMedium,
  },
  code: {
    marginTop: wp(1.0),
    fontSize: wp(3.2),
    color: Colors.warmGray,
  },
  date: {
    fontSize: Fontsize.xs0,
    color: Colors.warmGray,
    marginTop: wp(1.9),
  },
  time: {
    marginTop: wp(1.0),
    fontSize: Fontsize.xs1,
    color: Colors.warmGray,
  },
});
