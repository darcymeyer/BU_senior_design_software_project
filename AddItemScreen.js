import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';


export default function AddItemScreen({ navigation, route }) {
  const [ID, setID] = React.useState('');
  const [item, setItem] = React.useState({name: '', description: '', calories: ''});
  return (
    <View style={styles.mainView}>
      
      <View>
        <TextInput
          style = {styles.barcode}
          keyboardType='numeric'
          placeholder='######'
          onChangeText={(val) => {setID(val); fetchData(val)}}
        />
        <Text style = {styles.label}>Enter Barcode</Text>  
      </View>
      <View>
        <Text>{ID}</Text>
      </View>
      <Button title="Add" onPress={() => navigation.navigate('Edit Meal')} />
    </View>
  );

  function fetchData(){
    //This is where the api data should be fetched. Set the name, description, and calories to jsonName, jsonDescription, and jsonCalories respectively
    () => setItem({name: {jsonName}, description: {jsonDescription}, calories: {jsonCalories}})
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
  
});


