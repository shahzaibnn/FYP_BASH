import React, {useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const countryList = [
  {label: 'Pakistan', value: 'Pakistan'},
  {label: 'USA', value: 'USA'},
  {label: 'Japan', value: 'Japan'},
  {label: 'China', value: 'China'},
  {label: 'UK', value: 'UK'},
  {label: 'France', value: 'France'},
];

const cityList = {
  Pakistan: [
    {label: 'Lahore', value: 'Lahore'},
    {label: 'Karachi', value: 'Karachi'},
    {label: 'Islamabad', value: 'Islamabad'},
  ],
  USA: [
    {label: 'New York', value: 'New York'},
    {label: 'Los Angeles', value: 'Los Angeles'},
    {label: 'Chicago', value: 'Chicago'},
  ],
  Japan: [
    {label: 'Tokyo', value: 'Tokyo'},
    {label: 'Osaka', value: 'Osaka'},
    {label: 'Kyoto', value: 'Kyoto'},
  ],
  China: [
    {label: 'Beijing', value: 'Beijing'},
    {label: 'Shanghai', value: 'Shanghai'},
    {label: 'Guangzhou', value: 'Guangzhou'},
  ],
  UK: [
    {label: 'London', value: 'London'},
    {label: 'Manchester', value: 'Manchester'},
    {label: 'Liverpool', value: 'Liverpool'},
  ],
  France: [
    {label: 'Paris', value: 'Paris'},
    {label: 'Marseille', value: 'Marseille'},
    {label: 'Lyon', value: 'Lyon'},
  ],
};

const DropDownCheck = () => {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);

  const handleCountryChange = value => {
    setCountry(value);
    setCity(null);
  };

  const cityItems = cityList[country] || [];

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <DropDownPicker
        open={!!country}
        value={country}
        items={countryList}
        placeholder="Select country"
        onChangeValue={handleCountryChange}
      />
      <DropDownPicker
        open={!!city}
        value={city}
        items={cityItems}
        placeholder="Select city"
        onChangeValue={setCity}
      />
    </View>
  );
};

export default DropDownCheck;
