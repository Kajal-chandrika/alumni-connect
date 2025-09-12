import Card from "../../components/ui/Card";

export default function AlumniDashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <h3 className="font-semibold mb-2">Welcome back 👋</h3>
        <p className="text-sm text-gray-600">
          Update your profile, share jobs, register for events and support your
          institute.
        </p>
      </Card>
      <Card>
        <h3 className="font-semibold mb-2">Quick Actions</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Complete your Alumni Profile</li>
          <li>Post a new Job/Internship</li>
          <li>Register for upcoming events</li>
        </ul>
      </Card>
    </div>
  );
}
