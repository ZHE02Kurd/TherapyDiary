# Fix Theme Imports - Replace APP_SETTINGS with new theme system
# This script updates all screen files to use the new glassmorphism theme

$screenFiles = @(
    "frontend\src\screens\ActivitiesScreen.js",
    "frontend\src\screens\AnalyticsScreen.js",
    "frontend\src\screens\WeeklySessionScreen.js",
    "frontend\src\screens\WeekProgressScreen.js",
    "frontend\src\screens\DiaryEntryDetail.js"
)

Write-Host "🎨 Fixing theme imports across all screens..." -ForegroundColor Cyan

foreach ($file in $screenFiles) {
    $fullPath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $fullPath) {
        Write-Host "📝 Processing: $file" -ForegroundColor Yellow
        
        $content = Get-Content $fullPath -Raw
        
        # Add necessary imports if not present
        if ($content -notmatch "useTheme") {
            $content = $content -replace "(import.*from 'react';)", "`$1`nimport { useTheme } from '../context/ThemeContext';"
        }
        
        if ($content -notmatch "COLORS.*theme") {
            $content = $content -replace "(import.*from '../constants/config';)", "`$1`nimport { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/theme';"
        }
        
        # Add useTheme hook if not present
        if ($content -match "const \w+Screen = \([^)]*\) => {" -and $content -notmatch "const { colors } = useTheme\(\);") {
            $content = $content -replace "(const \w+Screen = \([^)]*\) => {)", "`$1`n  const { colors } = useTheme();"
        }
        
        # Replace APP_SETTINGS.THEME references
        $content = $content -replace "APP_SETTINGS\.THEME\.PRIMARY", "COLORS.primary"
        $content = $content -replace "APP_SETTINGS\.THEME\.BACKGROUND", "colors.background"
        $content = $content -replace "APP_SETTINGS\.THEME\.CARD", "colors.input"
        $content = $content -replace "APP_SETTINGS\.THEME\.TEXT", "colors.text"
        $content = $content -replace "APP_SETTINGS\.THEME\.TEXT_SECONDARY", "colors.textSecondary"
        $content = $content -replace "APP_SETTINGS\.THEME\.TEXT_TERTIARY", "colors.textTertiary"
        $content = $content -replace "APP_SETTINGS\.THEME\.BORDER", "colors.border"
        $content = $content -replace "APP_SETTINGS\.THEME\.ERROR", "COLORS.error"
        $content = $content -replace "APP_SETTINGS\.THEME\.SUCCESS", "COLORS.success"
        
        # Remove APP_SETTINGS import if no longer needed
        if ($content -notmatch "APP_SETTINGS\.(API_BASE|THEME)") {
            $content = $content -replace ",?\s*APP_SETTINGS", ""
        }
        
        # Write back
        Set-Content $fullPath -Value $content -NoNewline
        Write-Host "✅ Fixed: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️  File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Theme import fixes complete!" -ForegroundColor Green
Write-Host "Now restart Expo with: npx expo start --clear" -ForegroundColor Cyan
