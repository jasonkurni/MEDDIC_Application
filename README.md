# MEDDIC Deal Health Check Application

A modern web-based MEDDIC qualification tracker that replicates Excel spreadsheet functionality with a clean, professional UI.

## 📋 Overview

This application helps sales teams track and manage deal health using the MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion) qualification framework. It provides an intuitive interface for creating, managing, and analyzing sales opportunities.

## ✨ Features

- **Deal Management**: Full CRUD operations for deal tracking
- **MEDDIC Framework**: Structured fields for all MEDDIC components
- **Search & Filter**: Quickly find deals by company name, value, or date
- **PDF Export**: Generate professional PDF reports for any deal
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Clean UI**: Spreadsheet-inspired layout for familiar user experience
- **Local Storage**: SQLite database for reliable data persistence

## 🛠️ Technology Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)
- React Hook Form (form management)
- jsPDF (PDF generation)

### Backend
- Node.js 18+
- Express.js
- SQLite3 (database)
- CORS middleware

## 📁 Project Structure

```
MEDDIC_Application/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript definitions
│   │   ├── utils/          # Utility functions
│   │   └── hooks/          # Custom React hooks
│   └── package.json
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Express middleware
│   └── package.json
│
├── docs/                   # Documentation
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── API.md
│   └── USER_GUIDE.md
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. **Navigate to the project directory:**
```bash
cd /Users/jasonkurniawan/Documents/Bob/MEDDIC_Application
```

2. **Install all dependencies (root, client, and server):**
```bash
npm run install-all
```

3. **Initialize the database:**
```bash
npm run init-db
```
This creates the SQLite database with the schema and sample data.

4. **Start the application:**
```bash
npm run dev
```
This starts both the frontend and backend servers concurrently.

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### Quick Start (Alternative)

If you prefer to run servers separately:

```bash
# Terminal 1 - Start backend
npm run server

# Terminal 2 - Start frontend
npm run client
```

## 📖 Documentation

- **[Technical Architecture](./TECHNICAL_ARCHITECTURE.md)** - Detailed system design and architecture
- **[Implementation Plan](./IMPLEMENTATION_PLAN.md)** - Step-by-step development checklist
- **[API Documentation](./docs/API.md)** - API endpoints and usage (to be created)
- **[User Guide](./docs/USER_GUIDE.md)** - End-user documentation (to be created)

## 🎯 Core Functionality

### Deal Fields

**Basic Information:**
- Company Name
- Opportunity Description
- Why IBM - Differentiators
- Project Name / Business Owner
- Close Date
- Value (US$ Net)

**MEDDIC Qualification:**
- Metric
- Economic Buyer
- Decision Criteria
- Decision Process
- Identified Pain
- Champion
- Competition

**Action Items:**
- Next Actions and steps to close
- Action Date
- Action Owner

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run client           # Start frontend only
npm run server           # Start backend only

# Database
npm run init-db          # Initialize database with schema
npm run backup-db        # Backup database (to be implemented)

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

## 🗄️ Database Schema

The application uses SQLite with a single `deals` table containing all deal information:

```sql
CREATE TABLE deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    opportunity_description TEXT,
    why_ibm TEXT,
    project_name TEXT,
    business_owner TEXT,
    close_date TEXT,
    value_usd REAL,
    metric TEXT,
    economic_buyer TEXT,
    decision_criteria TEXT,
    decision_process TEXT,
    identified_pain TEXT,
    champion TEXT,
    competition TEXT,
    next_actions TEXT,
    action_date TEXT,
    action_owner TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

```
GET    /api/deals              # Get all deals
GET    /api/deals/:id          # Get single deal
POST   /api/deals              # Create new deal
PUT    /api/deals/:id          # Update deal
DELETE /api/deals/:id          # Delete deal
GET    /api/deals/search?q=    # Search deals
```

## 🎨 UI Features

- **Dashboard**: Overview of all deals with search and filter
- **Deal Cards**: Visual representation of deal status
- **Deal Form**: Comprehensive form for all MEDDIC fields
- **PDF Export**: Professional PDF generation for reporting
- **Responsive Design**: Mobile-friendly interface
- **Loading States**: Clear feedback during operations
- **Error Handling**: User-friendly error messages

## 🔒 Security

- Input validation on all forms
- SQL injection prevention with parameterized queries
- XSS protection through React's built-in escaping
- CORS configured for localhost only
- Error messages don't expose sensitive information

## 🚧 Development Status

✅ **MVP Complete!** All core features have been implemented and are ready to use.

## 📝 Implementation Phases

1. **Phase 1**: Project Setup & Infrastructure (6 hours)
2. **Phase 2**: Backend API Development (8 hours)
3. **Phase 3**: Frontend Core Components (8 hours)
4. **Phase 4**: Dashboard & Deal List (7 hours)
5. **Phase 5**: Deal Form & CRUD Operations (8 hours)
6. **Phase 6**: PDF Export & Polish (7 hours)
7. **Phase 7**: Documentation & Testing (6 hours)

**Total Estimated Time**: ~50 hours

## 🎯 Success Criteria

- ✅ All CRUD operations work reliably
- ✅ Search and filter return accurate results
- ✅ PDF export generates professional documents
- ✅ UI is clean and matches spreadsheet layout
- ✅ Application starts with single command
- ✅ No data loss during normal operations
- ✅ Responsive design works on common screen sizes

## 🔮 Future Enhancements

- Multi-user support with authentication
- Automatic MEDDIC score calculation
- Analytics dashboard with charts
- Email notifications for close dates
- File attachments per deal
- Activity log for tracking changes
- Excel import functionality
- Cloud sync capabilities
- Mobile native apps
- CRM system integration

## 📄 License

This project is for internal use.

## 👥 Support

For questions or issues, please refer to the documentation or contact the development team.

---

**Note**: This is a single-user, localhost application designed for local development and use. For production deployment with multiple users, additional features like authentication and cloud hosting would be required.