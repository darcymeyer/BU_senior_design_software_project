import * as React from 'react';
import { Button, View, Text } from 'react-native';


export default function EditMealScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Editing a meal</Text>
      <Button
        title="Add Item"
        onPress={() => navigation.navigate('Add Item')}
      />
      <Button title="Save" onPress={() => navigation.navigate('Home')} />
      <Text>the route.params.someData var is {route.params?.someData}</Text>
    </View>
  );
}