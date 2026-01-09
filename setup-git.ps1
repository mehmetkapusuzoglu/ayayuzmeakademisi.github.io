# Git setup script for AYA project
$ErrorActionPreference = "Stop"

# Get the script directory (workspace path)
# Try to get the actual workspace path
$scriptPath = $PSScriptRoot
if (-not $scriptPath -or -not (Test-Path (Join-Path $scriptPath "index.html"))) {
    # Fallback: try to find the project directory
    $possiblePaths = @(
        "D:\Macbook Yedek\C\AYA Klasörler\publish",
        (Join-Path $env:USERPROFILE "publish"),
        (Get-Location).Path
    )
    foreach ($path in $possiblePaths) {
        if (Test-Path (Join-Path $path "index.html")) {
            $scriptPath = $path
            break
        }
    }
}

Write-Host "Working directory: $scriptPath"

# Change to the project directory
Set-Location $scriptPath

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..."
    git init
}

# Check git status
Write-Host "`nGit status:"
git status --short

# Add all files
Write-Host "`nAdding files to git..."
git add .

# Check what will be committed
Write-Host "`nFiles staged for commit:"
git status --short

# Create initial commit
Write-Host "`nCreating initial commit..."
git commit -m "Initial commit: AYA website project"

# Add remote repository
Write-Host "`nAdding remote repository..."
git remote remove origin 2>$null
git remote add origin https://github.com/mehmetkapusuzoglu/ayayuzmeakademisi.github.io.git

# Set branch to main
Write-Host "`nSetting branch to main..."
git branch -M main

# Show remote info
Write-Host "`nRemote repository configured:"
git remote -v

Write-Host "`n✅ Git setup completed!"
Write-Host "`nTo push to GitHub, run:"
Write-Host "  git push -u origin main"

