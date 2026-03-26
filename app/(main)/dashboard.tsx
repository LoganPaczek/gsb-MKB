import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {  loadAuth } from '@/storage/authStorage';
import { getVehiculeByVisiteurId } from '@/api/vehicules';
import VehiculeCard from '@/components/dashboard/vehiculeCard';
import Form from '@/components/form/form';
import History from '@/components/dashboard/history';
import { getDixSaisieJourByVisiteurId, getTotalKmWithVehicule } from '@/api/saisieJour';

export default function ShowScreen() {
  const params = useLocalSearchParams<{
    login?: string;
    password?: string;
  }>();

  const [loading, setLoading] = useState(true);
  const [vehicule, setVehicule] = useState<any>(null);
  const [saisiesJournalieres, setSaisiesJournalieres] = useState<any>([]);
  const [totalKmWithVehicule, setTotalKmWithVehicule] = useState(0);

  async function refreshSaisies() {
    const stored = await loadAuth();
    const idVisiteur = stored?.visiteurId ?? null;
    if (idVisiteur === null) {
      setSaisiesJournalieres([]);
      return;
    }
    const nextSaisies = await getDixSaisieJourByVisiteurId(idVisiteur);
    setSaisiesJournalieres(Array.isArray(nextSaisies) ? nextSaisies : []);
    const totalKm = await getTotalKmWithVehicule(idVisiteur);
    setTotalKmWithVehicule(totalKm);
  }

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

        await refreshSaisies();

        setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.login, params.password]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        <>
          <VehiculeCard vehicule={vehicule} loading={loading} totalKmWithVehicule={totalKmWithVehicule} />
          <Form
            vehiculeId={vehicule?.id ?? vehicule?.id_vehicule ?? null}
            onSaved={refreshSaisies}
          />
          <History saisiesJournalieres={saisiesJournalieres} />
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
    gap: 20,
    paddingHorizontal: 16,
  },
});

