import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import CirclePlus from '@/components/ui/icons/CirclePlus';
import { KmStepper, SubmitButton } from './index';
import { loadAuth } from '@/storage/authStorage';
import { addSaisieJour } from '@/api/saisieJour';

type Props = {
  vehiculeId?: number | null;
  onSaved?: () => Promise<void> | void;
};

export default function Form({ vehiculeId = null, onSaved }: Props) {
  const [period, setPeriod] = useState<'journalier' | 'hebdomadaire'>('journalier');
  const [kmValue, setKmValue] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => {
      setSuccess(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [success]);

  async function onSubmit() {
    setError(null);
    setSuccess(null);

    if (period !== 'journalier') {
      return;
    }

    try {
      const stored = await loadAuth();
      const visiteurId = stored?.visiteurId ?? null;
      if (visiteurId === null) {
        setError("Impossible d'enregistrer: visiteur non identifié.");
        return;
      }
      if (vehiculeId === null) {
        setError("Impossible d'enregistrer: véhicule non identifié.");
        return;
      }

      const date = new Date().toISOString().slice(0, 10);
      await addSaisieJour(date, kmValue, visiteurId, vehiculeId);
      if (onSaved) {
        await onSaved();
      }
      setSuccess('Saisie journalière enregistrée.');
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur pendant l'enregistrement.");
    }
  }


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

        <KmStepper value={kmValue} onChange={setKmValue} />
        <SubmitButton onPress={onSubmit} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  errorText: {
    color: '#b00020',
    fontWeight: '600',
  },
  successText: {
    color: '#167d2f',
    fontWeight: '600',
  },
});