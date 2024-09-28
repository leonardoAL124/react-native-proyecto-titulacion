import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { Employee } from './HomeScreen/HomeScreen'
import { ref, remove, update } from 'firebase/database'
import { auth, dbRealTime } from '../config/firebaseConfig'
import { Message } from './LoginScreen'
import { SnackbarComponent } from './components/SnackbarComponent'
import { useNavigation, useRoute } from '@react-navigation/native'

export const InfoEmployeeScreen = () => {

  // Acceder la info de navegación
  const route = useRoute();
  // Obtener los parámetros
  //@ts-ignore
  const {employee} = route.params;

  // Hook de navegación
  const navigation = useNavigation();

  // Hook para cambiar el estado del formulario
  const [formEdit, setFormEdit] = useState<Employee>({
    id: '',
    email: '',
    name: '',
    address: '',
    phoneNumber: '',
    age: 0,
    workArea: ''
  });

  // hook para cambiar el estado del snackbar
  const [showMessage, setShowMessage] = useState<Message>({
    visible: false,
    message: '',
    color: '#fff'
  });

  // useEffect para cargar la data en el formulário
  useEffect(() => {
    setFormEdit(employee);
  }, [])

  // Función para actualizar los campos
  const handleSetValues = (key: string, value: string) => {
    setFormEdit({ ...formEdit, [key]: value });
  }

  const handleUpdateEmployee = async () => {
    // Direccionar al dato en la tabla de la BDD
    const dbRef = ref(dbRealTime, 'employees/' + auth.currentUser?.uid + '/' + formEdit.id);

    try {
      // Actualizar el dato seleccionado
      await update(dbRef, {
        email: formEdit.email,
        name: formEdit.name,
        address: formEdit.address,
        phoneNumber: formEdit.phoneNumber,
        age: formEdit.age,
        workArea: formEdit.workArea
      });
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
    navigation.goBack();
  }

  // Función para eliminar el empleado
  const handleDeleteEmployee = async () => {
    // Redireccionar a la tabla y dato a eliminar
    const dbRef = ref(dbRealTime, 'employees/' + auth.currentUser?.uid + '/' + formEdit.id);

    try {
      // Eliminar el producto
      await remove(dbRef);
      // Regresar
      navigation.goBack();
    } catch (e) {
      setShowMessage({
        visible: true,
        message: 'No se logró completar la eliminación, intente más tarde!',
        color: '#7a0808'
      });
    }
  }

  return (
    <View style={styles.rootInfo}>
      <View>
        <Text style={styles.textInfo}>Nombre: {formEdit.name}</Text>
        <TextInput
          value={formEdit.name}
          onChangeText={(value) => handleSetValues('name', value)}
        />
        <Text style={styles.textInfo}>Correo: {formEdit.email}</Text>
        <TextInput
          value={formEdit.email}
          onChangeText={(value) => handleSetValues('email', value)}
        />
        <Text style={styles.textInfo}>Dirección: {formEdit.address}</Text>
        <TextInput
          value={formEdit.address}
          multiline
          numberOfLines={2}
          onChangeText={(value) => handleSetValues('address', value)}
        />
        <Text style={styles.textInfo}>Número de teléfono: {formEdit.phoneNumber}</Text>
        <TextInput
          value={formEdit.phoneNumber}
          onChangeText={(value) => handleSetValues('phoneNumber', value)}
        />
        <View style={styles.inputsTogetherInfo}>
          <Text style={styles.textInfo}>Edad: </Text>
          <TextInput
            value={formEdit.age.toString()}
            style={{ width: '13%' }}
            onChangeText={(value) => handleSetValues('age', value)}
          />
          <Text style={styles.textInfo}>Área de trabajo: </Text>
          <TextInput
            value={formEdit.workArea}
            style={{ width: '30%' }}
            onChangeText={(value) => handleSetValues('workArea', value)}
          />
        </View>
      </View>
      <Button mode='contained' icon='update' onPress={handleUpdateEmployee}>Actualizar</Button>
      <Button mode='contained' icon='delete-outline' onPress={handleDeleteEmployee}>Eliminar</Button>
      <SnackbarComponent showMessage={showMessage} setShowMessage={setShowMessage} />
    </View>
  )
}
