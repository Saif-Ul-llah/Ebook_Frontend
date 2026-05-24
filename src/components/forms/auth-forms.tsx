"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { forgotPassword, login, register } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "../ui/button";

export function LoginForm() {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to view your project dashboard.">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("");
          startTransition(async () => {
            try {
              const result = await login(email, password);
              if (!result.data?.accessToken) {
                throw new Error("Login requires verification before continuing.");
              }
              setTokens(result.data);
              router.push(result.data.user?.role === "ADMIN" ? "/admin" : "/dashboard");
            } catch (error) {
              setMessage(error instanceof Error ? error.message : "Login failed.");
            }
          });
        }}
      >
        <AuthField label="Email" type="email" value={email} onChange={setEmail} />
        <AuthField label="Password" type="password" value={password} onChange={setPassword} />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Signing in" : "Sign in"}
        </Button>
        {message ? <p className="text-sm font-bold text-crimson">{message}</p> : null}
        <div className="flex flex-col gap-2 text-sm font-black text-navy sm:flex-row sm:justify-between">
          <Link href="/auth/forgot-password" className="hover:text-crimson">
            Forgot password?
          </Link>
          <Link href="/auth/register" className="hover:text-crimson">
            Create account
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <AuthCard title="Create your account" subtitle="Register as a customer to track your publishing briefs.">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("");
          startTransition(async () => {
            try {
              await register(form);
              router.push("/auth/login");
            } catch (error) {
              setMessage(error instanceof Error ? error.message : "Registration failed.");
            }
          });
        }}
      >
        <AuthField label="Full name" value={form.fullName} onChange={(value) => updateField("fullName", value)} />
        <AuthField label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} />
        <AuthField label="Phone number" value={form.phoneNumber} onChange={(value) => updateField("phoneNumber", value)} />
        <AuthField label="Password" type="password" value={form.password} onChange={(value) => updateField("password", value)} />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating account" : "Create account"}
        </Button>
        {message ? <p className="text-sm font-bold text-crimson">{message}</p> : null}
      </form>
      <p className="mt-5 text-sm font-black text-navy">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-crimson hover:text-deepCrimson">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <AuthCard title="Reset password" subtitle="Request an OTP from the existing backend auth flow.">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("");
          startTransition(async () => {
            try {
              const result = await forgotPassword(email);
              setMessage(result.message);
            } catch (error) {
              setMessage(error instanceof Error ? error.message : "Request failed.");
            }
          });
        }}
      >
        <AuthField label="Email" type="email" value={email} onChange={setEmail} />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending" : "Send OTP"}
        </Button>
        {message ? <p className="text-sm font-bold text-crimson">{message}</p> : null}
      </form>
    </AuthCard>
  );
}

function AuthCard({
  title,
  subtitle,
  children,
}: Readonly<{ title: string; subtitle: string; children: React.ReactNode }>) {
  return (
    <div className="w-full max-w-md rounded-md border border-navy/10 bg-white p-6 shadow-soft">
      <h1 className="font-serif text-4xl font-black text-navy">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-steel">{subtitle}</p>
      <div className="mt-6">{children}</div>
      <div className="mt-6 border-t border-navy/10 pt-5 text-sm font-bold text-steel">
        <Link href="/" className="hover:text-crimson">
          Back to Noble Ink Studios
        </Link>
      </div>
    </div>
  );
}

function AuthField({
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
