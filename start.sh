cd Database
docker build -t phasmodb .
docker tag phasmodb:latest phasmodb:staging
cd ..

cd Frontend
docker build -t phasmoapp .
docker tag phasmoapp:latest phasmoapp:staging
cd ..

docker-compose up
