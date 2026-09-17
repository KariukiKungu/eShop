# Start eShop with one command

The repository includes a single startup command that validates Docker and launches the .NET Aspire AppHost. The AppHost launch profile opens the Aspire dashboard automatically.

## Prerequisites

- .NET SDK version `10.0.100` or a compatible SDK
- Docker Desktop installed and running
- Node.js 18 or newer

## Start the project

```bash
npm install
npm start
```

The command runs:

```text
dotnet run --project src/eShop.AppHost/eShop.AppHost.csproj
```

The Aspire dashboard is configured to launch at `https://localhost:19888` (or the HTTP fallback at `http://localhost:18848`). Use the dashboard to open the Online Store web application.

## Start without the Node launcher

```bash
dotnet run --project src/eShop.AppHost/eShop.AppHost.csproj
```

Press `Ctrl+C` to stop all services.
