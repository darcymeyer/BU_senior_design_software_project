import * as React from 'react';
import { Button, View, Text } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is a food tracker!!</Text>
      <Button
        title="Add Meal"
        onPress={() => navigation.navigate('Edit Meal', {someData: "this is some data"})}
      />
      <Button 
        title="console log user id"
        onPress={() => console.log('user id:', auth().currentUser)}
      />
      <Button title="sign out"
        onPress={() => {
          auth()
          .signOut()
          .then(() => console.log('User signed out!'))
          .then(() => navigation.navigate('Login'));
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