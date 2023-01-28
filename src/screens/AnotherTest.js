import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {db, dbFirestore} from '../Firebase/Config';
// import { firestore } from 'firebase';

const AnotherTest = () => {
  const [data, setData] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allDataFetched, setAllDataFetched] = useState(false);

  let query = dbFirestore().collection('Posts').orderBy('createdAt', 'asc');
  // .limit(2);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    if (lastVisible) {
      query = query.startAfter(lastVisible);
    }
    query = query.limit(2);
    const snapshot = await query.get();
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    const newData = snapshot.docs.map(doc => doc.data());
    setData(data.concat(newData));
    setLoading(false);
  };

  const handleEndReached = () => {
    if (!loading) {
      fetchData();
    }
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.id}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        // keyExtractor={item => item.createdAt}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default AnotherTest;
const styles = StyleSheet.create({
  container: {
    // height: height,
    // width: width,
  },
  headerText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
    marginBottom: 12,
  },
  itemContainer: {
    height: 80,
    // width: width,
    borderWidth: 0.2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'System',
    fontSize: 60,
    fontWeight: '400',
    color: '#000',
  },
});
