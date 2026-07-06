# Weather App

A full-stack application for checking current weather forecasts and search statistics, with user accounts and JWT authentication. The backend is a REST API written in ASP.NET Core; the frontend is a React SPA that consumes it via Redux Toolkit Query.

## Features

-   User registration and login (JWT access + refresh token)
-   Current weather forecast lookup by city (via the OpenWeather API)
-   Forecast charts and day-by-day table view
-   User's search history
-   Statistics: most searched cities, weather condition distribution, latest searches

## Tech Stack

### Backend

#### Technology

-   .NET / ASP.NET Core
-   Entity Framework Core
-   Npgsql.EntityFrameworkCore.PostgreSQL
-   Microsoft.AspNetCore.Authentication.JwtBearer
-   Microsoft.IdentityModel.Tokens / System.IdentityModel.Tokens.Jwt
-   Scalar.AspNetCore
-   PostgreSQL

#### Frontend

#### Technology

-   React
-   TypeScript
-   Vite
-   Redux Toolkit + RTK Query
-   React Router
-   MUI (Material UI)
-   MUI X Charts / Data Grid / Date Pickers
-   dayjs
-   Vitest + React Testing Library

## Prerequisites

-   [.NET 10 SDK](https://dotnet.microsoft.com/download)
-   [Node.js](https://nodejs.org/) 20+ and npm
-   PostgreSQL (local or containerized) on port `5432`
-   An API key from [OpenWeather](https://openweathermap.org/api) (the free tier is enough)

## Running the Backend

1. Go into the folder:

    ```bash
    cd backend
    ```

2. Set your secrets locally (**not** in `appsettings.json`, which is committed to git):

    ```bash
    dotnet user-secrets init
    dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=YOUR_PASSWORD"
    dotnet user-secrets set "AppSettings:Token" "generate-a-random-string-at-least-64-characters-long"
    dotnet user-secrets set "OpenWeatherSettings:ApiKey" "YOUR_OPENWEATHER_KEY"
    ```

3. Apply migrations to the database:

    ```bash
    dotnet ef database update
    ```

    (if the `dotnet ef` tool isn't installed: `dotnet tool install --global dotnet-ef`)

4. Run the API:
    ```bash
    dotnet run
    ```
    The API is available at `https://localhost:7250` (and `http://localhost:5043`). Interactive API docs (Scalar) are available at `/scalar` in the Development environment.

## Running the Frontend

1. Go into the folder:

    ```bash
    cd frontend
    ```

2. Install packages:

    ```bash
    npm install
    ```

3. Set up environment variables — copy `.env.example` to `.env` and fill it in:

    ```bash
    cp .env.example .env
    ```

    ```
    VITE_API_BASE_URL=https://localhost:7250/api
    VITE_WEATHER_API_KEY=YOUR_OPENWEATHER_KEY
    VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
    ```

4. Start the dev server:
    ```bash
    npm run dev
    ```
    The app is available at `http://localhost:5173`.

### Other Frontend Scripts

```bash
npm run build          # production build
npm run lint            # ESLint
npm test                # Vitest, watch mode
npm run test:run        # Vitest, single run (for CI)
npm run test:coverage   # tests + coverage report
npm run test:ui         # Vitest UI in the browser
```
