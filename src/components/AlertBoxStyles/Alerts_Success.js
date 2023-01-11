import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Alerts_Success = () => {
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
            <MaterialIcons
              name="mark-email-read"
              size={30}
              color="#4BB543"
              style={{
                // alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </View>
        }
        style={styles.alertBox}>
        <Text style={styles.alertText}>Request Successful</Text>
      </FancyAlert>
    </View>
  );
};

export default Alerts_Success;
const styles = StyleSheet.create({
  alertBox: {
    backgroundColor: 'white',
    // borderColor: 'black',
    // borderColor: 25,
    // borderWidth: 50,
  },
  alertText: {
    marginTop: -16,
    marginBottom: 32,
    textAlign: 'center',
    // fontStyle: 'italic',
    fontSize: 16,
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
  },
});
