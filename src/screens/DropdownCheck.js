import React, {useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const countryList = [
  {label: 'Pakistan', value: 'Pakistan'},
  {label: 'USA', value: 'USA'},
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
};

const DropdownCheck = () => {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const handleCountryChange = value => {
    console.log('handleCountryChange ', value);
    setCountry(value);
    setCity(null);
  };

  const cityItems = cityList[country] || [];

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <DropDownPicker
        open={country === null} // Open the first dropdown when country is null
        value={country}
        items={countryList}
        placeholder="Select country"
        onChangeValue={handleCountryChange} // pass `value` instead of `country`
        setOpen={setCountry} // Close the dropdown after a selection is made
      />
      <DropDownPicker
        open={city === null} // Open the second dropdown when city is null
        value={city}
        items={cityItems}
        placeholder="Select a city"
        onChangeValue={setCity}
      />
    </View>
  );
};

export default DropdownCheck;
