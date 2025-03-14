FROM mcr.microsoft.com/devcontainers/typescript-node:20

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git-lfs \
    jq \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g @vercel/ncc typescript
