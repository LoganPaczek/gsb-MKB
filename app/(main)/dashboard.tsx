import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {  loadAuth } from '@/storage/authStorage';
import { CarIcon } from '@/components/ui/icons';
import { getVehiculeByVisiteurId } from '@/api/vehicules';

export default function ShowScreen() {
  const params = useLocalSearchParams<{
    login?: string;
    password?: string;
  }>();

  const [loading, setLoading] = useState(true);
  const [vehicule, setVehicule] = useState<any>(null);

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

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        <>
          <View style={styles.vehicleContainer}>
            <View style={styles.vehicleHeader}>
              <View style={styles.vehicleTitleContainer}>
                <Text style={styles.vehicleHeaderTitle}>
                  Véhicule Actuel
                </Text>
              </View>
              <CarIcon fill="white"/>
            </View>

            <View style={styles.vehicleInfoContainer}>
              <Text style={styles.vehicleModel}>
                {vehicule?.marque ?? 'Non renseigné'}
              </Text>
              <Text style={styles.vehicleBrand}>
                {vehicule?.modele ?? 'Non renseigné'}
              </Text>
            </View>

            <View style={styles.vehicleInfoRow}>
              <View style={styles.vehicleInfoPlateContainer}>
                <Text style={styles.vehicleInfoPlate}>
                  {vehicule?.immatriculation ?? 'Non renseigné'}
                </Text>
              </View>
              <View style={styles.vehicleInfoTotalContainer}>
                <Text style={styles.vehicleInfoTotal}>
                  Total
                </Text>
                <Text style={styles.vehicleInfoTotalValue}>
                  10000 km
                </Text>
              </View>
            </View>
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
    paddingHorizontal: 16,
  },

  vehicleContainer: {
    width: '80%',
    backgroundColor: '#4F39F6',
    borderRadius: 15,
    padding: 16,
    gap: 10,
  },

  // Header
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleTitleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    backgroundColor: '#62748E',
  },
  vehicleHeaderTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: 'white',
  },

  // Info
  vehicleInfoContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
  },
  vehicleBrand: {
    fontSize: 14,
    color: '#62748E',
  },

  // Info Row
  vehicleInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleInfoPlateContainer: {
    backgroundColor: '#4F1EBE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  vehicleInfoPlate: {
    fontSize: 14,
    color: "white",
  },
  vehicleInfoTotalContainer: {
    alignItems: 'flex-end',
  },
  vehicleInfoTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "white",
  },
  vehicleInfoTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "white",
  },
});

