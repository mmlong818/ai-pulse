param(
  [switch]$RunWhetherLoggedOn
)

$ErrorActionPreference = 'Stop'

$TaskName = 'AI Pulse Daily'
$Root = Split-Path -Parent $PSScriptRoot
$Bat = Join-Path $Root 'run-daily.bat'

if (-not (Test-Path -LiteralPath $Bat)) {
  throw "run-daily.bat not found: $Bat"
}

$Action = New-ScheduledTaskAction -Execute $Bat -WorkingDirectory $Root
$Triggers = @(
  New-ScheduledTaskTrigger -Daily -At '07:00'
  New-ScheduledTaskTrigger -Daily -At '19:00'
)
$Settings = New-ScheduledTaskSettingsSet `
  -StartWhenAvailable `
  -MultipleInstances IgnoreNew `
  -ExecutionTimeLimit (New-TimeSpan -Hours 2) `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries

if ($RunWhetherLoggedOn) {
  $Credential = Get-Credential -Message "Windows account for $TaskName"
  Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $Action `
    -Trigger $Triggers `
    -Settings $Settings `
    -User $Credential.UserName `
    -Password $Credential.GetNetworkCredential().Password `
    -Force | Out-Null
} else {
  $User = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
  $Principal = New-ScheduledTaskPrincipal -UserId $User -LogonType Interactive -RunLevel Limited
  Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $Action `
    -Trigger $Triggers `
    -Settings $Settings `
    -Principal $Principal `
    -Force | Out-Null
}

$Task = Get-ScheduledTask -TaskName $TaskName
$Info = Get-ScheduledTaskInfo -TaskName $TaskName

[PSCustomObject]@{
  TaskName = $Task.TaskName
  State = $Task.State
  LastRunTime = $Info.LastRunTime
  LastTaskResult = $Info.LastTaskResult
  NextRunTime = $Info.NextRunTime
  Action = ($Task.Actions | ForEach-Object { ($_.Execute + ' ' + $_.Arguments).Trim() }) -join ' || '
  Triggers = ($Task.Triggers | ForEach-Object { $_.StartBoundary }) -join ' || '
} | Format-List
