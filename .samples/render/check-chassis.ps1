# Chassis check: every mockup must be pixel-identical to the approved variant A plate
# outside the screen area. Compares the 1600x916 renders in .samples/build, masking the
# projected screen box (344,169 945x574) plus a 2px ring for the anti-aliased edge.
$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$build = Join-Path $root '.samples\build'
Add-Type -AssemblyName System.Drawing

$names = @('inventory','personalportfolio','ragdollfightingchampionship','spectremotion')
foreach ($n in $names) {
  $png = Join-Path $build "$n.png"
  if (-not (Test-Path $png)) {
    $webp = Join-Path $root "public\project\mockup-$n.webp"
    ffmpeg -hide_banner -loglevel error -y -i $webp $png
  }
  $out = ffmpeg -hide_banner -loglevel info -i $png -i (Join-Path $build 'a-empty.png') `
    -filter_complex "[0]drawbox=x=342:y=167:w=949:h=578:color=black:t=fill[a];[1]drawbox=x=342:y=167:w=949:h=578:color=black:t=fill[b];[a][b]psnr" `
    -f null - 2>&1 | Select-String 'average:'
  "mockup-$n  chassis vs approved variant A  ->  $out"
}

foreach ($n in $names) {
  $webp = Join-Path $root "public\project\mockup-$n.webp"
  $tmpPng = Join-Path $env:TEMP "check-$n.png"
  ffmpeg -hide_banner -loglevel error -y -i $webp $tmpPng
  $img = [System.Drawing.Image]::FromFile($tmpPng)
  "{0,-46} {1}x{2}  {3,6:N1} KB" -f "mockup-$n.webp", $img.Width, $img.Height, ((Get-Item $webp).Length / 1KB)
  $img.Dispose()
}