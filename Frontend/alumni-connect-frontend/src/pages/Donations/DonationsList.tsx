import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import Card from "../../components/ui/Card";

export default function DonationsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => (await api.get("/api/donations")).data,
  });
  if (isLoading) return <p>Loading…</p>;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Recent Donations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Alumni ID</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d: any) => (
              <tr key={d.donation_id} className="border-t">
                <td className="p-2">{d.alumni_id}</td>
                <td className="p-2">₹{d.amount}</td>
                <td className="p-2">
                  {new Date(d.donated_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
