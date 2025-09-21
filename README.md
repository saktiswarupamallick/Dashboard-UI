# Dashboard UI

A modern, responsive React dashboard application built with TypeScript, Vite, and Tailwind CSS. Features a comprehensive eCommerce analytics interface with dark/light theme support, interactive charts, data tables, and real-time metrics.

![Dashboard Preview](https://img.shields.io/badge/React-19.1.1-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-7.1.6-purple?logo=vite) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-blue?logo=tailwindcss)

## ✨ Features

### 🎨 UI/UX
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Modern Interface**: Clean, professional design with smooth animations
- **Loading States**: Skeleton loaders and loading spinners for better UX
- **Error Boundaries**: Graceful error handling and recovery

### 📊 Dashboard Components
- **Metric Cards**: Key performance indicators with trend indicators
- **Interactive Charts**: 
  - Bar charts for projections vs actuals
  - Line charts for revenue trends
  - Donut charts for sales distribution
  - World map for geographic data visualization
- **Data Tables**: 
  - Product management with sorting and filtering
  - Order tracking with status management
  - Search and pagination functionality
- **Activity Sidebar**: Real-time notifications and activity feeds

### 🔧 Technical Features
- **State Management**: Context API with useReducer for complex state
- **Routing**: React Router with lazy loading and code splitting
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **TypeScript**: Full type safety and IntelliSense support
- **Performance**: Optimized with React.memo, lazy loading, and efficient renders

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Dashboard-UI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ci` | Run tests in CI mode |

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── __tests__/       # Component tests
│   ├── icons/           # Custom icon components
│   ├── BarChart.tsx     # Chart components
│   ├── MetricCard.tsx   # Metric display cards
│   ├── OrderTable.tsx   # Data table components
│   └── ...
├── contexts/            # React Context providers
│   ├── AppContext.tsx   # Global app state
│   └── ThemeContext.tsx # Theme management
├── hooks/               # Custom React hooks
│   ├── __tests__/       # Hook tests
│   ├── useDebounce.ts   # Debounce hook
│   ├── useLocalStorage.ts # Local storage hook
│   └── useTableState.ts # Table state management
├── pages/               # Route components
│   ├── Dashboard.tsx    # Main dashboard page
│   └── Default.tsx      # Default/fallback page
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and data
│   ├── data.ts         # Mock data and constants
│   ├── theme.ts        # Theme configuration
│   └── index.ts        # Utility functions
└── assets/             # Static assets (images, icons)
```

## 🎯 Core Components

### Dashboard
The main dashboard page featuring:
- 4 metric cards showing key KPIs
- Bar chart comparing projections vs actuals
- Revenue trend line chart
- World map with location-based data
- Product table with search and filtering
- Sales distribution donut chart

### MetricCard
Displays key metrics with:
- Title and current value
- Percentage change with trend indicators
- Color-coded variants (light-blue, light-gray, light-purple)
- Responsive design

### Charts
Built with Recharts library:
- **BarChart**: Comparative data visualization
- **LineChart**: Trend analysis over time
- **DonutChart**: Proportional data display
- **WorldMap**: Geographic data representation

### Tables
Feature-rich data tables with:
- Sorting by columns
- Search functionality
- Pagination
- Status filtering
- Responsive design

## 🎨 Theming

The application supports both light and dark themes with:

### Theme Features
- System preference detection
- Manual theme toggle
- Persistent theme selection (localStorage)
- Smooth transitions between themes
- Custom color palette for dashboard elements

### Color Scheme
```javascript
// Custom dashboard colors
dashboard: {
  'bg-light': '#ffffff',
  'bg-dark': 'oklch(14.1% 0.005 285.823)',
  'card-light': '#F7F9FB',
  'card-dark': 'rgba(255, 255, 255, 0.05)',
  // ... additional colors
}
```

## 🧪 Testing

The project includes comprehensive testing with:

### Test Setup
- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM environment for testing

### Test Coverage
- Component unit tests
- Hook testing
- Integration tests
- Coverage reporting

### Running Tests
```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🔧 Configuration

### Vite Configuration
- React plugin for JSX support
- Fast development server
- Optimized production builds

### Tailwind CSS
- Custom color palette
- Dark mode support
- Custom animations and keyframes
- Extended spacing and typography

### TypeScript
- Strict type checking
- Path mapping
- Modern ES features
- React 19 support

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Mobile First**: Optimized for small screens
- **Tablet Support**: Adaptive layouts for medium screens
- **Desktop Experience**: Full-featured interface for large screens
- **Grid System**: CSS Grid and Flexbox for layouts

### Breakpoints
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **React.memo**: Component memoization
- **Lazy Loading**: Dynamic imports for components
- **Optimized Assets**: Efficient image and icon handling
- **Tree Shaking**: Unused code elimination

## 🔍 State Management

### AppContext
Centralized state management using React Context and useReducer:
- Dashboard data (metrics, charts, tables)
- UI state (sidebar visibility, search queries)
- Filter and pagination state
- Notification and activity management

### ThemeContext
Theme management with:
- Light/dark mode switching
- System preference detection
- Persistent storage
- CSS class management

## 📊 Data Structure

The application uses TypeScript interfaces for type safety:

```typescript
interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  amount: number;
}
```

## 🛠️ Development Guidelines

### Code Style
- ESLint configuration for code quality
- Consistent naming conventions
- Component composition patterns
- Custom hooks for reusable logic

### File Organization
- Feature-based folder structure
- Co-located tests with components
- Centralized type definitions
- Utility functions separation

### Best Practices
- TypeScript strict mode
- Error boundary implementation
- Accessibility considerations
- Performance monitoring

## 📦 Dependencies

### Core Dependencies
- **React 19.1.1**: UI library
- **React Router DOM**: Client-side routing
- **Recharts**: Chart components
- **Heroicons**: Icon library

### Development Dependencies
- **Vite**: Build tool and dev server
- **TypeScript**: Type checking
- **Tailwind CSS**: Utility-first CSS
- **Jest**: Testing framework
- **ESLint**: Code linting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow
1. Run `npm run dev` for development
2. Write tests for new features
3. Run `npm run test` to ensure all tests pass
4. Run `npm run lint` to check code quality
5. Build with `npm run build` to verify production readiness

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Bug Reports & Feature Requests

Please use the GitHub issues tab to report bugs or request new features. When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and OS information
- Screenshots if applicable

## 📞 Support

For support and questions:
- Check the [documentation](README.md)
- Search existing [issues](../../issues)
- Create a new [issue](../../issues/new)

---

Built with ❤️ using React, TypeScript, and modern web technologies.