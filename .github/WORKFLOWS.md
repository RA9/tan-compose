# GitHub Actions Workflows Documentation

This project uses GitHub Actions for automated CI/CD, version management, and
publishing.

## Workflows Overview

### 1. CI Workflow (`ci.yml`)

**Trigger:** Push to `main` or Pull Requests

**Purpose:** Continuous Integration - runs tests and builds on every push

**Steps:**

- Checkout code
- Setup Deno
- Check code formatting (`deno fmt --check`)
- Lint code (`deno lint`)
- Type check all TypeScript files
- Run tests with coverage
- Generate coverage report
- Run build task
- Upload build artifacts

### 2. Version Bump Workflow (`version-bump.yml`)

**Trigger:** Manual (workflow_dispatch)

**Purpose:** Automated version bumping with semantic versioning

**How to Use:**

1. Go to Actions tab in GitHub
2. Select "Version Bump" workflow
3. Click "Run workflow"
4. Choose version type: `patch`, `minor`, or `major`
5. The workflow will:
   - Update version in `deno.json`
   - Create a commit with the version change
   - Create a git tag (e.g., `v0.1.4`)
   - Push commit and tag
   - Create a GitHub Release

**Version Bumping Rules:**

- `patch`: 0.1.3 → 0.1.4 (bug fixes)
- `minor`: 0.1.3 → 0.2.0 (new features, backward compatible)
- `major`: 0.1.3 → 1.0.0 (breaking changes)

### 3. Publish to JSR Workflow (`publish.yml`)

**Trigger:** When a tag starting with `v` is pushed (e.g., `v0.1.4`)

**Purpose:** Automatically publish package to JSR (JavaScript Registry)

**Steps:**

- Checkout code
- Setup Deno
- Verify types with `deno check`
- Run tests
- Publish to JSR with `npx jsr publish`

**Note:** This workflow runs automatically after the version bump workflow
creates a tag.

**Requirements:**

- Package scope and name configured in `deno.json` (already set:
  `@ra9/tan-compose`)
- The workflow uses GitHub Actions OIDC for authentication (no manual token
  needed)

### 4. Deploy to GitHub Pages (`deploy.yml`)

**Trigger:** Push to `main` branch

**Purpose:** Deploy documentation and landing page to GitHub Pages

**Steps:**

- Checkout code
- Setup GitHub Pages
- Upload site files
- Deploy to GitHub Pages

## Publishing Workflow

### Automated Publishing (Recommended)

1. **Make your changes** and commit to `main` branch
2. **Run Version Bump workflow:**
   ```bash
   # Via GitHub UI:
   # Actions → Version Bump → Run workflow → Select version type
   ```
3. **Automatic chain reaction:**
   - Version Bump creates tag `v0.1.4`
   - Tag triggers Publish workflow
   - Package is published to JSR
   - GitHub Release is created

### Manual Publishing

If you prefer manual control:

```bash
# 1. Update version in deno.json manually
# Edit deno.json: "version": "0.1.4"

# 2. Commit and tag
git add deno.json
git commit -m "chore: bump version to v0.1.4"
git tag v0.1.4

# 3. Push with tags
git push origin main --tags

# This triggers the publish workflow automatically
```

## Setup Requirements

### JSR Publishing Setup

JSR has first-class support for publishing from GitHub Actions using OIDC
authentication.

1. **Create your package scope on JSR:**
   - Go to [jsr.io](https://jsr.io)
   - Sign in with GitHub
   - Create a scope (e.g., `@ra9`)
   - The package name is already configured in `deno.json`: `@ra9/tan-compose`

2. **Configure package permissions:**
   - In your JSR scope settings, link the GitHub repository
   - Allow GitHub Actions to publish on your behalf

3. **No manual token needed!**
   - The workflow uses `id-token: write` permission for OIDC
   - GitHub Actions automatically authenticates with JSR
   - Just run the workflow and it publishes automatically

**Publishing command:** `npx jsr publish`

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Under "Build and deployment":
   - Source: GitHub Actions
3. The site will be available at: `https://yourusername.github.io/tan-compose/`

## Workflow Permissions

Each workflow has specific permissions:

- **CI:** `contents: read` (read-only)
- **Version Bump:** `contents: write` (can commit and push)
- **Publish:** `contents: read`, `id-token: write` (can publish to JSR)
- **Deploy:** `contents: read`, `pages: write`, `id-token: write` (can deploy to
  Pages)

## Troubleshooting

### Publish fails with authentication error

- Verify that the GitHub repository is linked to your JSR scope
- Check that `id-token: write` permission is set in the workflow
- Ensure the package scope in `deno.json` matches your JSR scope
- Test locally with `npx jsr publish --dry-run` before pushing

### Version bump doesn't create tag

- Check that the workflow has `contents: write` permission
- Verify git configuration in workflow is correct
- Check workflow logs for specific errors

### Tests fail in CI

- Run tests locally first: `deno test --allow-all`
- Check that all file paths are correct
- Verify Deno version compatibility

### Build artifacts not uploading

- Check the `dist/` directory is created by build task
- Verify `deno task bundle` runs successfully
- Review workflow logs for artifact upload step

## Best Practices

1. **Always run CI locally** before pushing:
   ```bash
   deno fmt
   deno lint
   deno check build.ts
   deno test --allow-all
   ```

2. **Update CHANGELOG.md** before version bumps

3. **Use semantic versioning:**
   - Patch: Bug fixes, small updates
   - Minor: New features, backward compatible
   - Major: Breaking changes

4. **Test in staging** before publishing to production

5. **Review GitHub Release notes** after automated release creation
