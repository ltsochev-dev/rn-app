import React, {useContext, useState} from 'react';
import {StatusBar, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {styled} from 'nativewind';
import {AuthContext} from '@src/context/AuthContext';

const StyledView = styled(
  View,
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

const RegisterScreen: React.FC = ({navigation}) => {
  //   const auth = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStandardLogin = () => {
    setLoading(true);
    alert(`User ${name} - ${email} - ${password}`);
    setLoading(false);
  };

  const goToRegister = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#525e75" />
      <StyledView style={styles.mainView}>
        <StyledText className="text-white">Регистрация</StyledText>
        <InputView>
          <TextField
            placeholder="Name"
            placeholderTextColor="#333"
            onChangeText={str => setName(str)}
            textContentType={'name'}
            autoCorrect
            autoCapitalize="words"
          />
        </InputView>
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
            <StyledText className="text-white">Register</StyledText>
          </StyledButton>
        </View>
        <View className="mt-4">
          <StyledButton onPress={goToRegister} disabled={loading}>
            <StyledText className="text-white">Login</StyledText>
          </StyledButton>
        </View>
        {loading && (
          <View>
            <Text>Loading is true</Text>
          </View>
        )}
      </StyledView>
    </>
  );
};

const styles = {
  mainView: {
    backgroundColor: '#525e75',
  },
};

export default RegisterScreen;
