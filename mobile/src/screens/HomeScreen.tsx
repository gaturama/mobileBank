import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen({ route, navigation }: Props) {

  return (
    <View style={styles.container}>
      <Image style={styles.imagem} source={require('../assets/images/homeIcon.png')}/>
      <Text style={styles.title}>Bem-vindo ao Wideias Bank</Text>
      <Text style={styles.saldo}>Seu saldo é: R$ 10.000,00</Text>
      <View style={styles.buttonWrapper}>
        <Button title="Ver Extrato" onPress={() => navigation.navigate('Extrato')} />
      </View>
      <View style={styles.buttonWrapper}>    
        <Button title="Fazer Transferência" onPress={() => navigation.navigate('Transferencia')} />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#e7e1df' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, alignSelf: 'center' },
  saldo: { fontSize: 20, marginBottom: 20, alignSelf: 'center'},
  token: { fontWeight: 'bold' },
  tokenValue: { fontSize: 12, color: 'gray'},
  buttonWrapper: { marginBottom: 15},
  imagem: { padding: 20, width: 100, height: 80, alignSelf: 'center', marginBottom: 20 }
})

