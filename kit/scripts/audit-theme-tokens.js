const fs = require("fs")
const path = require("path")

const projectRoot = path.resolve(__dirname, "..", "..")

const TARGET_DIRECTORIES = ["app", "components", "frontend", "lib", "src", "pages"]

const IGNORE_PATH_PARTS = [
    "node_modules",
    ".next",
    "dist",
    "build",
    "coverage",
    ".git",
    path.join("components", "ui"),
    path.join("src", "components", "ui"),
]

const FILE_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js"])

const FORBIDDEN_PATTERNS = [
    {
        regex:
            /\b(bg|text|border|divide|ring)-(white|black)\b/g,
        message:
            "Hardcoded white/black utility detected. Use semantic theme tokens such as bg-background, text-foreground, bg-card, border-border, or ring-ring.",
    },
    {
        regex:
            /\b(bg|text|border|divide|ring)-(gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
        message:
            "Hardcoded Tailwind palette utility detected. Use project semantic tokens such as primary, secondary, accent, destructive, muted, card, border, input, or sidebar tokens.",
    },
    {
        regex:
            /\b(bg|text|border|ring|outline)-\[\s*#[0-9a-fA-F]{3,8}\s*\]/g,
        message:
            "Arbitrary hex color utility detected. Move the value into the project's CSS as a semantic token or use an existing theme token.",
    },
    {
        regex:
            /\b(bg|text|border|ring|outline)-\[\s*(rgb|rgba|hsl|hsla|oklch|oklab|color-mix)\([^"\]']+\)\s*\]/g,
        message:
            "Arbitrary color function utility detected. Use semantic theme tokens from the project's CSS.",
    },
    {
        regex:
            /\brounded-\[\s*\d+(\.\d+)?(px|rem|em)\s*\]/g,
        message:
            "Arbitrary border radius detected. Use the project radius utilities: rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl, or rounded-4xl.",
    },
    {
        regex:
            /\bshadow-(sm|md|lg|xl|2xl)\b/g,
        message:
            "Raw shadow utility detected. Prefer shadcn/ui component defaults unless the project design system explicitly documents this shadow.",
    },
    {
        regex:
            /<button\s+[^>]*className=["'`][^"'`]*(bg-primary|bg-secondary|bg-destructive|border-input|border-border)[^"'`]*["'`]/g,
        message:
            "Raw <button> styled like a UI primitive detected. Use the shadcn Button component from @/components/ui/button.",
    },
    {
        regex:
            /<input\s+[^>]*className=["'`][^"'`]*(border-input|bg-input|bg-transparent)[^"'`]*["'`]/g,
        message:
            "Raw <input> styled like a UI primitive detected. Use the shadcn Input component from @/components/ui/input.",
    },
]

function isIgnored(filePath) {
    const normalized = path.relative(projectRoot, filePath).split(path.sep).join("/")
    return IGNORE_PATH_PARTS.some((part) => {
        const normalizedPart = part.split(path.sep).join("/")
        return normalized.includes(normalizedPart)
    })
}

function collectFiles(directory, files = []) {
    if (!fs.existsSync(directory)) {
        return files
    }

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, entry.name)

        if (isIgnored(fullPath)) {
            continue
        }

        if (entry.isDirectory()) {
            collectFiles(fullPath, files)
            continue
        }

        if (entry.isFile() && FILE_EXTENSIONS.has(path.extname(entry.name))) {
            files.push(fullPath)
        }
    }

    return files
}

function shouldSkipLine(line) {
    const trimmed = line.trim()

    return (
        trimmed.startsWith("//") ||
        trimmed.startsWith("/*") ||
        trimmed.startsWith("*") ||
        trimmed.startsWith("<!--")
    )
}

function auditFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8")
    const lines = content.split(/\r?\n/)
    const issues = []

    lines.forEach((line, index) => {
        if (shouldSkipLine(line)) {
            return
        }

        for (const pattern of FORBIDDEN_PATTERNS) {
            pattern.regex.lastIndex = 0

            let match
            while ((match = pattern.regex.exec(line)) !== null) {
                issues.push({
                    file: path.relative(projectRoot, filePath),
                    line: index + 1,
                    match: match[0],
                    code: line.trim(),
                    message: pattern.message,
                })
            }
        }
    })

    return issues
}

function runAudit() {
    console.log("🔍 Auditing UI files for shadcn/theme-token compliance...\n")

    const files = TARGET_DIRECTORIES.flatMap((directory) =>
        collectFiles(path.join(projectRoot, directory))
    )

    const issues = files.flatMap(auditFile)

    if (issues.length === 0) {
        console.log("✅ Theme audit passed. No hardcoded theme-token violations found.")
        process.exit(0)
    }

    console.error(`❌ Theme audit failed. Found ${issues.length} violation(s):\n`)

    issues.forEach((issue, index) => {
        console.error(`${index + 1}. ${issue.file}:${issue.line}`)
        console.error(`   Match: ${issue.match}`)
        console.error(`   Code: ${issue.code}`)
        console.error(`   Fix: ${issue.message}\n`)
    })

    console.error("Recommended replacements:")
    console.error("- Page: bg-background text-foreground")
    console.error("- Cards: bg-card text-card-foreground")
    console.error("- Muted: bg-muted text-muted-foreground")
    console.error("- Borders: border-border border-input")
    console.error("- Actions: bg-primary text-primary-foreground")
    console.error("- Secondary: bg-secondary text-secondary-foreground")
    console.error("- Accent: bg-accent text-accent-foreground")
    console.error("- Destructive: bg-destructive text-destructive-foreground")
    console.error("- Components: use shadcn/ui primitives instead of raw button/input/card/modal markup")

    process.exit(1)
}

runAudit()