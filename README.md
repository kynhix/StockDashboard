# Stock Dashboard

This project is for class CMPSC 445.

## Setup

You must follow instructions to setup both dev servers to run the project.

### Frontend

To setup the frontend, make sure that you have Node installed and `npm`. If you are using `nvm` or a Node Version Manager, make sure to run `nvm use`. It is recommended you use Node version 24.10.0

Navigate to `/dashboard` directory and run:

```bash
npm install --save-dev
```

This will install all the necessary dependencies to run the project.

Once all the dependencies are installed, you can run:

```bash
npm run dev
```

This will startup the dev server at <http://localhost:3000>

### Backend

Make sure you have Python 3 installed on your machine.

In a **separate terminal** from the frontend server,
navigate to the `/scripts` directory and run:

```bash
pip install -r requirements.txt
```

This will install all the necessary dependencies to run the server.

Run the following command to startup the server:

```bash
python server.py
```

This will startup the dev server at <http://localhost:8000>

### Accessing the Application

Once you have started up both dev servers, you can navigate to
<http://localhost:3000> in a web browser to access the app.

### Running Cypress Tests

Follow the instructions to startup the frontend dev server. Once the dev server
is up, run the following command in a new terminal:

```bash
npx cypress open
```

Select `e2e tests`, then click the dashboard.spec.ts
