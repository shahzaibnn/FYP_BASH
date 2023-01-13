import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Toaster from './Toaster';

export default function ToastAlert() {
  const [isToasterDisplayed, setIsToasterDisplayed] = React.useState(false);
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          setIsToasterDisplayed(!isToasterDisplayed);
        }}
        title={'Show Toaster'}
      />

      {isToasterDisplayed && <Toaster message="Check Email Please" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
