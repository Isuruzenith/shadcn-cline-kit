# Workflow: Audit UI & Theme Compliance

Use this workflow after creating, editing, reviewing, or completing any UI-related work in any project using this kit.

This workflow ensures that the AI agent verifies shadcn/ui theme-token compliance without loading unnecessary context or allowing generic Tailwind fallback styles into the repository.

---

## 1. Load Minimal Audit Context

Read only the compact context first:

```txt
.clinerules/CONTEXT_MAP.md
components.json
main global CSS file
components/ui/manifest.json if present
```

If the issue is unclear, then read:

```txt
.clinerules/shadcn-ui.md
AI_RULES.md if present
docs/DESIGN_SYSTEM.md if present
docs/COMPONENT_RULES.md if present
docs/UI_GUIDE.md if present
```

---

## 2. Scope the Audit

Audit UI code under:

```txt
app/ or src/app/
components/ or src/components/
frontend/ if present
lib/ or src/lib/
pages/ if present
```

Ignore standard installed shadcn primitives unless they were intentionally modified:

```txt
components/ui/* or src/components/ui/*
```

Focus on newly created or modified files first, but the audit command may scan the whole UI surface.

---

## 3. Run Theme Audit Skill

Run:

```bash
npm run theme:audit
```

This checks for:

- Hardcoded generic Tailwind colors:
  - `bg-white`
  - `bg-black`
  - `bg-gray-*`
  - `bg-slate-*`
  - `bg-zinc-*`
  - `bg-blue-*`
  - `text-gray-*`
  - `text-zinc-*`
  - `text-emerald-*`
  - `text-amber-*`
- Hardcoded arbitrary colors:
  - `bg-[#ffffff]`
  - `text-[#111827]`
  - `border-[#e5e7eb]`
  - arbitrary `rgb()`, `hsl()`, `oklch()`, or `color-mix()` utilities in app code
- Arbitrary radius values:
  - `rounded-[8px]`
  - `rounded-[10px]`
  - `rounded-[12px]`
- Raw unapproved shadows:
  - `shadow-sm`
  - `shadow-md`
  - `shadow-lg`
  - `shadow-xl`
  - `shadow-2xl`
- Raw UI primitives styled like shadcn components:
  - custom `<button className="...">`
  - custom `<input className="...">`

---

## 4. Fix Audit Failures

If the audit fails, read the exact file paths and line numbers from the output.

Use these replacements:

| Problem | Preferred Fix |
|---|---|
| Page canvas | `bg-background text-foreground` |
| Card / panel | `bg-card text-card-foreground` |
| Popover / overlay | `bg-popover text-popover-foreground` |
| Muted content | `bg-muted text-muted-foreground` |
| Helper text | `text-muted-foreground` |
| Borders | `border-border` |
| Inputs | `border-input bg-input` |
| Primary action | `bg-primary text-primary-foreground` |
| Secondary action | `bg-secondary text-secondary-foreground` |
| Accent / hover state | `bg-accent text-accent-foreground` |
| Destructive state | `bg-destructive text-destructive-foreground` |
| Focus ring | `ring-ring outline-ring/50` |
| Sidebar | `bg-sidebar text-sidebar-foreground border-sidebar-border` |
| Raw `<button>` primitive | Use `Button` from `@/components/ui/button` |
| Raw `<input>` primitive | Use `Input` from `@/components/ui/input` |
| Raw card wrapper | Use `Card`, `CardHeader`, `CardContent`, etc. |
| Raw modal/dialog wrapper | Use shadcn `Dialog` primitives |

After fixes, re-run:

```bash
npm run theme:audit
```

Do not proceed until it exits with code `0`.

Expected success output:

```txt
✅ Theme audit passed. No hardcoded theme-token violations found.
```

---

## 5. Run Build Verification

After `npm run theme:audit` passes, run:

```bash
npm run build
```

Verify:

- TypeScript passes.
- Build tool compiles successfully (Next.js, Vite, or equivalent).
- Static route generation completes if applicable.
- No missing modules, invalid imports, or rendering errors remain.

If the build fails:

1. Read the exact compile or TypeScript error.
2. Fix the reported issue.
3. Re-run:
   ```bash
   npm run theme:audit
   npm run build
   ```

---

## 6. Completion Gate

UI work is not complete until both commands pass:

```bash
npm run theme:audit
npm run build
```

Do not use final completion until:

1. The theme audit exits with code `0`.
2. The production build exits with code `0`.
3. No extra unused files or duplicate primitives were introduced.

If the target project uses different validation commands, inspect `package.json` and run the equivalent lint, audit, typecheck, and build commands.