import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CommonLayout = ({children, onAddPress, title, onUserIconPress}) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {onUserIconPress && 
        <TouchableOpacity
          style={styles.userIconContainer}
          onPress={onUserIconPress}>
          <Image
            source={require('../../assets/loginimage.jpg')}
            style={styles.userIcon}
          />
        </TouchableOpacity>
}
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {React.Children.map(children, (child) => {
          return typeof child === 'string' ? (
            <Text>{child}</Text>
          ) : (
            child
          );
        })}
      </View>

      {/* Bottom Icons Section */}
      <View style={styles.bottomIcons}>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../../assets/home.png')}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../../assets/purchase.png')}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../../assets/product.png')}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../../assets/sale.png')}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../../assets/bills.png')}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Bills</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007BFF',
    zIndex: 1, // Ensures the header is above the content
  },
  userIconContainer: {
    marginRight: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 70, // Adjust padding to avoid content being hidden under the header
  },
  bottomIcons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    zIndex: 1, // Ensures the bottom icons are above the content
  },
  iconContainer: {
    alignItems: 'center',
    width: screenWidth * 0.2,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CommonLayout;
