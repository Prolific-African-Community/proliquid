import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

type Fund = {
  id: string;
  name: string;
  currency: string;
  createdAt: string;
};

type FundsResponse = {
  funds?: Array<Record<string, unknown>>;
} | Array<Record<string, unknown>>;

const formatDate = (value: string) => {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '—';
  }

  return parsedDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<FundsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsLoading(false);
      router.replace('/login');
      return;
    }

    const fetchFunds = async () => {
      try {
        const response = await fetch('/api/funds', {
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

  const funds = useMemo<Fund[]>(() => {
    if (!data) {
      return [];
    }

    const list = Array.isArray(data) ? data : data.funds;

    if (!Array.isArray(list)) {
      return [];
    }

    return list.map((fund, index) => ({
      id: String(fund.id ?? index),
      name: String(fund.name ?? '—'),
      currency: String(fund.currency ?? '—'),
      createdAt: String(fund.createdAt ?? fund.created_at ?? '')
    }));
  }, [data]);

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <button
            type="button"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Create Fund
          </button>
        </div>

        {isLoading ? <p className="text-slate-600">Loading funds...</p> : null}
        {error ? <p className="text-red-600">{error}</p> : null}

        {!isLoading && !error ? (
          funds.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Currency</th>
                    <th className="px-4 py-3 font-semibold">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                  {funds.map((fund) => (
                    <tr key={fund.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{fund.name}</td>
                      <td className="px-4 py-3">{fund.currency}</td>
                      <td className="px-4 py-3">{formatDate(fund.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-600">
              No funds found yet. Create your first fund to get started.
            </div>
          )
        ) : null}
      </div>
    </main>
  );
}
