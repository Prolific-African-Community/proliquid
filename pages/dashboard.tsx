import Layout from "./components/layout";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

type Fund = {
  id: string;
  name: string;
  currency: string;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [funds, setFunds] = useState<Fund[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const fetchFunds = async () => {
      const response = await fetch("/api/funds", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setFunds(data.funds || []);
      setIsLoading(false);
    };

    fetchFunds();
  }, [router]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>

          <button
            onClick={() => router.push("/create")}
            className="px-5 py-2 rounded-xl bg-black text-white text-sm font-medium hover:opacity-80 transition"
          >
            Create Fund
          </button>
        </div>

        {/* Funds Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Currency</th>
                <th className="px-6 py-4 text-left">Created</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-6 py-6" colSpan={3}>
                    Loading...
                  </td>
                </tr>
              ) : funds.length === 0 ? (
                <tr>
                  <td className="px-6 py-6" colSpan={3}>
                    No funds yet.
                  </td>
                </tr>
              ) : (
                funds.map((fund) => (
                  <tr
                    key={fund.id}
                    className="border-t border-zinc-100 hover:bg-zinc-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {fund.name}
                    </td>
                    <td className="px-6 py-4">
                      {fund.currency}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(fund.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>
    </Layout>
  );
}