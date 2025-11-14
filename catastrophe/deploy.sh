#!/bin/bash
set -e

APP_NAME="alumni-portal-app"
DEPLOYMENT_NAME="alumni-portal-deployment"
SERVICE_NAME="alumni-portal-service"

echo "🏗️  Building Docker image..."
eval $(minikube -p minikube docker-env)
docker build -t $APP_NAME:latest .

echo "📦  Updating Kubernetes deployment..."
kubectl delete pod -l app=alumni-portal --ignore-not-found
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "🔍  Waiting for pod to be ready..."
kubectl wait --for=condition=ready pod -l app=alumni-portal --timeout=120s

echo "🌐  Getting service URL..."
minikube service $SERVICE_NAME --url
