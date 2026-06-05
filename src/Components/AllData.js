import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { wp } from '../Assets/Responsive';

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
      style={{ backgroundColor: '#FFFFFF' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 14, marginLeft: wp(1) }}
    />
  );
};

export default AllData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    padding: 14,
    marginBottom: 8,
    minHeight: 105,
    elevation: 0.5,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F6F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },

  avatarText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#17B794',
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginRight: 8,
  },

  statusBadge: {
    backgroundColor: '#E7F8F2',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  statusText: {
    color: '#17B794',
    fontSize: 10,
    fontWeight: '500',
  },

  code: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },

  date: {
    marginTop: 8,
    fontSize: 12,
    color: '#777',
  },

  time: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },
});
