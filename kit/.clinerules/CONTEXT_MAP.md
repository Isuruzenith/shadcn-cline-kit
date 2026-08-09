# Portable shadcn/ui Context Map

AI agents MUST read this compact map first before writing, editing, or auditing UI code in any project using this kit. Its purpose is to keep the right shadcn/ui theme context loaded without dumping every long documentation file into context.

---

## 1. Minimal Required Read Order

Before any UI work:

```txt
1. Read components.json
2. Read app/globals.css, styles/globals.css, or the project's main Tailwind/global CSS file
3. Read lib/utils.ts, src/lib/utils.ts, or the project's conditional class utility
4. Read components/ui/manifest.json if present
5. If needed, inspect components/ui/*
6. For larger UI work, read .clinerules/shadcn-ui.md
```

For detailed design decisions only when needed:

```txt
AI_RULES.md if present
docs/DESIGN_SYSTEM.md if present
docs/COMPONENT_RULES.md if present
docs/UI_GUIDE.md if present
```

---

## 2. Source of Truth Map

| Concern | Source of Truth |
|---|---|
| shadcn style, aliases, registry, icon library | `components.json` |
| Theme tokens, OKLCH/HSL colors, radius, dark mode | Main global CSS file |
| Conditional class merging | `lib/utils.ts`, `src/lib/utils.ts`, or equivalent |
| Installed shadcn primitives | `components/ui/manifest.json` or `components/ui/*` |
| Cline workspace rules | `.clinerules/shadcn-ui.md` |
| Compact workflows | `.clinerules/workflows/*` |

---

## 3. Preset Rule

Do not infer theme details from initialization preset IDs.

Examples:

```bash
npx shadcn@latest init --preset b5prfMwewa
```

Preset IDs are initialization shortcuts only. After initialization, the preset is already materialized into repository files. The real source of truth is:

```txt
components.json
app/globals.css or equivalent global CSS
components/ui/*
lib/utils.ts or equivalent cn() utility
```

---

## 4. Forbidden Patterns

Never generate generic Tailwind fallback styling.

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
bg-[#ffffff]
text-[#111827]
border-[#e5e7eb]
rounded-[8px]
rounded-[10px]
rounded-[12px]
```

Avoid raw shadows in app code unless explicitly documented by the target project's design system:

```txt
shadow-sm
shadow-md
shadow-lg
shadow-xl
shadow-2xl
```

Do not recreate shadcn primitives with raw HTML:

```tsx
<button className="...">
<input className="...">
<div className="rounded-lg border bg-white ...">
<div className="fixed inset-0 bg-black/50 ...">
```

---

## 5. Required Semantic Tokens

Use semantic tokens from the target project's CSS variables.

| Need | Use |
|---|---|
| Page/canvas | `bg-background text-foreground` |
| Cards/panels | `bg-card text-card-foreground` |
| Popovers/overlays | `bg-popover text-popover-foreground` |
| Muted/helper content | `bg-muted text-muted-foreground` |
| Primary actions | `bg-primary text-primary-foreground` |
| Secondary actions | `bg-secondary text-secondary-foreground` |
| Accent/hover states | `bg-accent text-accent-foreground` |
| Destructive states | `bg-destructive text-destructive-foreground` |
| Borders/inputs | `border-border border-input bg-input` |
| Focus rings | `ring-ring outline-ring/50` |
| Sidebar | `bg-sidebar text-sidebar-foreground border-sidebar-border` |

---

## 6. shadcn Primitive Rule

Use installed shadcn primitives from:

```txt
@/components/ui/*
```

If a primitive is missing, install it instead of recreating it:

```bash
npx shadcn@latest add <component-name> --yes
```

For full-page templates, prefer official blocks:

```bash
npx shadcn@latest add login-01 --overwrite --yes
npx shadcn@latest add login-02 --overwrite --yes
npx shadcn@latest add dashboard-01 --yes
npx shadcn@latest add sidebar-01 --yes
```

---

## 7. Class Composition

Always use `cn()` for conditional classes or custom components that accept `className`.

```tsx
import { cn } from "@/lib/utils"
```

If the project uses a different alias or path, follow `components.json` and the existing utility location.

---

## 8. Validation

After UI changes, always run:

```bash
npm run theme:audit
npm run build
```

If either command is unavailable, inspect `package.json` and run the target project's equivalent validation commands. If a command fails, fix the issue before completion.