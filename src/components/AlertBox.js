import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

export default function AlertBox({
  showWarning,
  ConfirmPressed,
  CancelPressed,
  heading,
  text,
}) {
  return (
    <Modal
      visible={showWarning}
      transparent
      onRequestClose={() => CancelPressed}
      animationType="fade"
      hardwareAccelerated>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, .4)',
        }}>
        <View
          style={{
            width: 300,
            height: 200,
            backgroundColor: '#E5E3E4',
            //   borderWidth: 1,
            //   borderColor: '#E5E3E4',
            borderRadius: 24,
            elevation: 5,
          }}>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4CA6A8',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 20,
                margin: 10,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {heading}
            </Text>
          </View>
          <View
            style={{
              // height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: 20,
                margin: 10,
                textAlign: 'center',
              }}>
              {text}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
              marginHorizontal: '10%',
            }}>
            <TouchableOpacity
              onPress={() => ConfirmPressed()}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#5BA199',
                paddingHorizontal: 12,
                borderRadius: 12,
                paddingVertical: 8,
                marginHorizontal: 10,
                //   paddingHorizontal: 8,
                //   backgroundColor: '#00ffff',
                //   borderBottomLeftRadius: 32,
                //   borderBottomRightRadius: 32,
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Confirm
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => CancelPressed()}
              style={{
                marginHorizontal: 10,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#777777',
                paddingHorizontal: 12,
                borderRadius: 12,
                paddingVertical: 8,
                //   paddingHorizontal: 8,
                //   backgroundColor: '#00ffff',
                //   borderBottomLeftRadius: 32,
                //   borderBottomRightRadius: 32,
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
