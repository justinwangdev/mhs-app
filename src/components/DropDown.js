import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../core/theme';

const DropDown = ({error, ...props }) => (
    <DropDownPicker
      containerStyle={styles.container}
      style={error?(styles.error):(styles.inner)}
      placeholderStyle={error?(styles.errorPlaceholder):(styles.placeholder)}
      labelStyle={styles.labels}
      itemStyle={{ justifyContent: 'flex-start' }}
      dropDownStyle={{ backgroundColor: theme.colors.surface}}
      searchablePlaceholderTextColor={theme.colors.text}
      seachableStyle={styles.labels}
      activeLabelStyle={{ color: theme.colors.primary }}
      arrowColor={error?(theme.colors.error):(theme.colors.text)}
      {...props}
    />
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    marginVertical: 12,
  },
  inner: {
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderTopLeftRadius: 5, borderTopRightRadius: 5,
    borderBottomLeftRadius: 5, borderBottomRightRadius: 5
  },
  error:{
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.error,
    borderWidth: 2,
    borderTopLeftRadius: 5, borderTopRightRadius: 5,
    borderBottomLeftRadius: 5, borderBottomRightRadius: 5
  },
  labels:{
    fontSize:15,
    color: theme.colors.text
  },
  placeholder:{
    fontSize:15,
    color: theme.colors.primary
  },
  errorPlaceholder:{
    fontSize:15,
    fontWeight: 'bold',
    color: theme.colors.error
  },
  // errorText: {
  //   fontSize: 14,
  //   color: theme.colors.error,
  //   paddingHorizontal: 4,
  //   marginBottom: 12,
  //   marginTop: 4
  // },
});

export default memo(DropDown);
