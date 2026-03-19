import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { clearAuth, loadAuth } from '@/storage/authStorage';
import { CarIcon, BracketIcon } from '@/components/ui/icons';

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default function ShowScreen() {
  const params = useLocalSearchParams<{
    login?: string;
    password?: string;
  }>();

  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const loginParam = first(params.login);
        const passwordParam = first(params.password);

        // Si login/password sont passés en params, on les affiche.
        // Sinon, on charge seulement le login depuis le stockage.
        if (loginParam !== undefined && passwordParam !== undefined) {
          if (!cancelled) {
            setLogin(loginParam);
            setPassword(passwordParam);
            setLoading(false);
          }
          return;
        }

        const stored = await loadAuth();
        if (cancelled) return;

        setLogin(stored?.login ?? '');
        setPassword('');
        setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.login, params.password]);

  async function onLogout() {
    await clearAuth();
    router.replace('/');
  }

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
                Skoda Superb
              </Text>
              <Text style={styles.vehicleBrand}>
                Renault Master
              </Text>
            </View>

            <View style={styles.vehicleInfoRow}>
              <View style={styles.vehicleInfoPlateContainer}>
                <Text style={styles.vehicleInfoPlate}>
                  AB-123-CD
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

