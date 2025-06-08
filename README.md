**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Deployment to AWS ECS

This project is configured to automatically build, push, and deploy to Amazon ECS when changes are pushed to the main branch.

### Deployment Process

1. When code is pushed to the main branch, a GitHub Actions workflow is triggered
2. The workflow builds a Docker image of the application
3. The image is pushed to Amazon ECR (Elastic Container Registry)
4. The application is deployed to Amazon ECS (Elastic Container Service)

### Deployment Files

- `Dockerfile` - Defines how the application is containerized
- `.github/workflows/deploy.yml` - GitHub Actions workflow for CI/CD
- `.aws/task-definition.json` - ECS task definition

### Manual Deployment

You can also manually trigger the deployment workflow from the GitHub Actions tab by clicking "Run workflow".

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Docker
- GitHub Actions
- AWS ECS
