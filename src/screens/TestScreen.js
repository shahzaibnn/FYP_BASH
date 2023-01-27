import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
// import {firestore} from 'react-native-firebase/firestore';
// import {dbFirestore} from '../Firebase/Config';
import {db, dbFirestore} from '../Firebase/Config';

function TestScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const query = dbFirestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .limit(2);
      if (data.length) {
        query = query.startAfter(data[data.length - 1].createdAt);
      }

      const snapshot = await query.get();
      const newData = snapshot.docs.map(doc => doc.data());
      setData([...data, ...newData]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      fetchData();
    }
  };

  return (
    <View>
      <Text>Hello</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>hiiiiiii{item.description}</Text>}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#0000ff" />
        }
      />
    </View>
  );
}

export default TestScreen;
