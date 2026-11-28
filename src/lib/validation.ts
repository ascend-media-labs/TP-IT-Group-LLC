import { z } from "zod";

const required = (label: string, max: number) =>
  z
    .string({
      error: (issue) =>
        issue.input === undefined ? `${label} is required` : `${label} must be text`,
    })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} is too long (maximum ${max} characters)`);

// Optional text columns can come back from the database as null when a row is edited.
const optional = (label: string, max: number) =>
  z
    .string({ error: `${label} must be text` })
    .trim()
    .max(max, `${label} is too long (maximum ${max} characters)`)
    .nullish()
    .transform((value) => value ?? "");

const email = required("Email", 191)
  .toLowerCase()
  .pipe(z.email("Please enter a valid email address"));

const isPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").length;
  return /^\+?[0-9\s().-]*$/.test(value) && digits >= 10 && digits <= 15;
};
const PHONE_MESSAGE = "Please enter a valid phone number (10 to 15 digits)";

/** Accepts only http(s) links; adds https:// when the visitor leaves it out. */
const webLink = (label: string) =>
  optional(label, 255).transform((value, ctx) => {
    if (!value) return "";
    const candidate = /^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`;
    try {
      const url = new URL(candidate);
      if ((url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".")) {
        return candidate;
      }
    } catch {
      // handled below
    }
    ctx.addIssue({ code: "custom", message: `${label} must be a valid web link` });
    return z.NEVER;
  });

/** A path on this site ("/team/a.jpg") or an https URL. */
const imageSource = (label: string) =>
  optional(label, 255).refine(
    (value) => !value || /^\/(?![/\\])[^\\]*$/.test(value) || /^https:\/\/\S+$/i.test(value),
    `${label} must be a path starting with / or an https:// link`,
  );

const displayOrder = z.coerce.number().int().min(-100000).max(100000).catch(0);

export const idSchema = z.object({
  id: z.coerce
    .number({ error: "A valid ID is required" })
    .int("A valid ID is required")
    .positive("A valid ID is required"),
});

export const loginSchema = z.object({
  email: required("Email", 191).toLowerCase(),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required")
    .max(200, "Password is too long"),
});

export const teamSchema = z.object({
  name: required("Name", 150),
  role: required("Role", 150),
  sub_role: optional("Sub role", 1000),
  bio: optional("Bio", 5000),
  image: imageSource("Image"),
  department: optional("Department", 100),
  display_order: displayOrder,
});

export const clientSchema = z.object({
  name: required("Client name", 150),
  src: imageSource("Logo").refine(Boolean, "Client logo is required"),
  category: optional("Category", 100),
  display_order: displayOrder,
});

export const careerSchema = z.object({
  title: required("Job title", 200),
  dept: required("Department", 100),
  location: optional("Location", 150),
  type: optional("Type", 50),
  experience: optional("Experience", 50),
  description: optional("Description", 10000),
  is_active: z
    .union([z.boolean(), z.literal(0), z.literal(1)])
    .optional()
    .transform((value) => (value === false || value === 0 ? 0 : 1)),
});

export const contactSchema = z.object({
  name: required("Name", 150),
  email,
  phone: optional("Phone", 50).refine((value) => !value || isPhone(value), PHONE_MESSAGE),
  subject: optional("Subject", 200),
  message: required("Message", 5000),
});

export const applicationSchema = z.object({
  role_title: required("Role title", 200),
  dept: optional("Department", 100),
  location: optional("Location", 150),
  applicant_name: required("Full name", 150),
  email,
  phone: required("Phone number", 50).refine(isPhone, PHONE_MESSAGE),
  current_city: optional("Current city", 150),
  experience_years: optional("Experience", 50),
  current_company: optional("Current company", 150),
  work_authorization: optional("Work authorization", 150),
  notice_period: optional("Notice period", 100),
  linkedin_url: webLink("LinkedIn URL"),
  portfolio_url: webLink("Portfolio URL"),
  resume_link: webLink("Resume link"),
  cover_note: optional("Cover note", 5000),
});

export const APPLICATION_STATUSES = [
  "Submitted",
  "Reviewing",
  "Shortlisted",
  "Rejected",
  "Hired",
] as const;

export const applicationStatusSchema = idSchema.extend({
  status: z.enum(APPLICATION_STATUSES),
});

export const contactReadSchema = idSchema.extend({
  is_read: z.union([z.boolean(), z.literal(0), z.literal(1)]),
});
