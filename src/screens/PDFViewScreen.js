import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';
import DocumentPicker from 'react-native-document-picker';

export default function PdfViewScreen() {
  const [selectFile, setSelectFile] = useState();

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

  const source = {
    uri: selectFile,
    cache: true,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => selectSingleFile()}
        style={{
          backgroundColor: '#5BA199',
          paddingHorizontal: '10%',
          paddingVertical: '5%',
          borderRadius: 16,
        }}>
        <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>
          File To View
        </Text>
      </TouchableOpacity>
      <Pdf
        source={source}
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
});
