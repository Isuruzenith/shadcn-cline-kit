# 🚀 Portable shadcn/ui + Cline Setup Kit

මෙම Kit එක මගින් ඕනෑම Next.js / React project එකක `shadcn/ui` theme tokens නිවැරදිව භාවිතා කරමින්, hardcoded Tailwind styling නොයොදා, AI Agents (Cline, Cursor, Claude Code) හරහා 90-95% consistent UI සෑදීමට අවශ්‍ය Rules, Workflows, සහ Validation Scripts ස්වයංක්‍රීයව ස්ථාපනය කරගත හැක.

---

## ⚡ 1-Command Setup (Recommended)

ඔබගේ ඕනෑම target project එකක root directory එකෙහි සිට terminal එක තුල පහත command එක execute කරන්න:

```bash
npx github:Isuruzenith/shadcn-cline-kit
```

> මෙම command එක run කළ යුත්තේ setup කිරීමට අවශ්‍ය project එකේ root directory එක තුළයි.

---

## 📦 Kit එකෙහි අඩංගු දෑ (Kit Contents)

```txt
shadcn-cline-kit/
├── package.json                    # NPM/NPX CLI config සහ bin definition
├── setup.js                        # ස්වයංක්‍රීය ස්ථාපන script එක
├── README.md                       # මෙම භාවිත උපදෙස් සටහන
├── .gitignore                      # Kit repository ignore rules
├── kit/
│   ├── .clinerules/
│   │   ├── CONTEXT_MAP.md          # Compact source map
│   │   ├── shadcn-ui.md            # Main shadcn theme/component rules
│   │   └── workflows/
│   │       ├── create-ui.md        # UI create/edit workflow
│   │       ├── add-shadcn-block.md # Official shadcn block workflow
│   │       └── audit-ui.md         # Theme compliance audit workflow
│   ├── scripts/
│   │   └── audit-theme-tokens.js   # Hardcoded colors/styles පරික්ෂා කරන script එක
│   ├── components/
│   │   └── ui/
│   │       └── manifest.json       # Installed UI primitives manifest එක
│   └── .vscode/
│       └── settings.json           # VS Code format සහ Tailwind regex settings
└── global-rule/
    └── shadcn-ui-global.md         # Global Cline Rule template එක
```

---

## 🛠️ Setup ක්‍රම

### ක්‍රමය 1: Single Command via GitHub NPX

Target project root directory එක තුළ සිට:

```bash
npx github:Isuruzenith/shadcn-cline-kit
```

### ක්‍රමය 2: Kit Folder එක Copy/Clone කර Setup කිරීම

1. `shadcn-cline-kit` folder එක target project root එකට copy/clone කරන්න.
2. Target project terminal එක තුළ run කරන්න:

```bash
node shadcn-cline-kit/setup.js
```

### ක්‍රමය 3: වෙනත් Path එකක සිට Run කිරීම

```bash
node C:/Projects/AEGIS/shadcn-cline-kit/setup.js
```

---

## ✅ setup.js මගින් ස්වයංක්‍රීයව සිදුවන දෑ

- Target project එකට `.clinerules/` directory එක copy කරයි.
- `CONTEXT_MAP.md`, `shadcn-ui.md`, සහ workflows install කරයි.
- `scripts/audit-theme-tokens.js` copy කරයි.
- `components/ui/manifest.json` නැත්නම් create/copy කරයි.
- `.vscode/settings.json` safely merge කරයි.
- `package.json` තුළ පහත script එක නැත්නම් add කරයි:

```json
{
  "scripts": {
    "theme:audit": "node scripts/audit-theme-tokens.js"
  }
}
```

---

## 🧪 Verification & Post-Install Steps

ස්ථාපනයෙන් පසු setup එක සාර්ථකදැයි verify කිරීමට:

```bash
npm run theme:audit
npm run build
```

---

## 🚀 GitHub Repository Usage

මෙම kit එක GitHub repository එකක් ලෙස publish කළ පසු ඕනෑම project එකකින් single command එකකින් භාවිත කළ හැක:

```bash
npx github:Isuruzenith/shadcn-cline-kit
```

GitHub repository URL:

```txt
https://github.com/Isuruzenith/shadcn-cline-kit
```

---

## 💡 AI Agent (Cline) වැඩ කරන ආකාරය

Setup කිරීමෙන් පසු Cline පහත රීති අනුව ක්‍රියාත්මක වේ:

1. **Source of Truth Check:** UI එකක් සෑදීමට පෙර `.clinerules/CONTEXT_MAP.md`, `components.json`, global CSS, සහ `lib/utils.ts` කියවයි.
2. **No Hardcoded Tailwind:** `bg-white`, `bg-black`, `bg-gray-*`, `text-gray-*`, `bg-blue-600` වැනි classes වෙනුවට `bg-background`, `text-foreground`, `bg-card`, `bg-primary`, `border-border` වැනි semantic theme tokens පමණක් භාවිතා කරයි.
3. **No Component Recreation:** standard `<button>`, `<input>`, හෝ custom card boxes වෙනුවට `@/components/ui/*` primitives reuse කරයි. Primitive එකක් නැත්නම් `npx shadcn@latest add <component-name> --yes` මගින් add කරගනී.
4. **Validation Gate:** UI එක සෑදූ පසු `npm run theme:audit` සහ `npm run build` run කර verification සිදු කරයි.