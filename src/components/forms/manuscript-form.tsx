"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { submitManuscript } from "@/lib/api";
import { services } from "@/lib/services-data";
import type { ManuscriptPayload } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "../ui/button";

const initialPayload: ManuscriptPayload = {
  fullName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  serviceType: services[0].title,
  projectTitle: "",
  genre: "",
  message: "",
  manuscript: null,
};

export function ManuscriptForm() {
  const token = useAuthStore((state) => state.accessToken);
  const [payload, setPayload] = useState(initialPayload);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const updateField = (field: keyof ManuscriptPayload, value: string | File | null) => {
    setPayload((current) => ({ ...current, [field]: value }));
  };

  return (
    <form
      id="manuscript"
      className="rounded-md border border-navy/10 bg-white p-6 shadow-soft"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("");
        startTransition(async () => {
          try {
            await submitManuscript(payload, token);
            setPayload(initialPayload);
            setMessage("Your project brief was submitted.");
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Submission failed.");
          }
        });
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="First name" value={payload.fullName} onChange={(value) => updateField("fullName", value)} />
        <Field label="Last name" value={payload.lastName ?? ""} onChange={(value) => updateField("lastName", value)} />
        <Field label="Email" type="email" value={payload.email} onChange={(value) => updateField("email", value)} />
        <Field label="Phone" value={payload.phoneNumber} onChange={(value) => updateField("phoneNumber", value)} />
        <label className="grid gap-2 text-sm font-black text-navy">
          Service
          <select
            className="min-h-12 rounded-md border border-navy/15 bg-cream px-3 font-semibold text-steel outline-none focus:border-crimson"
            value={payload.serviceType}
            onChange={(event) => updateField("serviceType", event.target.value)}
          >
            {services.map((service) => (
              <option key={service.slug}>{service.title}</option>
            ))}
          </select>
        </label>
        <Field label="Project title" value={payload.projectTitle} onChange={(value) => updateField("projectTitle", value)} />
        <Field label="Genre/category" value={payload.genre} onChange={(value) => updateField("genre", value)} />
      </div>
      <label className="mt-4 grid gap-2 text-sm font-black text-navy">
        Project notes
        <textarea
          className="min-h-32 rounded-md border border-navy/15 bg-cream px-3 py-3 font-semibold text-steel outline-none focus:border-crimson"
          value={payload.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </label>
      <div className="mt-4 rounded-md border border-dashed border-navy/25 bg-cream p-5">
        <label className="grid gap-3 text-sm font-black text-navy">
          Please upload your manuscript
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(event) => updateField("manuscript", event.target.files?.[0] ?? null)}
            className="rounded-md border border-navy/10 bg-white p-4 text-sm font-semibold text-steel file:mr-4 file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
          />
        </label>
        <p className="mt-3 text-xs font-semibold text-steel">
          Accepted formats: PDF, DOC, DOCX, TXT. Maximum size: 20 MB.
        </p>
      </div>
      <p className="mt-3 text-xs font-semibold text-steel">
        Secure file uploads are planned for the next backend storage phase. This form captures project metadata now.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <Send size={17} aria-hidden="true" />
          {isPending ? "Submitting" : "Submit brief"}
        </Button>
        {message ? <p className="text-sm font-bold text-crimson">{message}</p> : null}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      {label}
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-md border border-navy/15 bg-cream px-3 font-semibold text-steel outline-none focus:border-crimson"
      />
    </label>
  );
}
