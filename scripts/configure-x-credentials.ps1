param()

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot

function Set-SecretEnvironmentVariable {
  param(
    [Parameter(Mandatory)] [string] $Name,
    [Parameter(Mandatory)] [string] $Label
  )

  $secure = Read-Host "$Label (press Enter to keep an existing value)" -AsSecureString
  if ($secure.Length -eq 0) {
    if ([Environment]::GetEnvironmentVariable($Name, 'User')) {
      Write-Host "$Name`: kept"
      return
    }
    throw "$Name is not configured and cannot be empty."
  }

  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try {
    $value = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    [Environment]::SetEnvironmentVariable($Name, $value, 'User')
    Set-Item -Path "Env:$Name" -Value $value
    Write-Host "$Name`: saved to the Windows user environment"
  } finally {
    if ($ptr -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
    Remove-Variable value -ErrorAction SilentlyContinue
  }
}

Write-Host 'Configure X API credentials for AI Pulse. Input is hidden and is never written to the repository or logs.'
Write-Host 'The X app must use Read and write permissions. Regenerate the Access Token and Secret after changing permissions.'
Write-Host ''

Set-SecretEnvironmentVariable 'X_BEARER_TOKEN' 'Bearer Token'
Set-SecretEnvironmentVariable 'X_API_KEY' 'API Key'
Set-SecretEnvironmentVariable 'X_API_SECRET' 'API Key Secret'
Set-SecretEnvironmentVariable 'X_ACCESS_TOKEN' 'Access Token'
Set-SecretEnvironmentVariable 'X_ACCESS_SECRET' 'Access Token Secret'

Write-Host ''
Write-Host 'Verifying X credentials without posting...'
Push-Location $Root
try {
  node post-x.mjs verify
  if ($LASTEXITCODE -ne 0) { throw "X credential verification failed with exit code $LASTEXITCODE." }
  Write-Host ''
  Write-Host 'Verification passed. You may close this window.' -ForegroundColor Green
} finally {
  Pop-Location
}

Read-Host 'Press Enter to close'
