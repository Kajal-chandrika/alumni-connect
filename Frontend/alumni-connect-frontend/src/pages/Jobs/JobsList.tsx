import { useState, useMemo } from "react";
import type { FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { useAuth } from "../../hooks/useAuth";

type Job = {
  job_id: number;
  posted_by: number;
  title: string;
  company: string;
  description?: string;
  location?: string;
  type: "job" | "internship";
  posted_at: string;
};

type Paginated<T> = {
  total: number;
  page: number;
  limit: number;
  data: T[];
};

type JobsIndexResponse = Job[] | Paginated<Job>;

function normalizeJobs(raw: JobsIndexResponse) {
  if (Array.isArray(raw)) {
    return {
      items: raw,
      total: raw.length,
      page: 1,
      limit: raw.length || 10,
      pages: 1,
    };
  }
  const total = raw?.total ?? raw?.data?.length ?? 0;
  const limit = raw?.limit ?? 10;
  const page = raw?.page ?? 1;
  const items = Array.isArray(raw?.data) ? raw.data : [];
  const pages = Math.max(1, Math.ceil(total / (limit || 1)));
  return { items, total, page, limit, pages };
}

function Skeleton() {
  return (
    <div className="animate-pulse rounded-xl border bg-white p-4">
      <div className="h-5 w-2/3 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-100" />
      <div className="mt-4 h-16 w-full rounded bg-gray-100" />
      <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
    </div>
  );
}

export default function JobsList() {
  const { role } = useAuth();

  // filters & pagination
  const [type, setType] = useState<"" | "job" | "internship">("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  const queryKey = useMemo(
    () => ["jobs", { page, limit, type, location }],
    [page, limit, type, location]
  );

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (type) params.set("type", type);
      if (location.trim()) params.set("location", location.trim());
      const res = await api.get<JobsIndexResponse>(`/api/jobs?${params}`);
      return res.data;
    },
    keepPreviousData: true,
    select: (raw) => normalizeJobs(raw),
  });

  const submitFilters = (e: FormEvent) => {
    e.preventDefault();
    setPage(1); // reset to first page on filter change
  };

  const clearFilters = () => {
    setType("");
    setLocation("");
    setPage(1);
  };

  const canPrev = (data?.page ?? 1) > 1;
  const canNext = (data?.page ?? 1) < (data?.pages ?? 1);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-xl font-semibold">Openings</h1>
        {role !== "student" && (
          <Link
            to="/jobs/create"
            className="inline-flex items-center rounded-md bg-brand-600 px-3 py-2 text-sm text-black hover:bg-brand-700"
          >
            Post Job
          </Link>
        )}
      </div>

      {/* Filters */}
      <Card>
        <form
          onSubmit={submitFilters}
          className="grid gap-3 sm:grid-cols-[200px_1fr_auto_auto] items-end"
        >
          <div>
            <label className="text-sm text-gray-600">Type</label>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="">All</option>
              <option value="job">Job</option>
              <option value="internship">Internship</option>
            </Select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <Input
              placeholder="Bangalore, Hyderabad…"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button type="submit" className="sm:ml-2">
            Apply
          </Button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-md px-4 py-2 text-sm hover:bg-gray-100"
          >
            Reset
          </button>
        </form>
      </Card>

      {/* List */}
      {isLoading ? (
        <div className="grid gap-4">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : isError ? (
        <div className="rounded-xl border bg-red-50 p-4 text-sm text-red-700">
          {(error as any)?.message || "Failed to load jobs."}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {data?.items?.map((job) => (
              <Card key={job.job_id}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600">
                      {job.company} · {job.location || "—"} · {job.type}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(job.posted_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm">{job.description}</p>
              </Card>
            ))}

            {!data?.items?.length && (
              <div className="rounded-xl border bg-white p-6 text-center text-sm text-gray-600">
                No jobs found. Try changing filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          {data && data.pages > 1 && (
            <div className="flex items-center justify-between rounded-xl border bg-white p-3">
              <div className="text-sm text-gray-600">
                Page <strong>{data.page}</strong> of{" "}
                <strong>{data.pages}</strong>{" "}
                {isFetching && (
                  <span className="ml-2 animate-pulse">Updating…</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="rounded-md px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!canPrev}
                >
                  Prev
                </button>
                <button
                  className="rounded-md px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-40"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!canNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
