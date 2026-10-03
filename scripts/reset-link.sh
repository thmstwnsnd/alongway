#!/bin/sh
# Dev only: prints a working password reset link for an existing account.
# Usage: sh scripts/reset-link.sh you@example.com
EMAIL="${1:?Usage: sh scripts/reset-link.sh you@example.com}"
TOKEN=$(openssl rand -hex 32)
HASH=$(printf %s "$TOKEN" | shasum -a 256 | cut -d' ' -f1)
psql -d alongway -v ON_ERROR_STOP=1 -c "insert into \"PasswordResetToken\" (id, \"userId\", \"tokenHash\", \"expiresAt\") select 'dev' || md5(random()::text), id, '$HASH', (now() at time zone 'utc') + interval '1 hour' from \"User\" where email = lower('$EMAIL')"
echo "http://localhost:3003/portal/reset?token=$TOKEN"
