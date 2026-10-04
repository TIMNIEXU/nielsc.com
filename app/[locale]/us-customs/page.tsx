import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import UsCustomsDemoForm from "@/components/UsCustomsDemoForm";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

/* /[locale]/us-customs — 中国出口商美国清关落地页（中文 campaign 页）。
   统一销售口径：美国清关单证自动化 + 清关风控工具。
   文案源文件：workspace/niel-group/china-gtm/01-landing-page-copy.md */

export const metadata: Metadata = {
  title: "NielSC AI｜面向中国出口商的美国清关单证自动化与风控工具",
  description:
    "自动校验 HS 归类、生成 7501 进口申报文件、核算关税与 Bond/MPF 成本，提前识别 CBP 查验风险。预约 15 分钟中文演示。",
};

const PAINS = [
  "HS 归类判断不一致，担心被美国海关质疑或处罚",
  "7501 等进口申报文件人工整理，耗时长、易错漏",
  "美国清关费用不透明，Bond、MPF、关税成本难以提前核算",
  "货到港后才发现单证问题，产生滞港、查验和额外费用",
  "美国清关服务商响应慢，中国工厂沟通成本高",
];

const FEATURES = [
  {
    t: "HS 归类智能校验",
    d: "基于产品信息、品名、用途和美国海关税则逻辑，辅助快速完成 HS 编码判断与归类一致性检查，降低人工判断误差。",
  },
  {
    t: "7501 进口申报文件辅助生成",
    d: "结构化整理商品、货值、包装、运输与税则信息，辅助生成符合美国进口申报要求的 7501 文件底稿，减少人工整理时间。",
  },
  {
    t: "关税与清关成本预核算",
    d: "自动核算关税、MPF 等相关成本，并结合进口方式与 Bond 需求，帮助外贸团队提前评估美国到港总成本。",
  },
  {
    t: "CBP 查验风险识别",
    d: "基于商品类别、原产地、进口历史、申报一致性等信息，辅助识别高风险环节，提醒企业在发货前完成资料自查。",
  },
  {
    t: "合作持证报关行落地服务",
    d: "AI 工具负责提升单证与预审核效率，合作美国持证报关行负责最终合规审核与清关落地，形成“工具 + 持牌行”的双重校验。",
  },
];

const FIT = [
  "自有工厂并常年出口美国的制造企业",
  "外贸公司、进出口贸易企业",
  "美线货代、报关行与供应链服务商",
  "有多个 SKU、HS 归类复杂、货值较高的出口企业",
];

const CASES = [
  {
    t: "建材出口企业",
    d: "某木门及建筑材料出口企业，产品品类多、HS 归类复杂。通过 NielSC AI，企业在发货前完成 HS 归类一致性检查与成本预核算，减少了因归类偏差导致的海关质疑。",
  },
  {
    t: "机械与汽车配件企业",
    d: "某液压管件、机械配件出口企业，客户按 JIT 方式补货，对到港时效要求高。NielSC AI 帮助其提前整理进口申报信息，缩短单证准备周期，并帮助关务团队更早识别高风险申报项。",
  },
  {
    t: "新能源与跨境供应链企业",
    d: "某新能源组件及大件商品出口企业，涉及高货值与复杂美国进口合规要求。NielSC AI 与合作报关行协同，为客户提供成本、归类与申报风险的前置评估。",
  },
];

const WHY = [
  "专注美国进口清关场景，不是通用 AI 工具",
  "团队具备美国报关与供应链背景（美国报关师考试通过）",
  "合作美国持证报关行参与最终合规审核",
  "支持中国工厂中文售前沟通与美国本地清关执行",
  "帮助企业把清关风险识别从“货到港后”提前到“发货前”",
];

export default function UsCustomsPage() {
  return (
    <>
      {/* HERO */}
      <section className="meridian-bg relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <Reveal>
            <p className="eyebrow eyebrow-light">美国清关单证自动化 + 清关风控工具</p>
            <h1 className="display mt-5 max-w-4xl text-4xl text-paper sm:text-6xl">
              NielSC AI<span className="text-gold">｜</span>
              <br />
              面向中国出口商的
              <br />
              美国清关<span className="text-gold">单证自动化</span>与<span className="text-gold">风控工具</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
              自动校验 HS 归类、生成 7501 进口申报文件、核算关税与 Bond/MPF
              成本，提前识别 CBP 查验风险。搭配合作美国持证报关行服务，帮助中国工厂减少清关失误、罚款与滞港风险。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white"
              >
                预约 15 分钟中文演示
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 text-[15px] font-bold text-paper transition-colors hover:border-gold hover:text-gold"
              >
                获取美国清关成本预评估
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 痛点 */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead kicker="出口美国的真实困扰" title="你是否遇到这些问题" sub="" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <Reveal key={p} delay={i * 60}>
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <p className="display text-2xl text-gold-deep">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-[15px] font-semibold leading-relaxed text-ink">{p}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={300}>
            <a
              href="#demo"
              className="flex h-full min-h-[120px] flex-col justify-center rounded-2xl bg-abyss p-6 text-paper transition-colors hover:bg-abyss-deep"
            >
              <p className="text-[15px] font-bold">这些问题，我们在发货前帮你解决</p>
              <p className="mt-2 inline-flex items-center gap-2 text-[14px] font-semibold text-gold">
                预约中文演示 <ArrowRightIcon className="h-4 w-4" />
              </p>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 能做什么 */}
      <section className="border-y border-line bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHead kicker="工具 + 持牌行" title="NielSC AI 能帮你做什么" sub="" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <p className="flex items-center gap-2 text-[16px] font-bold text-ink">
                    <CheckIcon className="h-5 w-5 shrink-0 text-gold-deep" />
                    {f.t}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 适合客户 */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead kicker="谁适合用" title="适合哪些客户" sub="" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FIT.map((f, i) => (
            <Reveal key={f} delay={i * 60}>
              <div className="h-full rounded-2xl bg-abyss p-6 text-paper">
                <p className="text-[15px] font-semibold leading-relaxed">{f}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 案例 */}
      <section className="border-y border-line bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHead kicker="行业方向" title="这些企业正在解决的问题" sub="案例为方向示意，具体以实际客户为准" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {CASES.map((c, i) => (
              <Reveal key={c.t} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <p className="eyebrow">{c.t}</p>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 为什么选择 */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHead kicker="选择理由" title="为什么选择 NielSC AI" sub="" />
            <ul className="mt-8 space-y-4">
              {WHY.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[15px] font-semibold text-ink">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl bg-abyss p-8 text-paper sm:p-10">
              <p className="eyebrow eyebrow-light">核心差异</p>
              <p className="display mt-4 text-3xl leading-snug">
                把清关风险识别
                <br />
                从<span className="text-gold">"货到港后"</span>
                <br />
                提前到<span className="text-gold">"发货前"</span>
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-paper/70">
                客户买的不是 AI，是少被查、少罚款、省人工、成本透明。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 表单 */}
      <section id="demo" className="meridian-bg scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <Reveal>
            <p className="eyebrow eyebrow-light justify-center">预约演示</p>
            <h2 className="display mt-4 text-center text-3xl text-paper sm:text-4xl">
              用 15 分钟，评估你的美国清关风险与成本
            </h2>
            <p className="mt-3 text-center text-[14px] text-paper/70">
              提交后我们会通过微信与你联系，发送行业资料并约演示时间。
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 rounded-3xl bg-white p-6 sm:p-10">
              <UsCustomsDemoForm />
            </div>
          </Reveal>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[12.5px] leading-relaxed text-paper/60">
            NielSC AI 是服务于中国出口企业与美国进口清关环节的数字化工具。
            AI 用于辅助单证整理、归类校验与成本核算；最终美国进口申报由合作的美国持证报关行审核执行。
          </p>
        </div>
      </section>
    </>
  );
}
