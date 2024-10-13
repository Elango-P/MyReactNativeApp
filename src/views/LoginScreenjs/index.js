import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import Validation from '../../lib/Validation';
import Alert from '../../components/Modal/Alert';
import AppID from '../../lib/AppID';
import apiClient from '../../apiClient';
import {endpoints} from '../../helper/ApiEndPoint';
import asyncStorageService from '../../services/AsyncStorageService';
import userDeviceInfoService from '../../services/UserDeviceInfoService';
import settingService from '../../services/SettingService';
import Setting from '../../lib/Setting';
import platform from '../../lib/Platform';
import AsyncStorageObject from '../../lib/AsyncStorage';
import onePortalDB from '../../db/onePortalDB';
import storeService from '../../services/StoreService';

let DeviceInfo;

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pushNotificationToken, setPushNotificationToken] = useState(null);
  console.log(
    '------------------------>>>>>>>> ~ pushNotificationToken:',
    pushNotificationToken,
  );
  const [appVersion, setAppVersion] = useState('');

 
  
  const LogInRedirection = async response => {
    try {
      let role = response?.data?.user ? response.data.user.role.toString() : '';
      console.log("------------------------>>>>>>>> ~ role:", role)

      let userId = response?.data?.user ? response.data.user.id.toString() : '';
      console.log("------------------------>>>>>>>> ~ userId:", userId)

      let locationList = response?.data?.user
      ? response?.data?.user.locationList
      : [];
      console.log("------------------------>>>>>>>> ~ locationList:", locationList)

      let permissionList = response?.data?.user
      ? response?.data?.user.permissionList
      : [];
      console.log("------------------------>>>>>>>> ~ permissionList:", permissionList)

      let settingList = response?.data?.user
        ? response?.data?.user.settingList
        : [];

      let token = response?.data?.user
        ? response.data.user.token.toString()
        : '';

      let firstName = response?.data?.user?.firstName
        ? response?.data?.user?.firstName
        : '';

      let lastName = response?.data?.user?.lastName
        ? response?.data?.user?.lastName
        : '';

      let accountId = response?.data?.user?.accountId
        ? response?.data?.user?.accountId
        : '';

      let featureList = response?.data?.user?.featureList
        ? response?.data?.user?.featureList
        : [];

      let name = `${firstName} ${lastName}`;
      let app_id = response?.data?.user
        ? response.data.user.app_id && response.data.user.app_id.toString()
        : '';

      await asyncStorageService.setSessionToken(token);

      await asyncStorageService.setUserName(name);

      await asyncStorageService.setRoleId(role);

      await asyncStorageService.setUserId(userId);

      await asyncStorageService.setAppId(app_id);

      if (accountId) {
        await asyncStorageService.setAccountId(accountId.toString());
      }

      //validate permission list
      if (permissionList && Array.isArray(permissionList)) {
        //convert JSON into string
        permissionList = JSON.stringify(permissionList);
        //set in local storag
        await asyncStorageService.setPermissions(permissionList);
      }
      if (settingList && Array.isArray(settingList)) {
        settingList = JSON.stringify(settingList);
        await asyncStorageService.setSettings(settingList);
      }

      if (featureList && Array.isArray(featureList)) {
        //convert JSON into string
        featureList = JSON.stringify(featureList);
        //set in local storag
        await asyncStorageService.setAppFeatures(featureList);
      }

      await onePortalDB.create();

      navigation.navigate('Home', {login: true});

      if (AppID.isZunoMartStore() || AppID.isThiDiff() || AppID.isZunoStar()) {
        if (locationList && locationList.length == 1) {
          asyncStorageService.setSelectedLocationName(locationList[0].name);

          asyncStorageService.setSelectedLocationId(
            locationList[0].id.toString(),
          );

          await navigation.navigate('Home', {login: true});

          setPassword('');
          setEmail('');
        } else {
          storeService.GetLocationByIpAndGeoLocation(
            {longitude: location?.longitude, latitude: location?.latitude},
            async (err, response) => {
              if (response && response.data && response.data.locationDetail) {
                asyncStorageService.setSelectedLocationName(
                  response.data.locationDetail.name,
                );

                asyncStorageService.setSelectedLocationId(
                  response.data.locationDetail.id.toString(),
                );

                await navigation.navigate('Home', {login: true});

                setPassword('');
                setEmail('');
              } else {
                await settingService.get(
                  Setting.SHOW_STORE_SELECTION_ON_LOGIN,
                  async (error, response) => {
                    if (
                      response?.settings &&
                      response.settings.length > 0 &&
                      response.settings[0].value === 'true'
                    ) {
                      await navigation.navigate('Settings/SelectStore', {
                        isInitialSetup: true,
                        locationByRole: true,
                      });
                      setPassword('');
                      setEmail('');
                    } else {
                      navigation.navigate('Home', {login: true});
                      setPassword('');
                      setEmail('');
                    }
                  },
                );
              }
            },
          );
        }
      } else if (AppID.isZunoMart()) {
        setPassword('');
        setEmail('');
        navigation.navigate('Home');
      } else {
        if (locationList && locationList.length == 1) {
          asyncStorageService.setSelectedLocationName(locationList[0].name);
          asyncStorageService.setSelectedLocationId(
            locationList[0].id.toString(),
          );
          await navigation.navigate('Home', {login: true});
          setPassword('');
          setEmail('');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDeviceInfo = async responseData => {
    const userId = await asyncStorageService.getUserId();

    let params = {user: userId};
    await userDeviceInfoService.search(params, async (err, response) => {
      console.log("------------------------>>>>>>>> ~ response:", response)
      if (response.data?.data[0].reset_mobile_data === 'true') {
        AsyncStorageObject.clearAll({
          isClearAll: true,
        });
        return await LogInRedirection(responseData);
      } else {
        return await LogInRedirection(responseData);
      }
    });
  };

  const handleLogin = () => {
    try {
      if (!email || !password) {
        Alert.Error(
          !email && !password
            ? 'Email or Mobile Number and Password is required'
            : !password
            ? 'Password is required'
            : 'Email or Mobile Number is required',
        );
      } else {
        if (isNaN(email.charAt(0))) {
          // check if the first character is not a number (i.e. email)
          if (!Validation.isValidEmail(email)) {
            Alert.Error('Email is invalid');
          }
        } else {
          // first character is a number (i.e. mobile number)
          if (!Validation.isValidMobileNumber(email)) {
            Alert.Error('Mobile Number is invalid');
          }
        }
      }
      if (
        Validation.isValidEmail(email) ||
        Validation.isValidMobileNumber(email)
      ) {
        if (email && password) {
          let data = {
            email: email.toLowerCase(),
            password: password,
            isMobileLogin: true,
            // appVersion: version,
            isCustomerApp: AppID.isZunoMart() ? true : false,
            nameSpace: 'com.zunostar',
            pushNotificationToken: pushNotificationToken,
          };
          console.log("------------------------>>>>>>>> ~ data:", data)

          apiClient.post(
            `${endpoints().UserAPI}/mobileLogin`,
            data,
            async (error, response) => {
              if (response && response.data && response.data.appVersionUpdate) {
                let appId = AppID.getAppId();
                let showUpdateOption =
                  Platform.OS == 'ios' &&
                  (AppID.isZunoMart() ||
                    AppID.isZunoMartStore() ||
                    AppID.isThiDiff()) &&
                  appId
                    ? true
                    : Platform.OS == 'android' && appId
                    ? true
                    : false;
                Alert.Error(
                  response.data.message,
                  showUpdateOption ? onUpdate : null,
                  showUpdateOption ? 'Update' : 'Ok',
                  'Update Required',
                );
              } else if (response && response.data && response.data.user) {
                let token = response?.data?.user
                  ? response.data.user.token.toString()
                  : '';
                await asyncStorageService.setSessionToken(token);

                if (
                  AppID.isZunoMartStore() ||
                  AppID.isThiDiff() ||
                  AppID.isZunoStar
                ) {
                  let bodyData = {
                    user: response.data.user.id,
                    versionNumber: appVersion,
                    app_id: AppID.getAppId(),
                  };

                  userDeviceInfoService.create(
                    bodyData,
                    token,
                    async (error, userInfoResponse) => {
                      await settingService.get(
                        Setting.DEVICE_APPROVAL_REQUIRED,
                        async (error, res) => {
                          if (
                            res?.settings &&
                            res.settings.length > 0 &&
                            res.settings[0].value === 'true'
                          ) {
                            if (!DeviceInfo || platform.isIOS()) {
                              getDeviceInfo(response);
                            }
                            if (
                              userInfoResponse &&
                              userInfoResponse.data &&
                              userInfoResponse.data.deviceInfoDetail
                            ) {
                              let deviceInfo =
                                userInfoResponse?.data?.deviceInfoDetail;
                              if (deviceInfo) {
                                let userDeviceInfoStatus =
                                  deviceInfo?.status ==
                                  UserDeviceInfo.STATUS_BLOCKED_VALUE
                                    ? UserDeviceInfo.STATUS_BLOCKED_TEXT
                                    : deviceInfo?.status ==
                                      UserDeviceInfo.STATUS_PENDING_VALUE
                                    ? UserDeviceInfo.STATUS_PENDING_TEXT
                                    : deviceInfo?.status ==
                                      UserDeviceInfo.STATUS_APPROVED_VALUE
                                    ? UserDeviceInfo.STATUS_APPROVED_TEXT
                                    : '';
                                await asyncStorageService.setDeviceInfoStatus(
                                  userDeviceInfoStatus,
                                );
                                getDeviceInfo(response);
                              }
                            }
                          } else {
                            getDeviceInfo(response);
                          }
                        },
                      );
                    },
                  );
                } else {
                  getDeviceInfo(response);
                }
              } else if (error) {
                let errorMessage;
                const errorRequest = error?.response?.request;
                if (errorRequest && errorRequest.response) {
                  errorMessage = JSON.parse(errorRequest.response).message;
                  alert(errorMessage);
                }
              }
            },
          );
        }
      }
    } catch (error) {
      if (error) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
          let responseError = error.response.data.message;
          Alert.Error(responseError);
        }
      }
    }
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
