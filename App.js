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

var userId = auth().currentUser?.uid;

function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => {
        userId = auth().currentUser.uid;
        console.log('Signed in with Google! user id: ', userId);
      })}
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
      <Button 
        title="console log user id"
        onPress={() => console.log('user id:', auth().currentUser)}
      />
      <Button title="sign out"
        onPress={() => {
          auth()
          .signOut()
          .then(() => console.log('User signed out!'));
        }}/>
      <Button
        title="console log something from database"
        onPress={() => {
          const reference = database().ref('/users').child(userId);
          reference.set({'test': 'data'});
          reference.once('value')
            .then(snapshot => {
              console.log('User data: ', snapshot.val());
            });
        }} />
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