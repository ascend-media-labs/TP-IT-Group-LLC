import { useState, useEffect } from 'react';
import { createFileRoute, Link, useSearch } from '@tanstack/react-router';
import {
  Briefcase,
  MapPin,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Send,
  User,
  Mail,
  Phone,
  FileText,
  Linkedin,
  Globe,
  Clock,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { metadata, careersJobs, companyInfo } from '@/components/corporate/content';

interface ApplySearchParams {
  role?: string;
  dept?: string;
  location?: string;
}

export const Route = createFileRoute('/apply')({
  validateSearch: (search: Record<string, unknown>): ApplySearchParams => ({
    role: typeof search.role === 'string' ? search.role : '',
    dept: typeof search.dept === 'string' ? search.dept : '',
    location: typeof search.location === 'string' ? search.location : '',
  }),
  head: () =>
    metadata(
      'Apply for Job Opening | TP IT Group LLC Careers',
      'Submit your application for global technology and consulting roles at TP IT Group LLC.'
    ),
  component: ApplyPage,
});

export function ApplyPage() {
  const search = useSearch({ from: '/apply' }) as ApplySearchParams;

  // Pre-fill role details from search params
  const initialRole = search.role || 'Senior Cloud Architect';
  const initialDept = search.dept || 'Engineering';
  const initialLocation = search.location || 'Remote / Hybrid';

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [jobsList, setJobsList] = useState(careersJobs);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/careers')
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.careers) && data.careers.length > 0) {
          setJobsList(data.careers);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [experience, setExperience] = useState('3-5 years');
  const [currentCompany, setCurrentCompany] = useState('');
  const [workAuth, setWorkAuth] = useState('Authorized to work (No sponsorship needed)');
  const [noticePeriod, setNoticePeriod] = useState('Immediate (within 15 days)');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [coverNote, setCoverNote] = useState('');

  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // When selectedRole changes, update department and location if it matches a preset job
  const handleRoleChange = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    const matched = jobsList.find((j) => j.title === roleTitle);
    if (matched) {
      setSelectedDept(matched.dept);
      setSelectedLocation(matched.location);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Name validation
    const trimmedName = fullName.trim();
    if (!trimmedName || /\d/.test(trimmedName) || !/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
      setErrorMsg('Please enter a valid full name (letters only, no numbers).');
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Phone validation
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      setErrorMsg('Please enter a valid phone number (between 10 and 15 digits).');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        role_title: selectedRole,
        dept: selectedDept,
        location: selectedLocation,
        applicant_name: fullName,
        email,
        phone,
        current_city: currentCity,
        experience_years: experience,
        current_company: currentCompany,
        work_authorization: workAuth,
        notice_period: noticePeriod,
        linkedin_url: linkedinUrl,
        portfolio_url: portfolioUrl,
        resume_link: resumeLink,
        cover_note: coverNote,
      };

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedData({
          ...payload,
          applicationId: data.applicationId || `TPIT-${new Date().getFullYear()}-0001`,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMsg(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg('Network error while submitting application to Laragon MySQL.');
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedData) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 py-12 px-4 sm:px-6 lg:px-8 bg-dot-pattern">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl border border-emerald-200 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/60 text-center">
            <div className="size-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 className="size-9" />
            </div>

            <span className="rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Application Received
            </span>

            <h1 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Thank You, {submittedData.applicant_name}!
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Your application for <span className="font-bold text-[#d7192a]">{submittedData.role_title}</span> has been stored and registered in our system.
            </p>

            {/* Reference Card */}
            <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Application Reference ID:</span>
                <span className="font-mono font-black text-[#d7192a] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  {submittedData.applicationId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Position:</span>
                <span className="font-bold text-slate-900">{submittedData.role_title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Department:</span>
                <span className="font-bold text-slate-700">{submittedData.dept}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Location:</span>
                <span className="font-bold text-slate-700">{submittedData.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Contact Email:</span>
                <span className="font-bold text-slate-700">{submittedData.email}</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-left text-xs text-blue-900 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="size-4.5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>What's Next?</strong> Our technical recruiting team will review your background and credentials. Qualified candidates will be contacted within 2 business days for a technical screening call.
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild className="w-full sm:w-auto h-11 rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs shadow-md">
                <Link to="/careers">Explore More Roles</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto h-11 rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN APPLICATION FORM
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 py-10 px-4 sm:px-6 lg:px-8 bg-dot-pattern selection:bg-[#d7192a]/20">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/careers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#d7192a] transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Careers & Open Positions
          </Link>
        </div>

        {/* Role Highlight Header Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 mb-8 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-red-500/10 blur-2xl" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-extrabold text-[#d7192a] tracking-wider uppercase">
              {selectedDept}
            </span>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Actively Hiring
            </span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Apply for: <span className="text-[#d7192a]">{selectedRole}</span>
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5 text-[#d7192a]" /> {selectedLocation}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="size-3.5 text-slate-400" /> Full-Time Enterprise Role
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Building2 className="size-3.5 text-slate-400" /> TP IT Group LLC
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-800">
            <AlertCircle className="size-5 shrink-0 text-red-600" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Position Confirmation / Selector */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Briefcase className="size-4.5 text-[#d7192a]" />
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">1. Target Position</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Job Role Applying For *
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                >
                  {jobsList.map((j) => (
                    <option key={j.title} value={j.title}>
                      {j.title} ({j.dept})
                    </option>
                  ))}
                  <option value="General Application">General Application (Any Open Position)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Work Location / Model
                </label>
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Personal & Contact Information */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="size-4.5 text-[#d7192a]" />
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">2. Personal & Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 size-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 size-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Phone Number (with Country Code) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 size-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Current City & Country *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 size-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    placeholder="e.g. New York, NY, USA or Hyderabad, India"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Professional Experience & Authorization */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldCheck className="size-4.5 text-[#d7192a]" />
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">3. Professional Experience & Authorization</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Years of Relevant Experience *
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                >
                  <option value="1-3 years">1 - 3 years (Associate / Junior)</option>
                  <option value="3-5 years">3 - 5 years (Mid-Level Professional)</option>
                  <option value="5-8 years">5 - 8 years (Senior Specialist)</option>
                  <option value="8-12 years">8 - 12 years (Lead / Principal)</option>
                  <option value="12+ years">12+ years (Architect / Director)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Current Employer & Designation
                </label>
                <input
                  type="text"
                  value={currentCompany}
                  onChange={(e) => setCurrentCompany(e.target.value)}
                  placeholder="e.g. Senior Consultant at CloudTech"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Work Authorization Status *
                </label>
                <select
                  value={workAuth}
                  onChange={(e) => setWorkAuth(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                >
                  <option value="US Citizen / Permanent Resident (Green Card)">US Citizen / Permanent Resident (Green Card)</option>
                  <option value="H-1B / EAD / Visa Transfer Required">H-1B / EAD / Visa Transfer Required</option>
                  <option value="Canadian Citizen / Permanent Resident">Canadian Citizen / Permanent Resident</option>
                  <option value="Indian Citizen (Available for Hybrid / Remote)">Indian Citizen (Available for Hybrid / Remote)</option>
                  <option value="Other / Requires Sponsorship">Other / Requires Sponsorship</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Notice Period / Available Start Date *
                </label>
                <select
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                >
                  <option value="Immediate (within 15 days)">Immediate (within 15 days)</option>
                  <option value="30 Days Notice">30 Days Notice</option>
                  <option value="60 Days Notice">60 Days Notice</option>
                  <option value="90 Days Notice">90 Days Notice</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 4: Resume, Links & Statement */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <FileText className="size-4.5 text-[#d7192a]" />
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">4. Resume, Links & Statement</h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Resume / CV Link (Google Drive, Dropbox, OneDrive, etc.) *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 size-4 text-slate-400" />
                  <input
                    type="url"
                    required
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    placeholder="https://drive.google.com/file/d/... or Dropbox link"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Please ensure the link is set to "Anyone with the link can view".
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3.5 top-3 size-4 text-slate-400" />
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Portfolio / GitHub URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-3 size-4 text-slate-400" />
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://github.com/yourhandle"
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  Brief Introduction & Key Qualifications
                </label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Share highlights of your experience, key projects, technical certifications (AWS, Azure, SAP, etc.) and what makes you a great fit for TP IT Group..."
                  className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submission Notice & Button */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900">Equal Opportunity:</span> TP IT Group LLC does not discriminate on the basis of race, religion, gender, or age.
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-[#d7192a] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer shrink-0"
            >
              {submitting ? (
                <>Submitting to MySQL...</>
              ) : (
                <>
                  Submit Application <Send className="size-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
