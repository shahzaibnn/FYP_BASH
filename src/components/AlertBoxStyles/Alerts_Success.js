import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';

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
      {/* <Animated.View entering={FadeInUp} exiting={FadeOutUp}> */}
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
        style={{backgroundColor: 'white'}}>
        <Text style={styles.alertText}>
          Sorry, your request cannot be processed at the moment.
        </Text>
      </FancyAlert>
      {/* </Animated.View> */}
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
    backgroundColor: '#EEEEEE',
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
