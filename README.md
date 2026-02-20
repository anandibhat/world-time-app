# World Time App

A beautiful, responsive web application for tracking time across different timezones around the world.

![Build Status](https://github.com/anandibhat/world-time-app/workflows/Build%20and%20Push%20Docker%20Image/badge.svg)

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
- Kubernetes for orchestration
- GitHub Actions for CI/CD (Fully Automated!)

## 🚀 Complete CI/CD Pipeline

This project features a **fully automated DevOps pipeline**:

```
Code Push → GitHub Actions → Docker Hub → Auto-Deploy to Kubernetes
    ↓            ↓               ↓               ↓
  git push   Build & Test   Multi-Platform   Self-Hosted Runner
                            Image Storage    (Local K8s)
```

**Zero manual intervention** - Push code and it automatically:
1. ✅ Runs code quality checks
2. ✅ Builds multi-platform Docker images
3. ✅ Pushes to Docker Hub
4. ✅ Deploys to Kubernetes cluster
5. ✅ Restarts pods with new image

For local Kubernetes deployment with full automation, see [SELF_HOSTED_RUNNER.md](SELF_HOSTED_RUNNER.md)

## Running Locally

Simply open `index.html` in your web browser.

## Running with Docker

### Pull from Docker Hub

```bash
docker pull anilnandibhatla/world-time-app:latest
docker run -d -p 8080:80 --name world-time anilnandibhatla/world-time-app:latest
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

## Running on Kubernetes

Deploy to Kubernetes cluster (Docker Desktop, EKS, GKE, AKS):

### Quick Deploy

```bash
# Using the deployment script
./deploy.sh

# Or manually
kubectl apply -f k8s/
```

### Access the Application

For Docker Desktop:
```bash
# App will be available at http://localhost:80
open http://localhost
```

For Cloud (EKS/GKE/AKS):
```bash
# Get the external IP
kubectl get service world-time-app
# Access via http://<EXTERNAL-IP>
```

### Manage Deployment

```bash
# Check status
kubectl get pods -l app=world-time-app

# View logs
kubectl logs -l app=world-time-app

# Scale deployment
kubectl scale deployment world-time-app --replicas=5

# Delete deployment
kubectl delete -f k8s/
```

See [k8s/README.md](k8s/README.md) for detailed Kubernetes documentation.

## CI/CD Pipeline

This project uses GitHub Actions to automatically:
1. Check code quality (HTML, CSS, JavaScript syntax)
2. Validate project structure
3. Build Docker image for multiple platforms (amd64, arm64, arm/v7)
4. Push to Docker Hub

### Multi-Platform Support

The Docker image is built for multiple architectures:
- **linux/amd64** - Intel/AMD 64-bit processors
- **linux/arm64** - ARM 64-bit (Apple Silicon M1/M2/M3, AWS Graviton, etc.)
- **linux/arm/v7** - ARM 32-bit (Raspberry Pi, etc.)

This means you can run the app on any device without worrying about compatibility!

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
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── README.md
├── index.html
├── styles.css
├── app.js
├── Dockerfile
├── nginx.conf
├── deploy.sh
├── .gitignore
└── README.md
```

## License

MIT License - feel free to use this project for any purpose.
