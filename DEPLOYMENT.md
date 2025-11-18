# Deployment Setup

Dieses Projekt ist mit automatischem Deployment über GitHub Actions konfiguriert.

## Workflows

### 1. CI (`ci.yml`)
- **Trigger**: Push/PR auf `main` oder `develop` Branch
- **Aktion**: Buildet die Library und testet auf Node.js 18 & 20
- **Nutzen**: Stellt sicher, dass alle Änderungen korrekt kompilieren

### 2. npm Publishing (`publish.yml`)
- **Trigger**:
  - Automatisch bei jedem GitHub Release
  - Manuell über "Actions" Tab (mit optionaler Versionsnummer)
- **Aktion**: Veröffentlicht das Paket auf npm
- **Voraussetzung**: `NPM_TOKEN` Secret muss gesetzt sein

### 3. GitHub Pages Demo (`deploy-demo.yml`)
- **Trigger**:
  - Automatisch bei Push auf `main`
  - Manuell über "Actions" Tab
- **Aktion**: Deployed die Demo-Seite nach GitHub Pages
- **URL**: `https://utopia-os.github.io/animated-turtle/`
- **Voraussetzung**: GitHub Pages muss aktiviert sein

## Einrichtung

### NPM Token erstellen
1. Gehe zu [npmjs.com](https://www.npmjs.com/) → Account Settings → Access Tokens
2. Erstelle einen "Automation" Token
3. Kopiere den Token

### GitHub Secrets setzen
1. Gehe zu Repository → Settings → Secrets and variables → Actions
2. Klicke "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Dein npm Token
5. Klicke "Add secret"

### GitHub Pages aktivieren
1. Gehe zu Repository → Settings → Pages
2. Source: "GitHub Actions" auswählen
3. Save

## Verwendung

### Neue Version veröffentlichen
```bash
# 1. Version in package.json erhöhen
npm version patch  # oder minor/major

# 2. Git committen und pushen
git push

# 3. GitHub Release erstellen
# Gehe zu GitHub → Releases → "Create a new release"
# Tag: v1.0.9 (entsprechend package.json)
# Publish Release

# Der Workflow veröffentlicht automatisch auf npm!
```

### Manuelles Publishing
1. Gehe zu Actions → "Publish to npm"
2. Klicke "Run workflow"
3. Optional: Gib eine Versionsnummer ein (z.B. `1.0.9`)
4. Klicke "Run workflow"

### Demo aktualisieren
- Pushe auf `main` → Demo wird automatisch aktualisiert
- Oder: Actions → "Deploy Demo to GitHub Pages" → "Run workflow"

## Troubleshooting

**Publishing schlägt fehl:**
- Prüfe ob `NPM_TOKEN` Secret gesetzt ist
- Prüfe ob die Version in `package.json` noch nicht auf npm existiert
- Prüfe npm Token Permissions (muss "Automation" oder "Publish" sein)

**GitHub Pages 404:**
- Warte 2-3 Minuten nach dem ersten Deployment
- Prüfe ob GitHub Pages auf "GitHub Actions" Source eingestellt ist
- Prüfe ob der Workflow erfolgreich durchgelaufen ist (Actions Tab)

**Build Fehler:**
- Prüfe CI Workflow für Details
- Teste lokal: `npm run build:lib`
