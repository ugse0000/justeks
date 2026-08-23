<#
    Sunucuya dogrulanmis dosya gonderimi.

    Bu makineye scp birkac MB'lik dosyalarda sessizce yariliyor: 4.98 MB'lik
    bir arsiv karsiya 4.23 MB olarak dustu ve "Connection closed" ancak
    sonrasinda goruldu. ssh uzerinden borulamak guvenilir calisiyor; sha256
    karsilastirmasi ise yarim gonderimi bozuk bir yayina degil, basarisiz bir
    deploy'a cevirir.
#>

function Send-VerifiedFile {
    param(
        [Parameter(Mandatory)] [string] $Server,
        [Parameter(Mandatory)] [string] $Path,
        [Parameter(Mandatory)] [string] $Destination
    )

    $local = (Get-FileHash $Path -Algorithm SHA256).Hash.ToLower()

    Get-Content -Path $Path -AsByteStream -Raw | ssh $Server "cat > '$Destination'"
    if ($LASTEXITCODE -ne 0) { throw "Gonderim basarisiz: $Destination" }

    $remote = (ssh $Server "sha256sum '$Destination' | cut -d' ' -f1").Trim()
    if ($remote -ne $local) {
        throw "Dosya bozuk geldi ($Destination): yerel $local, uzak $remote"
    }
}
