@echo off
echo Starting MindMate Project...

echo.
echo Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd server && node index.js"

echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server (Port 3000)...
start "Frontend Server" cmd /k "cd client && npm start"

echo.
echo Both servers are starting...
echo.
echo Backend API: http://localhost:5000
echo Frontend App: http://localhost:3000
echo.
echo The application will open in your browser automatically.
echo.
echo Press any key to close this window...
pause > nul
