import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import CarIcon from '@/components/ui/icons/CarIcon';

export default function HomeScreen() {
  return (
    <View style={styles.container}>      
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <CarIcon fill="white"/>
        </View>
        <Text style={styles.headerTitle}>
          Mes Kilos Boulots
        </Text>
        <Text style={styles.headerSubtitle}>
          Suivez vos déplacements simplement
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Login <Text style={styles.inputLabelMaxLength}> (max 20 caractères)</Text>
          </Text>
          <TextInput 
          placeholder="Ex: john.doe" 
          style={styles.input}
          maxLength={20}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Mot de passe
          </Text>
          <TextInput placeholder="Mot de passe" style={styles.input} secureTextEntry={true} />
        </View>
        <Pressable style={styles.submitButton} onPress={() => {}}>
          <Text style={styles.submitButtonText}>
            Se connecter
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  // Header
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  headerIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#4F39F6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#62748E',
  },

  // Form container
  formContainer: {
    gap: 20,
    width: '70%',
  },
  inputContainer: {
    gap: 10,
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputLabelMaxLength: {
    color: '#62748E',
    fontSize: 13,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  submitButton: {
    backgroundColor: '#4F39F6',
    width: '100%',
    borderRadius: 10,
    padding: 15,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
});