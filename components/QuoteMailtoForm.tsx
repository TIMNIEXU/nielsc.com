"use client";

import { useState } from "react";
import { SendIcon } from "./icons";

/* Quote-request form with no backend: composes a mailto: link to
   info@nielcustoms.ai from the form fields. Nothing is sent automatically —
   the user's own email app sends it. Messages arrive as a plain dict. */

export default function QuoteMailtoForm({
  messages,
  services,
}: {
  messages: Record<string, string>;
  services: string[];
}) {
  const t = (k: string) => messages[k] ?? k;
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(services[0] ?? "");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  const inputCls =
    "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-[14px] text-ink outline-none focus:border-gold-deep focus:ring-2 focus:ring-gold/30";
  const labelCls = "mb-1 block text-[12.5px] font-bold text-ink-soft";

  const submit = () => {
    setErr("");
    if (!name.trim() || !message.trim()) {
      setErr(t("errRequired"));
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr(t("errEmail"));
      return;
    }
    const subject = `Quote request — ${service} — ${name.trim()}`;
    const body = [
      `Name: ${name.trim()}`,
      `Company: ${company.trim() || "-"}`,
      `Email: ${email.trim() || "-"}`,
      `Service: ${service}`,
      "",
      message.trim(),
    ].join("\n");
    window.location.href = `mailto:info@nielcustoms.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>{t("name")} *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} autoComplete="name" />
        </div>
        <div>
          <label className={labelCls}>{t("company")}</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} autoComplete="organization" />
        </div>
        <div>
          <label className={labelCls}>{t("email")}</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputCls} autoComplete="email" />
        </div>
        <div>
          <label className={labelCls}>{t("service")}</label>
          <select value={service} onChange={(e) => setService(e.target.value)} className={inputCls}>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className={labelCls}>{t("message")} *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("messagePh")}
          rows={5}
          className={inputCls}
        />
      </div>
      {err && <p className="mt-3 text-[13.5px] font-semibold text-red-700">{err}</p>}
      <button
        onClick={submit}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white"
      >
        <SendIcon className="h-4 w-4" />
        {t("submit")}
      </button>
      <p className="mt-4 text-[12.5px] leading-relaxed text-muted">{t("note")}</p>
    </div>
  );
}
