# AWS Amplify Hosting Runbook
## OT Digital Twin — Industrial Intelligence Platform

> **App**: Vite 8 · React 19 · TypeScript 6 · Tailwind CSS 4  
> **Build output**: `dist/`  
> **Build command**: `npm run build` (runs `tsc -b && vite build`)  
> **Node requirement**: ≥ 20 (tested on 24)

---

## Prerequisites

| What | Where to get it |
|------|----------------|
| AWS account with console access | console.aws.amazon.com |
| IAM user/role with `AdministratorAccess-Amplify` or equivalent | IAM Console |
| Source code in a Git repo | GitHub / GitLab / Bitbucket / CodeCommit |
| AWS CLI (optional, for CLI path) | `brew install awscli` then `aws configure` |
| Amplify CLI (optional) | `npm install -g @aws-amplify/cli` |

---

## Option A — Console Deploy (recommended for first deploy)

### Step 1 — Push code to a Git repository

```bash
cd ot-digital-twin
git init
git add .
git commit -m "Initial commit: OT Digital Twin platform"
# create repo on GitHub/GitLab first, then:
git remote add origin https://github.com/<your-org>/ot-digital-twin.git
git push -u origin main
```

### Step 2 — Create a new Amplify app

1. Open [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"Create new app"**
3. Choose **"Host web app"**
4. Select your Git provider (GitHub, GitLab, Bitbucket, or CodeCommit)
5. Authorize AWS Amplify to access your repositories
6. Select the **`ot-digital-twin`** repository and the **`main`** branch
7. Click **Next**

### Step 3 — Configure build settings

Amplify will auto-detect the `amplify.yml` in the repo root. Verify the detected settings match:

| Field | Value |
|-------|-------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Cache paths | `node_modules/**/*` |

If Amplify does not auto-detect, paste this into the **Build and test settings** editor:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --prefer-offline
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .npm/**/*
```

### Step 4 — Set environment variables

In **App settings → Environment variables**, add:

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_APP_ENV` | `production` | Available at build time via `import.meta.env` |
| `NODE_VERSION` | `20` | Pins Node for Amplify build image |

> **Important**: Amplify runs the build in a container. Variables prefixed `VITE_` are inlined at build time — they are not runtime secrets. Do not store secrets in `VITE_*` variables.

### Step 5 — Save and deploy

1. Click **"Save and deploy"**
2. Amplify runs: Provision → Build → Deploy → Verify
3. On success, the app is live at:
   ```
   https://<branch>.<app-id>.amplifyapp.com
   ```

---

## Step 6 — Fix SPA routing (required)

Because this is a single-page app, all routes must be served by `index.html`. Without this, deep links and browser refreshes return 403/404.

**In Amplify Console → App settings → Rewrites and redirects:**

Click **"Add rewrite"** and enter:

| Source address | Target address | Type |
|----------------|---------------|------|
| `</^[^.]+$\|\.(?!(css\|gif\|ico\|jpg\|js\|png\|txt\|svg\|woff\|woff2\|ttf\|map\|json)$)([^.]+$)/>` | `/index.html` | `200 (Rewrite)` |

This regex rewrites all non-asset paths to `index.html` with a 200, enabling React Router / hash-based navigation to work correctly.

---

## Option B — CLI Deploy (for automation / CI pipelines)

### Step 1 — Install and configure

```bash
npm install -g @aws-amplify/cli
amplify configure          # opens browser to set IAM user + access keys
```

### Step 2 — Initialise Amplify in the project

```bash
cd ot-digital-twin
amplify init
```

Answer the prompts:

```
? Enter a name for the project: ot-digital-twin
? Initialize the project with the above configuration? Yes
? Select the authentication method you want to use: AWS profile
? Please choose the profile you want to use: default
```

### Step 3 — Add hosting

```bash
amplify add hosting
```

Select **"Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)"**  
Select **"Manual deployment"** (to deploy from local build without Git)

### Step 4 — Build and publish

```bash
npm run build           # outputs to dist/
amplify publish         # uploads dist/ to Amplify hosting
```

The CLI prints the live URL on success.

---

## Option C — Manual ZIP deploy (no Git, no CLI)

```bash
cd ot-digital-twin
npm run build
cd dist && zip -r ../ot-digital-twin-dist.zip . && cd ..
```

1. In Amplify Console → **"Deploy without Git provider"**
2. Drag-drop `ot-digital-twin-dist.zip` or upload via console
3. Click **"Save and deploy"**

---

## Custom Domain Setup

### Using your own domain

1. **Amplify Console → App settings → Domain management**
2. Click **"Add domain"**
3. Enter your domain: e.g. `ot-twin.yourcompany.com`
4. Amplify provisions an ACM certificate automatically (DNS validation)

**DNS changes required** (in Route 53 or your DNS provider):

| Type | Name | Value |
|------|------|-------|
| CNAME | `www` | `<branch>.<app-id>.amplifyapp.com` |
| CNAME | `_<validation>` | `<acm-validation-value>` |

Or if using Route 53:
```bash
# Amplify can manage Route 53 records automatically
# Enable "Enable SSL certificate provisioning automatically" in Domain management
```

**Propagation time**: 5–15 minutes for ACM validation, up to 48 hours for DNS propagation.

---

## Node Version Pinning

Amplify's default build image ships with older Node versions. Pin explicitly:

**Option 1 — Environment variable** (simplest):

In Amplify Console → Environment variables:
```
NODE_VERSION = 20
```

**Option 2 — `.nvmrc` file** in repo root:
```bash
echo "20" > .nvmrc
```

Add to `amplify.yml` preBuild:
```yaml
preBuild:
  commands:
    - nvm use
    - node -v
    - npm ci --prefer-offline
```

**Option 3 — Build image override** (most control):

In Amplify Console → Build image settings → select `amazonlinux:2023` and specify Node 20.

---

## Cache Headers for Performance

Amplify serves static assets. Add a `_headers` file to `public/` to control caching:

**`public/_headers`:**
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: no-cache, no-store, must-revalidate
```

Vite hashes asset filenames (`index-DWAp2JlK.css`), so immutable caching is safe for everything except `index.html`.

---

## Branch-based Previews (optional)

Enable **preview deployments** for pull requests:

1. Amplify Console → App settings → **Previews**
2. Enable **"Enable pull request previews"**
3. Select the base branch (`main`)

Each PR gets a unique URL: `https://pr-<number>.<app-id>.amplifyapp.com`

---

## Continuous Deployment Pipeline

Once connected to Git, every push to `main` triggers:

```
Push to main
    ↓
Amplify detects change (webhook)
    ↓
Provision build container
    ↓
npm ci --prefer-offline   (uses node_modules cache if unchanged)
    ↓
npm run build             (tsc -b && vite build → dist/)
    ↓
Deploy dist/ to CDN
    ↓
Invalidate CloudFront cache
    ↓
App live at custom domain
```

**Typical deploy time**: 2–4 minutes (with cache hit on `node_modules`).

---

## Monitoring & Alerts

### Build notifications

1. Amplify Console → **Notifications**
2. Add email/SNS for: Build succeeded, Build failed, Deploy succeeded

### Access logs

```bash
# Amplify does not expose raw access logs directly.
# Enable CloudFront access logging via:
# Amplify Console → App settings → Monitoring → Enable access logs
# Logs land in an S3 bucket you specify.
```

### Alarms

Set a CloudWatch alarm on the Amplify deployment metric:

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "AmplifyBuildFailed" \
  --namespace "AWS/AmplifyHosting" \
  --metric-name "BuildFailed" \
  --dimensions Name=App,Value=<app-id> \
  --statistic Sum \
  --period 300 \
  --threshold 1 \
  --comparison-operator GreaterThanOrEqualToThreshold \
  --evaluation-periods 1 \
  --alarm-actions arn:aws:sns:<region>:<account-id>:<topic>
```

---

## Troubleshooting

### Build fails: `tsc -b` exits non-zero

```
error TS2xxx: ...
```

**Fix**: Run `npm run build` locally first. All TypeScript errors must be resolved before Amplify will succeed.

```bash
cd ot-digital-twin
npm run build          # must succeed locally
```

---

### Build fails: `Cannot find module` / dependency error

**Cause**: `package-lock.json` out of sync, or a package only in `devDependencies` that's needed at build.

**Fix**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
git add package-lock.json
git commit -m "fix: regenerate lockfile"
git push
```

---

### 403 on deep links / page refresh

**Cause**: SPA rewrite rule not configured.

**Fix**: Add the rewrite rule in Step 6. Verify it's a `200 (Rewrite)` not a `301 (Redirect)`.

---

### Node version mismatch (`SyntaxError: Unexpected token`)

**Cause**: Amplify's build container is using an older Node.

**Fix**: Set `NODE_VERSION=20` in environment variables (see Node Version Pinning above).

---

### Assets load but styles are missing

**Cause**: Tailwind CSS v4 uses the `@tailwindcss/vite` plugin which requires the Vite build — the CSS is generated at build time. Verify `dist/assets/*.css` is non-empty.

```bash
ls -lh dist/assets/*.css   # should be ~30 KB
```

If empty, check that `vite.config.ts` still has `tailwindcss()` in the plugins array.

---

### Build succeeds but blank white screen

**Cause**: Usually a JS runtime error on load. Check the browser console.

Common causes:
- `import.meta.env.VITE_*` variable is `undefined` — add the variable in Amplify environment variables
- Asset path issue — verify `vite.config.ts` has no `base` override pointing to a non-existent path

---

## Estimated Costs

| Resource | Free tier | Beyond free tier |
|----------|-----------|-----------------|
| Amplify build minutes | 1,000 min/month | $0.01/min |
| Amplify hosting (data served) | 15 GB/month | $0.15/GB |
| Amplify hosting (requests) | 500,000/month | $0.30/million |
| Custom domain SSL | Free (ACM) | — |
| CloudFront (included) | ✓ global CDN | Included in above |

**Expected monthly cost for a demo/internal site**: $0–$5.

---

## Quick Reference

```bash
# Local build test before pushing
cd ot-digital-twin
npm run build
npx vite preview --port 4173    # serve dist/ locally at :4173

# CLI deploy (manual)
amplify publish

# Check Amplify app status via CLI
amplify status

# View recent builds via AWS CLI
aws amplify list-jobs \
  --app-id <app-id> \
  --branch-name main \
  --region <region>
```

---

*Generated for OT Digital Twin · Vite 8 · React 19 · TypeScript 6 · Tailwind CSS 4*
