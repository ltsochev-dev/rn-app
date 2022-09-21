import React, {useContext, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styled} from 'nativewind';
import {AuthContext} from '@src/context/AuthContext';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import MainView from '@src/components/MainView';

const StyledView = styled(
  SafeAreaView,
  'flex-1 items-center justify-center bg-dark-blue',
);
const StyledText = styled(Text);
const StyledButton = styled(
  TouchableOpacity,
  'text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
);
const InputView = styled(
  View,
  'my-2 w-72 h-10 rounded flex items-center bg-white',
);
const TextField = styled(TextInput, 'flex-1 h-14 p-3 ml-5 w-100');

const LoginScreen: React.FC = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStandardLogin = () => {
    setLoading(true);
    auth
      .login(email, password)
      .then(console.log)
      .catch(e => console.error('auth error', e))
      .then(() => setLoading(false));
  };

  const onLoginWithGoogle = async () => {
    setLoading(true);

    try {
      await auth.googleLogin();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
      console.error('error happened');
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#525e75" />
      <MainView>
        <StyledView style={styles.mainView}>
          <StyledText className="text-white">Вход</StyledText>
          <InputView>
            <TextField
              placeholder="E-mail address"
              placeholderTextColor="#333"
              onChangeText={str => setEmail(str)}
              textContentType={'emailAddress'}
              keyboardType="email-address"
              autoCorrect
              autoCapitalize="none"
            />
          </InputView>
          <InputView>
            <TextField
              placeholder="Password"
              placeholderTextColor="#333"
              secureTextEntry={true}
              onChangeText={str => setPassword(str)}
            />
          </InputView>
          <View className="mt-4">
            <StyledButton onPress={handleStandardLogin} disabled={loading}>
              <StyledText className="text-white">Login</StyledText>
            </StyledButton>
          </View>
          <View className="mt-4">
            <GoogleSigninButton
              onPress={onLoginWithGoogle}
              disabled={loading}
              className="w-48 h-12"
              size={GoogleSigninButton.Size.Wide}
            />
          </View>
          {loading && (
            <View>
              <Text>Loading is true</Text>
            </View>
          )}
        </StyledView>
      </MainView>
    </>
  );
};

const styles = {
  mainView: {
    backgroundColor: '#525e75',
  },
};

export default LoginScreen;
