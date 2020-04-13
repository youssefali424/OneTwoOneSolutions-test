import React, {Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Fumi} from 'react-native-textinput-effects';
import MainButton from '_molecules/buttons/mainButton';
import {Text} from 'native-base';
import fontStyles from '_styles/font/fontStyle';

export interface FormInputs {
  email?: string;
  password?: string;
  name?: string;
}
interface FormProps {
  onSubmit: (values: FormInputs) => void;
  submitText: string;
  email?: boolean;
  password?: boolean;
  name?: boolean;
}
const getValidationSchema = (props: FormProps) => {
  let object: any = {};
  if (props.email) {
    object.email = Yup.string()
      .required('please enter your Email')
      .email('please enter a valid Email');
  }
  if (props.name) {
    object.name = Yup.string().required('please enter your name');
  }
  if (props.password) {
    object.password = Yup.string()
      .required('please enter your password')
      .min(6, 'please enter atleast 6 characters');
  }
  const validationSchema = Yup.object().shape(object);
  return validationSchema;
};

const MyForm = (props: FormProps) => (
  <Formik
    initialValues={{email: '', name: '', password: ''}}
    onSubmit={(values, {resetForm}) => {
      props.onSubmit(values as FormInputs);
      resetForm();
    }}
    validationSchema={getValidationSchema(props)}>
    {({values, handleChange, handleSubmit, touched, errors, handleBlur}) => {
      return (
        <Fragment>
          <View style={[styles.formBackground, styles.formContainer]}>
            {props.email && (
              <Fumi
                label={'Email'}
                style={[styles.formBackground, styles.inputStyle]}
                labelStyle={styles.label}
                iconClass={Ionicons}
                iconName={'ios-mail'}
                iconColor={'#3B3C4E'}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                value={(values as any).email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
            )}
            {(touched as any).email && (errors as any).email && (
              <Text style={fontStyles.error}>{(errors as any).email}</Text>
            )}
            {props.name && (
              <Fumi
                label={'Name'}
                iconClass={Ionicons}
                style={[styles.formBackground, styles.inputStyle]}
                labelStyle={styles.label}
                iconName={'ios-person'}
                iconColor={'#3B3C4E'}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                value={(values as any).name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
            )}
            {(touched as any).name && (errors as any).name && (
              <Text style={fontStyles.error}>{(errors as any).name}</Text>
            )}
            {props.password && (
              <Fumi
                label={'Password'}
                style={[styles.formBackground, styles.inputStyle]}
                labelStyle={styles.label}
                iconClass={Ionicons}
                iconName={'ios-lock'}
                iconColor={'#3B3C4E'}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                value={(values as any).password}
                onChangeText={handleChange('password')}
                secureTextEntry={true}
                onBlur={handleBlur('password')}
              />
            )}
            {(touched as any).password && (errors as any).password && (
              <Text style={fontStyles.error}>{(errors as any).password}</Text>
            )}
          </View>
          <MainButton onclick={handleSubmit} text={props.submitText} />
        </Fragment>
      );
    }}
  </Formik>
);
const styles = StyleSheet.create({
  inputStyle: {
    borderBottomColor: '#3B3C4E',
    borderBottomWidth: 1,
  },
  formBackground: {
    backgroundColor: '#e6e7e8',
  },
  formContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#e6e7e8',
    padding: 10,
  },
  label: {
    // color: '#3B3C4E',
  },
});
export default MyForm;
