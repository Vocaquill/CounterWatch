# ===== BUILD =====
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY CounterWatchApi/CounterWatchApi.csproj CounterWatchApi/
RUN dotnet restore CounterWatchApi/CounterWatchApi.csproj

COPY . .
WORKDIR /src/CounterWatchApi
RUN dotnet publish -c Release -o /app/publish

# ===== RUNTIME =====
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

EXPOSE 8080

COPY --from=build /app/publish .

# HTTPS


ENTRYPOINT ["dotnet", "CounterWatchApi.dll"]
