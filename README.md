# VidTool – vidIQ-স্টাইল ইউটিউব টুল (Next.js)

## ফিচার
- কিওয়ার্ড রিসার্চ: সাজেশন, প্রতিযোগিতা, টপ ভিডিও, জনপ্রিয় ট্যাগ
- চ্যানেল/প্রতিযোগী বিশ্লেষণ: স্ট্যাটস ও আউটলায়ার ভিডিও
- বাংলাদেশের ট্রেন্ডিং ভিডিও
- টাইটেল SEO স্কোর

## চালানোর ধাপ
1. Node.js 18+ ইনস্টল করুন
2. console.cloud.google.com এ প্রজেক্ট খুলে **YouTube Data API v3** চালু করুন, API Key নিন
3. `cp .env.example .env.local` করে কী বসান
4. `npm install && npm run dev` → http://localhost:3000

## ডিপ্লয়
Vercel-এ আপলোড করে Environment Variable হিসেবে `YOUTUBE_API_KEY` দিন।

## সীমাবদ্ধতা
- API কোটা দিনে ১০,০০০ ইউনিট; প্রতিটি search ১০০ ইউনিট খরচ করে (ফল ৩০ মিনিট ক্যাশ হয়)
- আসল সার্চ ভলিউম YouTube দেয় না; "প্রতিযোগিতা" অনুমান-ভিত্তিক

## পরবর্তী ধাপ
লগইন (NextAuth), ডেটাবেস (Prisma+Postgres), চ্যানেল ট্র্যাকিং (cron), পেমেন্ট (Stripe)।
