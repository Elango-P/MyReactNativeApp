import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import CommonLayout from '../../components/CommonLayout';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import VerticalSpace10 from '../../components/VerticalSpace10';

const HomeScreen = () => {
  const navigation = useNavigation(); // Access navigation prop
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddPress = () => {
    setModalVisible(true); // Open the modal
  };


  const handleSubmit = () => {
    // Handle the form submission here
    alert(`Name: ${name}\nLast Name: ${lastName}\nEmail: ${email}`);
    setModalVisible(false); // Close the modal after submission
  };

  return (
    <ImageBackground
      source={require('../../../assets/loginimage.jpg')} // Replace with your background image
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <CommonLayout title="" onUserIconPress={handleAddPress}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.welcomeText}>Welcome to Coconut App!</Text>

      
          <View style={styles.featuresContainer}>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>Accounts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>Purchase</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>Sales</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>User</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </CommonLayout>

      {/* Modal for user input */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>User Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Button title="Submit" onPress={handleSubmit} />
            <VerticalSpace10/>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.5, // Adjust this to change image visibility
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresContainer: {
    marginTop: 30,
    width: '100%',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  featureButton: {
    padding: 15,
    borderRadius: 25,
    backgroundColor:"blue",
    marginBottom: 10,
    alignItems: 'center',
  },
  featureButtonText: {
    fontSize: 16,
    color: '#333',
    color:"white"

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background for modal
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default HomeScreen;
