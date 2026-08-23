<#
    JUSTEKS backend'ini sunucuya gonderir.

    Kullanim (repo kokunden):
        pwsh scripts/deploy-api.ps1

    Sunucuda varsayilan java 17 ve baska servisler ona bagli; bu jar Java 25
    ile derlenir ve systemd unit'i yorumlayiciyi tam yolla cagirir. Sistem
    genelindeki varsayilan degistirilmez.
#>

$ErrorActionPreference = 'Stop'

$Server = 'isg-sunucu'
$Jdk25  = 'C:\Program Files\Eclipse Adoptium\jdk-25.0.4.7-hotspot'

Push-Location (Join-Path $PSScriptRoot '..' 'api')
try {
    $env:JAVA_HOME = $Jdk25

    Write-Host '==> Testler (Testcontainers icin Docker gerekir)'
    mvn --batch-mode test
    if ($LASTEXITCODE -ne 0) { throw 'Testler basarisiz - gonderim iptal' }

    Write-Host '==> Paketleniyor'
    mvn --batch-mode -DskipTests package
    if ($LASTEXITCODE -ne 0) { throw 'Paketleme basarisiz' }
}
finally { Pop-Location }

$jar = Join-Path $PSScriptRoot '..' 'api' 'target' 'justeks-api-0.0.1-SNAPSHOT.jar'
$size = (Get-Item $jar).Length

Write-Host "==> Gonderiliyor ($([math]::Round($size/1MB)) MB)"
# 56 MB'lik jar tek seferde kopabiliyor; sikistirma ve dogrulama ile.
scp -C -o ServerAliveInterval=15 $jar "${Server}:/opt/justeks-api/justeks-api.jar.new"

$remote = @'
set -e
NEW=/opt/justeks-api/justeks-api.jar.new
LIVE=/opt/justeks-api/justeks-api.jar
# Yarim inen jar ile servisi baslatmayalim.
if [ "$(stat -c%s "$NEW")" -lt 40000000 ]; then echo "jar eksik indi"; exit 1; fi
mv "$NEW" "$LIVE"
chown justeks:justeks "$LIVE"
systemctl restart justeks-api
sleep 15
systemctl is-active justeks-api
'@
$remote | ssh $Server 'bash -s'

Write-Host '==> Dogrulama'
# Bos govde 400 dondurmeli: uygulama ayakta ve dogrulama calisiyor demektir.
$code = (curl.exe -s -o NUL -w '%{http_code}' --max-time 20 -X POST `
    -H 'Content-Type: application/json' -d '{}' https://justeks.com/api/v1/enquiries)
Write-Host "POST /api/v1/enquiries -> $code"
if ($code -ne '400') { throw "API beklenen yaniti vermedi: $code" }
