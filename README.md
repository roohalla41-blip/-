# حساب صراف (Hesab Sarraf)

سامانه جامع مدیریت صرافی، تبدیل ارز و حسابداری مالی.

## معماری

این پروژه از معماری مستقل (portable) استفاده می‌کند:

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Supabase Edge Function (Deno)
- **Database:** Supabase (PostgreSQL)
- **Auth:** HMAC tokens امضاشده با Service Key + Supabase Auth (برای Google OAuth)
- **Storage:** Supabase Storage

### مسیر داده

```
Frontend → supabaseApi.js → /functions/supabase (Edge Function) → Supabase
```

تمام عملیات‌های مالی از طریق Edge Function با احراز هویت HMAC انجام می‌شود.
هیچ منطق محاسباتی مالی در فرانت‌اند اجرا نمی‌شود.

## پیش‌نیازها

1. نصب Node.js (نسخه ۱۸ یا بالاتر)
2. نصب وابستگی‌ها: `npm install`
3. تنظیم متغیرهای محیطی (فایل `.env.local`)

## متغیرهای محیطی

```bash
# Supabase (اجباری)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key

# Backend (server-side secrets)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### Google OAuth (اختیاری)

برای ورود با گوگل، باید Google OAuth را در داشبورد Supabase تنظیم کنید:

1. به Supabase Dashboard → Authentication → Providers → Google
2. Google Client ID و Client Secret را وارد کنید
3. آدرس redirect برنامه را به URLهای مجاز Google اضافه کنید:
   - `https://your-domain.com/login?google_cb=1`
   - `https://your-domain.com/forgot-password?google_link=1`

## اجرای محلی

```bash
npm run dev
```

URL محلی Vite را در مرورگر باز کنید.

## اجرای Backend مستقل

Edge Function در `base44/functions/supabase/entry.ts` قرار دارد و می‌تواند
به‌صورت مستقل با Deno Deploy یا Supabase Functions اجرا شود.

```bash
# با Deno
deno run --allow-net --allow-env base44/functions/supabase/entry.ts
```

## ساختار پروژه

```
src/
  api/           — کلاینت‌های API
  components/    — کامپوننت‌های React
  lib/           — ابزارها و سرویس‌ها
  pages/         — صفحات برنامه
base44/
  functions/     — Edge Functions (Deno)
  shared/        — اسکریپت‌های SQL و اشتراکی
public/           — فایل‌های استاتیک (favicon, manifest, sw)
```

## امنیت

- رمزهای عبور با PBKDF2 (۱۰۰هزار تکرار، SHA-256) هش می‌شوند
- توکن‌های نشست با HMAC-SHA256 امضا می‌شوند (stateless)
- هر عملیات CRUD به exchange_code کاربر محدود می‌شود
- عملیات‌های مالی با Idempotency (client_operation_id) از اجرای دوباره جلوگیری می‌کنند
- لاگ ممیزی (audit_logs) برای تمام عملیات‌های حساس

## پشتیبانی

برای پشتیبانی، از بخش پشتیبانی درون برنامه استفاده کنید.