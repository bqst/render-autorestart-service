# render-autorestart

A Node.js service that automatically monitors and restarts Render.com servers when they become unresponsive.

## Features

- Monitors server health through HTTP requests
- Automatically restarts unresponsive servers via Render API
- Configurable timeout settings
- Docker support
- TypeScript implementation

## Installation

### Local Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/render-autorestart.git

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
SERVICE_URL=https://your-service.onrender.com
SERVICE_ID=srv-xxx
BEARER_TOKEN_RENDER=rnd_xxx
TIMEOUT_DELAY=5000
```

## Usage

### Local Development

```bash
# Start the service
npm start
```

### Docker

```bash
# Build the Docker image
docker build -t render-autorestart .

# Run the container
docker run -e SERVICE_URL=<url> \
          -e SERVICE_ID=<id> \
          -e BEARER_TOKEN_RENDER=<token> \
          render-autorestart
```

## How It Works

The service periodically checks the health of your Render deployment by making HTTP requests. If a request times out or the server is unresponsive, it automatically triggers a restart using the Render API.

## License

MIT License

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
