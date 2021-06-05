import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform,Icon,ImageBackground,Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class userProfile extends Component{
  constructor(){
    super()
    this.state = {
    //  email:firebase.auth().currentUser.email,

     userId: firebase.auth().currentUser.email,
     username: "",
     userConatct:"",
     image:"",
     userEmail:""
    }
  this.requestRef= null
  }

  getUserData=()=>{
    
    db.collection('users').where('emailId','==',this.state.userId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({
        username:doc.data().firstName + ' '+ doc.data().lastName,
        userContact:doc.data().contactNo,
        userEmail:doc.data().emailId
        
        })
     })
  })


  }

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  componentDidMount(){
    this.getUserData()
   // this.fetchImage(this.state.userId)
  }

  componentWillUnmount(){
    this.requestRef();
  }



  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          {
            this.state.username === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>Please fill your details</Text>
              </View>
            )
            :(
              
              <View style={styles.headerContainer}>
              <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                source={require("../assets/profile.png")}
              >
                <View style={styles.headerColumn}>
                  <Image
                    style={styles.userImage}
                    source={{uri:this.state.image}}
                    source={require("../assets/profile.png")}
                  />
                  
                  <View style={styles.userAddressRow}>
                   
                  <Text style={styles.userNameText}>{this.state.username}</Text>
                  <Text style={styles.userNameText}>{this.state. userContact}</Text>
                  <Text style={styles.userNameText}>{this.state.emailId}</Text>
                    
                  </View>

                  <View style={styles.userAddressRow}>
                   
                 
                  <Text style={styles.userNameText}>{this.state. userContact}</Text>
                
                    
                  </View>
                  <View style={styles.userAddressRow}>
                   
               
              
                  <Text style={styles.userNameText}>{this.state.userAge}</Text>
                    
                  </View>
                </View>
              </ImageBackground>
            </View>


            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  
  button:{
    width:"75%",
    height:50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    backgroundColor:"blue",
    marginTop:250,
     
  },
  buttonText:{
    fontSize:25,
    fontWeight:"bold",
    color:"white",
  },
  text:{
    fontSize: 22,
    marginLeft:15,
    marginTop:15,
    color:"#59FFF5"
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
     textAlign: 'center',
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
})
