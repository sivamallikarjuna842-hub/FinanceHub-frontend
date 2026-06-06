# FinanceHub MERN Backend API Documentation

## Overview
This is the backend API structure for FinanceHub - a comprehensive personal finance management application built with MERN stack (MongoDB, Express, React, Node.js).

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **API Documentation**: Swagger/OpenAPI

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── auth.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   ├── budgetController.js
│   │   ├── accountController.js
│   │   ├── stockController.js
│   │   ├── cryptoController.js
│   │   └── loanController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Expense.js
│   │   ├── Budget.js
│   │   ├── Account.js
│   │   ├── Stock.js
│   │   ├── Cryptocurrency.js
│   │   └── Loan.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── expenses.js
│   │   ├── budgets.js
│   │   ├── accounts.js
│   │   ├── stocks.js
│   │   ├── cryptocurrencies.js
│   │   └── loans.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── validators.js
│   │   └── helpers.js
│   └── app.js
├── .env
├── .env.example
├── package.json
└── server.js
```

## Database Models

### User Model
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  avatar: String (URL),
  currency: String (default: USD),
  timezone: String,
  preferences: {
    theme: String,
    notifications: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  description: String,
  amount: Number,
  category: String,
  date: Date,
  paymentMethod: String,
  tags: [String],
  receipt: String (URL),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Budget Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  category: String,
  limit: Number,
  spent: Number,
  period: String (monthly/yearly),
  month: Date,
  alerts: {
    enabled: Boolean,
    threshold: Number (percentage)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Account Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  type: String (checking/savings/credit),
  balance: Number,
  currency: String,
  bankName: String,
  accountNumber: String (masked),
  interestRate: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Stock Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  symbol: String,
  name: String,
  quantity: Number,
  purchasePrice: Number,
  currentPrice: Number,
  purchaseDate: Date,
  broker: String,
  sector: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Cryptocurrency Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  symbol: String,
  name: String,
  quantity: Number,
  purchasePrice: Number,
  currentPrice: Number,
  purchaseDate: Date,
  exchange: String,
  walletAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Loan Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  lender: String,
  amount: Number,
  loanAmount: Number,
  interestRate: Number,
  monthlyPayment: Number,
  remainingMonths: Number,
  startDate: Date,
  endDate: Date,
  type: String (mortgage/personal/auto/student/credit),
  status: String (active/paid/default),
  payments: [{
    date: Date,
    amount: Number,
    principalPayment: Number,
    interestPayment: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Routes

#### POST /api/auth/register
Register a new user
```
Request: {
  firstName: String,
  lastName: String,
  email: String,
  password: String
}
Response: {
  token: String,
  user: UserObject
}
```

#### POST /api/auth/login
User login
```
Request: {
  email: String,
  password: String
}
Response: {
  token: String,
  user: UserObject
}
```

#### POST /api/auth/refresh
Refresh JWT token
```
Response: {
  token: String
}
```

#### GET /api/auth/profile
Get current user profile (requires auth)
```
Response: UserObject
```

#### PUT /api/auth/profile
Update user profile (requires auth)
```
Request: {
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  currency: String,
  timezone: String
}
Response: UserObject
```

---

### Expense Routes

#### GET /api/expenses
Get all user expenses (requires auth)
```
Query Parameters:
  - page: Number (default: 1)
  - limit: Number (default: 10)
  - category: String (optional filter)
  - startDate: Date (optional)
  - endDate: Date (optional)

Response: {
  expenses: [ExpenseObject],
  total: Number,
  page: Number,
  pages: Number
}
```

#### GET /api/expenses/:id
Get expense by ID
```
Response: ExpenseObject
```

#### POST /api/expenses
Create new expense (requires auth)
```
Request: {
  description: String,
  amount: Number,
  category: String,
  date: Date,
  paymentMethod: String,
  tags: [String],
  notes: String
}
Response: ExpenseObject
```

#### PUT /api/expenses/:id
Update expense (requires auth)
```
Request: Same as POST
Response: ExpenseObject
```

#### DELETE /api/expenses/:id
Delete expense (requires auth)
```
Response: { message: "Expense deleted" }
```

#### GET /api/expenses/analytics/summary
Get expense analytics
```
Query Parameters:
  - period: String (week/month/year)

Response: {
  totalExpenses: Number,
  averageExpense: Number,
  categoryBreakdown: {
    category: Number
  },
  trendData: [{
    date: Date,
    amount: Number
  }]
}
```

---

### Budget Routes

#### GET /api/budgets
Get all user budgets (requires auth)
```
Query Parameters:
  - period: String (monthly/yearly)

Response: [BudgetObject]
```

#### POST /api/budgets
Create new budget (requires auth)
```
Request: {
  category: String,
  limit: Number,
  period: String,
  alerts: {
    enabled: Boolean,
    threshold: Number
  }
}
Response: BudgetObject
```

#### PUT /api/budgets/:id
Update budget (requires auth)
```
Request: Same as POST
Response: BudgetObject
```

#### DELETE /api/budgets/:id
Delete budget (requires auth)
```
Response: { message: "Budget deleted" }
```

#### GET /api/budgets/analysis
Get budget analysis
```
Response: {
  totalBudget: Number,
  totalSpent: Number,
  remainingBudget: Number,
  budgets: [{
    category: String,
    limit: Number,
    spent: Number,
    percentage: Number,
    status: String
  }]
}
```

---

### Account Routes

#### GET /api/accounts
Get all user accounts (requires auth)
```
Response: [AccountObject]
```

#### POST /api/accounts
Create new account (requires auth)
```
Request: {
  name: String,
  type: String,
  balance: Number,
  currency: String,
  bankName: String,
  accountNumber: String,
  interestRate: Number
}
Response: AccountObject
```

#### PUT /api/accounts/:id
Update account (requires auth)
```
Request: Same as POST
Response: AccountObject
```

#### DELETE /api/accounts/:id
Delete account (requires auth)
```
Response: { message: "Account deleted" }
```

#### GET /api/accounts/summary
Get accounts summary
```
Response: {
  totalAssets: Number,
  totalLiabilities: Number,
  netWorth: Number,
  accounts: [AccountObject]
}
```

---

### Stock Routes

#### GET /api/stocks
Get all user stocks (requires auth)
```
Query Parameters:
  - page: Number
  - limit: Number

Response: {
  stocks: [StockObject],
  total: Number,
  portfolioMetrics: {
    totalInvested: Number,
    totalCurrent: Number,
    totalGain: Number,
    gainPercentage: Number
  }
}
```

#### POST /api/stocks
Create new stock position (requires auth)
```
Request: {
  symbol: String,
  name: String,
  quantity: Number,
  purchasePrice: Number,
  currentPrice: Number,
  purchaseDate: Date,
  broker: String,
  sector: String
}
Response: StockObject
```

#### PUT /api/stocks/:id
Update stock position (requires auth)
```
Request: Same as POST
Response: StockObject
```

#### DELETE /api/stocks/:id
Delete stock position (requires auth)
```
Response: { message: "Stock deleted" }
```

#### GET /api/stocks/:symbol/quote
Get current stock quote
```
Response: {
  symbol: String,
  price: Number,
  change: Number,
  changePercent: Number,
  updated: Date
}
```

#### GET /api/stocks/performance
Get portfolio performance
```
Response: {
  totalReturn: Number,
  totalReturnPercent: Number,
  topPerformers: [StockObject],
  worstPerformers: [StockObject],
  performanceChart: [{
    date: Date,
    value: Number
  }]
}
```

---

### Cryptocurrency Routes

#### GET /api/crypto
Get all user crypto holdings (requires auth)
```
Response: {
  holdings: [CryptocurrencyObject],
  portfolioValue: Number,
  totalGain: Number,
  gainPercentage: Number
}
```

#### POST /api/crypto
Add crypto holding (requires auth)
```
Request: {
  symbol: String,
  name: String,
  quantity: Number,
  purchasePrice: Number,
  currentPrice: Number,
  purchaseDate: Date,
  exchange: String,
  walletAddress: String
}
Response: CryptocurrencyObject
```

#### PUT /api/crypto/:id
Update crypto holding (requires auth)
```
Request: Same as POST
Response: CryptocurrencyObject
```

#### DELETE /api/crypto/:id
Delete crypto holding (requires auth)
```
Response: { message: "Cryptocurrency deleted" }
```

#### GET /api/crypto/market/top
Get top cryptocurrencies
```
Response: [{
  rank: Number,
  symbol: String,
  name: String,
  price: Number,
  change24h: Number,
  marketCap: Number,
  volume: Number
}]
```

#### GET /api/crypto/:symbol/price
Get crypto price history
```
Query Parameters:
  - period: String (1h/24h/7d/30d)

Response: [{
  timestamp: Date,
  price: Number
}]
```

---

### Loan Routes

#### GET /api/loans
Get all user loans (requires auth)
```
Response: [LoanObject]
```

#### POST /api/loans
Create new loan (requires auth)
```
Request: {
  name: String,
  lender: String,
  amount: Number,
  interestRate: Number,
  monthlyPayment: Number,
  remainingMonths: Number,
  startDate: Date,
  type: String,
  endDate: Date
}
Response: LoanObject
```

#### PUT /api/loans/:id
Update loan (requires auth)
```
Request: Same as POST
Response: LoanObject
```

#### DELETE /api/loans/:id
Delete loan (requires auth)
```
Response: { message: "Loan deleted" }
```

#### POST /api/loans/:id/payment
Record loan payment (requires auth)
```
Request: {
  amount: Number,
  date: Date
}
Response: LoanObject
```

#### GET /api/loans/analysis
Get loan analysis
```
Response: {
  totalDebt: Number,
  totalMonthlyPayment: Number,
  averageInterestRate: Number,
  payoffStrategy: {
    snowball: [{
      order: Number,
      loanId: String,
      months: Number
    }],
    avalanche: [{
      order: Number,
      loanId: String,
      months: Number
    }]
  },
  totalInterestCost: Number,
  payoffTimeline: Date
}
```

---

## Error Responses

All error responses follow this format:
```
{
  status: Number,
  message: String,
  errors: [{
    field: String,
    message: String
  }]
}
```

### Common Status Codes
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Server Error

---

## Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

Tokens expire after 24 hours. Use the refresh endpoint to get a new token.

---

## Rate Limiting

API endpoints are rate limited:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated requests

---

## Installation & Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

### Environment Variables
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/financehub
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

---

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- expenses.test.js
```

---

## Deployment

### Docker
```bash
docker build -t financehub-backend .
docker run -p 5000:5000 financehub-backend
```

### Heroku
```bash
heroku login
heroku create financehub-backend
git push heroku main
```

### AWS/Azure/GCP
Follow platform-specific deployment guides with environment variables configured.

---

## API Security

- All passwords are hashed using bcrypt
- JWTs are signed with a secret key
- CORS is configured for frontend domain
- SQL Injection prevention with Mongoose
- XSS protection with input sanitization
- Rate limiting implemented
- HTTPS required for production

---

## Development

### Code Style
- ESLint configuration for consistent code style
- Prettier for code formatting
- Pre-commit hooks to ensure quality

### Debugging
```bash
# Enable debug logs
DEBUG=app:* npm run dev
```

---

## Support & Documentation

For API documentation: Visit `/api/docs` for Swagger UI
For issues: Create GitHub issue with detailed description
For security: Email security@financehub.app

---

## License

MIT License - See LICENSE file for details
