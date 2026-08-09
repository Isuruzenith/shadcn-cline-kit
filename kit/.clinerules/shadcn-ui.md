# Portable Workspace Rule: shadcn/ui Theme & Component Discipline

This project uses **shadcn/ui**.

Important: Preset IDs such as `--preset b5prfMwewa` are initialization shortcuts only. After project setup, the source of truth is the actual repository state:

- `components.json`
- Main global CSS file: `app/globals.css`, `styles/globals.css`, `src/app/globals.css`, or equivalent
- Installed shadcn primitives: `components/ui/*`, `src/components/ui/*`, or equivalent
- Conditional class utility: `lib/utils.ts`, `src/lib/utils.ts`, or equivalent `cn()` utility
- Any project design docs present in the repo

## Compact Context Map & Workflows

To avoid context-window bloat, Cline should not load every long UI document by default. Use this layered context system first:

- Compact source map: `.clinerules/CONTEXT_MAP.md`
- Create/edit UI workflow: `.clinerules/workflows/create-ui.md`
- Official shadcn block workflow: `.clinerules/workflows/add-shadcn-block.md`
- UI audit workflow: `.clinerules/workflows/audit-ui.md`
- Installed primitives manifest: `components/ui/manifest.json`

Cline MUST follow these rules before generating, editing, or reviewing UI code.

---

## 1. Mandatory Read Steps Before Any UI Work

Before writing or modifying any page, component, layout, form, card, dashboard, modal, or block:

1. Read `.clinerules/CONTEXT_MAP.md`.
   - Use it as the compact first-pass UI source map.
   - Do not load long documentation until needed.

2. Read `components.json`.
   - Confirm component aliases.
   - Confirm style and registry configuration.
   - Confirm configured icon library.

3. Read the main global CSS file.
   - Confirm available CSS variables.
   - Confirm color token values.
   - Confirm radius mappings.
   - Confirm dark mode behavior.

4. Read the project's `cn()` utility:
   - Usually `lib/utils.ts` or `src/lib/utils.ts`.
   - Use `cn()` for conditional class composition.

5. Read `components/ui/manifest.json` if present.
   - Confirm installed shadcn primitives.
   - If missing or outdated, inspect `components/ui/*`.

6. Use the relevant compact workflow:
   - `.clinerules/workflows/create-ui.md` for creating or editing UI.
   - `.clinerules/workflows/add-shadcn-block.md` for official shadcn blocks.
   - `.clinerules/workflows/audit-ui.md` for validation and fixes.

7. Read long project UI documentation only when required by task complexity:
   - `AI_RULES.md`
   - `docs/DESIGN_SYSTEM.md`
   - `docs/COMPONENT_RULES.md`
   - `docs/UI_GUIDE.md`
   - Any equivalent project-specific design documentation

---

## 2. Never Hardcode Generic Tailwind Theme Values

Cline MUST NOT generate fallback Tailwind styles from generic training data.

### Forbidden color utilities

Do not use:

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

Exception: SVG brand icons may use required brand fills only when unavoidable, but app UI surfaces, text, borders, and states must use theme tokens.

---

## 3. Use Theme Tokens Only

Use semantic theme tokens from the project's global CSS variables.

### Page and text

```txt
bg-background
text-foreground
```

### Cards and panels

```txt
bg-card
text-card-foreground
```

### Popovers and overlays

```txt
bg-popover
text-popover-foreground
```

### Muted content

```txt
bg-muted
text-muted-foreground
```

### Primary actions

```txt
bg-primary
text-primary-foreground
```

### Secondary actions

```txt
bg-secondary
text-secondary-foreground
```

### Accent and hover states

```txt
bg-accent
text-accent-foreground
```

### Destructive states

```txt
bg-destructive
text-destructive-foreground
```

### Borders, inputs, and focus rings

```txt
border-border
border-input
bg-input
ring-ring
outline-ring/50
```

### Sidebar tokens

```txt
bg-sidebar
text-sidebar-foreground
bg-sidebar-primary
text-sidebar-primary-foreground
bg-sidebar-accent
text-sidebar-accent-foreground
border-sidebar-border
ring-sidebar-ring
```

---

## 4. Do Not Reinvent shadcn/ui Primitives

Cline MUST NOT hand-code primitives when shadcn/ui provides them.

### Forbidden patterns

Do not write custom primitives like:

```tsx
<button className="bg-blue-600 text-white rounded-md px-4 py-2">
  Save
</button>
```

```tsx
<div className="rounded-lg border bg-white p-6 shadow-md">
  Card content
</div>
```

```tsx
<input className="border border-gray-300 rounded-md px-3 py-2" />
```

```tsx
<div className="fixed inset-0 bg-black/50">
  Custom modal
</div>
```

### Required shadcn/ui primitives

Use installed components from `@/components/ui/*` or the alias configured in `components.json` whenever available.

Common imports:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
```

Common primitives to reuse:

- `Button`
- `Card`
- `Input`
- `Label`
- `Field`
- `Dialog`
- `Select`
- `Tabs`
- `Badge`
- `Separator`
- `DropdownMenu`
- `Checkbox`
- `Textarea`
- `Alert`

If a required primitive is missing, install it with the shadcn CLI instead of recreating it manually:

```bash
npx shadcn@latest add <component-name> --yes
```

---

## 5. Use Official shadcn Blocks for Full Page Templates

For full-page layouts such as login, signup, dashboards, charts, and sidebars, prefer official shadcn blocks.

Examples:

```bash
npx shadcn@latest add login-01 --overwrite --yes
npx shadcn@latest add login-02 --overwrite --yes
npx shadcn@latest add dashboard-01 --yes
npx shadcn@latest add sidebar-01 --yes
```

Available block categories include:

- `login-*`
- `signup-*`
- `dashboard-*`
- `sidebar-*`
- `chart-*`

Do not manually recreate an official block unless the user explicitly asks for custom implementation.

---

## 6. Radius, Shadow, and Layout Rules

The project radius is controlled by CSS variables in the project's global CSS.

Allowed radius utilities:

```txt
rounded-sm
rounded-md
rounded-lg
rounded-xl
rounded-2xl
rounded-3xl
rounded-4xl
```

Do not hardcode arbitrary radius values:

```txt
rounded-[8px]
rounded-[10px]
rounded-[12px]
```

Avoid raw shadow utilities in app code unless they come from an installed shadcn primitive or are already part of the project’s documented design system:

```txt
shadow
shadow-sm
shadow-md
shadow-lg
shadow-xl
shadow-2xl
```

Prefer shadcn component defaults.

---

## 7. Class Composition

Always use `cn()` from the project's utility location for conditional styling or components that accept `className`.

```tsx
import { cn } from "@/lib/utils"

export function Example({
  className,
  active,
  ...props
}: React.ComponentProps<"div"> & {
  active?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground",
        active && "border-primary/50 ring-1 ring-primary/20",
        className
      )}
      {...props}
    />
  )
}
```

Do not use fragile string concatenation for conditional Tailwind classes.

---

## 8. Icons

Use the icon library configured in `components.json`.

Most shadcn projects use Lucide:

```tsx
import { Plus } from "lucide-react"
```

Preferred icon sizing:

```txt
size-4
h-4 w-4
size-5
h-5 w-5
```

Do not introduce a second icon library unless explicitly required.

---

## 9. Validation Skill

After UI changes, run the theme audit skill:

```bash
npm run theme:audit
```

Then run the project build:

```bash
npm run build
```

If `npm run theme:audit` reports hardcoded color, shadow, radius, or primitive recreation issues, fix the UI before completing the task.

If the target project uses different validation commands, inspect `package.json` and run the equivalent lint, audit, typecheck, and build commands.

---

## 10. Summary for Cline

When building UI in this repository:

- Read the actual theme files first.
- Treat preset IDs as already materialized into repository files.
- Use shadcn/ui primitives.
- Use official shadcn blocks for full-page templates.
- Never hardcode default Tailwind colors.
- Use semantic theme tokens only.
- Use `cn()` for class merging.
- Validate with `npm run theme:audit` and `npm run build`.