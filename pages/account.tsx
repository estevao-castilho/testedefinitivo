/**
 * @author Estevao Castilho Soares Aquino
 * @description Página da conta 
 * @created YYYY-MM-DD
 */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';

type AccountData = {
  references: number;
  bonus: number;
};

export default function Account() {
  const router = useRouter();
  const [data, setData] = useState<AccountData | null>(null);

  useEffect(() => {
    async function fetchAccount() {
      const res = await fetch('/api/account');
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
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  if (!data) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Minha Conta</h1>
      
      {/* Informações da conta */}
      <div className="space-y-2">
        <p>Número de referências: <strong>{data.references}</strong></p>
        <p>Bônus recebido: <strong>R$ {data.bonus.toFixed(2)}</strong></p>
      </div>

      {/* Botão de logout */}
      <button 
        onClick={handleLogout} 
        className={`${styles.button} mt-6 bg-red-600 hover:bg-red-700`}
      >
        Sair
      </button>
    </div>
  );
}
