import * as React from 'react';
import { Button, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '948886943464-qu8dlsp8fmqh18p988j0bovl78kta2hh',
});

function GoogleSignIn({navigation}) {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => {
        userId = auth().currentUser.uid;
        console.log('Signed in with Google! user id: ', userId);
        navigation.navigate("Home");
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

export default function LoginScreen({ navigation, route }) {
	if (auth().currentUser?.uid) {
		navigation.navigate("Home");
	}
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>This is the LoginScreen</Text>
			<GoogleSignIn navigation={navigation}/>
		</View>
	)
}