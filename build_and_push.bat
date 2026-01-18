@echo off

REM ==== WEB ====
cd CounterWatchSite\movie-web
docker build -t counterwatch-web .
docker tag counterwatch-web:latest pedro007salo/counterwatch-web:latest
docker push pedro007salo/counterwatch-web:latest

REM ==== API ====
cd ..\..\CounterWatchApi\CounterWatchApi
docker build -t counterwatch-api .
docker tag counterwatch-api:latest pedro007salo/counterwatch-api:latest
docker push pedro007salo/counterwatch-api:latest

echo DONE
pause
