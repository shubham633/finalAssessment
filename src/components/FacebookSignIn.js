import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export default class FacebookSignIn extends Component {
  constructor() {
    super();
    this.state = {
      user_name: '',
      token: '',
      profile_pic: '',
    };
  }

  get_Response_Info = (error, result) => {
    if (error) {
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      alert(JSON.stringify(result));
      this.setState({ user_name: 'Welcome' + ' ' + result.name });
      this.setState({ token: 'User Token: ' + ' ' + result.id });
      this.setState({ profile_pic: result.picture.data.url });
    }
  };

  onLogout = () => {
    this.setState({ user_name: null, token: null, profile_pic: null });
  };

  render() {
    return (
      <View>
        {this.state.profile_pic ? (
          <Image
            source={{ uri: this.state.profile_pic }}
            style={styles.imageStyle}
          />
        ) : null}
        <Text style={styles.text}> {this.state.user_name} </Text>
        <Text> {this.state.token} </Text>

        <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={(error, result) => {
            if (error) {
              alert(error);
              alert('login has error: ' + result.error);
            } else if (result.isCancelled) {
              alert('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                alert(data.accessToken.toString());

                const processRequest = new GraphRequest(
                  '/me?fields=name,picture.type(large)',
                  null,
                  this.get_Response_Info
                );
                new GraphRequestManager().addRequest(processRequest).start();
              });
              this.props.navigation.navigate('Welcome');
            }
          }}
          onLogoutFinished={this.onLogout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        padding: 20,
    },
    imageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
    },
});