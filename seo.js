export function seoScore(title, kw) {
  const t = title.trim(), k = kw.trim().toLowerCase(), lt = t.toLowerCase(), L = t.length;
  const up = (t.match(/[A-Z]/g) || []).length;
  const checks = [
    [L >= 40 && L <= 70, `দৈর্ঘ্য ৪০–৭০ (এখন ${L})`, 20],
    [!!k && lt.includes(k), "টাইটেলে কিওয়ার্ড আছে", 25],
    [!!k && lt.indexOf(k) >= 0 && lt.indexOf(k) <= 25, "কিওয়ার্ড শুরুর দিকে", 15],
    [/[0-9০-৯]/.test(t), "সংখ্যা আছে", 10],
    [/[\[\(|?:]/.test(t), "ব্র্যাকেট/প্রশ্ন আছে", 10],
    [L > 0 && up / L < 0.4, "অতিরিক্ত ক্যাপস নেই", 10],
    [/best|how|free|guide|tips|সেরা|সহজ|কীভাবে|গাইড/i.test(t), "আকর্ষণীয় শব্দ আছে", 10],
  ];
  return { score: checks.reduce((a, c) => a + (c[0] ? c[2] : 0), 0), checks };
}
