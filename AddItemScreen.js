import * as React from 'react';
import { Button, View, Text } from 'react-native';


export default function AddItemScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Adding an item</Text>
      <Button title="Add" onPress={() => navigation.navigate('Edit Meal')} />
    </View>
  );
}
