import { useState } from "react";
import type { FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, queryClient } from "../../services/api";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Feed() {
  const { data, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => (await api.get("/api/messages")).data,
    refetchInterval: 10000,
  });
  const [content, setContent] = useState("");

  const post = async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/api/messages", { content });
    setContent("");
    queryClient.invalidateQueries({ queryKey: ["messages"] });
  };

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-3">
        {data?.map((m: any) => (
          <Card key={m.message_id}>
            <div className="flex items-center justify-between">
              <div className="font-medium">
                {m.User?.name || "User"}{" "}
                <span className="text-xs text-gray-500">· {m.User?.role}</span>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(m.posted_at).toLocaleString()}
              </div>
            </div>
            <p className="mt-2 text-sm">{m.content}</p>
          </Card>
        ))}
      </div>
      <Card>
        <h3 className="font-semibold mb-3">Share an update</h3>
        <form onSubmit={post} className="space-y-3">
          <Input
            placeholder="Write something…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="submit">Post</Button>
        </form>
      </Card>
    </div>
  );
}
