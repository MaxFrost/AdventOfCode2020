[int[]]$TestValues = Get-Content (Get-Item -Path "./1/day1data.txt").FullName

$Result1 = measure-command -Expression {
    foreach ($TestValue in $TestValues) {
        $SearchValue = 2020 - $TestValue
        if ($Result = $TestValues.Where{$_ -eq $SearchValue}[0]) {
            $Output = $Result * $TestValue
            Write-Host "Day 1, Part 1: $Output"
            return
        }
    }
}

$Result2 = Measure-Command -Expression {
    foreach ($TestValue in $TestValues) {
        $SubTestValues = $TestValues.Where{$_ -lt (2020 - $TestValue)}
        foreach ($SubTestValue in $SubTestValues) {
            $SearchValue = 2020 - ($TestValue + $SubTestValue)
            if ($Result = $TestValues.Where{$_ -eq $SearchValue}[0]) {
                $Output = $Result * $SubTestValue * $TestValue
                Write-Host "Day 1, Part 2: $Output"
                return
            }
        }
    }    
}

Write-Host "Part 1 execution time: $($Result1.TotalMilliseconds) ms"
Write-Host "Part 2 exectuion time: $($Result2.TotalMilliseconds) ms"




<#
for ($i=0;$i -lt $TestValues.Length;$i++){
    for ($j=0;$j -lt $TestValues.Length;$j++){
        for ($k=0;$k -lt $TestValues.Length;$k++){
            if ($i -ne $j -and $i -ne $k -and $j -ne $k) {
                $CurrentTest = $TestValues[$i] + $TestValues[$j] + $TestValues[$k]
                if ($CurrentTest -eq 2020) {
                    Write-Host "Index $($i): $([int]$TestValues[$i])"
                    Write-Host "Index $($j): $([int]$TestValues[$j])"
                    Write-Host "Index $($k): $([int]$TestValues[$k])"
                    return $TestValues[$i] * $TestValues[$j] * $TestValues[$k]
                }
            }
        }
    }   
}
#>