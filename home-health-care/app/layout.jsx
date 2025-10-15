import { useRouter } from 'expo-router';

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.replace('/index')
  }

  return children;
}
