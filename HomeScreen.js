import * as React from 'react';
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default function HomeScreen({ navigation }) {
  const[meals, setMeals] = React.useState([
    {name: 'Chocolate Cake', key: '1'},
    {name: 'Spaghetti & Meatballs', key: '2'},
    {name: 'Mac & Cheese', key: '3'},
    {name: 'Toast', key: '4'},
    {name: 'Ham Sandwich', key: '5'},
  ]);
  return (
    
    <View style={{ flex: 1 }}>
      
      
      <View style={styles.mainView}>
        <Text style={styles.header}>Food Tracker</Text>
        <Text style={styles.mealHeader}>Meals</Text>
        
        <ScrollView>
          { meals.map((item) => {
            return(
              <View key={item.key} style = {styles.mealList}>
                <Text style={styles.mealName}>{item.name}</Text>
                <Button
                  key = {item.key}
                  title="Edit"
                  onPress={() => navigation.navigate('Edit Meal')} //This also needs to load the data depending on what meal was pressed
                />
              </View>
            )
          })}
        </ScrollView>
      
      </View>
      
      <View style={styles.buttonView}>
      <Button
          title="Add Meal"
          onPress={() => navigation.navigate('Edit Meal', {someData: "this is some data"})}
        />
      
      <Button title="sign out"
        onPress={() => {
          auth()
          .signOut()
          .then(() => console.log('User signed out!'))
          .then(() => navigation.navigate('Login'));
        }}/>
      <Button 
        title="console log user id"
        onPress={() => console.log('user id:', auth().currentUser)}
      />
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
      
    </View>
  );
}
const Separator = () => (
  <View style={styles.separator} />
);
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 40,
   paddingHorizontal: 20,
   backgroundColor: '#FFF'
  },
  buttonEdit:{
    fontWeight: "600",
    padding: 20,
    paddingBottom: 0,
    fontSize: 32,
    textAlign: 'center'
  },
  buttonView:{
    
    width: '100%', 
    height: '25%',  
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-around'
  },
  mealList: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    fontSize: 14,
  },
  header:{
    fontWeight: "600",
    padding: 20,
    paddingBottom: 0,
    fontSize: 40,
    textAlign: 'center'
  },
  mealHeader:{
    fontWeight: "600",
    padding: 20,
    paddingBottom: 0,
    fontSize: 25,
    textAlign: 'center'
  },
  mainView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  },
  mealName:{
    fontWeight: "900",
    padding: 0,
    paddingRight: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  label:{
    fontStyle: 'italic',
    paddingBottom: 20,
    fontSize: 12,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  
});