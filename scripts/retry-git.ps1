param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('pull', 'push')]
  [string]$Operation
)

$gitArgs = if ($Operation -eq 'pull') {
  @('pull', '--ff-only', 'origin', 'main')
} else {
  @('push', 'origin', 'main')
}
$delays = @(15, 30, 60, 120)

for ($attempt = 1; $attempt -le ($delays.Count + 1); $attempt++) {
  $output = @(& git @gitArgs 2>&1 | ForEach-Object { $_.ToString() })
  $result = $LASTEXITCODE
  $output | ForEach-Object { Write-Output $_ }
  if ($result -eq 0) { exit 0 }

  $message = ($output | Out-String)
  $transient = $message -match '(?i)schannel|SSL/TLS|handshake|connection (failed|reset|timed out)|could not resolve host|temporary failure|HTTP (429|5\d\d)'
  if (-not $transient -or $attempt -gt $delays.Count) { exit 1 }

  $delay = $delays[$attempt - 1]
  Write-Output "[git] $Operation transient network failure; retry $attempt/$($delays.Count) in $delay seconds"
  Start-Sleep -Seconds $delay
}
