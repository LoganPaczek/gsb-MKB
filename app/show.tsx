import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { clearAuth, loadAuth } from '@/storage/authStorage';

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
          <Text style={styles.title}>Infos recues</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Login</Text>
        <Text style={styles.value}>{login}</Text>
        <Text style={[styles.label, { marginTop: 12 }]}>Mot de passe</Text>
        <Text style={styles.value}>{password}</Text>
      </View>
          <Pressable style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </Pressable>
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
  },
  label: {
    fontWeight: '700',
    color: '#333',
  },
  value: {
    marginTop: 6,
    fontSize: 16,
    color: '#4F39F6',
  },
  logoutButton: {
    marginTop: 18,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#111',
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '800',
  },
});

