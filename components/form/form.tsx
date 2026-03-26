import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import CirclePlus from '@/components/ui/icons/CirclePlus';
import { KmStepper, SubmitButton } from './index';

export default function Form() {
  const [period, setPeriod] = useState<'journalier' | 'hebdomadaire'>('journalier');


  return (
    <View style={styles.formContainer}>
        <View style={styles.formHeader}>
            <CirclePlus/>
            <Text style={styles.formHeaderTitle}>
            {`Saisir vos kilomètres ${period}`}
            </Text>
        </View>
        
        <View style={styles.formOptions}>
            <Pressable
            style={period === 'journalier' ? styles.formOptionSelected : styles.formOption}
            onPress={() => setPeriod('journalier')}
            >
            <Text style={styles.formOptionTitle}>Journalier</Text>
            </Pressable>
            <Pressable
            style={period === 'hebdomadaire' ? styles.formOptionSelected : styles.formOption}
            onPress={() => setPeriod('hebdomadaire')}
            >
            <Text style={styles.formOptionTitle}>Hebdomadaire</Text>
            </Pressable>
        </View>

        <KmStepper />
        <SubmitButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF45A0',
    gap: 20,
    paddingHorizontal: 16,
  },

  formContainer: {
    gap: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },

  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  formHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  formOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5F9',
    gap: 10,
    padding: 5,
  },
  formOption: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  formOptionSelected: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  formOptionTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#9AA6B8',
  },
});