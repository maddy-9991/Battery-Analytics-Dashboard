# BESS Analytics Dashboard

A modern React + TypeScript dashboard for monitoring and analyzing Battery Energy Storage System (BESS) performance metrics.

## 🎯 Features

- **Real-time Metrics**: Monitor battery health, charge, temperature, and cycles
- **Interactive Charts**: Visualize trends with Recharts
- **File Upload**: Process battery data CSV files
- **Responsive Design**: Built with Tailwind CSS
- **Type-Safe**: Full TypeScript support
- **API Integration**: Connects to FastAPI backend

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your API URL
# VITE_API_BASE_URL=http://localhost:8000
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm run test
```

## 📡 API Integration

This dashboard connects to the BESS Analytics Platform API (FastAPI backend).

**Ensure the backend is running:**

```bash
cd ../bess-analytics-platform
docker-compose up
```

**API endpoints used:**
- `GET /health` - Health check
- `GET /api/v1/status` - System status
- `GET /api/v1/metrics/{battery_id}` - Get battery metrics
- `POST /api/v1/process` - Upload and process data
- `POST /api/v1/anomalies/detect` - Detect anomalies

## 🎨 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── MetricCard.tsx
│   ├── HealthStatus.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   ├── FileUpload.tsx
│   └── MetricsChart.tsx
├── pages/            # Page components
│   └── Dashboard.tsx
├── services/         # API service layer
│   └── api.ts
├── hooks/            # Custom React hooks
│   └── useBatteryMetrics.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   └── formatters.ts
├── styles/           # Global styles
│   └── index.css
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=BESS Analytics Dashboard
```

### Vite Proxy

The app is configured to proxy `/api` requests to the backend:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  },
}
```

## 📊 Dashboard Features

### Metrics Display
- State of Health (SOH)
- State of Charge (SOC)
- Temperature monitoring
- Cycle counting
- Voltage and current readings
- Degradation rate tracking

### Visual Analytics
- Battery health trend charts
- Historical data visualization
- Real-time updates

### Data Management
- CSV file upload
- Data processing
- Anomaly detection

## 🎯 Usage

1. **Start the backend API** (FastAPI server must be running on port 8000)
2. **Start the frontend**: `npm run dev`
3. **Open browser**: Navigate to `http://localhost:3000`
4. **View metrics**: Default battery ID is `battery-001`
5. **Upload data**: Drag and drop CSV files or click to upload
6. **Monitor trends**: View charts and metrics in real-time

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## 🤝 Integration with Backend

This dashboard is designed to work seamlessly with the BESS Analytics Platform backend:

1. Clone both repositories
2. Start the backend: `cd bess-analytics-platform && docker-compose up`
3. Start the frontend: `cd bess-analytics-dashboard && npm run dev`
4. Access the dashboard at `http://localhost:3000`

## 👤 Author

**Hammad Imran**
- GitHub: [@maddy-9991](https://github.com/maddy-9991)
- Email: hammadimran100@gmail.com

## 📄 License

MIT License

## 🙏 Acknowledgments

Built with modern React best practices and designed for real-world battery analytics applications.
