// pages/account.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type AccountData = {
  references: number;
  bonus: number;
};

export default function Account() {
  const router = useRouter();
  const [data, setData] = useState<AccountData | null>(null);

  useEffect(() => {
    async function fetchAccount() {
      const res = await fetch('/api/auth/account');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      const json = await res.json();
      setData(json);
    }
    fetchAccount();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (!data) return <p>Carregando...</p>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl mb-4">Minha Conta</h1>
      <p>Número de referências: <strong>{data.references}</strong></p>
      <p>Bônus recebido: <strong>R$ {data.bonus.toFixed(2)}</strong></p>
      <button onClick={handleLogout} className="mt-6 w-full p-2 bg-red-600 text-white rounded">
        Sair
      </button>
    </div>
  );
}
