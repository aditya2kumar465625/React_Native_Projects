import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, Modal, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const App = () => {
  const [txt, settxt] = useState('');
  const [visible, setvisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>QR Code Generator</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={settxt}
            style={styles.input}
            placeholder="Enter text..."
            value={txt}
          />
          <TouchableOpacity
            onPress={() => {
              setvisible(true);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Generate</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" visible={visible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setvisible(false);
            }}
            style={styles.closeButton}>
            <Image style={styles.closeIcon} source={require('./assets/cross.png')} />
          </TouchableOpacity>
          <View style={styles.qrContainer}>
            <QRCode
              value={txt}
              logo={require('./assets/logo.jpg')}
              size={250}
              color="#333"
              backgroundColor="transparent"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  closeIcon: {
    height: 24,
    width: 24,
    tintColor: '#fff',
  },
  qrContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});

export default App;
