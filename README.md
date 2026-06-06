# FinanceHub - Personal Finance Management System

A comprehensive MERN full-stack application for managing personal finances, investments, and loans with real-time analytics and visualizations.

## 🌟 Features

### 1. **Expense Tracker** 💰
- Track daily expenses with categorization
- Visualize spending patterns with charts
- Filter expenses by date, category, and amount
- Add custom tags for better organization
- View expense history and trends

### 2. **Personal Finance Manager** 📊
- Manage multiple bank accounts (checking, savings, credit)
- Track net worth across all accounts
- Monitor budget limits per category
- Visual budget vs spending analysis
- Multi-currency support

### 3. **Stock Portfolio Tracker** 📈
- Track stock holdings with real-time prices
- Monitor gain/loss on individual stocks
- Portfolio performance analytics
- Weekly performance charts
- Top performers identification

### 4. **Cryptocurrency Dashboard** ₿
- Manage crypto holdings across exchanges
- Track cryptocurrency prices in real-time
- Portfolio value monitoring
- Market overview with top cryptocurrencies
- 24-hour price history charts

### 5. **Loan Management System** 🏦
- Track multiple loans (mortgage, auto, student, personal)
- Calculate monthly payments and interest
- Monitor payoff progress with visual indicators
- Payment schedule planning
- Debt payoff strategies (Snowball & Avalanche)

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS
- **Recharts** - Data visualization
- **date-fns** - Date manipulation
- **Axios** - HTTP client
- **Zustand** - State management

### Backend (MERN)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Data validation
- **CORS** - Cross-origin requests

## 📋 Project Structure

### Frontend (React)
```
src/
├── modules/
│   ├── expense-tracker/
│   │   └── ExpenseTracker.tsx
│   ├── finance-manager/
│   │   └── FinanceManager.tsx
│   ├── stock-portfolio/
│   │   └── StockPortfolio.tsx
│   ├── crypto-dashboard/
│   │   └── CryptoDashboard.tsx
│   └── loan-management/
│       └── LoanManagement.tsx
├── App.tsx
├── main.tsx
├── index.css
└── utils/
    └── cn.ts
```

### Backend (Node.js/Express)
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── auth.js
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
│   └── app.js
├── server.js
├── .env
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- MongoDB 5.0 or higher (local or cloud)
- Modern web browser

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/financehub.git
   cd financehub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

   Access the application at `http://localhost:5173`

### Backend Setup

Refer to [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed instructions.

Quick start:
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Server runs on `http://localhost:5000`

## 📖 API Documentation

Complete API documentation is available in [BACKEND_API.md](./BACKEND_API.md)

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

#### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

#### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

#### Accounts
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account

#### Stocks
- `GET /api/stocks` - Get all stocks
- `POST /api/stocks` - Create stock position
- `GET /api/stocks/performance` - Get portfolio performance

#### Cryptocurrencies
- `GET /api/crypto` - Get all crypto holdings
- `POST /api/crypto` - Add crypto holding
- `GET /api/crypto/market/top` - Get top cryptocurrencies

#### Loans
- `GET /api/loans` - Get all loans
- `POST /api/loans` - Create loan
- `POST /api/loans/:id/payment` - Record payment
- `GET /api/loans/analysis` - Get loan analysis

## 🎨 UI Features

### Dark Mode Theme
- Modern dark interface with purple/indigo accents
- High contrast for readability
- Smooth gradient backgrounds
- Responsive design for all devices

### Charts & Visualizations
- Line charts for trends
- Pie charts for distribution
- Bar charts for comparisons
- Area charts for ranges
- Real-time data updates

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop-friendly layouts
- Touch-friendly interactions

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **CORS Protection** - Cross-origin request handling
- **Input Validation** - Joi for request validation
- **Rate Limiting** - Prevent abuse with request limits
- **XSS Protection** - Input sanitization
- **HTTPS Ready** - Production-ready SSL support

## 📊 Data Models

### User
- Personal information (name, email, phone)
- Security (hashed password)
- Preferences (theme, notifications, timezone)
- Account settings (currency, timezone)

### Expense
- Description and amount
- Category classification
- Date and payment method
- Tags and notes
- Receipt attachment

### Budget
- Category and limit
- Spent amount tracking
- Monthly/yearly periods
- Alert configuration
- Progress monitoring

### Account
- Account type (checking, savings, credit)
- Balance tracking
- Interest rate management
- Multi-currency support
- Bank information

### Stock
- Symbol and company name
- Quantity and purchase price
- Current market price
- Broker information
- Sector classification

### Cryptocurrency
- Symbol and name
- Quantity holdings
- Purchase and current price
- Exchange information
- Wallet address

### Loan
- Loan details (name, lender, amount)
- Interest rate
- Monthly payment
- Remaining months
- Payment history
- Payoff status

## 💾 Database Schema

MongoDB collections:
- `users` - User accounts and profiles
- `expenses` - Transaction records
- `budgets` - Budget allocations
- `accounts` - Financial accounts
- `stocks` - Stock holdings
- `cryptocurrencies` - Crypto holdings
- `loans` - Loan records

## 🔄 Workflow

1. **User Registration/Login**
   - Create account with email and password
   - JWT token issued for authenticated sessions
   - Token expires after 24 hours

2. **Financial Data Management**
   - Add/edit/delete financial records
   - Real-time updates across modules
   - Automatic calculations and analytics

3. **Analytics & Reporting**
   - Visual representation of financial data
   - Trend analysis and comparisons
   - Performance metrics and KPIs

4. **Decision Support**
   - Budget recommendations
   - Debt payoff strategies
   - Investment insights

## 🧪 Testing

### Frontend Testing
```bash
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌐 Deployment

### Frontend Deployment Options
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**

### Backend Deployment Options
- **Heroku**
- **AWS EC2/Elastic Beanstalk**
- **DigitalOcean**
- **Google Cloud Platform**
- **Azure App Service**
- **Render**

## 📚 Documentation

- [Backend API Documentation](./BACKEND_API.md) - Complete API reference
- [Backend Setup Guide](./BACKEND_SETUP.md) - Installation and setup
- [API Endpoints](./BACKEND_API.md#api-endpoints) - All available endpoints

## 🐛 Troubleshooting

### Frontend Issues

**Port 5173 already in use**
```bash
npx kill-port 5173
npm run dev
```

**Dependencies not installing**
```bash
rm package-lock.json node_modules -rf
npm install
```

### Backend Issues

**MongoDB connection failed**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network access (if using MongoDB Atlas)

**Port 5000 already in use**
```bash
npx kill-port 5000
npm run dev
```

## 📋 Features Roadmap

- [ ] Email notifications for budget alerts
- [ ] Bank account integration (Plaid)
- [ ] Investment recommendations
- [ ] Tax report generation
- [ ] Cryptocurrency price alerts
- [ ] Automated savings goals
- [ ] Bill payment reminders
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-user household accounts
- [ ] Investment simulation
- [ ] Financial advice chatbot
- [ ] Data export (PDF/Excel)
- [ ] Budget templates
- [ ] Expense splitting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Author

**Your Name / Development Team**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React and Vite communities
- MongoDB and Mongoose teams
- Chart.js/Recharts developers
- Tailwind CSS team
- All contributors and users

## 📞 Support

For support, email support@financehub.app or create an issue in the GitHub repository.

## 🔗 Links

- [Live Demo](https://financehub-demo.vercel.app)
- [API Documentation](./BACKEND_API.md)
- [GitHub Repository](https://github.com/yourusername/financehub)
- [Documentation Wiki](https://github.com/yourusername/financehub/wiki)

## ⚠️ Disclaimer

This application is designed for personal finance tracking and educational purposes. While we strive for accuracy, please verify all financial calculations independently. We are not responsible for any financial decisions made based on data from this application. Always consult with a certified financial advisor for investment decisions.

---

Made with ❤️ by the FinanceHub Team
#   F i n a n c e h u b . m e r n s t a c k  
 #   F i n a n c e H u b - f r o n t e n d  
 