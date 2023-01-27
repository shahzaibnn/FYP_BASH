import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {db, dbFirestore} from '../Firebase/Config';
import {SliderBox} from 'react-native-image-slider-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getUsers = async () => {
    // setIsLoading(true);
    // try {
    setIsLoading(true);
    const query = dbFirestore()
      .collection('Posts')
      .orderBy('createdAt', 'asc')
      .limit(3);
    if (data.length) {
      query = query.startAfter(data[data.length - 1].createdAt);
    }

    const snapshot = await query.get();
    const newData = snapshot.docs.map(doc => doc.data());
    setData([...data, ...newData]);
    setCurrentPage(currentPage + 1);
    setIsLoading(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          // elevation: 1000,
          // backgroundColor: '#ffffff',
          marginHorizontal: Dimensions.get('window').width * 0.05,
          marginVertical: Dimensions.get('window').height * 0.01,
          borderRadius: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: Dimensions.get('window').height * 0.01,
          }}>
          <Image
            source={{uri: item.profilePic}}
            style={{
              width: 60,
              height: 60,
              borderRadius: 64,
              marginLeft: Dimensions.get('window').width * 0.02,
            }}
          />
          <View
            style={{
              marginLeft: Dimensions.get('window').width * 0.05,
            }}>
            <Text
              style={{
                color: '#5BA199',
                fontWeight: 'bold',
                marginBottom: Dimensions.get('window').height * 0.005,
                fontSize: 16,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: '#5BA199',
                marginBottom: Dimensions.get('window').height * 0.005,
                fontSize: 12,
              }}>
              {item.title}
            </Text>
            <Text style={{color: '#777777', fontSize: 12}}>{item.date}</Text>
          </View>
        </View>

        <SliderBox
          // onCurrentImagePressed={index => ImagePressed()}
          parentWidth={Dimensions.get('window').width * 0.9}
          ImageComponentStyle={{borderRadius: 16}}
          // paginationBoxStyle={styles.sliderBoxPageStyle}
          // ImageComponentStyle={styles.sliderBoxImageStyle}
          // dotStyle={{
          //   width: 10,
          //   height: 10,
          //   borderRadius: 5,
          //   marginBottom: 20,
          //   marginHorizontal: 0,
          //   padding: 0,
          //   margin: 0,
          // }}
          images={item.images}
          sliderBoxHeight={Dimensions.get('window').height * 0.3}
        />

        <Text
          style={{
            color: '#000000',
            width: '95%',
            marginHorizontal: '2.5%',
            marginVertical: '2%',
          }}>
          {item.description}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: '5%',
          }}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: '#469597',
                fontWeight: 'bold',
              }}>
              {item.likedBy.length} Likes
            </Text>
            <TouchableOpacity
              onPress={() => {
                console.log('hdshjdsfvhddhfbhj');
                if (item.likedBy.includes(emailAddressOfCurrentUser)) {
                  dbFirestore()
                    .doc('Posts/' + item.id)
                    .update({
                      likedBy: dbFirestore.FieldValue.arrayRemove(
                        emailAddressOfCurrentUser,
                      ),
                    })
                    .then(() => {
                      console.log('Like Removed!');
                    });

                  fetchedPosts.find(obj => obj.id == item.id).likedBy =
                    item.likedBy.filter(e => e !== emailAddressOfCurrentUser);
                  setExtraData(new Date());

                  // likeColor = '#ffffff';
                } else {
                  console.log('ye work');
                  dbFirestore()
                    .doc('Posts/' + item.id)
                    .update({
                      likedBy: dbFirestore.FieldValue.arrayUnion(
                        emailAddressOfCurrentUser,
                      ),
                    })
                    .then(() => {
                      console.log('Like Placed!');
                    });
                  let arr = item.likedBy;
                  arr.push(emailAddressOfCurrentUser);
                  fetchedPosts.find(obj => obj.id == item.id).likedBy = arr;

                  setExtraData(new Date());
                }
                // setFetchedPosts([]);
                // searchPosts();
              }}
              style={{
                paddingHorizontal: '8%',
                paddingVertical: '8%',
                backgroundColor: '#5BA199',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                // width: Dimensions.get('window').width * 0.2,
              }}>
              <AntDesign name="like1" size={25} />
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                textAlign: 'center',
                color: '#469597',
                fontWeight: 'bold',
              }}>
              {item.commentedBy.length} Comments
            </Text>
            <TouchableOpacity
              style={{
                paddingHorizontal: '8%',
                paddingVertical: '8%',
                backgroundColor: '#5BA199',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                // width: Dimensions.get('window').width * 0.2,
              }}>
              <FontAwesome name="comment" size={25} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    console.log('Loading more');
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <>
      <StatusBar backgroundColor="#000" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={150}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default App;
