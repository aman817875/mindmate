@echo off
echo Deploying MindMate to Heroku...
echo.

echo Step 1: Building the React app...
cd client
call npm run build
cd ..

echo.
echo Step 2: Adding files to git...
git add .

echo.
echo Step 3: Committing changes...
git commit -m "Deploy to Heroku - %date% %time%"

echo.
echo Step 4: Pushing to Heroku...
git push heroku main

echo.
echo Step 5: Opening the app...
heroku open

echo.
echo Deployment complete! Your app should be live now.
pause
