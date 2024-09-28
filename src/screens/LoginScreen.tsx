import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { SnackbarComponent } from './components/SnackbarComponent'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

// interface - FormLogin
interface FormLogin {
  email: string,
  password: string,
}

// interface - PassComponent
interface PassComponent {
  icon: string,
  visible: boolean,
}

// interface - Message
export interface Message {
  visible: boolean,
  message: string,
  color: string,
}

export const LoginScreen = () => {

  // hook para obtener y actualizar el formulario de login
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: ''
  });

  // hook para actualizar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState<PassComponent>({
    icon: 'eye',
    visible: true
  });

  // hook para cambiar el estado del snackbar
  const [showMessage, setShowMessage] = useState<Message>({
    visible: false,
    message: '',
    color: '#fff'
  });

  // hook para la navegación
  const navigation = useNavigation();

  // Función para cambiar los valores del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormLogin({ ...formLogin, [key]: value });
  }

  // Función para cambiar la visibilidad de la contraseña
  const handleShowPassword = () => {
    if (showPassword.visible) {
      setShowPassword({
        icon: 'eye-off',
        visible: false
      });
    } else {
      setShowPassword({
        icon: 'eye',
        visible: true
      });
    }
  }

  // Función para iniciar sesión
  const handleSignIn = async () => {
    if (!formLogin.email || !formLogin.password) {
      setShowMessage({
        visible: true,
        message: 'Completa todos los campos!',
        color: '#7a0808'
      });
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
    } catch (e) {
      setShowMessage({
        visible: true,
        message: 'Correo y/o contraseña incorrecta',
        color: '7a0808'
      });
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Inicia sesión</Text>
      <TextInput
        label="Email"
        mode='outlined'
        placeholder='Ingrese su correo electrónico'
        onChangeText={(value) => handleSetValues('email', value)}
      />
      <TextInput
        label="Contraseña"
        mode='outlined'
        placeholder='Ingrese su contraseña'
        onChangeText={(value) => handleSetValues('password', value)}
        right={<TextInput.Icon icon={showPassword.icon} onPress={handleShowPassword} />}
        secureTextEntry={showPassword.visible}
      />
      <Button mode='contained' onPress={handleSignIn}>Ingresar</Button>
      <Text
        style={styles.textRedirect}
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}
      >Registrar cuenta de administrador</Text>
      <SnackbarComponent showMessage={showMessage} setShowMessage={setShowMessage} />
    </View>
  )
}
