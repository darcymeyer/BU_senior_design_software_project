import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '948886943464-qu8dlsp8fmqh18p988j0bovl78kta2hh',
});



function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
  );
}

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}



// var test;

// const reference = database().ref('/test');
// reference.once('value')
//   .then(snapshot => {
//     console.log('User data: ', snapshot.val());
//     test = snapshot.val();
//   });


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is a food tracker!!</Text>
      <Button
        title="Add Meal"
        onPress={() => navigation.navigate('Edit Meal')}
      />
      {/*<Text>This is from the database: {test}</Text>*/}
      <GoogleSignIn/>
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