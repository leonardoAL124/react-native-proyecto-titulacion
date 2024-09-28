import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { styles } from '../theme/styles'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from '../screens/LoginScreen'
import { RegisterScreen } from '../screens/RegisterScreen'
import { HomeScreen } from '../screens/HomeScreen/HomeScreen'
import { InfoEmployeeScreen } from '../screens/InfoEmployeeScreen'

// interface - Routes
interface Routes {
  name: string,
  screen: () => JSX.Element,
  headerShown?: boolean,
  title?: string,
}

// Rutas accesibles al no estar autenticado
const routesNoAuth: Routes[] = [
  { name: 'Login', screen: LoginScreen },
  { name: 'Register', screen: RegisterScreen }
];

// Rutas accesibles al autenticarse
const routesAuth: Routes[] = [
  { name: 'Home', screen: HomeScreen },
  {name: 'Info', screen: InfoEmployeeScreen, headerShown: true, title: 'Información'}
];

// Creamos el Stack
const Stack = createStackNavigator();

export const StackNavigator = () => {

  // hook para verificar si esta autenticado o no
  const [isAuth, setIsAuth] = useState<boolean>(false);

  // hook para controlar la carga
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Vlidar el estado de autenticación
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      }
      setIsLoading(false);
    })
  }, [])
  
  return (
    <>
      {
        isLoading ? (
          <View style={styles.rootActivity}>
            <ActivityIndicator animating={true} size={35} />
          </View>
        ): (
          <Stack.Navigator>
            {
              !isAuth ?
                routesNoAuth.map((item, index) => (
                  <Stack.Screen 
                    key={index}
                    name={item.name}
                    options={{headerShown: false}}
                    component={item.screen}
                  />
                ))
              :
                routesAuth.map((item, index) => (
                  <Stack.Screen 
                    key={index}
                    name={item.name}
                    options={{headerShown: item.headerShown ?? false}}
                    component={item.screen}
                  />
                ))
            }
          </Stack.Navigator>
        )
      }
    </>
  )
}
