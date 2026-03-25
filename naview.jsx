import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Target, TrendingUp, AlertTriangle, HelpCircle, CheckCircle2, Zap, Eye, Users, Star, ArrowRight, Layers, Activity, Shield, MessageCircle, BarChart3 } from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────── */
const projects = [
  {
    id: "keiri", name: "経理周り自動化", color: "#3b82f6",
    goal: "スキルプラスの経理業務を完全自動化：契約管理 → 入金マッチング → 売掛金管理 → freee会計入力",
    doneImage: "毎月の経理作業が手動ゼロ。契約・入金・売掛金がすべて自動でfreeeに反映される状態。",
    progress: 72, phase: "Phase 4-5", health: "caution",
    milestones: [
      { label: "freee Sign API連携", done: true },
      { label: "入金CSVマッチング", done: true },
      { label: "解約データ同期", done: true },
      { label: "Univa pay API連携", done: true },
      { label: "GASデプロイ・テスト", done: false },
      { label: "売掛金自動化", done: false },
      { label: "freee会計API連携", done: false },
    ],
    blockers: [
      { text: "GASコードがclasp push待ち", type: "ai", detail: "AIでデプロイ・テスト可能。" },
      { text: "freee会計 API連携が未着手", type: "ai", detail: "APIドキュメントを読んでGASで実装可能。" },
      { text: "Japan Plumが手動CSVのまま", type: "human", detail: "API提供の有無をJapan Plumに確認が必要。" },
    ],
    recentWins: ["顧客契約状況GAS完成", "売掛金管理GAS完成", "Univa pay API自動取得"],
    owner: "Cowork + 自分",
  },
  {
    id: "todo", name: "Todoダッシュボード", color: "#10b981",
    goal: "ブラウザ・モバイル対応のタスク管理アプリ（Supabase + Vercel）",
    doneImage: "毎朝AIがタスクを提案し、Coworkが担当タスクを自動実行。見落としゼロの状態。",
    progress: 88, phase: "Phase 3/3", health: "good",
    milestones: [
      { label: "Supabase移行", done: true },
      { label: "Vercelデプロイ", done: true },
      { label: "7タブSPA", done: true },
      { label: "Cron自動リセット", done: true },
      { label: "Auto Recovery", done: true },
      { label: "Morning Briefing", done: true },
      { label: "AI自動タスク提案", done: false },
    ],
    blockers: [
      { text: "Cronジョブが不安定", type: "solved", detail: "Auto Recoveryで回避済み。" },
      { text: "Google Drive API同期が組織ポリシーで不可", type: "human", detail: "GWS管理者に相談が必要。" },
    ],
    recentWins: ["Auto Recovery実装", "Morning Briefing連携", "indent階層修正"],
    owner: "Cowork + 自分",
  },
  {
    id: "addness", name: "Addness管理", color: "#8b5cf6",
    goal: "208名のエンドゴール管理をリアルタイム異常検知＋日次通知＋ダッシュボードで可視化",
    doneImage: "毎朝Slackに異常検知通知。マネージャーが全員の状況を一目で把握できる状態。",
    progress: 70, phase: "Phase 2-3/4", health: "caution",
    milestones: [
      { label: "Chrome拡張v10", done: true },
      { label: "異常検知エンジン", done: true },
      { label: "通知テンプレート", done: true },
      { label: "5画面SPA", done: true },
      { label: "Slack Webhook設定", done: false },
      { label: "208名テスト", done: false },
      { label: "Phase 3 分析", done: false },
    ],
    blockers: [
      { text: "部署別Slack Webhook URLの設定が必要", type: "human", detail: "Slack管理者に依頼。" },
      { text: "208名スケールでのレート制限テスト", type: "ai", detail: "テストスクリプトで負荷テスト可能。" },
    ],
    recentWins: ["COMPLETEDフィルタ", "異常検知エンジン完成", "208名テスト準備"],
    owner: "Cowork + 自分",
  },
  {
    id: "inquiry", name: "お問合せ管理", color: "#06b6d4",
    goal: "9名チームでのGoogleスプレッドシート連携お問合せトラッキング",
    doneImage: "チーム全員がリアルタイムでお問合せ状況を把握し、対応漏れゼロの状態。",
    progress: 95, phase: "Phase 10/10", health: "good",
    milestones: [
      { label: "Next.js + shadcn/ui", done: true },
      { label: "Sheets API連携", done: true },
      { label: "9ユーザー対応", done: true },
      { label: "Phase 10全機能", done: true },
      { label: "運用FB", done: false },
    ],
    blockers: [],
    recentWins: ["Phase 10完了（9機能）", "ユーザー9名に拡大"],
    owner: "自分",
  },
  {
    id: "lstep", name: "Lステップ API連携", color: "#f59e0b",
    goal: "AddnessのLINE公式アカウントにAI自動返信システムを構築",
    doneImage: "LINEメッセージにAIが自動返信。人的対応が必要な場合のみ担当者に通知。",
    progress: 40, phase: "Phase 1/5", health: "stalled",
    milestones: [
      { label: "APIテスト", done: true },
      { label: "Webhook方式決定", done: true },
      { label: "GAS実装", done: false },
      { label: "AI統合", done: false },
      { label: "E2Eテスト", done: false },
    ],
    blockers: [
      { text: "GWSプラン制限→個人Gmail回避済み", type: "solved", detail: "ドキュメント化済み。" },
      { text: "GAS実装5タスクが順番に必要", type: "ai", detail: "全てAIで実装可能。" },
    ],
    recentWins: ["Webhook方式確定", "プロジェクトガイド作成"],
    owner: "Cowork",
  },
  {
    id: "portfolio", name: "ポートフォリオ", color: "#ec4899",
    goal: "AI/自動化プロジェクト実績をクライアントに見せるサイト",
    doneImage: "最新の実績が常に反映。技術スタックと成果が一目でわかるサイト。",
    progress: 95, phase: "完了（随時更新）", health: "good",
    milestones: [
      { label: "React + Vite + Vercel", done: true },
      { label: "プロジェクト掲載", done: true },
      { label: "Supabase経験追加", done: true },
      { label: "新規プロジェクト反映", done: false },
    ],
    blockers: [],
    recentWins: ["Supabase経験追記", "文言改善"],
    owner: "自分",
  },
  {
    id: "finance", name: "財務会計AI化", color: "#6366f1",
    goal: "上司にCursor/AI活用を教え、会社全体の財務ワークフローを変革",
    doneImage: "上司がCursorで業務改善。財務チーム全体がAIを日常活用している状態。",
    progress: 8, phase: "Phase 1/3", health: "caution",
    milestones: [
      { label: "戦略フレームワーク", done: true },
      { label: "3者分析", done: true },
      { label: "上司Cursorセッション", done: false },
      { label: "Phase 2 実装", done: false },
      { label: "Phase 3 展開", done: false },
    ],
    blockers: [
      { text: "上司のAIリテラシーが低く段階的教育が必要", type: "human", detail: "3/21のCursorセッションで直接教える。" },
      { text: "社長からのハード締切なし", type: "human", detail: "セッション後の手応えを見て提案。" },
    ],
    recentWins: ["戦略ドキュメント完成", "セッション設計完了"],
    owner: "自分",
  },
];

const healthMap = {
  good:    { label: "順調",   bg: "bg-emerald-50",  text: "text-emerald-600", dot: "bg-emerald-400", ring: "ring-emerald-200" },
  caution: { label: "要注意", bg: "bg-amber-50",    text: "text-amber-600",   dot: "bg-amber-400",   ring: "ring-amber-200" },
  stalled: { label: "停滞",   bg: "bg-orange-50",   text: "text-orange-600",  dot: "bg-orange-400",  ring: "ring-orange-200" },
};

const blockerMap = {
  ai:     { icon: Zap,          label: "AI対応可", color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100",   dot: "bg-blue-400" },
  human:  { icon: Users,        label: "人に聞く", color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-100", dot: "bg-violet-400" },
  solved: { icon: CheckCircle2, label: "解決済み", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100",dot: "bg-emerald-400" },
};

/* ─── Animated Counter ────────────────────────────────────────── */
function Counter({ value, suffix = "" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const end = typeof value === "number" ? value : parseInt(value) || 0;
    if (!end) { setN(0); return; }
    let cur = 0;
    const step = Math.max(1, Math.floor(end / 25));
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setN(end); clearInterval(t); } else setN(cur);
    }, 25);
    return () => clearInterval(t);
  }, [value]);
  return <>{n}{suffix}</>;
}

/* ─── Progress Ring ───────────────────────────────────────────── */
function Ring({ progress, size = 56, color = "#3b82f6" }) {
  const sw = 4.5;
  const r = (size - sw * 2) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (progress / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={sw} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-gray-700">{progress}%</span>
      </div>
    </div>
  );
}

/* ─── Milestone Steps ─────────────────────────────────────────── */
function Milestones({ items }) {
  const done = items.filter(m => m.done).length;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Layers size={12} /> マイルストーン
        </span>
        <span className="text-xs text-gray-400 tabular-nums">{done}/{items.length}</span>
      </div>
      <div className="space-y-0">
        {items.map((m, i) => (
          <div key={i} className="flex items-start gap-3 group">
            <div className="flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all
                ${m.done ? "bg-emerald-500 border-emerald-500" : "bg-white border-gray-200 group-hover:border-gray-300"}`}>
                {m.done && <CheckCircle2 size={11} className="text-white" />}
              </div>
              {i < items.length - 1 && (
                <div className={`w-0.5 h-5 ${m.done ? "bg-emerald-200" : "bg-gray-100"}`} />
              )}
            </div>
            <span className={`text-sm pt-0.5 ${m.done ? "text-gray-600" : "text-gray-400"}`}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Blocker Pill ────────────────────────────────────────────── */
function Blocker({ b }) {
  const [open, setOpen] = useState(false);
  const c = blockerMap[b.type];
  const I = c.icon;
  return (
    <div className={`rounded-xl ${c.bg} border ${c.border} overflow-hidden transition-all cursor-pointer`}
      onClick={() => setOpen(!open)}>
      <div className="px-3.5 py-2.5 flex items-start gap-2.5">
        <I size={15} className={`${c.color} mt-0.5 shrink-0`} />
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${c.color}`}>{c.label}</span>
          <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{b.text}</p>
        </div>
        <div className="shrink-0 mt-0.5">
          {open ? <ChevronDown size={14} className="text-gray-300" /> : <ChevronRight size={14} className="text-gray-300" />}
        </div>
      </div>
      {open && (
        <div className="px-3.5 pb-3">
          <div className="ml-6 p-2.5 bg-white/60 rounded-lg text-xs text-gray-500 leading-relaxed border border-gray-100">
            <span className="font-semibold text-gray-600">Next →</span> {b.detail}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Project Card ────────────────────────────────────────────── */
function Card({ project: p, expanded, onToggle }) {
  const h = healthMap[p.health];
  const human = p.blockers.filter(b => b.type === "human");
  const ai = p.blockers.filter(b => b.type === "ai");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md"
      style={{
        transition: "all 0.35s cubic-bezier(.25,.46,.45,.94)",
        animation: "naviewCardEntrance 0.5s ease-out both",
      }}>
      {/* Color accent top bar */}
      <div className="h-1 w-full" style={{ background: p.color }} />

      <div className="p-5 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start gap-4">
          <Ring progress={p.progress} color={p.color} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-[15px] font-bold text-gray-800">{p.name}</h3>
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${h.bg} ${h.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${h.dot}`} />
                {h.label}
              </span>
              <span className="text-[11px] text-gray-400">{p.phase}</span>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed line-clamp-1">{p.goal}</p>

            <div className="flex items-center gap-4 mt-2">
              {human.length > 0 && (
                <span className="flex items-center gap-1 text-[11px] text-violet-500 font-medium">
                  <HelpCircle size={12} /> {human.length}件 要相談
                </span>
              )}
              {ai.length > 0 && (
                <span className="flex items-center gap-1 text-[11px] text-blue-500 font-medium">
                  <Zap size={12} /> {ai.length}件 AI可
                </span>
              )}
              <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                <CheckCircle2 size={12} /> {p.recentWins.length}件 達成
              </span>
              <span className="text-[11px] text-gray-300 ml-auto">{p.owner}</span>
            </div>
          </div>

          <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-gray-50 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 space-y-5">
          <div className="h-px bg-gray-100" />

          {/* Goal */}
          <div className="rounded-xl p-4 border border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-2">
              <Target size={14} className="text-indigo-400" />
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">ゴール（完成イメージ）</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{p.doneImage}</p>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl p-4 bg-gray-50/50 border border-gray-100">
              <Milestones items={p.milestones} />
            </div>

            <div className="space-y-2.5">
              {p.blockers.length > 0 ? (
                <>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle size={12} /> 課題
                  </span>
                  {p.blockers.map((b, i) => <Blocker key={i} b={b} />)}
                </>
              ) : (
                <div className="h-full flex items-center justify-center rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-6">
                  <div className="text-center">
                    <Shield size={22} className="text-emerald-300 mx-auto mb-1" />
                    <p className="text-xs text-emerald-400 font-medium">課題なし</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Wins */}
          {p.recentWins.length > 0 && (
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Star size={12} /> 最近の成果
              </span>
              <div className="flex flex-wrap gap-1.5">
                {p.recentWins.map((w, i) => (
                  <span key={i} className="text-[11px] px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-medium">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Pillar Card ─────────────────────────────────────────────── */
function Pillar({ icon: I, title, stat, suffix, color, desc }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md group"
      style={{ transition: "all 0.3s cubic-bezier(.25,.46,.45,.94)", animation: "naviewSlideUp 0.4s ease-out both" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 group-hover:rotate-3"
        style={{ background: `${color}10` }}>
        <I size={20} style={{ color }} />
      </div>
      <div className="text-2xl font-extrabold text-gray-800 tabular-nums mb-0.5">
        <Counter value={typeof stat === "number" ? stat : parseInt(stat) || 0} suffix={suffix} />
      </div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
    </div>
  );
}

/* ─── Action Alert ────────────────────────────────────────────── */
function Alert({ icon: I, title, color, bg, border, items }) {
  if (!items.length) return null;
  return (
    <div className={`rounded-2xl border ${border} ${bg} overflow-hidden`}>
      <div className="px-5 py-3 flex items-center gap-2.5 border-b" style={{ borderColor: `${color}15` }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
          <I size={15} style={{ color }} />
        </div>
        <h3 className="text-sm font-bold" style={{ color }}>{title}</h3>
        <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>{items.length}件</span>
      </div>
      <div className="px-5 py-3 space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2.5 group">
            <ArrowRight size={13} className="mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color }} />
            <span className="text-sm text-gray-600">
              <span className="font-bold" style={{ color }}>{it.project}</span>
              <span className="text-gray-300 mx-1.5">—</span>
              {it.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Progress Overview Bar ───────────────────────────────────── */
function OverviewBar({ projects: ps }) {
  const sorted = [...ps].sort((a, b) => b.progress - a.progress);
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">全プロジェクト進捗</span>
        <span className="text-xs text-gray-300">{ps.length}件</span>
      </div>
      <div className="space-y-2.5">
        {sorted.map(p => {
          const h = healthMap[p.health];
          return (
            <div key={p.id} className="flex items-center gap-3 group">
              <span className="text-xs text-gray-500 w-28 truncate font-medium">{p.name}</span>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: `${p.progress}%`, background: p.color,
                  animation: "naviewProgressFill 1s cubic-bezier(.25,.46,.45,.94) both",
                  animationDelay: "0.3s",
                }} />
              </div>
              <span className="text-xs text-gray-400 tabular-nums w-10 text-right font-semibold">{p.progress}%</span>
              <span className={`w-1.5 h-1.5 rounded-full ${h.dot}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────────────── */
export default function Naview() {
  const [expandedId, setExpandedId] = useState(null);
  const [tab, setTab] = useState("overview");

  const active = projects.filter(p => p.progress < 100);
  const avgProgress = Math.round(active.reduce((s, p) => s + p.progress, 0) / active.length);
  const humanItems = projects.flatMap(p => p.blockers.filter(b => b.type === "human").map(b => ({ project: p.name, ...b })));
  const aiItems = projects.flatMap(p => p.blockers.filter(b => b.type === "ai").map(b => ({ project: p.name, ...b })));
  const totalBlockers = humanItems.length + aiItems.length;

  const tabs = [
    { id: "overview", label: "概要", icon: Activity },
    { id: "blockers", label: "課題", icon: AlertTriangle, badge: totalBlockers },
  ];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
      {/* yui540-inspired keyframe animations */}
      <style>{`
        @keyframes naviewCardEntrance {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes naviewSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes naviewFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes naviewPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes naviewProgressFill {
          from { width: 0; }
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)" }}>
              <BarChart3 size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">Naview</h1>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide">Navigate your work, view your growth</p>
            </div>
          </div>

          <div className="flex gap-1 p-1 bg-white rounded-xl border border-gray-100 shadow-sm">
            {tabs.map(t => {
              const TI = t.icon;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all
                    ${tab === t.id ? "bg-gray-800 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>
                  <TI size={13} />
                  {t.label}
                  {t.badge > 0 && (
                    <span className={`w-4.5 h-4.5 rounded-full text-[10px] flex items-center justify-center font-bold
                      ${tab === t.id ? "bg-white/20 text-white" : "bg-amber-100 text-amber-600"}`}>
                      {t.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4 Pillars ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Pillar icon={Target} title="期待値定義" stat={projects.filter(p=>p.doneImage).length} suffix={`/${projects.length}`}
            color="#6366f1" desc="ゴール言語化済み" />
          <Pillar icon={Eye} title="進捗可視化" stat={avgProgress} suffix="%"
            color="#10b981" desc="全体平均" />
          <Pillar icon={AlertTriangle} title="課題把握" stat={totalBlockers} suffix="件"
            color="#f59e0b" desc="未解決ブロッカー" />
          <Pillar icon={HelpCircle} title="助けを求める" stat={humanItems.length} suffix="件"
            color="#8b5cf6" desc="人に聞くべき" />
        </div>

        {/* ── Tab Content ── */}
        {tab === "overview" && (
          <div className="space-y-4">
            {/* Overview Bar */}
            <OverviewBar projects={active} />

            {/* Action Alerts */}
            <Alert icon={Users} title="人に聞いた方がいい" color="#8b5cf6"
              bg="bg-violet-50/50" border="border-violet-100" items={humanItems} />
            <Alert icon={Zap} title="AIが今すぐ対応できる" color="#3b82f6"
              bg="bg-blue-50/50" border="border-blue-100" items={aiItems} />

            {/* Projects */}
            <div className="pt-2 space-y-3">
              {[...active].sort((a, b) => {
                const order = { stalled: 0, caution: 1, good: 2 };
                return (order[a.health] ?? 3) - (order[b.health] ?? 3);
              }).map(p => (
                <Card key={p.id} project={p}
                  expanded={expandedId === p.id}
                  onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)} />
              ))}
            </div>
          </div>
        )}

        {tab === "blockers" && (
          <div className="space-y-6">
            {/* Human */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Users size={16} className="text-violet-500" />
                </div>
                <h2 className="text-sm font-bold text-gray-700">人に聞くべき課題</h2>
                <span className="ml-auto text-xs font-bold text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full">{humanItems.length}件</span>
              </div>
              {humanItems.length === 0 ? (
                <div className="text-center py-10 text-gray-300 text-sm bg-white rounded-2xl border border-gray-100">なし</div>
              ) : (
                <div className="space-y-2">
                  {projects.filter(p => p.blockers.some(b => b.type === "human")).map(p => (
                    <div key={p.id} className="bg-white rounded-2xl border border-violet-100 p-4">
                      <div className="text-xs font-bold text-violet-500 mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                        {p.name}
                      </div>
                      <div className="space-y-2">
                        {p.blockers.filter(b => b.type === "human").map((b, i) => <Blocker key={i} b={b} />)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Zap size={16} className="text-blue-500" />
                </div>
                <h2 className="text-sm font-bold text-gray-700">AIが対応できる課題</h2>
                <span className="ml-auto text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{aiItems.length}件</span>
              </div>
              {aiItems.length === 0 ? (
                <div className="text-center py-10 text-gray-300 text-sm bg-white rounded-2xl border border-gray-100">なし</div>
              ) : (
                <div className="space-y-2">
                  {projects.filter(p => p.blockers.some(b => b.type === "ai")).map(p => (
                    <div key={p.id} className="bg-white rounded-2xl border border-blue-100 p-4">
                      <div className="text-xs font-bold text-blue-500 mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                        {p.name}
                      </div>
                      <div className="space-y-2">
                        {p.blockers.filter(b => b.type === "ai").map((b, i) => <Blocker key={i} b={b} />)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Solved */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                </div>
                <h2 className="text-sm font-bold text-gray-700">解決済み</h2>
              </div>
              <div className="space-y-2">
                {projects.filter(p => p.blockers.some(b => b.type === "solved")).map(p => (
                  <div key={p.id} className="bg-white rounded-2xl border border-emerald-100 p-4 opacity-60">
                    <div className="text-xs font-bold text-emerald-500 mb-2">{p.name}</div>
                    {p.blockers.filter(b => b.type === "solved").map((b, i) => (
                      <div key={i} className="text-xs text-gray-400 flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span className="line-through">{b.text}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <div className="mt-12 text-center pb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-[11px] text-gray-400 font-medium">
              Naview — 期待値定義 × 進捗可視化 × 課題把握 × 助けを求める
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}