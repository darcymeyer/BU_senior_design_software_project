import * as React from 'react';
import { Button, View, Text, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';


export default function EditMealScreen({ navigation, route }) {
  const[meal, setMeal] = React.useState('New Meal')
  const[items, setItems] = React.useState([
    {name: 'flour', key: '1'},
    {name: 'sugar', key: '2'},
    {name: 'egg', key: '3'},
    {name: 'oil', key: '4'},
    {name: 'cinnamon', key: '5'},
  ]);
  return (
    <View style = {{flex: 1}}>
      <View> 
        
      <TextInput
          style = {styles.mealName}
          textAlign = 'center'
          placeholder='New Meal'
          onChangeText={(val) => setMeal(val)}
        />
        
        <Text style = { styles.label }>Meal Name</Text>
      </View>
      
      <Separator />
      
      <Text style = {styles.header}>INGREDIANTS</Text>

      <ScrollView>

      { items.map((item) => {
        return(
          <View key={item.key} style = {styles.itemList}>
            <Text>{item.name}</Text>
          </View>
        )
      })}
      </ScrollView>

      <View style = {styles.buttonView}>
      <Button
        title="Add Item"
        onPress={() => navigation.navigate('Add Item')}
      />
      <Button 
        title="Save" 
        onPress={() => navigation.navigate('Home')} />
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
  mealName:{
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