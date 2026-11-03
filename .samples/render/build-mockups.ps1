param([string[]]$Sources = @('personalportfolio.png','ragdollfightingchampionship.png','spectremotion.png'))

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$root   = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)   # repo root
$tmp    = "C:\Users\rexna\AppData\Local\Temp\opencode\mock5"
New-Item -ItemType Directory -Force -Path $tmp | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $root '.samples\build') | Out-Null

$url = "file:///" + ($root -replace '\\','/' -replace ' ','%20') + "/.samples/render/proj.html?src="

Add-Type -AssemblyName System.Drawing

foreach ($s in $Sources) {
  $base = [IO.Path]::GetFileNameWithoutExtension($s)
  $png  = Join-Path $tmp "src-$base.png"
  $webp = Join-Path $root "public\project\mockup-$base.webp"
  Remove-Item $png -ErrorAction SilentlyContinue

  for ($try = 0; $try -lt 3 -and -not (Test-Path $png); $try++) {
    & $chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 `
      --window-size=1600,916 --virtual-time-budget=6000 --user-data-dir=$tmp\profile-$base-$try `
      --screenshot=$png "$url$s" 2>$null
    for ($i = 0; $i -lt 40 -and -not (Test-Path $png); $i++) { Start-Sleep -Milliseconds 250 }
  }
  if (-not (Test-Path $png)) { throw "render failed: $s" }

  Copy-Item $png (Join-Path $root ".samples\build\$base.png") -Force
  ffmpeg -hide_banner -loglevel error -y -i $png -c:v libwebp -quality 88 -compression_level 6 $webp
  if ($LASTEXITCODE -ne 0) { throw "encode failed: $s" }

  $img = [System.Drawing.Image]::FromFile($webp)
  $src = [System.Drawing.Image]::FromFile((Join-Path $root "public\project\$s"))
  "{0,-46} src {1}x{2} -> {3}x{4}  {5,6:N1} KB" -f `
    "mockup-$base.webp", $src.Width, $src.Height, $img.Width, $img.Height, ((Get-Item $webp).Length / 1KB)
  $img.Dispose(); $src.Dispose()
}