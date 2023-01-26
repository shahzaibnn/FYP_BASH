import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Alerts_Error = () => {
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <View>
      <TouchableOpacity onPress={toggleAlert}>
        <Text>Tap me</Text>
      </TouchableOpacity>

      <FancyAlert
        visible={visible}
        icon={
          <View style={[styles.icon, {borderRadius: 32}]}>
            <Ionicons
              name={Platform.select({ios: 'ios-close', android: 'warning'})}
              size={36}
              color="#FFFFFF"
            />
          </View>
        }
        style={styles.alert}>
        <Text style={styles.alertText}>
          Sorry, your request cannot be processed at the moment.
        </Text>
      </FancyAlert>
    </View>
  );
};

export default Alerts_Error;
const styles = StyleSheet.create({
  alertText: {
    marginTop: -16,
    marginBottom: 32,
    textAlign: 'center',
    fontSize: 16,
  },
  alert: {
    // backgroundColor: '#EEEEEE',
    backgroundColor: 'white',
    // backgroundColor: '#E5E3E4',
    // backgroundColor: '#5BA199',
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3333',
    width: '100%',
  },
});
