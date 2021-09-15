import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';


export default function AddItemScreen({ navigation, route }) {
  const [ID, setID] = React.useState('######');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Adding an item</Text>
      <View>
        <TextInput
          keyboardType='numeric'
          placeholder='######'
          onChangeText={(val) => setID(val)}
        />
          
      </View>
      <View>
        <Text>{ID}</Text>
      </View>
      <Button title="Add" onPress={() => navigation.navigate('Edit Meal')} />
    </View>
  );
}


