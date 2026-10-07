# Amara Blog CMS Production Activation

The code is implemented in PR #1. The CMS uses Cloudflare Pages Functions + D1.

## 1. Create the database

npx wrangler d1 create amara-blog

Keep the returned database name and ID.

## 2. Bind D1 to the Pages project

Cloudflare Dashboard:
Workers & Pages -> amara-pain -> Settings -> Bindings -> Add -> D1 database

Use:
- Variable name: BLOG_DB
- Database: amara-blog

Redeploy after adding the binding.

## 3. Apply the migration

npx wrangler d1 migrations apply amara-blog --remote

This creates blog_posts and its indexes.

## 4. Create admin secrets

Generate the password hash:

node -e "const c=require('crypto'); console.log(c.createHash('sha256').update(process.argv[1]).digest('hex'))" "YOUR-ADMIN-PASSWORD"

Generate the session secret:

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Add both as encrypted Cloudflare Pages secrets:
- ADMIN_PASSWORD_SHA256
- ADMIN_SESSION_SECRET

Never commit either value.

## 5. Verify

After deployment:

1. Open /admin/blog
2. Confirm invalid passwords are rejected.
3. Sign in with the configured admin password.
4. Create a draft.
5. Confirm the draft is not visible at /blog.
6. Publish it.
7. Open /blog/<slug>.
8. Edit the article.
9. Confirm the live article updates.
10. Change it back to draft and confirm it disappears from the public blog.
11. Delete it and confirm the public URL returns the fallback/not-found behavior.

## Migration safety

Existing static articles remain as a frontend fallback. D1 articles take precedence when the same slug exists. This allows the CMS to be activated without a destructive big-bang migration.

After the CMS is stable, migrate the legacy articles into D1 and then remove the static fallback in a separate slice.

## Current CI

The repository's existing full lint is not clean: the baseline contains unrelated legacy lint errors. The CMS branch therefore validates:
- eslint for the new CMS/admin/function files
- npm run build

Both pass on the latest CI run.
