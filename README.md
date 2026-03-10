# OneCap - E-Commerce Reconciliation Dashboard

## Overview
OneCap is a comprehensive web application designed for financial reconciliation, specifically tailored for E-Commerce, Revenue, Ledger, and Bank reconciliation processes. The platform features an interactive dashboard, data management capabilities, and "Conversational Insights" for AI-assisted data analysis. 

## Features
- **Dashboard**: High-level overview of reconciliation metrics and system status.
- **Data Management**: Upload, view, and manage reconciliation data.
- **Conversational Insights**: Advanced AI-driven insights into financial data.
- **Reconciliation Modules**: Dedicated workflows for E-Commerce, Revenue, Ledger, and Bank reconciliations.
- **Job Details**: Granular views into specific reconciliation jobs.
- **Admin Portal & Settings**: Configure application parameters and manage user access.

## Tech Stack

### Frontend
- **Framework**: React 19 / Create React App (via Craco)
- **Styling**: Tailwind CSS with Shadcn UI (Radix UI primitives)
- **Routing**: React Router DOM (v7)
- **Forms & Validation**: React Hook Form, Zod
- **Data Visualization**: Recharts
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python)
- **API Server**: Uvicorn
- **Database**: MongoDB (motor for async IO operations)
- **Data Validation**: Pydantic
- **Environment Management**: python-dotenv

## Project Structure
```text
E-Com-/
├── backend/
│   ├── requirements.txt      # Python dependencies
│   ├── server.py             # FastAPI entry point
│   └── .env                  # Environment configuration (needs to be created)
├── frontend/
│   ├── package.json          # Node dependencies and scripts
│   ├── craco.config.js       # CRA configuration override
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   ├── public/               # Static assets
│   └── src/                  # React source code
│       ├── App.js            # Main application component and routing
│       ├── App.css           # Global styles
│       ├── components/       # Reusable React components
│       └── ...
└── tests/                    # Testing directory
└── test_result.md            # Required testing protocol communication file
```

## Getting Started

### Prerequisites
- Node.js & npm/yarn
- Python 3.8+
- MongoDB instance

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables (`.env` file):
   ```env
   MONGO_URL=your_mongodb_connection_string
   DB_NAME=your_database_name
   CORS_ORIGINS=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   uvicorn server:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables (`.env` file):
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```
4. Start the application:
   ```bash
   yarn start
   ```

## Development and Testing Protocol
The codebase includes a strict `test_result.md` testing protocol. When testing the application, both the main agents and testing agents must use `test_result.md` to establish testing sequences, track task statuses, and maintain the testing sequence to ensure reproducible and reliable quality assurance.
