import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Add Meal"
        onPress={() => navigation.navigate('Edit Meal')}
      />
    </View>
  );
}

function EditMealScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Editing a meal</Text>
      <Button
        title="Add Item"
        onPress={() => navigation.navigate('Add Item')}
      />
      <Button title="Save" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function AddItemScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Adding an item</Text>
      <Button title="Add" onPress={() => navigation.navigate('Edit Meal')} />
    </View>
  );
}



const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Edit Meal" component={EditMealScreen} />
      <Stack.Screen name="Add Item" component={AddItemScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}