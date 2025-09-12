import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import Card from "../../components/ui/Card";

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await api.get("/api/admin/dashboard")).data,
  });

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <h3 className="text-sm text-gray-500">Total Users</h3>
        <p className="text-3xl font-semibold">{data.totalUsers}</p>
      </Card>
      <Card>
        <h3 className="text-sm text-gray-500">Alumni</h3>
        <p className="text-3xl font-semibold">{data.alumniCount}</p>
      </Card>
      <Card>
        <h3 className="text-sm text-gray-500">Students</h3>
        <p className="text-3xl font-semibold">{data.studentCount}</p>
      </Card>
      <Card>
        <h3 className="text-sm text-gray-500">Jobs</h3>
        <p className="text-3xl font-semibold">{data.totalJobs}</p>
      </Card>
      <Card>
        <h3 className="text-sm text-gray-500">Events</h3>
        <p className="text-3xl font-semibold">{data.totalEvents}</p>
      </Card>
      <Card>
        <h3 className="text-sm text-gray-500">Donations</h3>
        <p className="text-3xl font-semibold">
          ₹{data.totalDonations?.toLocaleString()}
        </p>
      </Card>
    </div>
  );
}
