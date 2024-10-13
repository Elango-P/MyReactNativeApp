import React from 'react';
import { Color } from '../helper/Color';
import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon set
import Label from './Label';

const NoRecordFound = (props) => {
  const { iconName, styles, message, paddingVertical } = props;
  return (
    <View style={styles ? styles : { paddingVertical: paddingVertical ? paddingVertical : 250, alignItems: "center" }}>
      <Icon name={iconName} size={20} color={Color.PRIMARY} />
      <Label text={message ? message : "No Records Found"} bold={true} />
    </View>
  );
}

export default NoRecordFound;
