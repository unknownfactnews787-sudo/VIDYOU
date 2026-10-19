"use client";
import { useState } from "react";
import { seoScore } from "@/lib/seo";
const fmt = (n) => Intl.NumberFormat("en", { notation: "compact" }).format(n || 0);
function Videos({ list, outlier }) {
  return list.map((v) => (
    <div className="v" key={v.id}>
      <img src={v.thumb} alt="" />
      <div>
        <a href={"https://youtu.be/" + v.id} target="_blank"><b>{v.title}</b></a>
        <div>{v.channel} · {fmt(v.views)} ভিউ{v.subs != null && ` · ${fmt(v.subs)} সাবস`}
          {outlier && <span className={v.outlier >= 2 ? "up" : ""}> · আউটলায়ার {v.outlier}x</span>}</div>
      </div>
    </div>
  ));
}
export default function Home() {
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState("");
  const [title, setTitle] = useState("");
  const [d, setD] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function run(path) {
    setBusy(true); setErr(""); setD(null);
    const r = await fetch(`/api/${path}`);
    const j = await r.json();
    j.error ? setErr(j.error) : setD(j);
    setBusy(false);
  }
  const names = ["কিওয়ার্ড রিসার্চ", "চ্যানেল/প্রতিযোগী", "ট্রেন্ডিং (BD)", "টাইটেল SEO"];
  const s = tab === 3 ? seoScore(title, q) : null;
  return (
    <div className="w">
      <h1>🎬 VidTool</h1>
      <div className="tabs">{names.map((n, i) => (
        <button key={i} className={tab === i ? "on" : ""} onClick={() => { setTab(i); setD(null); setErr(""); if (i === 2) run("trending?region=BD"); }}>{n}</button>))}
      </div>
      {tab !== 2 && <div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tab === 1 ? "@channelhandle" : "কিওয়ার্ড"} />
        {tab === 3 && <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ভিডিও টাইটেল" />}
        {tab < 2 && <button className="go" onClick={() => run((tab ? "channel" : "keyword") + "?q=" + encodeURIComponent(q))}>খুঁজুন</button>}
      </div>}
      {busy && <p>লোড হচ্ছে…</p>}
      {err && <p className="err">{err}</p>}
      {s && <div className="card"><h2>{s.score}/100</h2>{s.checks.map((c, i) => <div key={i}>{c[0] ? "✔" : "✖"} {c[1]}</div>)}</div>}
      {d && tab === 0 && <>
        <div className="card">প্রতিযোগিতা: <b>{d.competition}</b> · মিডিয়ান ভিউ: {fmt(d.medViews)} · মিডিয়ান সাবস: {fmt(d.medSubs)}
          <h4>সাজেশন</h4>{d.suggestions.map((x) => <span className="chip" key={x}>{x}</span>)}
          <h4>জনপ্রিয় ট্যাগ</h4>{d.tags.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
        <div className="card"><Videos list={d.videos} /></div></>}
      {d && tab === 1 && <>
        <div className="card"><img src={d.thumb} alt="" /> <b>{d.title}</b><br />
          সাবস্ক্রাইবার {fmt(d.subs)} · মোট ভিউ {fmt(d.views)} · ভিডিও {d.videoCount} · মিডিয়ান ভিউ {fmt(d.medianViews)}</div>
        <div className="card"><Videos list={d.videos} outlier /></div></>}
      {d && tab === 2 && <div className="card"><Videos list={d.videos} /></div>}
    </div>
  );
}
