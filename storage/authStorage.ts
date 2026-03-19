import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoredAuth = {
  login: string;
};

const AUTH_KEY = 'auth_storage';

export async function saveAuth(login: string): Promise<void> {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ login } satisfies StoredAuth));
}

export async function loadAuth(): Promise<StoredAuth | null> {
  const raw = await AsyncStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredAuth;
    if (typeof parsed.login !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function clearAuth(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_KEY);
}

