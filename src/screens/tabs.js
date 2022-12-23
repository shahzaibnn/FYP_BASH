import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RegistrationScreenAlumni from './RegistrationScreenAlumni';
import RegistrationScreenFaculty from './RegistrationScreenFaculty';
import RegistrationScreenStudent from './RegistrationScreenStudent';
import MyTabBar from './tabBarChecking';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      //   screenOptions={{
      //     tabBarStyle: {backgroundColor: 'orange'},
      //   }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Student" component={RegistrationScreenStudent} />
      <Tab.Screen name="Faculty" component={RegistrationScreenFaculty} />
      <Tab.Screen name="Alumni" component={RegistrationScreenAlumni} />
    </Tab.Navigator>
  );
}
