import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import firebase from '@firebase/auth'
import { updateProfile, signOut } from 'firebase/auth'
import { auth } from '../../../config/firebaseConfig'
import { SnackbarComponent } from '../../components/SnackbarComponent'
import { Message } from '../../LoginScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

// interface - FormUser
interface FormUser {
  name: string,
}

// interface - Props
interface Props {
  userData: firebase.User | null,
  showModalProfile: boolean,
  setShowModalProfile: Function,
}

export const ProfileModalComponent = ({ userData, showModalProfile, setShowModalProfile }: Props) => {

  const navigation = useNavigation();

  // hook para cambiar el estado del snackbar
  const [showMessage, setShowMessage] = useState<Message>({
    visible: false,
    message: '',
    color: '#fff'
  });

  // Hook para cambiar el estado del formulario
  const [formUser, setFormUser] = useState<FormUser>({
    name: ''
  });

  // Hook para cargar el nombre del usuario
  useEffect(() => {
    setFormUser({ name: auth.currentUser?.displayName ?? '' });
  }, []);


  // Función para actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  }

  // Función para actualizar la información del usuario
  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!,
        { displayName: formUser.name }
      );
      // Ocultar modal
      setShowModalProfile(false);
    } catch (e) {
      setShowMessage({
        visible: true,
        message: 'No se logró actualizar el usuario, intente más tarde!',
        color: '#7a0808'
      });
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Resetear rutas
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}]
      }));
      setShowModalProfile(false)
    } catch (e) {
      setShowMessage({
        visible: true,
        message: 'No se logró cerrar sesión, intente más tarde!',
        color: '#7a0808'
      });
    }
  }

  return (
    <Portal>
      <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
        <View style={styles.headerRow}>
          <Text>Perfil del administrador</Text>
          <View>
            <IconButton
              style={styles.iconEnd}
              icon="close-circle-outline"
              size={30}
              onPress={() => setShowModalProfile(false)}
            />
          </View>
        </View>
        <Divider />
        <TextInput
          label="Nombre"
          mode='outlined'
          value={formUser.name}
          onChangeText={(value) => handleSetValues('name', value)}
        />
        <TextInput
          label="Email"
          mode='outlined'
          value={userData?.email!}
          disabled
        />
        <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button>
        <View style={styles.iconSignOut}>
          <IconButton
            icon='logout'
            size={35}
            mode='contained'
            onPress={handleSignOut}
          />
        </View>
      </Modal>
      <SnackbarComponent showMessage={showMessage} setShowMessage={setShowMessage} />
    </Portal>
  )
}
