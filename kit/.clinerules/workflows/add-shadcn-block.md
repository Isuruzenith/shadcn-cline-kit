# Workflow: Add Official shadcn Block

Use this workflow whenever the user requests a full-page layout or an official shadcn block such as login, signup, dashboard, sidebar, or chart examples in any project using this kit.

This workflow prevents the AI agent from manually recreating layouts that already exist in the official shadcn registry.

---

## 1. Load Minimal Context

Read these first:

```txt
.clinerules/CONTEXT_MAP.md
components.json
main global CSS file
cn() utility file
components/ui/manifest.json if present
```

Confirm:

- Component aliases and paths configured in `components.json`.
- Configured icon library.
- Custom theme token mappings in the global CSS file.
- Installed primitives are listed in `components/ui/manifest.json` or available under `components/ui/*`.

---

## 2. Match the User Request to an Official Block

Prefer official shadcn blocks for these request types:

| User request | Preferred block category |
|---|---|
| Login page | `login-*` |
| Signup page | `signup-*` |
| Dashboard | `dashboard-*` |
| Sidebar layout | `sidebar-*` |
| Charts | `chart-*` |

Common available blocks:

```txt
login-01
login-02
login-03
login-04
login-05
signup-01
signup-02
signup-03
signup-04
signup-05
dashboard-01
sidebar-01
sidebar-02
sidebar-03
sidebar-04
sidebar-05
sidebar-06
sidebar-07
sidebar-08
sidebar-09
sidebar-10
sidebar-11
sidebar-12
sidebar-13
sidebar-14
sidebar-15
sidebar-16
```

If unsure which block best fits the request, inspect registry examples before installing.

---

## 3. Install the Block via shadcn CLI

Use the CLI instead of manually recreating the block.

General command:

```bash
npx shadcn@latest add <block-name> --yes
```

If replacing an existing page, use overwrite:

```bash
npx shadcn@latest add <block-name> --overwrite --yes
```

Examples:

```bash
npx shadcn@latest add login-01 --overwrite --yes
npx shadcn@latest add login-02 --overwrite --yes
npx shadcn@latest add dashboard-01 --yes
npx shadcn@latest add sidebar-01 --yes
```

---

## 4. Post-Install Rules

After the CLI generates files:

1. Inspect generated files under the project's source tree:
   ```txt
   app/ or src/app/
   components/ or src/components/
   components/ui/ or src/components/ui/
   ```

2. Do not customize the generated block unless the user explicitly requested customization.

3. Do not replace shadcn primitives with raw HTML.

4. If the CLI installed new primitives into `components/ui/` or `src/components/ui/`, update:
   ```txt
   components/ui/manifest.json
   ```

5. Ensure generated code uses semantic theme tokens and does not introduce generic Tailwind fallback classes.

---

## 5. Validation

Run:

```bash
npm run theme:audit
npm run build
```

If either command is unavailable, inspect `package.json` and run the closest equivalent lint, audit, typecheck, or build command.

If either validation fails:

1. Read the exact error.
2. Fix the violation or compile issue.
3. Re-run the validation commands.
4. Do not complete the task until validation passes.