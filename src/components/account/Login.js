import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import { Spinner } from '../common/Spinner';
import { auth } from '../../actions/CustomerAuthActions';
import NavigationService from '../../navigation/NavigationService';
import { NAVIGATION_SIGNIN_PATH } from '../../navigation/routes';

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  componentWillMount() {
    this.setState({
      email: 'test@test.com',
      password: 'Test1234'
    });
  }

  onLoginPress = () => {
    const { email, password } = this.state;
    this.props.auth(email, password);
  };

  onSigninPress = () => {
    this.props.navigation.navigate(NAVIGATION_SIGNIN_PATH);
  };

  renderButtons() {
    if (this.props.loading) {
      return <Spinner style={{ marginTop: 30 }} />;
    }

    return (
      <View>
        <TouchableOpacity onPress={this.onLoginPress} style={styles.button}>
          <Text style={styles.buttonTitle}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onSigninPress} style={[styles.button, styles.buttonMargin]}>
          <Text style={styles.buttonTitle}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderMessages() {
    const { error, success } = this.props;
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    if (success) {
      return <Text style={styles.success}>{success}</Text>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.inputContainer, styles.offsetTop]}>
          <TextInput
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholder="Email"
            autoCorrect={false}
            style={styles.input}
            value={this.state.email}
            onChangeText={value => this.setState({ email: value })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            secureTextEntry
            placeholder="Password"
            autoCorrect={false}
            style={styles.input}
            value={this.state.password}
            onChangeText={value => this.setState({ password: value })}
          />
        </View>
        {this.renderButtons()}
        {this.renderMessages()}
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  input: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.BORDER_GRAY,
    width: Sizes.WINDOW_WIDTH * 0.7,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20
  },
  offsetTop: {
    marginTop: Sizes.WINDOW_HEIGHT * 0.2
  },
  button: {
    borderWidth: 1,
    backgroundColor: Colors.BORDER_GRAY,
    borderColor: Colors.BORDER_GRAY,
    width: Sizes.WINDOW_WIDTH * 0.7,
    height: 40,
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    alignSelf: 'center'
  },
  buttonMargin: {
    marginTop: 20
  },
  error: {
    color: 'red',
    width: Sizes.WINDOW_WIDTH * 0.85,
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20
  },
  success: {
    width: Sizes.WINDOW_WIDTH * 0.85,
    color: '#01640B',
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: '#E5EFE5',
    padding: 5,
    marginTop: 20
  },
});

const mapStateToProps = ({ customerAuth }) => {
  const { error, success, loading } = customerAuth;

  return { error, success, loading };
};

export default connect(mapStateToProps, { auth })(Login);
