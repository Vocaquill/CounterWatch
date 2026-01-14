# ===== BUILD =====
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /src

COPY CounterWatchApi/CounterWatchApi.csproj CounterWatchApi/
RUN dotnet restore CounterWatchApi/CounterWatchApi.csproj

COPY . .
WORKDIR /src/CounterWatchApi
RUN dotnet publish -c Release -o /app/publish

# ===== RUNTIME =====
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview
WORKDIR /app

EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "CounterWatchApi.dll"]
