"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction, setupAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

const control = "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3";

export function AuthForm({ setup = false }: { setup?: boolean }) {
  const [state, action, pending] = useActionState(setup ? setupAction : loginAction, { error: "" });
  const [token, setToken] = useState("");
  useEffect(() => {
    if (!setup) return;
    const params = new URLSearchParams(window.location.hash.slice(1));
    const key = params.get("key");
    if (key) {
      setToken(key);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [setup]);

  return (
    <form action={action} className="mt-8 space-y-5">
      <fieldset disabled={pending} className="space-y-5">
        <legend className="sr-only">{setup ? "Create your admin account" : "Admin sign in"}</legend>
        {setup && <label className="block text-sm font-medium">Setup key<input className={control} name="token" type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" required /></label>}
        <label className="block text-sm font-medium">Email address<input className={control} name="email" type="email" autoComplete="username" required maxLength={254} /></label>
        <label className="block text-sm font-medium">Password<input className={control} name="password" type="password" autoComplete={setup ? "new-password" : "current-password"} minLength={setup ? 12 : 1} maxLength={256} required /></label>
        {setup && <><p className="text-sm text-muted-foreground">Use at least 12 characters. A password manager can generate and save a strong password for you.</p><label className="block text-sm font-medium">Confirm password<input className={control} name="confirm" type="password" autoComplete="new-password" minLength={12} maxLength={256} required /></label></>}
      </fieldset>
      {state.error && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm">{state.error}</p>}
      <Button type="submit" className="w-full" disabled={pending}>{pending ? "Please wait…" : setup ? "Create admin account" : "Sign in"}</Button>
    </form>
  );
}
