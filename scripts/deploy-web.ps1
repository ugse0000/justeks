<#
    JUSTEKS statik sitesini sunucuya gonderir.

    Kullanim (repo kokunden):
        pwsh scripts/deploy-web.ps1

    Sunucuda 80/443'u nginx dinliyor ve uzerinde baska siteler yayinda; bu
    betik yalnizca /var/www/justeks icerigini degistirir ve nginx'e hic
    dokunmaz. Yapilandirma degisikligi gerekiyorsa
    infra/nginx/justeks.conf elle uygulanir.
#>

$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'lib' 'transfer.ps1')

$Server  = 'isg-sunucu'          # ~/.ssh/config icindeki tanim
$Target  = '/var/www/justeks'
$Archive = Join-Path $env:TEMP 'justeks-dist.tar.gz'

Push-Location (Join-Path $PSScriptRoot '..' 'web')
try {
    Write-Host '==> Derleniyor'
    npm run build
    if ($LASTEXITCODE -ne 0) { throw 'Derleme basarisiz' }

    Write-Host '==> Testler'
    npm test
    if ($LASTEXITCODE -ne 0) { throw 'Testler basarisiz - gonderim iptal' }

    # Canli sitede aranacak imza: bu derlemenin kendi paket adi. Yalnizca
    # 200 kontrolu, gonderim yarida kalip eski surum servis edilmeye devam
    # ettiginde de gecer - nitekim bir kez oyle oldu.
    $index = Get-Content -Raw (Join-Path 'dist' 'index.html')
    if ($index -notmatch '(/assets/index-[A-Za-z0-9_-]+\.js)') {
        throw 'Derleme ciktisinda paket adi bulunamadi'
    }
    $script:Bundle = $Matches[1]

    Write-Host '==> Paketleniyor'
    if (Test-Path $Archive) { Remove-Item $Archive -Force }
    tar -czf $Archive -C dist .
}
finally { Pop-Location }

Write-Host '==> Gonderiliyor'
Send-VerifiedFile -Server $Server -Path $Archive -Destination '/tmp/justeks-dist.tar.gz'

# Once yeni surumu yanina acip sonra takas ediyoruz: site hicbir an yarim
# dosya setiyle servis edilmesin.
$remote = @'
set -e
STAGING=/var/www/justeks.new
OLD=/var/www/justeks.old
rm -rf "$STAGING" "$OLD"
mkdir -p "$STAGING"
tar -xzf /tmp/justeks-dist.tar.gz -C "$STAGING"
chown -R www-data:www-data "$STAGING"
if [ -d /var/www/justeks ]; then mv /var/www/justeks "$OLD"; fi
mv "$STAGING" /var/www/justeks
rm -rf "$OLD" /tmp/justeks-dist.tar.gz
echo "yayinlandi: $(find /var/www/justeks -type f | wc -l) dosya"
'@
$remote | ssh $Server 'bash -s'

Write-Host '==> Dogrulama'
$code = (curl.exe -s -o NUL -w '%{http_code}' --max-time 25 https://justeks.com/)
Write-Host "https://justeks.com -> $code"
if ($code -ne '200') { throw "Site beklenen yaniti vermedi: $code" }

# -join sart: curl.exe ciktisi satir dizisi doner ve bir dizi uzerinde
# -notmatch boolean degil, eslesmeyen satirlarin listesini verir - yani
# kosul her zaman dogru cikar ve basarili bir yayin hatali gorunur.
$live = (curl.exe -s --max-time 25 https://justeks.com/) -join "`n"
if ($live -notmatch [regex]::Escape($script:Bundle)) {
    throw "Canli site bu derlemeyi servis etmiyor - $($script:Bundle) bulunamadi"
}
Write-Host "yayindaki paket: $($script:Bundle)"
