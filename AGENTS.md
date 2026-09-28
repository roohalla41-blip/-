# AGENTS.md

## Project Context

این پروژه «حساب صراف» است — یک سامانه مدیریت صرافی با معماری مستقل از Base44.
کد به‌گونه‌ای نوشته شده که در محیط Base44 و همچنین به‌صورت مستقل کار می‌کند.

## Architecture

```
Frontend (React/Vite)
  → supabaseApi.js (createSupabaseEntity)
  → /functions/supabase (Edge Function)
  → Supabase (PostgreSQL + Auth + Storage)
```

- **Auth:** HMAC tokens (PBKDF2 + HMAC-SHA256) — stateless، بدون جدول session
- **Google OAuth:** از طریق Supabase Auth (نیازمند تنظیم در داشبورد Supabase)
- **Tenant isolation:** هر عملیات به exchange_code کاربر محدود می‌شود
- **Idempotency:** تمام عملیات‌های مالی با client_operation_id از اجرای دوباره جلوگیری می‌کنند

## Key Files

- `src/api/base44Client.js`: کلاینت Base44 SDK (conditional — در محیط مستقل no-op)
- `src/lib/supabaseClient.js`: کلاینت مستقیم Supabase
- `src/lib/supabaseApi.js`: لایه API مستقل (createSupabaseEntity)
- `src/lib/AuthContext.jsx`: مدیریت نشست (Base44 fallback + HMAC token)
- `src/lib/googleAuth.js`: Google OAuth از طریق Supabase Auth
- `base44/functions/supabase/entry.ts`: Edge Function (Deno)
- `vite.config.js`: Vite config با Base44 Vite Plugin (conditional)

## Environment Variables

```bash
# Frontend (VITE_ prefix)
VITE_SUPABASE_URL=...
VITE_SUPABASE_KEY=...

# Backend (server-side)
SUPABASE_URL=...
SUPABASE_KEY=...
SUPABASE_SERVICE_KEY=...

# Optional (Base44 platform)
BASE44_APP_ID=...
VITE_BASE44_APP_ID=...
```

## Working Notes

- در محیط Base44، Vite Plugin و SDK فعال هستند. در محیط مستقل،
  کد به‌صورت خودکار به مسیر Supabase مستقیم می‌رود.
- Google OAuth نیازمند تنظیم در داشبورد Supabase است.
- هیچ Secret واقعی در سورس کد قرار نگیرد.
- تغییرات ساختاری دیتابیس فقط با ALTER/CREATE IF NOT EXISTS انجام شود.