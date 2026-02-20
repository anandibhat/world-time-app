# Kubernetes Deployment for World Time App

This directory contains Kubernetes manifests to deploy the World Time App to any Kubernetes cluster, including Docker Desktop's local cluster.

## Files

- `deployment.yaml` - Kubernetes Deployment with 3 replicas
- `service.yaml` - LoadBalancer Service to expose the app

## Prerequisites

- Docker Desktop with Kubernetes enabled
- kubectl command-line tool

## Quick Deploy

### Deploy to Kubernetes

```bash
# Apply all manifests
kubectl apply -f k8s/

# Or deploy individually
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### Check Deployment Status

```bash
# Check pods
kubectl get pods -l app=world-time-app

# Check service
kubectl get service world-time-app

# Check deployment
kubectl get deployment world-time-app
```

### Access the Application

For Docker Desktop (local):
```bash
# Get the service URL
kubectl get service world-time-app

# The app will be available at http://localhost:80
```

For cloud (AWS EKS, GKE, AKS):
```bash
# Get the external IP
kubectl get service world-time-app -w

# Wait for EXTERNAL-IP to show (may take a few minutes)
# Access via http://<EXTERNAL-IP>
```

## Deployment Details

### Deployment Configuration

- **Replicas**: 3 pods for high availability
- **Image**: `anilnandibhatla/world-time-app:latest`
- **Resources**:
  - Requests: 64Mi memory, 100m CPU
  - Limits: 128Mi memory, 200m CPU
- **Health Checks**:
  - Liveness probe on port 80
  - Readiness probe on port 80

### Service Configuration

- **Type**: LoadBalancer
  - Docker Desktop: Exposes on localhost
  - Cloud: Provisions cloud load balancer
- **Port**: 80 (HTTP)

## Scaling

Scale the deployment up or down:

```bash
# Scale to 5 replicas
kubectl scale deployment world-time-app --replicas=5

# Scale to 1 replica
kubectl scale deployment world-time-app --replicas=1
```

## Update Deployment

When a new image is pushed to Docker Hub:

```bash
# Restart deployment to pull latest image
kubectl rollout restart deployment world-time-app

# Check rollout status
kubectl rollout status deployment world-time-app

# View rollout history
kubectl rollout history deployment world-time-app
```

## Troubleshooting

### View logs

```bash
# Get logs from all pods
kubectl logs -l app=world-time-app --tail=100

# Get logs from specific pod
kubectl logs <pod-name>

# Follow logs
kubectl logs -l app=world-time-app -f
```

### Describe resources

```bash
# Describe deployment
kubectl describe deployment world-time-app

# Describe service
kubectl describe service world-time-app

# Describe pod
kubectl describe pod <pod-name>
```

### Access pod shell

```bash
# Get shell access to a pod
kubectl exec -it <pod-name> -- /bin/sh
```

## Cleanup

Remove all resources:

```bash
# Delete all resources
kubectl delete -f k8s/

# Or delete individually
kubectl delete deployment world-time-app
kubectl delete service world-time-app
```

## Deploy to Cloud

This same configuration works on:
- **AWS EKS** (Elastic Kubernetes Service)
- **Google GKE** (Google Kubernetes Engine)
- **Azure AKS** (Azure Kubernetes Service)
- **Any Kubernetes cluster**

Just ensure your kubectl is configured to the right cluster:

```bash
# Check current context
kubectl config current-context

# Switch context
kubectl config use-context <context-name>

# Deploy
kubectl apply -f k8s/
```
