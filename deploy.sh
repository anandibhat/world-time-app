#!/bin/bash

set -e

echo "🚀 Deploying World Time App to Kubernetes..."
echo ""

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl not found. Please install kubectl first."
    exit 1
fi

# Check if Kubernetes is running
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Kubernetes cluster not reachable."
    echo "Please enable Kubernetes in Docker Desktop:"
    echo "  1. Open Docker Desktop"
    echo "  2. Go to Settings → Kubernetes"
    echo "  3. Enable Kubernetes"
    echo "  4. Apply & Restart"
    exit 1
fi

echo "✅ Kubernetes cluster is reachable"
echo ""

# Apply Kubernetes manifests
echo "📦 Applying Kubernetes manifests..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo ""
echo "⏳ Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=60s deployment/world-time-app

echo ""
echo "✅ Deployment successful!"
echo ""
echo "📊 Deployment Status:"
kubectl get deployment world-time-app
echo ""
echo "🔌 Service:"
kubectl get service world-time-app
echo ""
echo "🎯 Pods:"
kubectl get pods -l app=world-time-app
echo ""
echo "🌐 Access your app:"
echo "   For Docker Desktop: http://localhost:80"
echo ""
echo "📝 Useful commands:"
echo "   View logs:    kubectl logs -l app=world-time-app"
echo "   Scale up:     kubectl scale deployment world-time-app --replicas=5"
echo "   Delete:       kubectl delete -f k8s/"
echo ""
