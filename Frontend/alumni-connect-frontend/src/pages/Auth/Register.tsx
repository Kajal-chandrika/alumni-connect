import { useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/authSlice";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"alumni" | "student">("alumni");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/users/register", {
        name,
        email,
        password,
        role,
      });
      dispatch(setUser(data));
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-10">
      <Card>
        <h1 className="text-2xl font-semibold mb-6">Create your account</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </Select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create account"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
