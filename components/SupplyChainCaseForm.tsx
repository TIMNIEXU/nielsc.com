"use client";

import { useState } from "react";
import { CheckIcon, SendIcon } from "./icons";

/* Supply Chain Case intake (v1.1): structured RFQ with an instant case ID.
   No backend yet — composes a mailto: to quote@nielsc.com carrying the full
   case payload. The user's own email app sends it. `form` is a plain
   messages object (never a function), so it is safe to pass to the client. */

export type FormMessages = {
  needTitle: string;
  services: string[];
  company: string;
  contact: string;
  email: string;
  phone: string;
  origin: string;
  originPh: string;
  destination: string;
  destinationPh: string;
  cargo: string;
  cargoPh: string;
  load: string;
  loadPh: string;
  ready: string;
  notes: string;
  notesPh: string;
  docs: string;
  docsNote: string;
  submit: string;
  sending: string;
  errRequired: string;
  errEmail: string;
  errService: string;
  successKicker: string;
  successTitle: string;
  successSub: string;
  successNote: string;
  fallbackNote: string;
  ordersTitle: string;
  routingTitle: string;
  routing: string[];
};

type CreatedOrder = { service: string; so_no: string };

/* Canonical service types for NIEL COS. Index-aligned with form.services
   (both locales): the 9 checkbox labels in messages map to these. */
const SERVICE_TYPES = [
  "customs", // Customs
  "freight", // Ocean Freight
  "freight", // Air Freight
  "drayage", // Drayage
  "drayage", // Trucking
  "warehouse", // Warehousing
  "insurance", // Insurance
  "bond", // Customs Bond
  "end_to_end", // End-to-End (coordination flag, not a service type)
];

const CASE_API = "https://www.nielcos.ai/api/public/supply-chain-case";

export default function SupplyChainCaseForm({ form }: { form: FormMessages }) {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cargo, setCargo] = useState("");
  const [load, setLoad] = useState("");
  const [ready, setReady] = useState("");
  const [notes, setNotes] = useState("");
  const [docs, setDocs] = useState<string[]>([]);
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [orders, setOrders] = useState<CreatedOrder[]>([]);
  const [viaEmail, setViaEmail] = useState(false);

  const services: string[] = form.services ?? [];

  /* First picked label for a canonical type (for the confirmation list). */
  const labelFor = (t: string) => {
    const i = SERVICE_TYPES.indexOf(t);
    return i >= 0 && services[i] ? services[i] : t;
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-[14px] text-ink outline-none focus:border-gold-deep focus:ring-2 focus:ring-gold/30";
  const labelCls = "mb-1 block text-[12.5px] font-bold text-ink-soft";

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const mailtoFallback = (id: string) => {
    const subject = `Supply Chain Case ${id} — ${picked.join(", ")} — ${company.trim() || contact.trim()}`;
    const body = [
      `Supply Chain Case: ${id}`,
      ``,
      `Company: ${company.trim() || "-"}`,
      `Contact: ${contact.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim() || "-"}`,
      ``,
      `Services needed: ${picked.join(", ")}`,
      ``,
      `Origin: ${origin.trim() || "-"}`,
      `Destination: ${destination.trim() || "-"}`,
      `Cargo: ${cargo.trim() || "-"}`,
      `Container / Weight: ${load.trim() || "-"}`,
      `Ready date / ETA: ${ready.trim() || "-"}`,
      ``,
      `Notes:`,
      notes.trim() || "-",
      ``,
      docs.length > 0
        ? `Documents (to be emailed separately): ${docs.join(", ")}`
        : `Documents: none attached`,
    ].join("\n");
    window.location.href = `mailto:quote@nielsc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async () => {
    if (sending) return;
    setErr("");
    if (!contact.trim() || !email.trim()) {
      setErr(form.errRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr(form.errEmail);
      return;
    }
    if (picked.length === 0) {
      setErr(form.errService);
      return;
    }
    const id = `SC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const payload = {
      case_id: id,
      company: company.trim(),
      contact: contact.trim(),
      email: email.trim(),
      phone: phone.trim(),
      services: picked.map((label) => ({
        type: SERVICE_TYPES[services.indexOf(label)] ?? "freight",
        label,
      })),
      end_to_end: picked.some((label) => SERVICE_TYPES[services.indexOf(label)] === "end_to_end"),
      origin: origin.trim(),
      destination: destination.trim(),
      cargo: cargo.trim(),
      load: load.trim(),
      ready: ready.trim(),
      notes: notes.trim(),
      docs,
      locale: document.documentElement.lang || "en",
    };

    setSending(true);
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch(CASE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        case_id?: string;
        orders?: CreatedOrder[];
      } | null;
      if (res.ok && data?.ok) {
        setCaseId(data.case_id || id);
        setOrders(Array.isArray(data.orders) ? data.orders : []);
        setViaEmail(false);
        return;
      }
      throw new Error("api_not_ok");
    } catch {
      // Backend unreachable — never lose the lead: fall back to email.
      mailtoFallback(id);
      setCaseId(id);
      setOrders([]);
      setViaEmail(true);
    } finally {
      setSending(false);
    }
  };

  if (caseId) {
    return (
      <div className="text-center">
        <p className="eyebrow justify-center">{form.successKicker}</p>
        <h3 className="display mt-3 text-3xl text-ink">{form.successTitle}</h3>
        <p className="mt-2 text-[14px] text-muted">{form.successSub}</p>
        <p className="display mx-auto mt-3 inline-block rounded-2xl bg-gold-tint px-8 py-4 text-4xl tracking-wide text-ink">
          {caseId}
        </p>
        <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-muted">
          {viaEmail ? form.fallbackNote : form.successNote}
        </p>
        {orders.length > 0 && (
          <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-line bg-white p-6 text-left">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-gold-deep">
              {form.ordersTitle}
            </p>
            <ul className="mt-3 space-y-2">
              {orders.map((o) => (
                <li key={o.so_no} className="flex items-center justify-between gap-3 text-[14px]">
                  <span className="font-bold text-ink">{labelFor(o.service)}</span>
                  <span className="display rounded-lg bg-abyss px-3 py-1 text-[13px] tracking-wide text-gold">
                    {o.so_no}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-line bg-cream/60 p-6 text-left">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-gold-deep">
            {form.routingTitle}
          </p>
          <ul className="mt-3 space-y-2">
            {(form.routing ?? []).map((r) => (
              <li key={r} className="flex items-start gap-2 text-[14px] text-ink">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>{form.company}</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputCls}
            autoComplete="organization"
          />
        </div>
        <div>
          <label className={labelCls}>{form.contact} *</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={inputCls}
            autoComplete="name"
          />
        </div>
        <div>
          <label className={labelCls}>{form.email} *</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={inputCls}
            autoComplete="email"
          />
        </div>
        <div>
          <label className={labelCls}>{form.phone}</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className={inputCls}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="mt-6">
        <p className={labelCls}>{form.needTitle} *</p>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const on = picked.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle(s)}
                aria-pressed={on}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13.5px] font-bold transition-colors ${
                  on
                    ? "border-gold-deep bg-gold text-abyss"
                    : "border-line bg-white text-ink-soft hover:border-gold-deep"
                }`}
              >
                {on && <CheckIcon className="h-3.5 w-3.5" />}
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>{form.origin}</label>
          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder={form.originPh}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{form.destination}</label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder={form.destinationPh}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{form.cargo}</label>
          <input
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder={form.cargoPh}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{form.load}</label>
          <input
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            placeholder={form.loadPh}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{form.ready}</label>
          <input
            value={ready}
            onChange={(e) => setReady(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{form.docs}</label>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setDocs(Array.from(e.target.files ?? []).map((f) => f.name))
            }
            className="w-full text-[13.5px] text-muted file:mr-3 file:rounded-full file:border file:border-line file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-bold file:text-ink hover:file:border-gold-deep"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelCls}>{form.notes}</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={form.notesPh}
          rows={4}
          className={inputCls}
        />
      </div>

      {docs.length > 0 && (
        <p className="mt-3 text-[12.5px] leading-relaxed text-muted">{form.docsNote}</p>
      )}

      {err && <p className="mt-3 text-[13.5px] font-semibold text-red-700">{err}</p>}

      <button
        onClick={submit}
        disabled={sending}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white disabled:opacity-60"
      >
        <SendIcon className="h-4 w-4" />
        {sending ? form.sending : form.submit}
      </button>
    </div>
  );
}
