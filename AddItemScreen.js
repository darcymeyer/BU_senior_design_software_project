import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { QRCodeScanner } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default function AddItemScreen({ navigation, route }) {
  const userId = auth().currentUser.uid;
  const mealID = route.params.mealID;
  const [barcodeText, setBarcodeText] = useState(route.params.barcode);
  const [itemID, setItemID] = useState(route.params.itemID);
  const [item, setItem] = useState({name: '', calories: ''});
  const ref = database().ref('/users').child(userId).child(mealID);
  const [scan, setScan] = useState(false)
  const [result, setResult] = useState()
  
  useEffect(() => {
    if (!itemID) setItemID(ref.push().key);
  });

  

  return (
    <View style={styles.mainView}>
      <View>
      <Button title="Scan" onPress={() => {navigation.navigate('Scanner')}} />
      </View>
      <View>
        <TextInput
          style = {styles.barcode}
          keyboardType='numeric'
          placeholder='############'
          onChangeText={(val) => {setBarcodeText(val)}}
        />
        <Text style = {styles.label}>Enter Barcode</Text>
        <Button title="Lookup" onPress={() => {getNutrients(barcodeText).then((n) => {console.log('item should be,', n); setItem(n)})}} />
      </View>
      <View>
        <Text>Item name: {item.name}</Text>
        <Text>Calories: {item.calories}</Text>
      </View>
      <Button title="Add" onPress={() => {
        ref.child('items').push().update(item);
        navigation.navigate('Edit Meal', {mealID: mealID});
      }} />
    </View>
  );

  function getNutrients(barcode) {
    const api_key = 'MOPemELqYky2bk2xJ1T4idXSOOtqQJcQoTxblf4f';

    return fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${api_key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query: `gtinUpc=${barcode}`}),
      })
      .then((response) => response.json())
      .then((json) => json.foods[0]?.fdcId)
      .then((fdcid) => {
        if (!fdcid) {
          return ({name: 'not found', calories: 0})
        }
        // console.log("got fdcid:", fdcid);
        return fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcid}?api_key=${api_key}`)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            // console.log('nutrients should be:', json.labelNutrients);
            var calories = json.labelNutrients.calories.value;
            var name = json.description;
            return {calories: calories, name: name};
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

  }
  
  function addItem(id, item){
    //This function will take the entered ID from 'id' and the fetch data stored in 'item' and add it to the database for this meal
    //This will also need to take some indicator of what meal it is
  }

}



const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 40,
   paddingHorizontal: 20,
   backgroundColor: '#FFF'
  },
  buttonView:{
    flexDirection:'row',
    width: '100%', 
    height: 50,  
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-around'
  },
  itemList: {
    marginTop: 5,
    padding: 10,
    backgroundColor: 'gray',
    justifyContent: 'center',
    fontSize: 14
  },
  header:{
    fontWeight: "600",
    padding: 20,
    paddingBottom: 0,
    fontSize: 20,
    textAlign: 'center'
  },
  mainView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  },
  barcode:{
    fontWeight: "600",
    padding: 20,
    paddingBottom: 0,
    fontSize: 32,
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
  RNcamera: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  scrollView: {
    
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'orange',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'gray',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  
});


