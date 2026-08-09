#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const kitRoot = __dirname
const targetRoot = process.cwd()

console.log("🚀 Installing Portable shadcn/ui Cline Kit...")
console.log("Run this command from the root of the project you want to configure.")
console.log(`Source Kit: ${kitRoot}`)
console.log(`Target Project: ${targetRoot}`)
console.log("Execution Mode: Single-command via NPX / direct Node execution\n")

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return

    const stats = fs.statSync(src)
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true })
        }
        for (const file of fs.readdirSync(src)) {
            copyRecursive(path.join(src, file), path.join(dest, file))
        }
    } else {
        const destDir = path.dirname(dest)
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true })
        }
        fs.copyFileSync(src, dest)
    }
}

// 1. Copy .clinerules
const clinerulesSrc = path.join(kitRoot, "kit", ".clinerules")
const clinerulesDest = path.join(targetRoot, ".clinerules")
copyRecursive(clinerulesSrc, clinerulesDest)
console.log("✅ Installed .clinerules/ and workflows")

// 2. Copy scripts/audit-theme-tokens.js
const auditSrc = path.join(kitRoot, "kit", "scripts", "audit-theme-tokens.js")
const auditDest = path.join(targetRoot, "scripts", "audit-theme-tokens.js")
copyRecursive(auditSrc, auditDest)
console.log("✅ Installed scripts/audit-theme-tokens.js")

// 3. Copy components/ui/manifest.json if missing
const manifestSrc = path.join(kitRoot, "kit", "components", "ui", "manifest.json")
const manifestDest = path.join(targetRoot, "components", "ui", "manifest.json")
if (!fs.existsSync(manifestDest)) {
    copyRecursive(manifestSrc, manifestDest)
    console.log("✅ Installed components/ui/manifest.json")
} else {
    console.log("ℹ️ Preserved existing components/ui/manifest.json")
}

// 4. Merge .vscode/settings.json instead of overwriting
const vscodeSrc = path.join(kitRoot, "kit", ".vscode", "settings.json")
const vscodeDest = path.join(targetRoot, ".vscode", "settings.json")
if (fs.existsSync(vscodeSrc)) {
    let finalSettings = {}
    if (fs.existsSync(vscodeDest)) {
        try {
            finalSettings = JSON.parse(fs.readFileSync(vscodeDest, "utf8"))
        } catch {
            finalSettings = {}
        }
    }
    const kitSettings = JSON.parse(fs.readFileSync(vscodeSrc, "utf8"))
    const mergedSettings = { ...finalSettings, ...kitSettings }
    fs.mkdirSync(path.dirname(vscodeDest), { recursive: true })
    fs.writeFileSync(vscodeDest, JSON.stringify(mergedSettings, null, 2), "utf8")
    console.log("✅ Merged .vscode/settings.json")
}

// 5. Add "theme:audit" to package.json scripts
const pkgPath = path.join(targetRoot, "package.json")
if (fs.existsSync(pkgPath)) {
    try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
        pkg.scripts = pkg.scripts || {}
        if (!pkg.scripts["theme:audit"]) {
            pkg.scripts["theme:audit"] = "node scripts/audit-theme-tokens.js"
            fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8")
            console.log('✅ Added "theme:audit" script to package.json')
        } else {
            console.log('ℹ️ "theme:audit" script already exists in package.json')
        }
    } catch (err) {
        console.error("⚠️ Failed to update package.json:", err.message)
    }
} else {
    console.log("ℹ️ No package.json found in target project; skipped adding theme:audit script")
}

console.log("\n🎉 Setup complete! Next Steps:")
console.log("1. Run the audit check to confirm settings:")
console.log("   npm run theme:audit")
console.log("2. Run your project build:")
console.log("   npm run build")
console.log("3. Open your project in VS Code to load rules and workflows.")
