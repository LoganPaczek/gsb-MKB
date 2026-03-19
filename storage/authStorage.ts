import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoredAuth = {
  login: string;
  password: string;
};

const AUTH_KEY = 'auth_storage';

export async function saveAuth(data: StoredAuth): Promise<void> {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

export async function loadAuth(): Promise<StoredAuth | null> {
  const raw = await AsyncStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredAuth;
    if (typeof parsed.login !== 'string' || typeof parsed.password !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function clearAuth(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_KEY);
}

