import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {db, dbFirestore} from '../Firebase/Config';

export default function InfiniteScroll() {
  const [documentData, setDocumentData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isRetrievingMore, setIsRetrievingMore] = useState(false);
  useEffect(() => {
    try {
      // Cloud Firestore: Initial Query
      retrieveData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const retrieveData = async () => {
    // try {
    // Set State: Loading
    setLoading(true);
    console.log('Retrieving Data');

    // Cloud Firestore: Query
    let initialQuery = await dbFirestore()
      .collection('Posts')
      // .where('id', '<=', 3)
      // .orderBy('id')
      .orderBy('id')

      // .orderBy('createdAt', 'asc')
      // .orderBy('createdAt', 'desc')
      .limit(5);

    // Cloud Firestore: Query Snapshot
    let documentSnapshots = await initialQuery.get();

    // Cloud Firestore: Document Data
    let documentData = documentSnapshots.docs.map(document => document.data());

    // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
    const lastVisible = documentData[documentData.length - 1].id;
    //   console.log(lastVisible);

    // Set State
    setDocumentData(documentData);
    setLastVisible(lastVisible);
    console.log('check', lastVisible);
    //   console.log(lastVisible);

    setLoading(false);
    // } catch (error) {
    // console.log(error);
    // }
  };

  console.log('check outside', lastVisible);

  // another attempt
  const retrieveMore = async () => {
    // if (isRetrievingMore) {
    //   return;
    // }
    // setIsRetrievingMore(true);
    // try {
    //   //... your existing retrieveMore code here
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsRetrievingMore(false);
    // }

    try {
      // Set State: Refreshing
      console.log('final ', lastVisible);
      setRefreshing(true);
      console.log('Retrieving additional Data');
      console.log(lastVisible);
      // Cloud Firestore: Query (Additional Query)
      let additionalQuery = await dbFirestore()
        .collection('Posts')
        .orderBy('id')
        // .orderBy(id)
        // .orderBy('createdAt', 'asc')
        // .orderBy('createdAt', 'desc')
        .startAfter(lastVisible)
        .limit(2);
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await additionalQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document =>
        document.data(),
      );
      setLastVisible(documentData[documentData.length - 1].id);
      // setLastVisible(documentData[documentData.length - 1].length);
      setDocumentData([...documentData, ...documentData]);
      //   setDocumentData([...documentData]);
      // setDocumentData([...documentData]);
      setRefreshing(false);
    } catch (error) {
      console.error('errorss');
      console.log(error);
    }
  };

  //   main one below
  //   const retrieveMore = async lastVisible => {
  //     try {
  //       // Set State: Refreshing
  //       console.log('final ', lastVisible);

  //       setRefreshing(true);
  //       console.log('Retrieving additional Data');
  //       console.log(lastVisible);
  //       // Cloud Firestore: Query (Additional Query)
  //       let additionalQuery = await dbFirestore()
  //         .collection('Posts')
  //         .orderBy('id')
  //         .startAfter(lastVisible)
  //         .limit(3);

  //       //     .collection('Posts')
  //       //     .where('id', '<=', 3)
  //       //     // .orderBy('createdAt', 'desc')
  //       //     .orderBy('id')
  //       //     .startAfter(lastVisible)
  //       //     .limit(limit);
  //       //   // .collection('Posts')
  //       // // .orderBy('createdAt', 'desc')
  //       // .where('id', '<=', 20)

  //       // .startAfter(lastVisible)
  //       // .limit(limit);

  //       // Cloud Firestore: Query Snapshot
  //       let documentSnapshots = await additionalQuery.get();

  //       // Cloud Firestore: Document Data
  //       let documentData = documentSnapshots.docs.map(document =>
  //         document.data(),
  //       );
  //       //   console.log(documentData);
  //       // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
  //       const lastVisible = documentData[documentData.length - 1].id;

  //       // Set State
  //       setDocumentData([...documentData, ...documentData]);
  //       setLastVisible(lastVisible);
  //       setRefreshing(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const renderHeader = () => {
    try {
      return <Text style={styles.headerText}>Items</Text>;
    } catch (error) {
      console.log(error);
    }
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator />;
    } else {
      return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FlatList
          data={documentData}
          renderItem={({item}) => (
            <View>
              <Text style={styles.text}>
                (ID: {item.id}) {item.title}
                {item.description}
              </Text>
            </View>
          )}
          // keyExtractor={(item, index) => String(index)}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          onEndReached={retrieveMore}
          onEndReachedThreshold={0}
          refreshing={refreshing}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
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
    fontSize: 50,
    fontWeight: '400',
    color: '#000',
  },
});
