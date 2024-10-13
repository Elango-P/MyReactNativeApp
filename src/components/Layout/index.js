// Import React and Component
import React, {useEffect, useRef, useState} from 'react';

import {
  BackHandler,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import Header from './ActionBar';

import Menu from './NavigationDrawer';

import {useNavigation} from '@react-navigation/native';

import {Keyboard} from 'react-native';

import {isLoggedIn} from '../../lib/Helper';

import NetInfo from '@react-native-community/netinfo';  


import {Color} from '../../helper/Color';

import BackGroundFetch from '../BackGroundFetch';

import MessageSound from '../MessageSound';

import settingService from '../../services/SettingService';

import Setting from '../../lib/Setting';

import {Dimensions} from 'react-native';
import styles from '../../helper/Styles';
import platform from '../../lib/Platform';
import ProfileModal from './ProfileModal';
import TotalCard from '../TotalCard';
import Spinner from '../Spinner';



const Layout = ({
  children,
  title,
  buttonOnPress,
  buttonLabel,
  showBackIcon,
  backButtonNavigationUrl,
  FooterContent,
  bottomToolBar,
  showScanner,
  openScanner,
  hideFooterPadding,
  Add,
  AddOnPress,
  headerButtonDisabled,
  sync,
  label,
  onNavigate,
  showActionMenu,
  actionItems,
  params,
  updateValue,
  emptyMenu,
  showPortalName,
  accountId,
  Name,
  mobileNumber,
  profileUrl,
  HideSideMenu,
  isLoading,
  refreshing,
  buttonLabel2,
  button2OnPress,
  closeModal,
  showFilter,
  onFilterPress,
  showMessage,
  filter,
  showActionButton,
  control,
  onSelect,
  options,
  name,
  showStatusDropDown,
  data,
  currentStatusId,
  filteredValue,
  onActionMenuPress,
  showActionDrawer,
  backButtonNavigationOnPress,
  showLogo,
  showProfile,
  onProfileHandle,
  hideContentPadding,
  addButton,
  totalAmountValue,
  totalAmountLabel,
  isSubmit,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [themeColor, setThemeColor] = useState(Color.WHITE);

  const {BackgroundFetch} = NativeModules;
  const [isInternetConnection, setIsInternetConnection] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    settingService.get(
      Setting.MESSAGE_BACKGROUND_FETCH_INTERVAL,
      async (error, response) => {
        if (response && response?.settings && response.settings[0].value) {
          let interval = parseInt(response.settings[0].value);
          BackGroundFetch(MessageSound, interval);
        }
      },
    );

    getSessionToken();

    const NoInternet = NetInfo.addEventListener(handleConnectivityChange);
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );
    return () => {
      
      NoInternet();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);



  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    }

    return false;
  };

  const getSessionToken = async () => {
    await isLoggedIn(navigation);
  };

  

  const handleConnectivityChange = state => {
    setIsInternetConnection(state && state.isConnected);

    if (!state.isConnected) {
      navigation.navigate('NoInternet');
    }
  };

  const updateMenuState = isMenuOpen => {
    setMenuOpen(isMenuOpen);
    setSideMenuOpen(!isSideMenuOpen);
  };
  const backgroundColor = isInternetConnection
    ? showModal
      ? Color.WHITE
      : themeColor
    : Color.RED;
  const overlayWidth = Dimensions.get('window').width * 0.9;
  return (
    <>
      {showModal && (
        <ProfileModal
          showModal={showModal}
          setShowModal={setShowModal}
          profileUrl={profileUrl}
          mobileNumber={mobileNumber}
          accountId={accountId}
          Name={Name}
        />
      )}

      {showModal ? (
        <View>
          {Platform.OS === 'ios' ? (
            <View style={{height: '4%'}}>
              <View
                style={{
                  backgroundColor: themeColor,
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                }}
              />
              <View
                style={{
                  backgroundColor: backgroundColor,
                  width: overlayWidth,
                  height: '100%',
                }}
              />
              <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
              />
            </View>
          ) : (
            <View>
              <View
                style={{
                  backgroundColor: themeColor,
                  width: '100%',
                  height: StatusBar.currentHeight,
                  position: 'absolute',
                }}
              />
              <View
                style={{
                  backgroundColor: backgroundColor,
                  width: overlayWidth,
                  height: StatusBar.currentHeight,
                }}
              />
              <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
              />
            </View>
          )}
        </View>
      ) : platform.isIOS() ? (
        <View style={{backgroundColor: backgroundColor, height: '4%'}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={backgroundColor}
          />
        </View>
      ) : (
        <View style={{backgroundColor: backgroundColor}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={backgroundColor}
          />
        </View>
      )}

      {isSideMenuOpen ? (
        <SafeAreaView
          edges={['left', 'right', 'bottom']}
          style={styles.actionBar}>
          <Menu
            onItemSelected={'Settings'}
            user={''}
            navigator={navigation}
            isConnected={true}
            setSideMenuOpen={setSideMenuOpen}
            updateMenuState={updateMenuState}
            menuOpen={menuOpen}
          />
        </SafeAreaView>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <SafeAreaView edges={['left', 'right']} style={styles.actionBar}>
            <Header
              control={control}
              showStatusDropDown={showStatusDropDown}
              onSelect={onSelect}
              options={options}
              name={name}
              currentStatusId={currentStatusId}
              data={data}
              headerButtonDisabled={headerButtonDisabled}
              updateMenuState={updateMenuState}
              title={title}
              setStatusBar={setThemeColor}
              showActionButton={showActionButton}
              buttonLabel={buttonLabel}
              onPress={buttonOnPress}
              isSubmit={isSubmit}
              addButton={addButton}
              showBackIcon={showBackIcon}
              isKeyboardVisible={isKeyboardVisible}
              backButtonNavigationUrl={backButtonNavigationUrl}
              updateValue={updateValue}
              emptyMenu={emptyMenu}
              showScanner={showScanner}
              openScanner={openScanner}
              Add={Add}
              closeModal={closeModal}
              bottomToolBar={bottomToolBar}
              showPortalName={showPortalName}
              profileUrl={profileUrl}
              accountId={accountId}
              mobileNumber={mobileNumber}
              setShowModal={setShowModal}
              Name={Name}
              AddOnPress={AddOnPress}
              sync={sync}
              params={params}
              HideSideMenu={HideSideMenu}
              label={label}
              onNavigate={onNavigate}
              showActionMenu={showActionMenu}
              showFilter={showFilter}
              showMessage={showMessage}
              actionItems={actionItems}
              buttonLabel2={buttonLabel2}
              button2OnPress={button2OnPress}
              onFilterPress={onFilterPress}
              onActionMenuPress={onActionMenuPress}
              showActionDrawer={showActionDrawer}
              backButtonNavigationOnPress={backButtonNavigationOnPress}
              showLogo={showLogo}
              showProfile={showProfile}
              onProfileHandle={onProfileHandle}
            />

            <View>{filter}</View>
            <View>{filteredValue}</View>

            {isLoading && !refreshing ? (
              <Spinner />
            ) : (
              <View
                style={{
                  flex: 0.9,
                  paddingHorizontal: !hideContentPadding ? 10 : 0,
                }}>
                {children}
              </View>
            )}

            {FooterContent && (
              <View
                style={[
                  !hideFooterPadding
                    ? {paddingHorizontal: 10, marginBottom: 10}
                    : {paddingHorizontal: 0},
                ]}>
                {FooterContent}
              </View>
            )}
            <View>
              <TotalCard
                value={totalAmountValue && totalAmountValue?.toString()}
                label={totalAmountLabel}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};
export default Layout;
