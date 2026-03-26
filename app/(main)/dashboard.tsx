import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {  loadAuth } from '@/storage/authStorage';
import { getVehiculeByVisiteurId } from '@/api/vehicules';
import VehiculeCard from '@/components/dashboard/vehiculeCard';
import CirclePlus from '@/components/ui/icons/CirclePlus';

export default function ShowScreen() {
  const params = useLocalSearchParams<{
    login?: string;
    password?: string;
  }>();

  const [loading, setLoading] = useState(true);
  const [vehicule, setVehicule] = useState<any>(null);
  const [period, setPeriod] = useState<'journalier' | 'hebdomadaire'>('journalier');
  const [kmValue, setKmValue] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Si login/password sont passés en params, on les affiche.
        // Sinon, on charge seulement le login depuis le stockage.
        const stored = await loadAuth();
        if (cancelled) return;

        const vehicule = await getVehiculeByVisiteurId(stored?.login ?? '');
        setVehicule(vehicule);

        setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.login, params.password]);

  function incrementKm() {
    setKmValue((prev) => prev + 1);
  }

  function decrementKm() {
    setKmValue((prev) => Math.max(0, prev - 1));
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        <>
          <VehiculeCard vehicule={vehicule} loading={loading} />
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

            <Pressable style={styles.formSubmitButton}>
              <Text style={styles.formSubmitButtonText}>Enregistrer</Text>
            </Pressable>
          </View>
        </>
      )}
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

