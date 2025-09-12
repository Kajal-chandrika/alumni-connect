import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function EventDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () =>
      (await api.get("/api/events")).data.find(
        (e: any) => String(e.event_id) === id
      ),
  });

  const register = async () => {
    await api.post(`/api/events/${id}/register`);
    alert("Registered!");
  };

  if (isLoading || !data) return <p>Loading…</p>;

  return (
    <Card>
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p className="text-sm text-gray-600">
        {new Date(data.event_date).toDateString()} · {data.location}
      </p>
      <p className="mt-3">{data.description}</p>
      <Button className="mt-4" onClick={register}>
        Register
      </Button>
    </Card>
  );
}
