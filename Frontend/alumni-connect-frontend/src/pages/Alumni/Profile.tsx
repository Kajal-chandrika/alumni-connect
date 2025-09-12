import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/api/alumni/${user?.id}`);
        setProfile(data);
      } catch {
        setProfile({
          phone: "",
          graduation_year: "",
          department: "",
          location: "",
          linkedin_url: "",
        });
      }
    };
    if (user) load();
  }, [user]);

  const save = async () => {
    setSaving(true);
    try {
      if (profile?.alumni_id) {
        await api.put(`/api/alumni/${profile.alumni_id}`, profile);
      } else {
        await api.post(`/api/alumni`, profile);
      }
      alert("Saved!");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;
  if (!profile) return <p>Loading…</p>;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h2 className="text-lg font-semibold mb-4">Alumni Profile</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <Input
              value={profile.phone || ""}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Graduation Year</label>
              <Input
                value={profile.graduation_year || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    graduation_year: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Department</label>
              <Input
                value={profile.department || ""}
                onChange={(e) =>
                  setProfile({ ...profile, department: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <Input
                value={profile.location || ""}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">LinkedIn URL</label>
              <Input
                value={profile.linkedin_url || ""}
                onChange={(e) =>
                  setProfile({ ...profile, linkedin_url: e.target.value })
                }
              />
            </div>
          </div>
          <Button onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save Profile"}
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Helpful Tips</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Keep your LinkedIn updated for students to reach out</li>
          <li>Share mentorship and job openings to help your juniors</li>
        </ul>
      </Card>
    </div>
  );
}
