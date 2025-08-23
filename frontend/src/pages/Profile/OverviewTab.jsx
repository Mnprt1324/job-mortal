import { Briefcase, Mail, MapPin, Phone } from "lucide-react";
import { InfoCard } from "./InfoCard";

export const OverviewTab = ({ user }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-3">About</h3>
      <p className="text-gray-600 leading-relaxed">
        {user?.profile?.bio || "No bio available. Add a professional summary to help employers understand your background and goals."}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoCard icon={Briefcase} label="Experience Level" value={user?.profile?.experience || "Not specified"} />
      <InfoCard icon={MapPin} label="Location" value={user?.profile?.location || "Not specified"} />
      <InfoCard icon={Mail} label="Email" value={user?.email || "Not provided"} />
      <InfoCard icon={Phone} label="Phone" value={user?.profile?.phone || "Not provided"} />
    </div>
  </div>
);
