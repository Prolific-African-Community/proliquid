import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateFundPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const response = await fetch('/api/funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, currency })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Unable to create fund');
      }

      await router.push('/dashboard');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to create fund');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-6 shadow-md md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Create Fund</h1>
          <p className="mt-1 text-sm text-slate-600">Add a new fund to your portfolio.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
              placeholder="e.g. Growth Fund I"
            />
          </div>

          <div>
            <label htmlFor="currency" className="mb-1 block text-sm font-medium text-slate-700">
              Currency
            </label>
            <input
              id="currency"
              type="text"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
              placeholder="e.g. USD"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Creating fund...' : 'Create Fund'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
