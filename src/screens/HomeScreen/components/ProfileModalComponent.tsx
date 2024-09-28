import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import firebase from '@firebase/auth'
import { updateProfile } from 'firebase/auth'
import { auth } from '../../../config/firebaseConfig'

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

export const ProfileModalComponent = ({userData, showModalProfile, setShowModalProfile}: Props) => {

  // Hook para cambiar el estado del formulario
  const [formUser, setFormUser] = useState<FormUser>({
    name: ''
  });

  // Hook para cargar el nombre del usuario
  useEffect(() => {
    setFormUser({name: auth.currentUser?.displayName ?? '' });
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
      )
    } catch (e) {
      console.log(e);
    }
    // Ocultar modal
    setShowModalProfile(false);
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
      </Modal>
    </Portal>
  )
}
