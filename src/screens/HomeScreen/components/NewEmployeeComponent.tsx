import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { SnackbarComponent } from '../../components/SnackbarComponent'
import { Message } from '../../LoginScreen'
import { push, ref, set } from 'firebase/database'
import { dbRealTime } from '../../../config/firebaseConfig'

// interface - Employee
interface FormEmployee {
  email: string,
  address: string,
  phoneNumber: string,
  name: string,
  age: number,
  workArea: string,
}

// interface - Props
interface Props {
  showModalEmployee: boolean,
  setShowModalEmployee: Function,
}

export const NewEmployeeComponent = ({ showModalEmployee, setShowModalEmployee }: Props) => {

  // Hook para obtener y actualizar la data del formularo
  const [formEmployee, setFormEmployee] = useState<FormEmployee>({
    email: '',
    address: '',
    phoneNumber: '',
    name: '',
    age: 0,
    workArea: ''
  });

  // Hook para mostrar el snackbar
  const [showMessage, setShowMessage] = useState<Message>({
    visible: false,
    message: '',
    color: '#fff'
  });

  // Función para actualizar el formulario
  const handleSetValues = (key: string, value: string) => {
    setFormEmployee({ ...formEmployee, [key]: value });
  }

  // Función para agregar empleados
  const handleSaveEmployee = async () => {
    if (!formEmployee.name || !formEmployee.address || !formEmployee.age ||
      !formEmployee.email || !formEmployee.phoneNumber || !formEmployee.workArea) {
      setShowMessage({
        visible: true,
        message: 'Completa todos los campos!',
        color: '#7a0808'
      });
      return;
    }

    // Crear el path a la tabla de la BDD
    const dbRef = ref(dbRealTime, 'employees');
    // Crear una colección que agregue los datos
    const saveEmployee = push(dbRef);

    try {
      // Almacenar los datos en la BDD
      await set(saveEmployee, formEmployee);
      setShowModalEmployee(false);
      setShowMessage({
        visible: true,
        message: 'Registro exitoso!',
        color: '#085f06'
      });
    } catch (e) {
      setShowMessage({
        visible: true,
        message: 'Algo salió mal, intenta más tarde!',
        color: '#7a0808'
      });
    }
  }

  return (
    <>
      <Portal>
        <Modal visible={showModalEmployee} contentContainerStyle={styles.modal}>
          <View style={{gap:7}}>
            <View style={styles.headerRow}>
              <Text variant='titleLarge'>Nuevo Empleado</Text>
              <View>
                <IconButton
                  icon='close-circle-outline'
                  size={30}
                  onPress={() => setShowModalEmployee(false)}
                />
              </View>
            </View>
            <Divider />
            <View>
              <TextInput
                label='Nombre del empleado'
                mode='outlined'
                onChangeText={(value) => handleSetValues('name', value)}
              />
              <TextInput
                label='Email'
                mode='outlined'
                onChangeText={(value) => handleSetValues('email', value)}
              />
              <TextInput
                label='Dirección de vivienda'
                mode='outlined'
                onChangeText={(value) => handleSetValues('address', value)}
              />
              <TextInput
                label='Número de Teléfono'
                mode='outlined'
                onChangeText={(value) => handleSetValues('phoneNumber', value)}
              />
              <View style={styles.inputsTogether}>
                <TextInput
                  label='Área de trabajo'
                  mode='outlined'
                  style={{width: '40%'}}
                  onChangeText={(value) => handleSetValues('workArea', value)}
                />
                <TextInput
                  label='Edad del empleado'
                  mode='outlined'
                  style={{width: '40%'}}
                  onChangeText={(value) => handleSetValues('age', value)}
                />
              </View>
            </View>
            <Button mode='contained' onPress={handleSaveEmployee}>Agregar</Button>
          </View>
        </Modal>
        <SnackbarComponent setShowMessage={setShowMessage} showMessage={showMessage} />
      </Portal >
    </>
  )
}
