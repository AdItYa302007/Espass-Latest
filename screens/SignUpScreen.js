import React from 'react';
import { render } from 'react-dom';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'

export default class SignUpScreen extends React.Component {
  constructor(){
    super();
    this.state={
      firstName:'',
      lastName:'',
      contact:'',
      emailId:'',
      password:'',
      confirmPassword:''
    }
  }

  userSignUp = (emailId, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("Password doesn't match Check your password")
    }else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then(()=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          contact:this.state.contact,
          email_id:this.state.emailId,
        
        })
        {this.props.navigation.navigate('Login')}
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
          
             ]
         );
      })
      .catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }
  }

  render(){
  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
              <Icon
                color='#fff'
                name='comments'
                type='font-awesome'
                size={50}
              />
            </View>

            <Text style={styles.loginTitleText}>SignUp</Text>

            <View style={styles.hr}></View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel} >First Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                onChangeText={(text)=>{
                  this.setState({firstName:text})
                }}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                onChangeText={(text)=>{
                  this.setState({lastName:text})
                }}
              />
              </View>


              <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                keyboardType={'email-address'}
                onChangeText={(text)=>{
                  this.setState({emailId:text})
                }}
              />
              </View>

              <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Contact No</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                keyboardType={'number-pad'}
                onChangeText={(text)=>{
                  this.setState({contact:text})
                }}
              />
              </View>
              
              <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Master Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                onChangeText={(text)=>{
                  this.setState({password:text})
                }}
              />
              </View>

              
              <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                onChangeText={(text)=>{
                  this.setState({confirmPassword:text})
                }}
              />
              </View>
              </View>

            <TouchableOpacity style={styles.loginButton} onPress={()=>{
            this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
            }} >
              <Text style={styles.loginButtonText}>Register</Text>
                            
            </TouchableOpacity>
           

          </View>
        </View>
     </TouchableWithoutFeedback>
     </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#315bc4',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#44278f',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#44278f',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#315bc4',
    marginTop:5,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',

    fontSize: 16,
  },
  
});