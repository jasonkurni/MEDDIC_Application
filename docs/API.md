# MEDDIC Deal Health Check - API Documentation

## Base URL
```
http://localhost:3001/api
```

## Endpoints

### Health Check
Check if the server is running.

**GET** `/api/health`

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

### Get All Deals
Retrieve all deals from the database.

**GET** `/api/deals`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "company_name": "Acme Corp",
      "opportunity_description": "Cloud migration project",
      "why_ibm": "Best cloud infrastructure",
      "project_name": "Cloud Transform 2026",
      "business_owner": "John Doe",
      "close_date": "2026-08-15",
      "value_usd": 250000,
      "metric": "Reduce costs by 30%",
      "economic_buyer": "CTO John Smith",
      "decision_criteria": "Cost, reliability, support",
      "decision_process": "Board approval required",
      "identified_pain": "High infrastructure costs",
      "champion": "Jane Smith, IT Director",
      "competition": "AWS, Azure",
      "next_actions": "Schedule demo with CTO",
      "action_date": "2026-07-01",
      "action_owner": "Sales Rep",
      "created_at": "2026-06-01T10:30:00Z",
      "updated_at": "2026-06-01T10:30:00Z"
    }
  ],
  "count": 1
}
```

---

### Get Single Deal
Retrieve a specific deal by ID.

**GET** `/api/deals/:id`

**Parameters:**
- `id` (path parameter) - Deal ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "company_name": "Acme Corp",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Deal not found"
}
```

---

### Create Deal
Create a new deal.

**POST** `/api/deals`

**Request Body:**
```json
{
  "company_name": "Tech Solutions Inc",
  "opportunity_description": "AI implementation",
  "why_ibm": "Leading AI technology",
  "project_name": "AI Transform",
  "business_owner": "Sarah Johnson",
  "close_date": "2026-09-30",
  "value_usd": 500000,
  "metric": "Increase efficiency by 40%",
  "economic_buyer": "CFO Sarah Johnson",
  "decision_criteria": "ROI, implementation time",
  "decision_process": "Executive committee approval",
  "identified_pain": "Manual processes",
  "champion": "Mike Brown, VP Operations",
  "competition": "Google Cloud, Microsoft",
  "next_actions": "Prepare ROI analysis",
  "action_date": "2026-07-15",
  "action_owner": "Account Manager"
}
```

**Required Fields:**
- `company_name` (string)

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "company_name": "Tech Solutions Inc",
    ...
  },
  "message": "Deal created successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Company name is required"
}
```

---

### Update Deal
Update an existing deal.

**PUT** `/api/deals/:id`

**Parameters:**
- `id` (path parameter) - Deal ID

**Request Body:**
Same as Create Deal (all fields optional except `company_name`)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "company_name": "Acme Corporation",
    ...
  },
  "message": "Deal updated successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Deal not found"
}
```

---

### Delete Deal
Delete a deal.

**DELETE** `/api/deals/:id`

**Parameters:**
- `id` (path parameter) - Deal ID

**Response:**
```json
{
  "success": true,
  "message": "Deal deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Deal not found"
}
```

---

### Search Deals
Search for deals by company name, description, or project name.

**GET** `/api/deals/search?q=query`

**Query Parameters:**
- `q` (required) - Search query string

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "company_name": "Acme Corp",
      ...
    }
  ],
  "count": 1
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Search query is required"
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## Data Types

### Deal Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | integer | auto | Unique identifier |
| company_name | string | yes | Company name |
| opportunity_description | string | no | Description of the opportunity |
| why_ibm | string | no | Why IBM is the right choice |
| project_name | string | no | Project name |
| business_owner | string | no | Business owner name |
| close_date | string (ISO 8601) | no | Expected close date |
| value_usd | number | no | Deal value in USD |
| metric | string | no | Quantifiable business outcomes |
| economic_buyer | string | no | Person with budget authority |
| decision_criteria | string | no | Decision-making criteria |
| decision_process | string | no | Decision-making process |
| identified_pain | string | no | Pain points being addressed |
| champion | string | no | Internal champion |
| competition | string | no | Competing vendors |
| next_actions | string | no | Next steps to close |
| action_date | string (ISO 8601) | no | Action item date |
| action_owner | string | no | Person responsible for action |
| created_at | string (ISO 8601) | auto | Creation timestamp |
| updated_at | string (ISO 8601) | auto | Last update timestamp |

---

## Examples

### Using cURL

**Get all deals:**
```bash
curl http://localhost:3001/api/deals
```

**Create a deal:**
```bash
curl -X POST http://localhost:3001/api/deals \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Example Corp",
    "value_usd": 100000,
    "close_date": "2026-12-31"
  }'
```

**Update a deal:**
```bash
curl -X PUT http://localhost:3001/api/deals/1 \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Example Corporation",
    "value_usd": 150000
  }'
```

**Delete a deal:**
```bash
curl -X DELETE http://localhost:3001/api/deals/1
```

**Search deals:**
```bash
curl "http://localhost:3001/api/deals/search?q=Acme"
```

---

## Notes

- All dates should be in ISO 8601 format (YYYY-MM-DD)
- Currency values are stored as numbers (no currency symbols)
- The API uses JSON for all request and response bodies
- CORS is enabled for localhost:3000 (frontend)
- All timestamps are in UTC