# Crawl IndoGold Price

This project is a simple web scraper and API built with [Hono](https://hono.dev/) to fetch the current sell price of gold from [IndoGold.id](https://www.indogold.id/).

## Features

- Crawls the IndoGold website to extract the "Harga Jual" (Sell Price).
- Exposes a REST API endpoint to retrieve the price.
- Built-in support for Netlify Functions deployment.

## Tech Stack

- **Runtime:** Node.js (compatible with Bun)
- **Framework:** Hono
- **HTTP Client:** Axios
- **HTML Parser:** Cheerio
- **Deployment:** Netlify Functions

## Prerequisites

- [Bun](https://bun.sh/)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd crawl-indogold-price
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

## Usage

### Running Locally

To run the server locally:

```bash
bun run index.js
```

The server will start at `http://localhost:3000`.

### API Endpoint

- **GET** `/price`
  - Returns the current gold sell price as a plain text string.
  - Example response: `1350000`

## Deployment

This project is configured for deployment on Netlify using Netlify Functions.

1. Install Netlify CLI:

   ```bash
   bun add -g netlify-cli
   ```

2. Login to Netlify:

   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

The `netlify.toml` file handles the build configuration and redirects all requests to the Netlify Function.

## Project Structure

- `index.js`: Main application logic and Hono server setup.
- `netlify/functions/api.js`: Adapter for running Hono on Netlify Functions.
- `netlify.toml`: Netlify configuration file.
