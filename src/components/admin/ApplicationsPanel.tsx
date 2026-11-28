import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APPLICATION_STATUSES } from "@/lib/validation";

export interface JobApplication {
  id: number;
  role_title: string;
  dept?: string | null;
  location?: string | null;
  applicant_name: string;
  email: string;
  phone: string;
  current_city?: string | null;
  experience_years?: string | null;
  current_company?: string | null;
  work_authorization?: string | null;
  notice_period?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  resume_link?: string | null;
  cover_note?: string | null;
  status: string;
  created_at: string;
}

// Rows saved before validation was added may hold any text, so check again before linking.
const isWebLink = (value?: string | null): value is string => /^https?:\/\//i.test(value ?? "");

export function ApplicationsPanel({
  applications,
  onStatusChange,
  onDelete,
}: {
  applications: JobApplication[];
  onStatusChange: (application: JobApplication, status: string) => void;
  onDelete: (application: JobApplication) => void;
}) {
  if (applications.length === 0) {
    return (
      <div className="p-12 text-center text-xs text-slate-500 font-medium bg-white rounded-2xl border border-slate-200 shadow-xs">
        No job applications yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((application) => (
        <article
          key={application.id}
          className="admin-card p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-slate-900">{application.applicant_name}</h4>
              <p className="text-xs font-bold text-[#d7192a]">{application.role_title}</p>
              <p className="mt-1 text-xs text-slate-600 break-all">
                {application.email} • {application.phone}
              </p>
              <p className="text-[11px] text-slate-400">
                {new Date(application.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <select
                aria-label={`Status of ${application.applicant_name}`}
                value={application.status}
                onChange={(event) => onStatusChange(application, event.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium"
              >
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <Button
                onClick={() => onDelete(application)}
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg text-slate-400 hover:text-[#d7192a] hover:bg-red-50 cursor-pointer"
                title="Delete application"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 text-xs">
            {[
              ["Department", application.dept],
              ["Job location", application.location],
              ["Current city", application.current_city],
              ["Experience", application.experience_years],
              ["Current company", application.current_company],
              ["Work authorization", application.work_authorization],
              ["Notice period", application.notice_period],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[10px] font-bold uppercase text-slate-400">{label}</dt>
                <dd className="text-slate-700 font-medium">{value || "—"}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3 text-xs font-bold">
            {[
              ["Resume", application.resume_link],
              ["LinkedIn", application.linkedin_url],
              ["Portfolio", application.portfolio_url],
            ].map(([label, link]) =>
              isWebLink(link) ? (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link}
                  className="text-[#d7192a] hover:underline"
                >
                  {label} ↗
                </a>
              ) : null,
            )}
          </div>

          {application.cover_note && (
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100 whitespace-pre-wrap">
              {application.cover_note}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
