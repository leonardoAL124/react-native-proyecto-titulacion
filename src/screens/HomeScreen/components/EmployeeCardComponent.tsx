import React from 'react'
import { View } from 'react-native'
import { styles } from '../../../theme/styles'
import { IconButton, Text } from 'react-native-paper'
import { Employee } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

// interface - Props
interface Props {
  employee: Employee,
}

export const EmployeeCardComponent = ({employee}: Props) => {

  // Navegación para el detalle
  const navigation = useNavigation();

  return (
    <View style={styles.rootListCards}>
      <View>
        <Text variant='labelLarge'>Nombre: {employee.name}</Text>
        <Text variant='bodyMedium'>Área de trabajo: {employee.workArea}</Text>
      </View>
      <View style={styles.iconEnd}>
        <IconButton
          icon="plus-circle-outline"
          size={25}
          mode='contained'
          onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Info', params: {employee} }))}
        />
      </View>
    </View>
  )
}
