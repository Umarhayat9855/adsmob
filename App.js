import React, { Component } from 'react';
import { View,Text,Image,TouchableOpacity, Alert,TextInput,StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as firebase from 'firebase';
const options = {
  title: 'My Pic App',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};

class App extends Component {
  state = { 
    avatarSource: null,
    pic: null,
    email:'',
    password:'',

   }
   componentDidMount(){
    var firebaseConfig = {
      apiKey: "AIzaSyBZNkYzWIW_KDHKg4owsUY5EVx3bOAMGgk",
      authDomain: "reactnativetesting-19530.firebaseapp.com",
      databaseURL: "https://reactnativetesting-19530.firebaseio.com/",
      projectId: "reactnativetesting-19530",
      storageBucket: "reactnativetesting-19530.appspot.com",
     // messagingSenderId: "495672359697",
      appId: "1:1009823428846:android:7645440a9ce3fe3a1743ff",
     // measurementId: "G-L673V4FK4K"
    };
    if(!firebase.app.length){
      firebase.initializeApp(firebaseConfig)
      // let firestore = firebase.firestore();
    }
  //   // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
 
     firebase.auth().onAuthStateChanged(user => {
          if(user){
            {()=>this.login_Match}
          }else{
           {()=>this.login_NotMatch}
          }
  })   
}
login_Match=()=>{
  Alert.alert("Login Successfully");
}
login_NotMatch=()=>{
  Alert.alert("Login Faild");
}
   myfun = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};

        this.setState({
          avatarSource: source,
          pic: response.data,
        });
      }
    });
  };
  onBottomPress = () =>{
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    .then(this.login_Match)
    .catch(err => {
        // this.setState({
        //     error:err.message
        // })
        Alert.alert(err.massage);
    })
}
  render() { 
    return ( 
      <View>
        <Text>
          My Name is muhammad Umar Hayat
        </Text>
          <TouchableOpacity  onPress={this.myfun}>
            <Text >Upload photo</Text>
          </TouchableOpacity>
          <Image source={this.state.avatarSource} style={{width:300,height:300}}/>
          <TextInput
                    placeholder="Email" 
                    style={styles.input} 
                    //value={this.state.Signupemail}
                    onChangeText={email=> this.setState({email})}
                     />
                <TextInput 
                    placeholder="password" 
                    style={styles.input}
                    //secureTextEntry
                     //value={this.state.Signuppassword}
                     onChangeText={password => this.setState({password})}
                     />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.onBottomPress} >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{textAlign:'center',marginTop:30}}>{</Text>
      </View>
     );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding:20
  },
  input:{
      height:40,
      backgroundColor:'rgba(255,255,255,.5)',
      paddingLeft:10,
      marginBottom:15,
      borderRadius:5,
      fontSize:15,
  },
  errorText:{
      fontSize:25,
      color:'red',
      alignSelf:'center',
      marginTop:10
  },
  buttonText:{
      textAlign:'center',
      color:'#fff',
      fontWeight:'bold',
      fontSize:20,
      marginBottom:10,
  },
  buttonContainer:{
      backgroundColor:'#3B3B98',
      padding:25,
      borderRadius:8
  },
  signupbtn : {
      backgroundColor:'red',
      padding:15,
      borderRadius:8,
      marginTop : 10
  }
});
export default App;