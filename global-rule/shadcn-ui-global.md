# Global Cline Workspace Rule: shadcn/ui Theme & Component Discipline

Use this rule across all Next.js, React, or frontend workspaces using shadcn/ui.

Preset IDs (e.g. `--preset b5prfMwewa`) are initialization shortcuts only. The real source of truth is always the actual files in the workspace:
1. `components.json`
2. Global stylesheet (e.g., `app/globals.css`, `styles/globals.css`, or similar)
3. cn utility location (e.g., `lib/utils.ts` or similar)
4. Configured component directory (`components/ui/*` or equivalent)
5. Installed primitives manifest (`components/ui/manifest.json` if present)

---

## 1. Minimal Required Read Order

Before writing, editing, or reviews:
1. Read `.clinerules/CONTEXT_MAP.md` (or this global rule).
2. Read `components.json` for paths, aliases, and icon library.
3. Read the main global CSS file for theme variable colors, dark mode strategy, and radius.
4. Read the project's `cn()` utility location.
5. Read `components/ui/manifest.json` if present, or inspect `components/ui/*`.
6. Read project design guides (`docs/DESIGN_SYSTEM.md`, `AI_RULES.md`, etc.) only when requested or if task complexity demands.

---

## 2. Forbidden Patterns

Never generate generic Tailwind fallback styling:
- Forbidden colors: `bg-white`, `bg-black`, `bg-gray-*`, `bg-slate-*`, `bg-zinc-*`, `bg-neutral-*`, `bg-stone-*`, `bg-blue-*`, `bg-red-*`, `bg-green-*`
- Forbidden text: `text-white`, `text-black`, `text-gray-*`, `text-slate-*`, `text-zinc-*`, `text-neutral-*`, `text-stone-*`, `text-blue-*`
- Forbidden borders: `border-gray-*`, `border-slate-*`, `border-zinc-*`
- Forbidden dividers: `divide-gray-*`
- Forbidden arbitrary hex/RGB/HSL: `bg-[#ffffff]`, `text-[#111827]`, `border-[#e5e7eb]`
- Forbidden radius: `rounded-[8px]`, `rounded-[10px]`, `rounded-[12px]`
- Forbidden raw shadows in app code: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl` (use component defaults)

Never recreate shadcn primitives with raw HTML and styling:
- Custom buttons: `<button className="bg-blue-600 rounded-md ...">`
- Custom inputs: `<input className="border border-gray-300 ...">`
- Custom card boxes: `<div className="rounded-lg border bg-white shadow-md p-6">`
- Custom dialogs/popups: `<div className="fixed inset-0 bg-black/50">`

---

## 3. Required Semantic Tokens

Always use semantic variables defined by the project theme.

| Need | Use |
|---|---|
| Page Canvas | `bg-background text-foreground` |
| Cards/Panels | `bg-card text-card-foreground` |
| Popovers/Overlays | `bg-popover text-popover-foreground` |
| Muted Content | `bg-muted text-muted-foreground` |
| Primary Actions | `bg-primary text-primary-foreground` |
| Secondary Actions | `bg-secondary text-secondary-foreground` |
| Accent States | `bg-accent text-accent-foreground` |
| Destructive States | `bg-destructive text-destructive-foreground` |
| Borders/Inputs | `border-border border-input bg-input` |
| Focus Rings | `ring-ring outline-ring/50` |
| Sidebar Elements | `bg-sidebar text-sidebar-foreground border-sidebar-border` |

---

## 4. shadcn Primitives Policy

- Always import and reuse components from the path configured in `components.json` (typically `@/components/ui/*`).
- If a standard primitive is missing, install it with the CLI instead of writing it manually:
  ```bash
  npx shadcn@latest add <component-name> --yes
  ```
- For full-page layouts, templates, and complex sections, prefer official blocks:
  ```bash
  npx shadcn@latest add login-01 --overwrite --yes
  npx shadcn@latest add dashboard-01 --yes
  npx shadcn@latest add sidebar-01 --yes
  ```

---

## 5. Class Composition

- Always merge conditional classes or custom `className` properties using the workspace `cn()` utility.
  ```tsx
  import { cn } from "@/lib/utils"
  ```
- Never use fragile string concatenation.

---

## 6. Validation

After making any UI changes:
1. Run `npm run theme:audit` if configured.
2. Run `npm run build` or project build command.
3. Fix all violations before marking the task complete.