import Card from "../../components/ui/Card";

export default function StudentDashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <h3 className="font-semibold mb-2">Hello Student 🎓</h3>
        <p className="text-sm text-gray-600">
          Discover events, internships and connect with alumni.
        </p>
      </Card>
      <Card>
        <h3 className="font-semibold mb-2">Get Started</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Explore Events</li>
          <li>Search Internships</li>
          <li>Join the community feed</li>
        </ul>
      </Card>
    </div>
  );
}
