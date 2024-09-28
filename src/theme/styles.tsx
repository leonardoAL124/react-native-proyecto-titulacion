import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 10
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textRedirect: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#705aa9'
  },
  rootActivity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    width: 428
  },
  rootHome: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 50
  },
  headerRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  iconEndEdit: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconEnd: {
    alignItems: 'flex-end',
  },
  rootListCards: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 20
  },
  modal: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    gap: 10
  },
  fabEmployee: {
    position: 'absolute',
    bottom: 20,
    right: 15
  },
  inputsTogether: {
    flexDirection: 'row',
    gap: 35
  },
  inputsTogetherInfo: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 17
  },
  rootInfo: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    gap: 20
  },
  textInfo: {
    fontWeight: 'bold',
    fontSize: 18
  },
  iconSignOut: {
    marginTop: 20,
    alignItems: 'center'
  }

});