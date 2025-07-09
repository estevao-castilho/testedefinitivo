/**
 * @author Estevao Castilho Soares Aquino
 * @description Página de cadastro (onboarding) do sistema
 * @created YYYY-MM-DD
 */
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Auth.module.css';

export default function Onboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validatePassword = (pass: string) => {
    const hasNumber = /\d/.test(pass);
    const hasLetter = /[a-zA-Z]/.test(pass);
    return pass.length >= 6 && hasNumber && hasLetter;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('A senha deve ter pelo menos 6 caracteres, incluindo 1 número e 1 letra');
      return;
    }

    try {
      const response = await fetch('/api/auth/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, referralCode }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.message || 'Erro no cadastro');
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className="text-center mb-8">
            <h2 className={styles.title}>Crie sua conta</h2>
            <p className={styles.subtitle}>Preencha seus dados para começar</p>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className={styles.hint}>
                Mínimo 6 caracteres com pelo menos 1 número e 1 letra
              </p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="referralCode" className={styles.label}>
                Código de Referência (opcional)
              </label>
              <input
                id="referralCode"
                name="referralCode"
                type="text"
                className={styles.input}
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={styles.button}
              >
                Cadastrar
              </button>
            </div>
          </form>

          <div className={styles.linkContainer}>
            Já tem uma conta?{' '}
            <Link href="/login" className={styles.link}>
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}