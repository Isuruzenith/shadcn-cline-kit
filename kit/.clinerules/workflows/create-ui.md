# Workflow: Create UI Component or Page

Use this workflow whenever creating or modifying UI components, pages, forms, cards, dashboards, modals, or blocks in any project using this kit.

This workflow is intentionally compact so the AI agent can keep the correct shadcn/ui context without loading every long documentation file into memory.

---

## 1. Load Minimal Context First

Read these files in order:

```txt
.clinerules/CONTEXT_MAP.md
components.json
main global CSS file (app/globals.css, styles/globals.css, src/app/globals.css, or equivalent)
cn() utility file (lib/utils.ts, src/lib/utils.ts, or equivalent)
components/ui/manifest.json if present
```

If `components/ui/manifest.json` is missing or outdated, inspect:

```txt
components/ui/* or src/components/ui/*
```

Only read long docs when needed:

```txt
AI_RULES.md if present
docs/DESIGN_SYSTEM.md if present
docs/COMPONENT_RULES.md if present
docs/UI_GUIDE.md if present
.clinerules/shadcn-ui.md
```

---

## 2. Decide: Block, Primitive, or Custom Composition

### Use an official shadcn block for full-page templates

Prefer shadcn blocks for:

```txt
login pages
signup pages
dashboards
sidebar layouts
charts
```

Examples:

```bash
npx shadcn@latest add login-01 --overwrite --yes
npx shadcn@latest add login-02 --overwrite --yes
npx shadcn@latest add dashboard-01 --yes
npx shadcn@latest add sidebar-01 --yes
```

### Use installed shadcn primitives for UI elements

Use existing primitives from:

```txt
@/components/ui/* or the equivalent alias configured in components.json
```

Common imports:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
```

### Install missing primitives instead of recreating them

```bash
npx shadcn@latest add <component-name> --yes
```

---

## 3. Theme Token Requirements

Use semantic tokens only.

```txt
bg-background text-foreground
bg-card text-card-foreground
bg-popover text-popover-foreground
bg-muted text-muted-foreground
bg-primary text-primary-foreground
bg-secondary text-secondary-foreground
bg-accent text-accent-foreground
bg-destructive text-destructive-foreground
border-border border-input bg-input
ring-ring outline-ring/50
```

Use sidebar tokens for sidebar UI:

```txt
bg-sidebar text-sidebar-foreground
bg-sidebar-primary text-sidebar-primary-foreground
bg-sidebar-accent text-sidebar-accent-foreground
border-sidebar-border ring-sidebar-ring
```

---

## 4. Forbidden Patterns

Do not use generic Tailwind fallback classes:

```txt
bg-white
bg-black
bg-gray-*
bg-slate-*
bg-zinc-*
bg-neutral-*
bg-stone-*
bg-blue-*
bg-red-*
bg-green-*
text-white
text-black
text-gray-*
text-slate-*
text-zinc-*
text-neutral-*
text-stone-*
text-blue-*
text-red-*
text-green-*
border-gray-*
border-slate-*
border-zinc-*
divide-gray-*
```

Do not use arbitrary hardcoded colors:

```txt
bg-[#ffffff]
text-[#111827]
border-[#e5e7eb]
```

Do not recreate shadcn primitives:

```tsx
<button className="...">
<input className="...">
<div className="rounded-lg border bg-white ...">
<div className="fixed inset-0 bg-black/50 ...">
```

---

## 5. Class Composition

Use `cn()` for conditional classes or custom components that accept `className`.

```tsx
import { cn } from "@/lib/utils"
```

If the target project uses a different alias, follow `components.json`.

Example:

```tsx
className={cn(
  "rounded-xl border border-border bg-card text-card-foreground",
  active && "border-primary/50 ring-1 ring-primary/20",
  className
)}
```

---

## 6. Validation

After UI changes, run:

```bash
npm run theme:audit
npm run build
```

If either command is unavailable, inspect `package.json` and run the closest equivalent lint, typecheck, audit, or build command. If either fails, fix the reported issue before completion.