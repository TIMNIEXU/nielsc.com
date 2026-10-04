"use client";

import { useState} from "react";

/* 美国清关落地页的预约演示表单。
提交到 nielcos.ai 的 supply-chain-case（service=customs，备注标注演示预约），
API 不可达时 mailto 兜底，绝不丢单。字段按销售物料 01 的第七屏。 */

const CASE_API = "https://www.nielcos.ai/api/public/supply-chain-case";

const inputCls =
"h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-ink-soft/40 focus:border-abyss focus:outline-none";

const VALUE_BANDS = ["100万美元以下", "100–500万美元", "500–2000万美元", "2000万美元以上", "暂不透露"];

export default function UsCustomsDemoForm() {
const [company, setCompany] = useState("");
const [contact, setContact] = useState("");
const [title, setTitle] = useState("");
const [phone, setPhone] = useState("");
const [product, setProduct] = useState("");
const [hs, setHs] = useState("");
const [port, setPort] = useState("");
const [band, setBand] = useState(VALUE_BANDS[0]);
const [sending, setSending] = useState(false);
const [err, setErr] = useState("");
const [done, setDone] = useState(false);
const [viaEmail, setViaEmail] = useState(false);

const mailtoFallback = (id: string) => {
const subject = `美国清关演示预约 ${id}`;
const body = [
`公司名称：${company.trim() || "-"}`,
`联系人：${contact.trim()}（${title.trim() || "-"}）`,
`手机/微信：${phone.trim() || "-"}`,
`主要出口产品：${product.trim() || "-"}`,
`HS 编码：${hs.trim() || "-"}`,
`美国进口港口：${port.trim() || "-"}`,
`年出口美国货值：${band}`,
].join("\n");
window.location.href = `mailto:quote@nielsc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const submit = async (e: React.FormEvent) => {
e.preventDefault();
if (sending) return;
setErr("");
if (!contact.trim() ||!phone.trim()) {
setErr("请填写联系人姓名和手机/微信，方便我们与你联系。");
return;
}
const id = `SC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
const payload = {
case_id: id,
company: company.trim(),
contact: contact.trim(),
email: "",
phone: phone.trim(),
services: [{ type: "customs", label: "美国清关演示预约"}],
end_to_end: false,
origin: "中国",
destination: port.trim(),
cargo: [
`产品：${product.trim() || "-"}`,
`HS：${hs.trim() || "-"}`,
`年出口美国货值：${band}`,
].join("；"),
load: "",
ready: "",
notes: `职位：${title.trim() || "-"}`,
docs: [],
locale: "zh-CN",
};
setSending(true);
try {
const ctrl = new AbortController();
const timer = setTimeout(() => ctrl.abort(), 12000);
const res = await fetch(CASE_API, {
method: "POST",
headers: { "Content-Type": "application/json"},
body: JSON.stringify(payload),
signal: ctrl.signal,
});
clearTimeout(timer);
const data = (await res.json().catch(() => null)) as { ok?: boolean} | null;
if (res.ok && data?.ok) {
setViaEmail(false);
setDone(true);
return;
}
throw new Error("api_not_ok");
} catch {
mailtoFallback(id);
setViaEmail(true);
setDone(true);
} finally {
setSending(false);
}
};

if (done) {
return (
<div className="py-8 text-center">
<p className="eyebrow justify-center">提交成功</p>
<h3 className="display mt-3 text-2xl text-ink">已收到你的评估申请</h3>
<p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink-soft">
{viaEmail
? "网络原因，已为你打开邮件客户端发送申请。如未跳转，请直接发送邮件至 quote@nielsc.com。"
: "我们会尽快通过微信与你联系，发送行业资料并约 15 分钟中文演示时间。"}
</p>
</div>
);
}

const field = (label: string, el: React.ReactNode, required = false) => (
<label className="block">
<span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
{label}
{required && <span className="text-red-600"> *</span>}
</span>
{el}
</label>
);

return (
<form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
{field("公司名称", <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="如：XX木业有限公司" />)}
{field("联系人姓名", <input className={inputCls} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="张三" />, true)}
{field("职位", <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="如：关务经理 / 外贸总监" />)}
{field("手机号 / 微信", <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="手机或微信号" />, true)}
<div className="sm:col-span-2">
{field("主要出口产品", <input className={inputCls} value={product} onChange={(e) => setProduct(e.target.value)} placeholder="如：实木门、液压管件、光伏组件" />)}
</div>
{field("目标 HS 编码或产品类别", <input className={inputCls} value={hs} onChange={(e) => setHs(e.target.value)} placeholder="如：4418.20" />)}
{field("美国进口港口", <input className={inputCls} value={port} onChange={(e) => setPort(e.target.value)} placeholder="如：洛杉矶 / 纽约" />)}
<div className="sm:col-span-2">
{field(
"年出口美国货值区间",
<select className={inputCls} value={band} onChange={(e) => setBand(e.target.value)}>
{VALUE_BANDS.map((b) => (
<option key={b}>{b}</option>
))}
</select>
)}
</div>
{err && (
<p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">{err}</p>
)}
<div className="sm:col-span-2">
<button
type="submit"
disabled={sending}
className="h-12 w-full rounded-xl bg-gold text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white disabled:opacity-60"
>
{sending? "提交中…": "提交评估申请"}
</button>
<p className="mt-3 text-center text-[12px] text-ink-soft">
提交即表示同意我们通过微信与你联系。信息仅用于演示安排，不做他用。
</p>
</div>
</form>
);
}
