import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut  } from '~/store/modules/auth/actions';

import { Container, Title, Form, FormInput, Separator, SubmitButton, LogoutButton } from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const nameRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(updateProfileRequest({
      name,
      email,
      oldPassword,
      password,
      confirmPassword
    }));
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (<Background>
            <Container>
              <Title>Meu perfil</Title>
              <Form>
                <FormInput 
                  icon="person-outline" 
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Nome completo"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current.focus()}
                  value={name}
                  onChangeText={setName}
                />                
                <FormInput 
                  icon="mail-outline" 
                  keyboardType="email-address" 
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Digite seu e-mail"
                  returnKeyType="next" // habilita botão para avançar para próximo campo
                  onSubmitEditing={() => oldPasswordRef.current.focus() } // recupera clique do botão ir para próximo campo e seta focus n password
                  value={email}
                  onChangeText={setEmail}
                />
                <Separator />
                
                <FormInput 
                  icon="lock-outline" 
                  secureTextEntry //para add * no lugar da senha
                  placeholder="Sua senha atual"
                  ref={oldPasswordRef}
                  returnKeyType="next" // habilita botão para avançar para próximo campo
                  onSubmitEditing={() => passwordRef.current.focus() } // recupera clique do botão ir para próximo campo e seta focus n password
                  value={oldPassword}
                  onChangeText={setOldPassword}
                />                

                <FormInput 
                  icon="lock-outline" 
                  secureTextEntry //para add * no lugar da senha
                  placeholder="Sua nova senha"
                  ref={passwordRef}
                  returnKeyType="next" // habilita botão para avançar para próximo campo
                  onSubmitEditing={() => confirmPasswordRef.current.focus() } // recupera clique do botão ir para próximo campo e seta focus n password
                  value={password}
                  onChangeText={setPassword}
                />                

                <FormInput 
                  icon="lock-outline" 
                  secureTextEntry //para add * no lugar da senha
                  placeholder="Confirmação de senha"
                  ref={confirmPasswordRef}
                  returnKeyType="send" // habilita botão de enviar os dados
                  onSubmitEditing={handleSubmit}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <SubmitButton onPress={handleSubmit}>Atualizar perfil</SubmitButton>                
                <LogoutButton onPress={handleLogout}>Sair do Gobarber</LogoutButton>                
              </Form>
            </Container>
         </Background>);
}

export default Profile;

Profile.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  )
};