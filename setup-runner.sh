#!/bin/bash

echo "=========================================="
echo "GitHub Actions Self-Hosted Runner Setup"
echo "=========================================="
echo ""

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "⚠️  This script is designed for macOS. For other platforms, please check GitHub's documentation."
    exit 1
fi

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl not found. Please install kubectl first."
    exit 1
fi

if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Cannot connect to Kubernetes cluster. Please ensure Docker Desktop Kubernetes is running."
    exit 1
fi

echo "✅ kubectl found and cluster is accessible"
echo ""

# Create runner directory
RUNNER_DIR="$HOME/actions-runner"
echo "Creating runner directory at $RUNNER_DIR..."
mkdir -p "$RUNNER_DIR"
cd "$RUNNER_DIR"

# Download the latest runner package
echo ""
echo "📥 Downloading GitHub Actions runner..."
RUNNER_VERSION="2.321.0"
curl -o actions-runner-osx-arm64-${RUNNER_VERSION}.tar.gz -L https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-osx-arm64-${RUNNER_VERSION}.tar.gz

# Extract the installer
echo "📦 Extracting runner..."
tar xzf ./actions-runner-osx-arm64-${RUNNER_VERSION}.tar.gz

echo ""
echo "=========================================="
echo "✅ Runner downloaded successfully!"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Go to your GitHub repository:"
echo "   https://github.com/anandibhat/world-time-app/settings/actions/runners/new"
echo ""
echo "2. Select 'macOS' as the runner type"
echo ""
echo "3. Copy the configuration command that looks like:"
echo "   ./config.sh --url https://github.com/anandibhat/world-time-app --token <YOUR_TOKEN>"
echo ""
echo "4. Run it in this directory: $RUNNER_DIR"
echo ""
echo "5. When prompted:"
echo "   - Runner name: press Enter (default)"
echo "   - Runner group: press Enter (default)"
echo "   - Labels: press Enter (default)"
echo "   - Work folder: press Enter (default)"
echo ""
echo "6. Start the runner:"
echo "   cd $RUNNER_DIR"
echo "   ./run.sh"
echo ""
echo "Or install as a service (recommended):"
echo "   cd $RUNNER_DIR"
echo "   sudo ./svc.sh install"
echo "   sudo ./svc.sh start"
echo ""
echo "=========================================="
