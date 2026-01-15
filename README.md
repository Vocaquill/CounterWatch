"# CounterWatch" 


# Install dotnet server
sudo add-apt-repository ppa:dotnet/backports

sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-10.0

# Run server command
dotnet dev-certs https --clean
dotnet dev-certs https -ep /certs/counterwatch.pfx -p StrongPassword123
dotnet dev-certs https --trust

#docker image
git clone https://github.com/Vocaquill/CounterWatch.git
cd CounterWatch
cd CounterWatchApi
cd CounterWatchApi/

docker build -t counterwatch-api .
docker run -d --restart=always -v /certs:/https -e ASPNETCORE_Kestrel__Certificates__Default__Password=StrongPassword123 --name counterwatch_container -p 4790:8080 counterwatch-api
