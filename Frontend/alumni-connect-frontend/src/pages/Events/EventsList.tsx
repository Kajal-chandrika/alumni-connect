import { useState } from "react";
import type { FormEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api, queryClient } from "../../services/api";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import { useAuth } from "../../hooks/useAuth";

type EventPayload = {
  title: string;
  description: string;
  event_date: string; // YYYY-MM-DD
  location: string;
};

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border bg-white p-4">
      <div className="h-5 w-2/3 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-100" />
      <div className="mt-4 h-16 w-full rounded bg-gray-100" />
      <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
    </div>
  );
}

function CreateEventModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<EventPayload>({
    title: "",
    description: "",
    event_date: "",
    location: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const validate = (values: EventPayload) => {
    const e: Record<string, string> = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.event_date) e.event_date = "Date is required";
    if (!values.location.trim()) e.location = "Location is required";
    if (values.description && values.description.length > 1000)
      e.description = "Description too long (max 1000 chars)";
    return e;
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: EventPayload) => {
      const { data } = await api.post("/api/events", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      await mutateAsync(form);
      onClose();
      setForm({ title: "", description: "", event_date: "", location: "" });
    } catch (err: any) {
      setServerError(
        err?.response?.data?.message || "Failed to create event. Try again."
      );
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4"
    >
      <div className="w-full max-w-xl rounded-2xl border bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create New Event</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-3">
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Alumni Meet 2025"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm text-gray-600">Date</label>
              <Input
                type="date"
                value={form.event_date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, event_date: e.target.value }))
                }
              />
              {errors.event_date && (
                <p className="mt-1 text-xs text-red-600">{errors.event_date}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                placeholder="Cuttack Campus / Online"
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-600">{errors.location}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Description</label>
            <Textarea
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Share agenda, speakers, and any joining details."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description}</p>
            )}
          </div>

          {serverError && (
            <div className="rounded-md bg-red-50 p-2 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating…" : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EventsList() {
  const { role } = useAuth();
  const [openCreate, setOpenCreate] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => (await api.get("/api/events")).data,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Events</h1>
        {role === "admin" && (
          <Button onClick={() => setOpenCreate(true)}>Create Event</Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data?.map((ev: any) => (
            <Card key={ev.event_id}>
              <h3 className="text-lg font-semibold">{ev.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(ev.event_date).toDateString()} · {ev.location}
              </p>
              <p className="mt-2 text-sm">{ev.description}</p>
              <div className="mt-3 flex gap-3">
                <Link
                  to={`/events/${ev.event_id}`}
                  className="text-sm text-brand-700 hover:underline"
                >
                  View
                </Link>
              </div>
            </Card>
          ))}
          {!data?.length && (
            <div className="rounded-xl border bg-white p-6 text-center text-sm text-gray-600">
              No events yet.{" "}
              {role === "admin" ? "Create one to get started!" : ""}
            </div>
          )}
        </div>
      )}

      <CreateEventModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </div>
  );
}
