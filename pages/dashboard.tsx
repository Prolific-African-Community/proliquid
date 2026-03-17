import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type FundsResponse = Record<string, unknown>;

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<FundsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace('/login');
      return;
    }

    const fetchFunds = async () => {
      try {
        const response = await fetch('/api/funds', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message ?? 'Unable to fetch funds');
        }

        setData(responseData);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to fetch funds');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFunds();
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto rounded-xl bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Dashboard</h1>

        {isLoading ? <p className="text-slate-600">Loading funds...</p> : null}
        {error ? <p className="text-red-600">{error}</p> : null}

        {!isLoading && !error ? (
          <pre className="overflow-x-auto rounded-lg bg-slate-900 text-slate-100 p-4 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : null}
      </div>
    </main>
  );
}
