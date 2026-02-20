# Self-Hosted GitHub Actions Runner Setup

This guide will help you set up a self-hosted GitHub Actions runner on your local machine to enable **full CI/CD automation** from code push to Kubernetes deployment.

## Why Self-Hosted Runner?

GitHub Actions runs in the cloud, but your Kubernetes cluster is local (Docker Desktop). A self-hosted runner:
- Runs on your local machine
- Has access to your local Kubernetes cluster
- Automatically deploys when code is pushed
- Creates a complete automated pipeline

## Complete Automated Flow

```
Developer Push → GitHub → Build Image → Docker Hub → Deploy to K8s
      ↓            ↓           ↓             ↓            ↓
   git push    Triggers    GitHub       Stores       Self-hosted
               Actions     Actions       Image        Runner
                          (Cloud)                  (Your Machine)
```

## Prerequisites

- ✅ Docker Desktop with Kubernetes enabled
- ✅ kubectl installed and working
- ✅ GitHub repository (already done)
- ✅ macOS (you're on this)

## Step-by-Step Setup

### Step 1: Run the Setup Script

```bash
./setup-runner.sh
```

This will:
- Download the GitHub Actions runner
- Extract it to `~/actions-runner`
- Show you next steps

### Step 2: Get Registration Token

1. Open your browser and go to:
   ```
   https://github.com/anandibhat/world-time-app/settings/actions/runners/new
   ```

2. Select **macOS** as the runner image

3. You'll see a configuration command like:
   ```bash
   ./config.sh --url https://github.com/anandibhat/world-time-app --token ABCDEFG...
   ```

### Step 3: Configure the Runner

```bash
cd ~/actions-runner

# Paste the config command from GitHub (from Step 2)
./config.sh --url https://github.com/anandibhat/world-time-app --token YOUR_TOKEN_HERE

# When prompted:
# - Runner name: [press Enter for default]
# - Runner group: [press Enter for default]
# - Labels: [press Enter for default]
# - Work folder: [press Enter for default]
```

### Step 4: Start the Runner

**Option A: Run in foreground (for testing)**
```bash
cd ~/actions-runner
./run.sh
```

Keep this terminal open. You'll see logs when jobs run.

**Option B: Install as a service (recommended for always-on)**
```bash
cd ~/actions-runner
sudo ./svc.sh install
sudo ./svc.sh start

# Check status
sudo ./svc.sh status

# Stop service
sudo ./svc.sh stop

# Uninstall service
sudo ./svc.sh uninstall
```

### Step 5: Verify in GitHub

1. Go to: https://github.com/anandibhat/world-time-app/settings/actions/runners
2. You should see your runner with a green "Idle" status

### Step 6: Test the Pipeline

Make any small change and push:

```bash
# Make a small change
echo "# Test" >> README.md

# Commit and push
git add README.md
git commit -m "Test auto-deployment"
git push
```

Watch the magic happen:
1. GitHub Actions builds the Docker image
2. Pushes to Docker Hub
3. Automatically triggers the deploy workflow
4. Your self-hosted runner deploys to local Kubernetes

## How It Works

### Workflow Trigger Chain

1. **`docker-build-push.yml`** (runs on GitHub's cloud runners)
   - Triggered by: code push
   - Checks code quality
   - Builds multi-platform image
   - Pushes to Docker Hub

2. **`deploy-to-k8s.yml`** (runs on YOUR self-hosted runner)
   - Triggered by: successful completion of build workflow
   - Pulls latest code
   - Deploys to your local Kubernetes
   - Restarts pods to pull new image
   - Verifies deployment

### Why This Works

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub (Cloud)                           │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Build Workflow (Cloud Runner)                     │     │
│  │  - Build image                                     │     │
│  │  - Push to Docker Hub                             │     │
│  └────────────────────────────────────────────────────┘     │
│                           ↓                                  │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Deploy Workflow (Self-Hosted Runner)              │←────┼─── This runs on
│  │  - kubectl apply                                   │     │    YOUR machine
│  │  - Has access to local K8s                        │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
              ┌──────────────────────────┐
              │   Local Kubernetes       │
              │   (Docker Desktop)       │
              └──────────────────────────┘
```

## Monitoring

### View Workflow Runs

https://github.com/anandibhat/world-time-app/actions

### View Runner Logs

If running in foreground:
- Logs appear in the terminal

If running as service:
```bash
# View logs
sudo journalctl -u actions.runner.* -f

# Or check the log files
cat ~/actions-runner/_diag/Runner_*.log
```

### View Kubernetes Status

```bash
kubectl get pods -l app=world-time-app
kubectl logs -l app=world-time-app --tail=50
```

## Troubleshooting

### Runner shows offline

```bash
cd ~/actions-runner
./run.sh
# Check for error messages
```

### Deployment fails

Check if kubectl works:
```bash
kubectl cluster-info
kubectl get nodes
```

### Can't access the app after deployment

```bash
kubectl get service world-time-app
# Should show localhost as EXTERNAL-IP
```

## Security Notes

- The runner has access to your local machine
- Only run runners for repositories you trust
- The runner can execute arbitrary code from your GitHub Actions workflows
- Consider using a dedicated user account for the runner

## Stopping/Removing the Runner

### Stop the runner

```bash
# If running in foreground: Ctrl+C

# If running as service:
cd ~/actions-runner
sudo ./svc.sh stop
```

### Remove the runner

```bash
cd ~/actions-runner

# Stop service (if running)
sudo ./svc.sh uninstall

# Remove from GitHub
./config.sh remove --token YOUR_REMOVAL_TOKEN

# Get removal token from:
# https://github.com/anandibhat/world-time-app/settings/actions/runners
```

## Next Steps

Once you verify this works locally, you can:
1. **Deploy to AWS EKS** - Use the same workflows with cloud runners
2. **Set up staging/production** - Different runners for different environments
3. **Add testing** - Run tests before deployment
4. **Add notifications** - Slack/Email on deployment success/failure

## Complete CI/CD Achieved! 🎉

With this setup, you have:
- ✅ Automated builds on every push
- ✅ Multi-platform Docker images
- ✅ Automated deployment to Kubernetes
- ✅ Zero manual intervention
- ✅ Production-ready DevOps pipeline
