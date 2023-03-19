import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Pdf from 'react-native-pdf';
import DocumentPicker from 'react-native-document-picker';

import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { ScrollView } from 'react-native-gesture-handler';

export default function PdfViewScreen({navigation, route}) {
  const [selectFile, setSelectFile] = useState();

  const storeData = useSelector(state => state);

  const [resumeUrl, setResumeUrl] = useState(route.params.pdfUrl);

  const selectSingleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      });
      for (const res of results) {
        console.log('length is : ', results.length);

        console.log('URI : ' + res.uri);

        console.log('File Name : ' + res.name);

        console.log('File Type: ' + res.type);

        setSelectFile(res.uri);
      }
    } catch (err) {
      console.log('Some Error!!!');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          // alignSelf: 'flex-start',
          flexDirection: 'row',
          // alignItems: 'center',
          marginHorizontal: '5%',
          marginTop: '5%',
          marginBottom: '5%',
          // justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{flex: 1}}>
          <Ionicons
            name="chevron-back-circle-sharp"
            size={35}
            color="#777777"
          />
        </TouchableOpacity>

        <Text
          style={{
            flex: 2,
            fontSize: 35,
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft: '3%',
          }}>
          Resume
        </Text>

        <View style={{flex: 1}} />
      </View>
      <Pdf
        source={{uri: resumeUrl}}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E3E4',
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    backgroundColor: '#E5E3E4',
    // backgroundColor: 'black',
  },
});
