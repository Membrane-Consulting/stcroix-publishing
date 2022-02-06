# St. Croix Publishing

Monorepo for St. Croix Publishing custom tools

## Getting Started

Ensure you have pnpm installed on your machine. Clone the monorepo and install dependencies for all workspaces...

```shell
git clone https://github.com/stordahl/stcroix-publishing.git

pnpm run install:all
```

## Development

To run all dev serves for all workspaces, run this from the root of the project...

```shell
pnpm run dev

# Run just SvelteKit Front End
# pnpm run ui:dev

# Run just Sanity Studio
# pnpm run studio:dev
```