import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, FAB, IconButton, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'
import firebase from '@firebase/auth'
import { EmployeeCardComponent } from './components/EmployeeCardComponent'
import { ProfileModalComponent } from './components/ProfileModalComponent'
import { onValue, ref } from 'firebase/database'
import { auth, dbRealTime } from '../../config/firebaseConfig'
import { NewEmployeeComponent } from './components/NewEmployeeComponent'

// interface - Employee
export interface Employee {
  id: string,
  email: string,
  address: string,
  phoneNumber: string,
  name: string,
  age: number,
  workArea: string,
}

export const HomeScreen = () => {

  // Hook para obtener la data del usuario autenticado
  const [userData, setUserData] = useState<firebase.User | null>(null);

  // Hook para gestionar la lista de productos
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Hook que permite que el modal del perfil se visualice
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  // Hook que permite que se muestre el modal de agregar empleado
  const [showModalEmployee, setShowModalEmployee] = useState<boolean>(false);

  // Llamar la función para listar los empleados
  useEffect(() => {
    setUserData(auth.currentUser);
    getAllEmployees();
  }, [])


  const getAllEmployees = () => {
    // Direccionar a la tabla de la DBB
    const dbRef = ref(dbRealTime, 'employees');
    // Acceder a la data
    onValue(dbRef, (snapshot) => {
      // Capturar la data
      const data = snapshot.val();
      // Obtener las keys de cada dato
      const getKeys = Object.keys(data);
      // Crear un arreglo para almacenar los productos
      const listEmployee: Employee[] = [];
      // Recorrer las keys para acceder a cada producto
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key }
        listEmployee.push(value);
      });
      // Actualizar la data obtenida en el arreglo del hook (employees)
      setEmployees(listEmployee);
    });
  }

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.headerRow}>
          <Avatar.Text size={50} label="IM" />
          <View>
            <Text variant='bodySmall'>Area de administración</Text>
            <Text variant='labelLarge'>{userData?.displayName}</Text>
          </View>
          <View style={styles.iconEndEdit}>
            <IconButton
              icon="account-edit"
              size={30}
              mode='contained'
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={employees}
            renderItem={({ item }) => <EmployeeCardComponent employee={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <ProfileModalComponent userData={userData} setShowModalProfile={setShowModalProfile} showModalProfile={showModalProfile} />
      <FAB
        icon="plus"
        style={styles.fabEmployee}
        onPress={() => setShowModalEmployee(true)}
      />
      <NewEmployeeComponent showModalEmployee={showModalEmployee} setShowModalEmployee={setShowModalEmployee} />
    </>
  )
}
