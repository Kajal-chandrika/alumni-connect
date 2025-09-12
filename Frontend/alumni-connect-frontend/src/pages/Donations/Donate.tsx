import { useState } from "react";
import type { FormEvent } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { api } from "../../services/api";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/donations", { amount: Number(amount) });
      alert("Thank you for your support!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Support Your Institute</h2>
      <form onSubmit={submit} className="max-w-sm space-y-3">
        <div>
          <label className="text-sm text-gray-600">Amount (₹)</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={1}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Processing…" : "Donate"}
        </Button>
      </form>
    </Card>
  );
}
