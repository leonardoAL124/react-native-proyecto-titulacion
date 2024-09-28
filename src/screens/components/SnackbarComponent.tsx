import React from 'react'
import { Snackbar } from 'react-native-paper'
import { styles } from '../../theme/styles'

// interface - Message
interface Message {
  visible: boolean,
  message: string,
  color: string,
}

// interface - Props
interface Props {
  showMessage: Message,
  setShowMessage: Function
}

export const SnackbarComponent = ({ showMessage, setShowMessage }: Props) => {
  return (
    <>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{
          ...styles.message,
          backgroundColor: showMessage.color
        }}>
        {showMessage.message}
      </Snackbar>
    </>
  )
}
