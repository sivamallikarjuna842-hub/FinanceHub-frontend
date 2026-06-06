# FinanceHub - Quick Start Guide

Get up and running with FinanceHub in 5 minutes!

## What is FinanceHub?

FinanceHub is a comprehensive personal finance management system with these 5 modules:

1. **💰 Expense Tracker** - Track daily spending and categorize expenses
2. **📊 Finance Manager** - Manage accounts, budgets, and net worth
3. **📈 Stock Portfolio** - Monitor stock investments and performance
4. **₿ Crypto Dashboard** - Manage cryptocurrency holdings
5. **🏦 Loan Management** - Track loans and plan payoff strategies

## Frontend Setup (React + Vite)

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Navigate to `http://localhost:5173`
   - All 5 modules are immediately available!

### Build for production
```bash
npm run build
```

## Backend Setup (MERN)

### Prerequisites
- Node.js 18+
- MongoDB 5.0+ (local or cloud)

### Installation

1. **Create backend directory**
   ```bash
   mkdir financehub-backend
   cd financehub-backend
   ```

2. **Initialize and install**
   ```bash
   npm init -y
   npm install express mongoose dotenv cors joi bcryptjs jsonwebtoken
   npm install --save-dev nodemon
   ```

3. **Copy the backend files from documentation**
   - Refer to [BACKEND_SETUP.md](./BACKEND_SETUP.md)
   - Set up directory structure
   - Create environment files

4. **Create .env file**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/financehub
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

5. **Start MongoDB**
   ```bash
   mongod
   ```

6. **Start backend server**
   ```bash
   npm run dev
   ```
   - Server runs on `http://localhost:5000`

## Using FinanceHub

### Frontend Features (No Backend Required)

All 5 modules work with sample data:

#### 1. Expense Tracker
- View sample expenses
- Add new expenses with description, amount, category, date
- See spending trends and category breakdown
- Delete expenses

#### 2. Finance Manager
- View accounts (checking, savings, credit)
- Track net worth
- Monitor budgets by category
- View budget progress bars

#### 3. Stock Portfolio
- View sample stock holdings
- Add stocks with symbol, quantity, prices
- See portfolio value and gains/losses
- View top performers

#### 4. Crypto Dashboard
- View cryptocurrency holdings
- Add crypto positions
- See portfolio value in USD
- View market overview

#### 5. Loan Management
- View active loans
- Track loan payments
- Monitor payoff progress
- See payment schedules

### Sample Data

Each module comes with pre-populated sample data to explore features immediately.

## Navigation

The app has a sticky navigation bar with 5 tabs:
- 💰 Expense Tracker
- 📊 Finance Manager
- 📈 Stock Portfolio
- ₿ Crypto Dashboard
- 🏦 Loan Management

Click any tab to switch modules. All data is stored locally in memory.

## Features Overview

### 💰 Expense Tracker
```
✓ Add/edit/delete expenses
✓ Categorize by type (Food, Transport, etc.)
✓ View spending trends
✓ Pie chart by category
✓ Weekly spending line chart
✓ Expense list with filters
```

### 📊 Finance Manager
```
✓ Manage multiple accounts
✓ Track assets & liabilities
✓ Calculate net worth
✓ Set monthly budgets
✓ Budget progress visualization
✓ Net worth trend chart
```

### 📈 Stock Portfolio
```
✓ Add stock positions
✓ Track cost basis and current value
✓ Calculate gains/losses
✓ View portfolio metrics
✓ Weekly performance chart
✓ Top performers ranking
```

### ₿ Crypto Dashboard
```
✓ Manage crypto holdings
✓ Track purchase & current prices
✓ 24-hour price history
✓ Portfolio value calculation
✓ Market overview of top cryptos
✓ Price history charts
```

### 🏦 Loan Management
```
✓ Track multiple loans
✓ Monitor interest rates
✓ Record payments
✓ Payoff progress tracking
✓ Payment schedule visualization
✓ Debt payoff strategies
```

## Data Persistence

### Frontend Only
- Data stored in browser memory
- Resets on page refresh
- Perfect for testing/demo

### With Backend
- Data persists in MongoDB
- User accounts with authentication
- Multi-device sync
- Backup and recovery

## Connecting Frontend to Backend

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for:
- Setting up API services
- Authentication flow
- Database integration
- Full backend setup

## Technology Stack

### Frontend
- React 19
- Vite 7.3
- TypeScript 5.9
- Tailwind CSS 4.1
- Recharts for charts
- date-fns for dates

### Backend (Optional)
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs for passwords

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Switch between modules |
| `Enter` | Submit form |
| `Esc` | Close modals |
| `↓` | Next item in list |
| `↑` | Previous item in list |

## Common Tasks

### Add an Expense
1. Go to Expense Tracker
2. Fill in Description, Amount, Category, Date
3. Click "Add Expense"
4. See it appear in the list

### Create a Budget
1. Go to Finance Manager
2. Scroll to "Add Budget" section
3. Enter Category, Limit, Amount Spent
4. Click "Add Budget"
5. View progress bar

### Add a Stock
1. Go to Stock Portfolio
2. Fill in Symbol (AAPL), Company, Quantity, Prices
3. Click "Add Stock"
4. View in holdings list

### Track a Loan
1. Go to Loan Management
2. Fill in loan details (name, amount, rate, payment)
3. Click "Add Loan"
4. Click "Pay Now" to record payments

## API Quick Reference

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
```

### Resources
```
GET/POST /api/expenses
GET/POST /api/budgets
GET/POST /api/accounts
GET/POST /api/stocks
GET/POST /api/crypto
GET/POST /api/loans
```

See [BACKEND_API.md](./BACKEND_API.md) for full details.

## Troubleshooting

### Port 5173 Already in Use
```bash
npx kill-port 5173
npm run dev
```

### Port 5000 Already in Use (Backend)
```bash
npx kill-port 5000
npm run dev
```

### MongoDB Connection Failed
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas in cloud
# Update MONGODB_URI in .env
```

### Vite Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/financehub
JWT_SECRET=your_secret_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Project Files

Important files and directories:

```
├── src/
│   ├── modules/
│   │   ├── expense-tracker/
│   │   ├── finance-manager/
│   │   ├── stock-portfolio/
│   │   ├── crypto-dashboard/
│   │   └── loan-management/
│   ├── App.tsx (main container)
│   └── main.tsx (entry point)
├── README.md (full documentation)
├── BACKEND_API.md (API reference)
├── BACKEND_SETUP.md (backend setup)
├── INTEGRATION_GUIDE.md (frontend-backend connection)
└── index.html (HTML template)
```

## Next Steps

1. **Explore the UI** - Click around and try features
2. **Add sample data** - Create test records
3. **View charts** - See visualizations
4. **Set up backend** - Follow BACKEND_SETUP.md
5. **Connect frontend** - Use INTEGRATION_GUIDE.md
6. **Deploy** - Use Vercel for frontend, Heroku for backend

## Getting Help

- **Frontend issues**: Check [README.md](./README.md)
- **Backend setup**: See [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- **API details**: Read [BACKEND_API.md](./BACKEND_API.md)
- **Integration help**: Use [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

## Features Roadmap

- [ ] User authentication
- [ ] Real-time stock prices
- [ ] Bank account integration
- [ ] PDF report generation
- [ ] Mobile app
- [ ] Email notifications
- [ ] Multi-user support
- [ ] Advanced analytics

## License

MIT - See LICENSE file

## Support

Having issues? 
1. Check the appropriate documentation file
2. Review environment variables
3. Check browser console for errors
4. Verify MongoDB/Node are running

---

**Ready to go!** Start with `npm run dev` and explore FinanceHub! 🚀
