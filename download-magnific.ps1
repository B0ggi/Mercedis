$ProgressPreference = 'SilentlyContinue'

# Download magnific-popup.css
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.css" -OutFile "assets\css\magnific-popup.css"

# Download jquery.magnific-popup.min.js
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js" -OutFile "assets\js\jquery.magnific-popup.min.js"

Write-Host "Files downloaded successfully!" -ForegroundColor Green
