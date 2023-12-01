# FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
# WORKDIR /app
# COPY *.csproj ./
# RUN dotnet restore
# COPY . ./
# RUN dotnet publish -c Release -o out

# # Copy the image file
# COPY avatar.jpg ./out/avatar.jpg

# FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
# WORKDIR /app
# COPY --from=build /app/out ./
# ENTRYPOINT ["dotnet", "backend.dll"]

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY backend.csproj .
RUN dotnet restore "backend.csproj"
COPY . .
RUN dotnet publish "backend.csproj" -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0 as final
WORKDIR /app
COPY --from=build /publish .
COPY --from=build /src/avatar.jpg .
ENTRYPOINT [ "dotnet", "backend.dll" ]