import { View, Text, StyleSheet, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen({ route, navigation }: Props) {
  const { token } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Wideias Bank</Text>
      <Text style={styles.saldo}>Seu saldo é: R$ 10.000,00</Text>
      <Text style={styles.token}>Seu token JWT:</Text>
      <Text style={styles.tokenValue}>{token}</Text>
      <Button title="Ver Extrato" onPress={() => navigation.navigate('Extrato')} />
      <Button title="Fazer Transferência" onPress={() => navigation.navigate('Transferencia')} />
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#c1c1c1' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, alignSelf: 'center' },
  saldo: { fontSize: 20, marginBottom: 20, alignSelf: 'center' },
  token: { fontWeight: 'bold' },
  tokenValue: { fontSize: 12, color: 'gray' },
})

