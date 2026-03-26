import { StyleSheet, Text, Pressable } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function SubmitButton({ onPress }: Props) {
  return (          
    <Pressable style={styles.formSubmitButton} onPress={onPress}>
        <Text style={styles.formSubmitButtonText}>Enregistrer</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  formSubmitButton: {
    backgroundColor: '#4F39F6',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSubmitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
});

