import React, { useState } from 'react'
import { View } from 'react-native'
import { styles } from '../theme/styles'
import { Button, Text, TextInput } from 'react-native-paper'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { SnackbarComponent } from './components/SnackbarComponent'
import { Message } from './LoginScreen'

// interface - FormRegister
interface FormRegister {
  email: string,
  password: string,
}

// interface - PassComponent
interface PassComponent {
  icon: string,
  visible: boolean,
}

export const RegisterScreen = () => {

  // hook para obtener y actualizaar los valores ingresados en el formulario
  const [formRegister, setFormRegister] = useState<FormRegister>({
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

  // Navegación entre screens
  const navigation = useNavigation();

  // Función para setear los valores del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormRegister({...formRegister, [key]: value});
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

  // Función para registrar nuevos usuarios
  const handleRegister = async () => {
    // Verificar que os campos estén llenos
    if (!formRegister.email || !formRegister.password) {
      setShowMessage({
        visible: true,
        message: 'Completa todos los campos!',
        color: '#085f06'
      });
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      setShowMessage({
        visible: true,
        message: 'Registro exitoso!',
        color: '#085f06'
      });
    } catch (e) {
      setShowMessage({
        visible: true,
        message: 'No se logró completar la transacción, intente más tarde!',
        color: '#7a0808'
      });
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Regístrate</Text>
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
      <Button mode='contained' onPress={handleRegister}>Registrar</Button>
      <Text 
        style={styles.textRedirect}
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}
      >Iniciar sesión</Text>
      <SnackbarComponent showMessage={showMessage} setShowMessage={setShowMessage}/>
    </View>
  )
}
