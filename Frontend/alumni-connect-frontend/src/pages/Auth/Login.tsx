import { useState } from "react";
import type { FormEvent } from "react";
import { api } from "../../services/api";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/authSlice";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/users/login", { email, password });
      dispatch(setUser(data));
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-10">
      <Card>
        <h1 className="text-2xl font-semibold mb-6">Welcome back</h1>
        <form onSubmit={onSubmit} className="space-y-4">
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
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          No account?{" "}
          <Link className="text-brand-700" to="/register">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
