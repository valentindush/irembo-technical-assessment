# RICA Import Permit

RICA Import Permit Application form **IREMBO TECHNICAL ASSESSMENT**[Jan 31st 2025].
 Below are the steps to set up and run the project locally using `pnpm`, `npm`, `yarn`, or Docker.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (optional)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [yarn](https://yarnpkg.com/) (optional)
- [Docker](https://www.docker.com/) (optional, for Docker setup)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/valentindush/<thisrepo>.git
cd <this-repo>
```

---

### 2. Install Dependencies

You can use `pnpm`, `npm`, or `yarn` to install dependencies.

#### Using `pnpm`

```bash
pnpm install
```

#### Using `npm`

```bash
npm install
```

#### Using `yarn`

```bash
yarn install
```

---

### 3. Run the Development Server

Start the development server to preview the application.

#### Using `pnpm`

```bash
pnpm dev
```

#### Using `npm`

```bash
npm run dev
```

#### Using `yarn`

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

---

### 4. Build the Project

To build the project for production, run:

#### Using `pnpm`

```bash
pnpm build
```

#### Using `npm`

```bash
npm run build
```

#### Using `yarn`

```bash
yarn build
```

---

### 5. Start the Production Server

After building the project, start the production server:

#### Using `pnpm`

```bash
pnpm start
```

#### Using `npm`

```bash
npm start
```

#### Using `yarn`

```bash
yarn start
```

The production application will be available at `http://localhost:3000`.

---

## Running with Docker

If you prefer to run the project using Docker, follow these steps:

### 1. Build the Docker Image

```bash
docker build -t rica .
```

- `-t rica`: Tags the image with the name `rica`.

### 2. Run the Docker Container

```bash
docker run -p 3000:3000 rica
```

- `-p 3000:3000`: Maps port 3000 on your local machine to port 3000 in the container.

The application will be available at `http://localhost:3000`.

---

### 3. Using Docker Compose (Optional)

If you prefer to use Docker Compose, follow these steps:

1. Ensure you have a `docker-compose.yml` file in your project root.
2. Run the following command:

```bash
docker-compose up
```

The application will be available at `http://localhost:3003`.

---

## Environment Variables

To configure environment variables, create a `.env` file in the root of your project:

```plaintext
SENDGRID_API_KEY=<sendgrid_api_key>
SENDGRID_FROM_EMAIL=<email>
```

---

## Scripts

Here are the available scripts in the `package.json` file:

- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code issues.

---

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---
