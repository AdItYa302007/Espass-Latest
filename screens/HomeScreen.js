import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem,Icon,Button } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import CreditCardDisplay from 'react-native-credit-card-display';

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      AppPasswords : []
    }
  this.requestRef= null
  }

  getAppPasswords =()=>{
    this.requestRef = db.collection("details")
    .onSnapshot((snapshot)=>{
      var AppPasswords = snapshot.docs.map((doc) => doc.data())
      this.setState({
        AppPasswords : AppPasswords
      });
    })
  }

  componentDidMount(){
    this.getAppPasswords()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
<CreditCardDisplay
    number={456425895412}
    cvc={123}
    expiration="04/21"
    name={item.AppName}
    since={item.DateCreated}
  />
  
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Saved Passwords" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.AppPasswords.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>No Passwords Saved!!</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.AppPasswords}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
        <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#fff'

            }}>
        <View style={{ position: 'absolute', padding: 5, alignSelf: 'center', backgroundColor: '#fff', width: 70, height: 70, borderRadius: 35, bottom: 25, zIndex: 5 }}>
                    <Button
                        icon={{
                            name: 'plus',
                            type: 'feather',
                            color: '#fff',
                            style: { marginRight: 0 }
                        }}
                        onPress={() => this.doSomething()}
                        buttonStyle={{ backgroundColor: '#000', width: 60, height: 60, borderRadius: 30 }}
                        containerViewStyle={{ alignSelf: 'center' }}
                    />
                </View>
                <View style={{ position: 'absolute', backgroundColor: '#3F51B5', bottom: 0, zIndex: 1, width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
                    <Icon
                        name='list'
                        type='feather'
                        color='#fff'
                        onPress={() => this.doSomething()} // Ex : openDrawer() in react-navigation

                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon
                            name='heart'
                            type='feather'
                            color='#fff'
                            containerStyle={{ marginHorizontal: 10 }}
                        />
                        <Icon
                            name='search'
                            type='feather'
                            color='#fff'
                        />
                    </View>
                </View>
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
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#44278f",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})

