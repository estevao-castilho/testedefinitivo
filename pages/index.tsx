/**
 * @author Estevao Castilho Soares Aquino
 * @description Página de index 
 * @created YYYY-MM-DD
 */
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/onboard');
  }, [router]);

  return <p>Redirecionando...</p>;
}
