import React, { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera'

class ScannerScreen extends Component {
    state = {
        barcodes: []
      }
      
      barcodeRecognized = ({ barcodes }) => {
        barcodes.forEach(barcode => console.log(barcode.data))
        this.setState({ barcodes })
      }
      renderBarcodes = () => (
        <View>{this.state.barcodes.map(this.renderBarcode)}</View>
      )
      
      renderBarcode = ({ data }) => {
        navigation.navigate('Add Item', {itemID: null, mealID: mealID, barcode: data})
      }
    render() {
      return (
        <View style={styles.container}>
          <RNCamera
  ref={ref => {
    this.camera = ref
  }}
  style={styles.scanner}
  onGoogleVisionBarcodesDetected={this.barcodeRecognized}>
  {this.renderBarcodes}
</RNCamera>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
    },
    // add the following
    scanner: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  })
  
  export default ScannerScreen