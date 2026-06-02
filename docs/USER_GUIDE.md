# MEDDIC Deal Health Check - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Creating a New Deal](#creating-a-new-deal)
4. [Viewing Deal Details](#viewing-deal-details)
5. [Editing a Deal](#editing-a-deal)
6. [Deleting a Deal](#deleting-a-deal)
7. [Searching and Filtering](#searching-and-filtering)
8. [Exporting to PDF](#exporting-to-pdf)
9. [Understanding MEDDIC](#understanding-meddic)
10. [Tips and Best Practices](#tips-and-best-practices)

---

## Getting Started

### First Time Setup

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Initialize Database**
   ```bash
   npm run init-db
   ```

3. **Start the Application**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Open your browser and navigate to: `http://localhost:3000`
   - The backend API runs on: `http://localhost:3001`

---

## Dashboard Overview

The Dashboard is your main view for managing all deals. It displays:

- **Search Bar**: Quickly find deals by company name, description, or project
- **Deal Cards**: Visual representation of each deal with key information
- **New Deal Button**: Create a new deal (top right corner)

### Deal Card Information

Each deal card shows:
- Company name
- Opportunity description
- Deal value (USD)
- Expected close date
- MEDDIC score (visual progress bar)
- Action buttons (View Details, Delete)

### MEDDIC Score Indicator

The colored progress bar shows deal qualification health:
- **Green (80-100%)**: Strong - Most MEDDIC fields completed
- **Yellow (50-79%)**: Moderate - Some MEDDIC fields need attention
- **Red (0-49%)**: Weak - Many MEDDIC fields missing

---

## Creating a New Deal

1. Click the **"+ New Deal"** button in the header
2. Fill in the deal information (see sections below)
3. Click **"Create Deal"** to save

### Required Fields
- **Company Name**: The only required field

### Basic Information Section

- **Company Name** *(required)*: Name of the prospect company
- **Opportunity Description**: Brief description of the opportunity
- **Why IBM - Differentiators**: What makes IBM the right choice
- **Project Name**: Internal project name
- **Business Owner**: Name of the business owner
- **Close Date**: Expected deal close date
- **Value (US$ Net)**: Deal value in US dollars

### MEDDIC Qualification Section

Complete these fields to improve your deal qualification score:

- **Metric**: Quantifiable business outcomes (e.g., "Reduce costs by 30%")
- **Economic Buyer**: Person with budget authority
- **Decision Criteria**: Criteria used to make the decision
- **Decision Process**: How the decision will be made
- **Identified Pain**: Pain points being addressed
- **Champion**: Your internal advocate
- **Competition**: Competing vendors or solutions

### Action Items Section

- **Next Actions and Steps to Close**: What needs to happen next
- **Action Date**: When the action should be completed
- **Action Owner**: Who is responsible

---

## Viewing Deal Details

1. From the Dashboard, click **"View Details"** on any deal card
2. The deal detail page shows all information in an organized layout
3. Use the **"Export PDF"** button to generate a report
4. Click **"← Back to Dashboard"** to return to the main view

---

## Editing a Deal

1. Navigate to the deal detail page
2. Modify any fields as needed
3. Click **"Update Deal"** to save changes
4. A confirmation message will appear

### Auto-Save
- Changes are only saved when you click "Update Deal"
- If you navigate away without saving, changes will be lost
- The browser will warn you if you have unsaved changes

---

## Deleting a Deal

### From Dashboard
1. Click the **"Delete"** button on a deal card
2. Confirm the deletion in the popup dialog

### From Deal Detail Page
1. Click the **"Delete Deal"** button (bottom left)
2. Confirm the deletion in the popup dialog

**⚠️ Warning**: Deletion is permanent and cannot be undone!

---

## Searching and Filtering

### Search Functionality

The search bar at the top of the Dashboard allows you to:
- Search by company name
- Search by opportunity description
- Search by project name

**How to Search:**
1. Type your query in the search box
2. Results update automatically as you type
3. Clear the search box to see all deals again

### Search Tips
- Search is case-insensitive
- Partial matches are supported (e.g., "Acme" will find "Acme Corp")
- Use specific terms for better results

---

## Exporting to PDF

Generate professional PDF reports for any deal:

1. Open the deal detail page
2. Click the **"Export PDF"** button (top right)
3. The PDF will download automatically

### PDF Contents

The exported PDF includes:
- Company header with deal name
- Basic Information table
- Complete MEDDIC qualification details
- Action items and next steps
- Generation timestamp
- Page numbers

### PDF Filename
Format: `CompanyName_MEDDIC_Report.pdf`

---

## Understanding MEDDIC

MEDDIC is a sales qualification framework that helps assess deal health.

### The MEDDIC Framework

**M - Metrics**
- What are the quantifiable business outcomes?
- Example: "Reduce operational costs by 25%"

**E - Economic Buyer**
- Who has the budget authority?
- Who can sign the contract?

**D - Decision Criteria**
- What criteria will be used to make the decision?
- What are the must-haves vs. nice-to-haves?

**D - Decision Process**
- What is the formal decision-making process?
- Who needs to approve? What are the steps?

**I - Identify Pain**
- What specific pain points are we addressing?
- Why is this important now?

**C - Champion**
- Who is our internal advocate?
- Who will sell on our behalf when we're not there?

### Additional Field: Competition
- Who are we competing against?
- What are their strengths and weaknesses?

---

## Tips and Best Practices

### Data Entry Best Practices

1. **Be Specific**: Use concrete details rather than vague descriptions
2. **Update Regularly**: Keep deal information current
3. **Complete MEDDIC Fields**: Higher scores indicate better-qualified deals
4. **Set Realistic Dates**: Use accurate close dates for better forecasting
5. **Track Actions**: Always document next steps and owners

### Deal Management Tips

1. **Review Weekly**: Check all deals weekly to update status
2. **Focus on Weak Deals**: Prioritize deals with low MEDDIC scores
3. **Document Everything**: Use the description fields to capture important details
4. **Export Reports**: Generate PDFs before important meetings
5. **Clean Up**: Delete old or lost deals to keep the dashboard relevant

### MEDDIC Qualification Tips

1. **Start Early**: Begin MEDDIC qualification as soon as possible
2. **Validate Information**: Confirm details with multiple sources
3. **Identify Gaps**: Use the score to identify missing information
4. **Champion is Critical**: A strong champion significantly increases win rates
5. **Economic Buyer Access**: Direct access to the economic buyer is essential

### Search Efficiency

1. **Use Keywords**: Search for unique terms to find deals quickly
2. **Company Names**: Most reliable search term
3. **Regular Cleanup**: Remove old deals to improve search results

---

## Keyboard Shortcuts

- **Ctrl/Cmd + Click** on deal card: Open in new tab
- **Escape**: Close modals and dialogs
- **Tab**: Navigate through form fields
- **Enter**: Submit forms (when focused on a button)

---

## Troubleshooting

### Application Won't Start

**Problem**: Error when running `npm run dev`

**Solutions**:
1. Ensure all dependencies are installed: `npm run install-all`
2. Check that ports 3000 and 3001 are available
3. Initialize the database: `npm run init-db`

### Data Not Saving

**Problem**: Changes aren't being saved

**Solutions**:
1. Check that the backend server is running (port 3001)
2. Look for error messages in the browser console
3. Ensure required fields are filled (Company Name)
4. Check your internet connection (if applicable)

### Search Not Working

**Problem**: Search returns no results

**Solutions**:
1. Check spelling and try different keywords
2. Clear the search box to see all deals
3. Verify deals exist in the database

### PDF Export Issues

**Problem**: PDF won't download or is blank

**Solutions**:
1. Ensure the deal has data to export
2. Check browser popup blocker settings
3. Try a different browser
4. Check browser console for errors

---

## Data Backup

### Manual Backup

The database file is located at:
```
server/database/meddic.db
```

To backup:
1. Stop the application
2. Copy the `meddic.db` file to a safe location
3. Restart the application

### Restore from Backup

1. Stop the application
2. Replace `server/database/meddic.db` with your backup file
3. Restart the application

---

## Support

For technical issues or questions:
1. Check this user guide
2. Review the [API Documentation](./API.md)
3. Check the [Technical Architecture](../TECHNICAL_ARCHITECTURE.md)
4. Contact your system administrator

---

## Glossary

- **Deal**: A sales opportunity being tracked
- **MEDDIC**: Sales qualification framework
- **Economic Buyer**: Person with budget authority
- **Champion**: Internal advocate for your solution
- **Close Date**: Expected date when deal will close
- **Deal Value**: Total contract value in USD
- **MEDDIC Score**: Percentage of MEDDIC fields completed

---

## Version History

- **v1.0.0** - Initial release
  - Full CRUD operations
  - MEDDIC qualification tracking
  - PDF export functionality
  - Search and filter capabilities

---

**Last Updated**: June 2026