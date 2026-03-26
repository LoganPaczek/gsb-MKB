import { StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { useState } from 'react';

export default function KmStepper() {
    const [kmValue, setKmValue] = useState(0);
  
    function incrementKm() {
      setKmValue((prev) => prev + 1);
    }
  
    function decrementKm() {
      setKmValue((prev) => Math.max(0, prev - 1));
    }


  return (          
    <View style={styles.formInputRow}>
        <Pressable style={styles.stepButton} onPress={decrementKm}>
        <Text style={styles.stepButtonLabel}>-</Text>
        </Pressable>
        <TextInput
        style={styles.formInput}
        keyboardType="number-pad"
        value={String(kmValue)}
        onChangeText={(text) => {
            const normalized = text.replace(/[^0-9]/g, '');
            setKmValue(normalized ? Number(normalized) : 0);
        }}
        />
        <Pressable style={styles.stepButton} onPress={incrementKm}>
        <Text style={styles.stepButtonLabel}>+</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    formInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    formInput: {
      flex: 1,
      backgroundColor: '#F8FAFC',
      borderRadius: 10,
      padding: 10,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
    },
    stepButton: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: '#4F39F6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepButtonLabel: {
      color: 'white',
      fontSize: 20,
      fontWeight: '700',
      lineHeight: 22,
    },
  });