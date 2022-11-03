import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingsScreen() {
  const [faqViewDisplay, setFaqViewDisplay] = useState(false);
  const [privacyViewDisplay, setPrivacyViewDisplay] = useState(false);
  const [contactViewDisplay, setContactViewDisplay] = useState(false);

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: '3%',
          marginVertical: '5%',
          //   justifyContent: 'center',
        }}>
        <TouchableOpacity style={{}}>
          <Ionicons
            name="chevron-back-circle-sharp"
            size={35}
            color="#777777"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 35,
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft: '3%',
            // marginHorizontal: Dimensions.get('window').width / 5,
            // marginEnd: '30%',

            // marginHorizontal: '25%',
          }}>
          Settings
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#BBC6C8',
          //   borderRadius: 8,
          padding: '2%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: faqViewDisplay ? 0 : 8,
          borderBottomRightRadius: faqViewDisplay ? 0 : 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome
            name="question-circle"
            size={25}
            color="#777777"
            style={{marginLeft: '2%'}}
          />
          <Text style={{fontSize: 25, color: '#000000', marginLeft: 10}}>
            FAQ's
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setFaqViewDisplay(!faqViewDisplay)}
          style={{marginRight: '2%'}}>
          <FontAwesome name="plus-circle" size={25} color="#777777" />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={!faqViewDisplay}>
        <View
          style={{
            marginHorizontal: '5%',
            backgroundColor: '#BBC6C8',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <Text style={{textAlign: 'center'}}>
            -----------TEXT FOR FAQ's-------------
          </Text>
        </View>
      </Collapsible>

      {/* Privacy Policy */}

      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#BBC6C8',
          //   borderRadius: 8,
          padding: '2%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: privacyViewDisplay ? 0 : 8,
          borderBottomRightRadius: privacyViewDisplay ? 0 : 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="privacy-tip"
            size={25}
            color="#777777"
            style={{marginLeft: '0%'}}
          />
          <Text style={{fontSize: 25, color: '#000000', marginLeft: 10}}>
            Privacy Policy
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setPrivacyViewDisplay(!privacyViewDisplay)}
          style={{marginRight: '2%'}}>
          <FontAwesome name="plus-circle" size={25} color="#777777" />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={!privacyViewDisplay}>
        <View
          style={{
            marginHorizontal: '5%',
            backgroundColor: '#BBC6C8',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <Text style={{textAlign: 'center'}}>
            -----------TEXT FOR Privacy Policy-------------
          </Text>
        </View>
      </Collapsible>

      {/* Contact Us */}

      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#BBC6C8',
          //   borderRadius: 8,
          padding: '2%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: contactViewDisplay ? 0 : 8,
          borderBottomRightRadius: contactViewDisplay ? 0 : 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="chat"
            size={25}
            color="#777777"
            style={{marginLeft: '0%'}}
          />
          <Text style={{fontSize: 25, color: '#000000', marginLeft: 10}}>
            Contact Us
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setContactViewDisplay(!contactViewDisplay)}
          style={{marginRight: '2%'}}>
          <FontAwesome name="plus-circle" size={25} color="#777777" />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={!contactViewDisplay}>
        <View
          style={{
            marginHorizontal: '5%',
            backgroundColor: '#BBC6C8',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <Text style={{textAlign: 'center'}}>
            -----------TEXT FOR Contact Us-------------
          </Text>
        </View>
      </Collapsible>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#BBC6C8',
          alignSelf: 'center',
          paddingHorizontal: '15%',
          paddingVertical: '3%',
          borderRadius: 32,
          marginTop: '80%',
        }}>
        <Text style={{color: '#000000', fontSize: 30, fontWeight: 'bold'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
