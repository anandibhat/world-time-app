# World Time App

A beautiful, responsive web application for tracking time across different timezones around the world.

![Build Status](https://github.com/YOUR_USERNAME/world-time-app/workflows/Build%20and%20Push%20Docker%20Image/badge.svg)

## Features

- **Multiple Timezone Clocks**: Display current time in multiple cities simultaneously
- **Timezone Converter**: Convert times between different timezones
- **Search & Add Cities**: Search from 30+ major cities worldwide
- **Persistent Storage**: Your selected cities are saved locally
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Updates**: Clocks update every second

## Technologies Used

- HTML5
- CSS3 (with modern gradients and flexbox/grid)
- Vanilla JavaScript
- Docker & Nginx
- GitHub Actions for CI/CD

## Running Locally

Simply open `index.html` in your web browser.

## Running with Docker

### Pull from Docker Hub

```bash
docker pull YOUR_DOCKERHUB_USERNAME/world-time-app:latest
docker run -d -p 8080:80 --name world-time YOUR_DOCKERHUB_USERNAME/world-time-app:latest
```

### Build locally

```bash
docker build -t world-time-app .
docker run -d -p 8080:80 --name world-time world-time-app
```

Then open your browser to `http://localhost:8080`

### Stop the container

```bash
docker stop world-time
docker rm world-time
```

## CI/CD Pipeline

This project uses GitHub Actions to automatically:
1. Check code quality (HTML, CSS, JavaScript syntax)
2. Validate project structure
3. Build Docker image
4. Push to Docker Hub

### Setting up GitHub Actions

1. Go to your GitHub repository settings
2. Navigate to Secrets and Variables > Actions
3. Add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password or access token

The workflow will automatically run on:
- Push to main/master branch
- Pull requests
- Manual trigger via workflow_dispatch

## Available Cities

The app includes 30+ major cities across all continents:
- Americas: New York, Los Angeles, Chicago, Toronto, São Paulo, Vancouver, Mexico City, Buenos Aires
- Europe: London, Paris, Berlin, Moscow, Amsterdam, Rome, Madrid, Zurich, Istanbul
- Asia: Tokyo, Singapore, Hong Kong, Mumbai, Dubai, Shanghai, Seoul, Bangkok, Tel Aviv
- Oceania: Sydney, Auckland
- Africa: Cairo, Johannesburg

## Usage

1. **World Clocks**: View real-time clocks for your selected cities
2. **Add Cities**: Use the search bar to find and add new cities
3. **Remove Cities**: Click the × button on any clock to remove it
4. **Convert Times**: Use the timezone converter to see what time it will be in another timezone

## Development

### Project Structure

```
world-time-app/
├── .github/
│   └── workflows/
│       └── docker-build-push.yml
├── index.html
├── styles.css
├── app.js
├── Dockerfile
├── nginx.conf
├── .gitignore
└── README.md
```

## License

MIT License - feel free to use this project for any purpose.
