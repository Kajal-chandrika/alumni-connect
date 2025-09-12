import { useState } from "react";
import type { FormEvent } from "react";
import { api } from "../../services/api";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function JobCreate() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<"job" | "internship">("job");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/jobs", {
        title,
        company,
        description,
        location,
        type,
      });
      navigate("/jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Post a Job/Internship</h2>
      <form onSubmit={submit} className="grid gap-3 max-w-2xl">
        <div>
          <label className="text-sm text-gray-600">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-600">Company</label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Type</label>
          <Select value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="job">Job</option>
            <option value="internship">Internship</option>
          </Select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Description</label>
          <Textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Posting…" : "Post"}
        </Button>
      </form>
    </Card>
  );
}
