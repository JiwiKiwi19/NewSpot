# How to Push New Code to the GitHub Repository

Follow these steps to push your changes to the repository:

## Prerequisites

Ensure you have the following installed and set up:
- [Git](https://git-scm.com/downloads)
- A GitHub account with access to the repository
- SSH or HTTPS access to the repository

## Steps to Push Code

### 1. Clone the Repository (If Not Already Cloned)
If you haven't already cloned the repository, use the following command:

**Using HTTPS:**
```bash
git clone https://github.com/your-username/your-repo.git
```

**Using SSH:**
```bash
git clone git@github.com:your-username/your-repo.git
```

Navigate to the project folder:
```bash
cd your-repo
```

---

### 2. Create a New Branch
Before making changes, create a new branch:
```bash
git checkout -b feature-branch-name
```

---

### 3. Make Changes and Commit
After making your changes, stage and commit them:

1. Stage all changes:
   ```bash
   git add .
   ```

2. Commit the changes with a descriptive message:
   ```bash
   git commit -m "Describe your changes here"
   ```

---

### 4. Push Changes to GitHub
Push the changes to the remote repository:
```bash
git push origin feature-branch-name
```

---

### 5. Create a Pull Request
1. Go to your repository on GitHub.
2. Navigate to the **Pull Requests** tab.
3. Click **New Pull Request**.
4. Select your branch and compare it with the `main` or `development` branch.
5. Add a title and description.
6. Click **Create Pull Request**.

---

### 6. Code Review and Merging
- Wait for the maintainers to review your code.
- Once approved, your changes will be merged.
- You may need to update your local branch before merging.

```bash
git pull origin main
```

---

### 7. Keeping Your Branch Updated
To keep your branch in sync with the latest changes from the main branch:

1. Switch to the main branch:
   ```bash
   git checkout main
   ```
2. Pull the latest changes:
   ```bash
   git pull origin main
   ```
3. Switch back to your branch and merge the updates:
   ```bash
   git checkout feature-branch-name
   git merge main
   ```

---

### 8. Deleting the Branch (Optional)
Once your changes are merged, you can delete your local and remote branch:

```bash
git branch -d feature-branch-name
```

```bash
git push origin --delete feature-branch-name
```

---

## Troubleshooting

- If you encounter merge conflicts, resolve them manually and commit the changes.
- If you face authentication issues, ensure your SSH key or access token is correctly set up.

---

Happy coding!

