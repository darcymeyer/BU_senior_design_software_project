import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, View, Text, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


export default function EditMealScreen({ navigation, route }) {
  // const [meal, setMeal] = React.useState({})
  const [mealName, setMealName] = useState("")
  const [items, setItems] = useState({});
  const [mealID, setMealID] = useState(route.params.mealID ?? "");
  const userId = auth().currentUser.uid;
  const ref = database().ref('/users').child(userId); //.child(mealID);
  // ref.once('value').then(snapshot => {v = snapshot.val(); setMeal(v); setMealName(v.name)})

  useEffect(() => {
    if (!mealID) {
      // var newmealid = ref.push().key;
      // console.log('should be setting new meal id:', newmealid);
      setMealID(ref.push().key);
      console.log('the meal id is now:', mealID);
      ref.child(mealID).update({items: null})
    }
    // setMealID("aaaaaaah");
    console.log('the meal id is now (2):', mealID);
    // while (!mealID) continue;
    ref.child(mealID).once('value').then(snapshot => {
      const v = snapshot.val();
      setItems(v?.items ?? {});
      if (mealName=="") setMealName(v.name);
    })
  });



  // function updateMealName(mealName) {
  //   ref.child(mealID).update({
  //     name: mealName
  //   });
  // }

  function saveMeal() {
    ref.child(mealID).update({
      name: mealName,
      items: items
    });
  }


  return (
    <View style = {{flex: 1}}>
      <View> 
        
      <TextInput
          style = {styles.mealName}
          textAlign = 'center'
          placeholder='New Meal'
          value={mealName}
          onChangeText={(val) => setMealName(val)}
        />
        
        <Text style = { styles.label }>Meal Name: {mealName}</Text>
      </View>
      
      <Separator />
      
      <Text style = {styles.header}>INGREDIENTS</Text>

      <ScrollView>

      { Object.entries(items ?? {}).map(([id, item]) => {
        return(
          <View key={id} style = {styles.itemList}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>Servings:</Text>
            <TextInput
              value={item.servings?.toString()}
              keyboardType='numeric'
              onChangeText={(t) => ref.child(mealID).child('items').child(id).update({servings: t})}
            />
            <Text>Total Calories: {item.servings * item.calories}</Text>
            <Button
                  key = {id}
                  title="Remove"
                  onPress={() => ref.child(mealID).child('items').child(id).remove()}
                />
          </View>
        )
      })}
      </ScrollView>

      <View style = {styles.buttonView}>
      <Button
        title="Add Item"
        onPress={() => navigation.navigate('Add Item', {itemID: null, mealID: mealID, barcode: ''})}
      />
      <Button 
        title="Save" 
        onPress={() => {
          saveMeal();
          navigation.navigate('Home');
        }} />
      </View>
{/*       
      <Text>the route.params.someData var is {route.params?.someData}</Text>
       */}
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
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
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
  mealName:{
    fontWeight: "600",
    padding: 20,
    paddingBottom: 0,
    fontSize: 32,
    textAlign: 'center'
  },
  itemName:{
    fontWeight: "900",
    padding: 0,
    paddingBottom: 0,
    fontSize: 20,
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