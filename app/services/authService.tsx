import * as SecureStore from 'expo-secure-store';

interface Credentials {
  username: string;
  password: string;
}

export async function saveUser(credentials: Credentials): Promise<void> {
  await SecureStore.setItemAsync('user', JSON.stringify(credentials));
}

export async function getUser(): Promise<Credentials | null> {
  const user = await SecureStore.getItemAsync('user');
  return user ? JSON.parse(user) : null;
}

export async function authenticateUser(username: string, password: string): Promise<boolean> {
  const user = await getUser();
  return user !== null && user.username === username && user.password === password;
}
