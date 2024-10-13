import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if email or password is empty
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    } else if (!password) {
      Alert.alert('Error', 'Please enter your password.');
      return;
    }

    Alert.alert('Login', `Email: ${email}\nPassword: ${password}`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Home'), // Navigate to Home Screen
      },
    ]);
  };

  return (
    <ImageBackground
      source={require('../../../assets/loginimage.jpg')} // Replace with your background image
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Please enter your details to login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.5, // Adjust this to change image visibility
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
    marginVertical: 5,
  },
});

export default LoginScreen;
