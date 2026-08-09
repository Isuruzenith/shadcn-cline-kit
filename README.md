# 🚀 Portable shadcn/ui + Cline Setup Kit

This kit allows you to automatically set up Rules, Workflows, and Validation Scripts needed to build 90-95% consistent UIs using AI Agents (Cline, Cursor, Claude Code) in any Next.js / React project by correctly using `shadcn/ui` theme tokens and avoiding hardcoded Tailwind styling.

---

## ⚡ 1-Command Setup (Recommended)

Execute the following command inside the root directory of your target project:

```bash
npx github:Isuruzenith/shadcn-cline-kit
```

> **Note:** Always run this command from the root directory of the project you want to configure.

---

## 📦 Kit Contents

```txt
shadcn-cline-kit/
├── package.json                    # NPM/NPX CLI configuration and bin mapping
├── setup.js                        # Automated installer script
├── README.md                       # Setup and usage guide (this file)
├── .gitignore                      # Git ignore rules for the kit repository
├── kit/
│   ├── .clinerules/
│   │   ├── CONTEXT_MAP.md          # Compact workspace source map
│   │   ├── shadcn-ui.md            # Core theme and component validation rules
│   │   └── workflows/
│   │       ├── create-ui.md        # UI creation and editing workflow
│   │       ├── add-shadcn-block.md # Official shadcn block auto-add workflow
│   │       └── audit-ui.md         # Theme compliance auditing workflow
│   ├── scripts/
│   │   └── audit-theme-tokens.js   # Script checking for hardcoded colors and styles
│   ├── components/
│   │   └── ui/
│   │       └── manifest.json       # Installed UI primitives manifest file
│   └── .vscode/
│       └── settings.json           # VS Code formatting & Tailwind regex rules
└── global-rule/
    └── shadcn-ui-global.md         # Template for global Cline configuration
```

---

## 🛠️ Alternative Installation Methods

### Method 1: Single Command via GitHub NPX

From your target project's root directory:

```bash
npx github:Isuruzenith/shadcn-cline-kit
```

### Method 2: Copying/Cloning the Kit Folder

1. Copy or clone the `shadcn-cline-kit` directory into your target project's root folder.
2. From the project root, run:

```bash
node shadcn-cline-kit/setup.js
```

### Method 3: Running Externally from Another Directory

Provide the absolute path to `setup.js` and execute:

```bash
node C:/Projects/AEGIS/shadcn-cline-kit/setup.js
```

---

## ✅ What setup.js Automates

- Copies the `.clinerules/` directory to the target project.
- Installs `CONTEXT_MAP.md`, `shadcn-ui.md`, and default workflows.
- Copies the `scripts/audit-theme-tokens.js` utility.
- Creates or copies `components/ui/manifest.json` if missing.
- Merges formatting and Tailwind regex configurations safely into `.vscode/settings.json`.
- Appends the following validation script to `package.json`:

```json
{
  "scripts": {
    "theme:audit": "node scripts/audit-theme-tokens.js"
  }
}
```

---

## 🧪 Verification & Post-Install Steps

To confirm that the kit was successfully installed and everything is working properly:

```bash
npm run theme:audit
npm run build
```

---

## 🚀 GitHub Repository Usage

Since this repository is public, it can be executed instantly in any project via:

```bash
npx github:Isuruzenith/shadcn-cline-kit
```

Repository Link:

```txt
https://github.com/Isuruzenith/shadcn-cline-kit
```

---

## 💡 How the AI Agent (Cline) Works Post-Setup

After setting up the kit, the AI Agent follows these strict compliance rules:

1. **Source of Truth Check:** Reads `.clinerules/CONTEXT_MAP.md`, `components.json`, global CSS, and `lib/utils.ts` before creating or editing any UI components.
2. **No Hardcoded Tailwind:** Strictly uses semantic theme tokens (e.g., `bg-background`, `text-foreground`, `bg-card`, `bg-primary`, `border-border`) instead of hardcoded colors like `bg-white`, `bg-black`, `bg-gray-*`, `text-gray-*`, or `bg-blue-600`.
3. **No Primitive Recreation:** Reuses existing `@/components/ui/*` primitives instead of using raw standard markup. If a primitive is missing, it installs it via `npx shadcn@latest add <component-name> --yes`.
4. **Validation Gate:** Automatically runs `npm run theme:audit` and `npm run build` after generating code to ensure full design system compliance.