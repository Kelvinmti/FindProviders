import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png'

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';


import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);// 
  
  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput 
            icon="mail-outline" 
            keyboardType="email-address" 
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next" // habilita botão para avançar para próximo campo
            onSubmitEditing={() => passwordRef.current.focus() } // recupera clique do botão ir para próximo campo e seta focus n password
            value={email}
            onChangeText={setEmail}
          />
          <FormInput 
            icon="lock-outline" 
            secureTextEntry //para add * no lugar da senha
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send" // habilita botão de enviar os dados
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp') }>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>);
}

export default SignIn;