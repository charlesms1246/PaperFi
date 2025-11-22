# PaperFi - Crypto Perpetuals Trading Simulator

> 🌐 **Deployed on IPFS via [PinMe](https://pinme.eth.limo)** - Censorship-resistant, permanent frontend accessible at `https://5qgnhqze.pinit.eth.limo/`

PaperFi is a sophisticated crypto trading simulator that allows users to practice perpetual futures trading with real market data in a completely risk-free environment. Built with modern web technologies and deployed using decentralized infrastructure.

## 🚀 Features

### Core Trading Features

- **Real-time Trading Simulation** - Practice perpetual futures trading with live market data
- **Multiple Asset Support** - Trade BTC, ETH, SOL, BNB, XRP and dozens of other crypto assets
- **Live Price Feeds** - Real-time price updates powered by Pyth Network
- **Advanced Charting** - Professional TradingView charts with technical indicators
- **Portfolio Management** - Track positions, P&L, and trading performance
- **Risk Management** - Configurable leverage (up to 125x) and margin requirements

### Platform Features

- **Trading Dashboard** - Comprehensive overview of trading performance and metrics
- **Leaderboards** - Compete with other traders and climb the rankings
- **Analytics** - Detailed performance analysis with charts and insights
- **Client Funding** - Get funded by real clients based on your trading performance
- **Challenges** - Gamified achievement system to improve trading skills
- **Social Features** - Follow top traders and learn from their strategies

### Technical Features

- **Web3 Integration** - Wallet connection support with ConnectKit
- **Real-time Data Streaming** - Server-sent events for live price updates
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark Mode** - Professional trading terminal aesthetic
- **Performance Optimized** - Efficient caching and data management
- **Decentralized Deployment** - Forever frontend hosted on IPFS via PinMe

## 🏗️ Architecture

### Frontend Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full TypeScript support
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework with custom design system
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Data fetching, caching, and synchronization
- **React Router** - Client-side routing and navigation

### Backend & Infrastructure

- **Cloudflare Workers** - Serverless backend for API proxying and data processing
- **Supabase** - Database, authentication, and real-time subscriptions
- **Cloudflare R2** - Object storage for static assets
- **IPFS** - Decentralized frontend hosting via PinMe
- **ENS** - Human-readable addresses through .eth.limo gateway

### Web3 & Blockchain

- **Wagmi** - React hooks for Ethereum
- **Viem** - Low-level Ethereum library
- **ConnectKit** - Wallet connection UI and management
- **Ethers.js** - Ethereum wallet and contract interaction

## 🌐 Decentralized Deployment

### Why PinMe?

PaperFi is deployed using **[PinMe](https://pinme.eth.limo)** - a one-command tool for creating permanent, censorship-resistant frontends. This ensures:

- ✅ **Permanent Availability** - Frontend exists as long as IPFS and Ethereum exist
- ✅ **Censorship Resistance** - No centralized entity can take down the application
- ✅ **On-chain Verification** - Content integrity verifiable via IPFS content hash
- ✅ **Zero Hosting Costs** - No servers, no subscriptions, forever free
- ✅ **Global CDN** - Distributed across IPFS network for worldwide access

### Architecture Overview

```
┌─────────────────┐
│  IPFS/PinMe     │  ← Frontend (React App)
│  Forever        │     Deployed: pinme upload ./dist
│  Frontend       │     Access: https://<cid>.pinit.eth.limo/
└────────┬────────┘
         │
         │ API Calls
         │
         ▼
┌─────────────────┐
│  Cloudflare     │  ← Backend (Worker)
│  Workers        │     • TradingView proxy
│  (Edge API)     │     • Pyth datafeed proxy
└────────┬────────┘     • R2 avatar storage
         │              • PYUSD distribution
         │
    ┌────┴─────┬──────────┬─────────────┐
    │          │          │             │
    ▼          ▼          ▼             ▼
 ┌─────┐  ┌──────┐  ┌────────┐  ┌──────────┐
 │Pyth │  │ TView│  │Supabase│  │ Ethereum │
 └─────┘  └──────┘  └────────┘  └──────────┘
```

### Deployment Information

**Frontend (Decentralized):**
- **Platform**: IPFS via PinMe
- **Gateway**: eth.limo
- **Access**: Permanent IPFS hash + ENS subdomain
- **Deploy Command**: `pinme upload ./dist`

**Backend (Edge Computing):**
- **Platform**: Cloudflare Workers
- **Purpose**: API proxy, data processing, secure operations
- **Deploy Command**: `npx wrangler deploy`

### Current Deployment

```bash
# Frontend on IPFS
IPFS CID: <your-deployment-cid>
Gateway URL: https://<cid>.pinit.eth.limo/

# Backend on Cloudflare
Worker URL: https://paper.charlesms1246.workers.dev
```

## 📊 PYTH Network Integration

PaperFi leverages Pyth Network's comprehensive price infrastructure to provide real-time, institutional-grade market data for an authentic trading experience.

### Key Integration Points

#### 1. Real-time Price Streaming

The trading interface connects directly to Pyth's Hermes API for live price updates:

```typescript
// Real-time price streaming from Hermes
const eventSource = new EventSource(
  `https://hermes.pyth.network/v2/updates/price/stream?ids%5B%5D=${assetId}&parsed=true`
);

eventSource.onmessage = event => {
  const data = JSON.parse(event.data);
  if (data.parsed && data.parsed[0].price) {
    const price = BigInt(data.parsed[0].price.price);
    const expo = data.parsed[0].price.expo;
    const formattedPrice = Number(price) * Math.pow(10, expo);
    updateCurrentPrice(formattedPrice);
  }
};
```

#### 2. Asset Discovery

The platform fetches all available trading pairs from Pyth's price feeds:

```typescript
// Fetch all available assets from Pyth
const assets = await axios.get<HermesAsset[]>(
  "https://hermes.pyth.network/v2/price_feeds"
);
```

#### 3. TradingView Integration

Charts are powered by TradingView with Pyth data feeds:

```javascript
// TradingView ticker tape with Pyth symbols
"symbols": [
  { "proName": "PYTH:BTCUSD", "title": "Bitcoin" },
  { "proName": "PYTH:ETHUSD", "title": "Ethereum" },
  { "proName": "PYTH:SOLUSD", "title": "Solana" },
  { "proName": "PYTH:BNBUSD", "title": "Binance" }
]
```

#### 4. Historical Data & Charts

Professional charts with historical price data via Pyth's TradingView integration:

```typescript
const datafeed_proxy_base_url =
  "https://benchmarks.pyth.network/v1/shims/tradingview";
```

### Supported Assets

PaperFi supports all assets available through Pyth Network, including:

- **Major Cryptocurrencies**: BTC, ETH, SOL, BNB, XRP, ADA, AVAX, DOT, MATIC
- **DeFi Tokens**: UNI, AAVE, COMP, MKR, SNX, CRV, YFI
- **Layer 1 Tokens**: ATOM, NEAR, FTM, ALGO, ICP, FLOW
- **Stablecoins**: USDT, USDC, BUSD, DAI, FRAX
- **Meme Coins**: DOGE, SHIB, PEPE, BONK
- **And 100+ more trading pairs**

### Real-time Data Features

#### Price Accuracy

- **Sub-second Updates**: Price updates typically arrive within 400ms of on-chain publication
- **High Precision**: Prices maintain full precision with configurable decimal places
- **Confidence Intervals**: Each price includes confidence interval data for risk assessment
- **Publication Times**: Exact timestamps for each price update

#### Data Reliability

- **Multiple Publishers**: Prices aggregated from 80+ first-party publishers
- **Redundancy**: Multiple data sources ensure high availability
- **Validation**: All prices go through Pyth's rigorous validation process
- **Fallback Handling**: Graceful degradation when real-time data is unavailable

#### Market Data Coverage

- **24/7 Availability**: Continuous price feeds for crypto markets
- **Global Markets**: Coverage of major crypto exchanges worldwide
- **Cross-chain Assets**: Support for assets across multiple blockchains
- **Emerging Markets**: Early access to new and trending crypto assets

### Integration Benefits

#### For Traders

- **Authentic Experience**: Trade with the same data used by professional institutions
- **Real Market Conditions**: Experience actual market volatility and price movements
- **Accurate Backtesting**: Historical data allows for precise strategy testing
- **Professional Tools**: Access to institutional-grade price infrastructure

#### For Developers

- **Easy Integration**: Simple REST APIs and WebSocket connections
- **Comprehensive Documentation**: Well-documented endpoints and data formats
- **Scalable Architecture**: Handle high-frequency updates without performance issues
- **Cost Effective**: No need to aggregate data from multiple sources

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ or Bun
- Git
- Cloudflare account (for backend deployment)
- PinMe CLI (for IPFS deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/charlesms1246/PaperFi.git
cd PaperFi

# Install dependencies
bun install

# Start development server
bun run dev
```

The application will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_ALCHEMY_ID=your_alchemy_api_key
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

## 📁 Project Structure

```
paper/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── charts/         # Chart components and Pyth integration
│   │   │   ├── PerpChart.tsx
│   │   │   ├── TickerTape.tsx
│   │   │   └── pythStreaming.ts
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── pages/              # Application pages
│   │   ├── app/           # Protected app pages
│   │   │   ├── Launchpad/ # Asset selection and trading pairs
│   │   │   └── ...
│   │   ├── Trade.tsx      # Main trading interface
│   │   ├── Dashboard.tsx  # Trading dashboard
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   ├── AuthProvider.tsx
│   │   └── Web3Provider.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript type definitions
│   │   ├── Assets.ts     # Pyth asset types
│   │   └── ...
│   ├── worker/           # Cloudflare Worker backend
│   │   └── index.ts      # API proxy and data processing
│   └── ...
├── public/               # Static assets
├── dist/                # Build output
└── ...
```

### Key Files for Pyth Integration

- `src/components/charts/pythStreaming.ts` - Real-time price streaming logic
- `src/pages/Trade.tsx` - Trading interface with live price updates
- `src/pages/app/Launchpad/Launchpad.tsx` - Asset discovery from Pyth feeds
- `src/components/charts/TickerTape.tsx` - TradingView ticker with Pyth symbols
- `src/types/Assets.ts` - TypeScript types for Pyth asset data
- `src/worker/index.ts` - Backend proxy for Pyth TradingView integration

## 🎨 UI/UX Design

### Design System

- **Color Palette**: Dark theme with electric blue and purple accents
- **Typography**: Inter font family for excellent readability
- **Layout**: Responsive grid system with mobile-first approach
- **Animation**: Smooth Framer Motion animations for enhanced UX

### Trading Terminal Features

- **Professional Layout**: Modeled after institutional trading platforms
- **Customizable Charts**: TradingView integration with technical indicators
- **Order Panel**: Intuitive long/short position controls
- **Portfolio View**: Real-time position tracking and P&L calculation

## 🚀 Deployment

### Option 1: Decentralized Deployment (Recommended)

Deploy the frontend to IPFS using **PinMe** for a permanent, censorship-resistant application:

```bash
# Install PinMe
npm install -g pinme

# Configure for IPFS deployment (ensure base: "./" in vite.config.ts)

# Build the application
bun run build

# Deploy to IPFS
pinme upload ./dist

# You'll receive:
# - IPFS CID: bafybei...
# - Gateway URL: https://<cid>.pinit.eth.limo/
# - ENS subdomain: https://<subdomain>.pinit.eth.limo/
```

**Important**: The Cloudflare Worker backend must be deployed separately:

```bash
# Deploy backend to Cloudflare Workers
npx wrangler login
npx wrangler deploy
```

### Option 2: Full Cloudflare Deployment

Deploy both frontend and backend together on Cloudflare's edge network:

```bash
# Configure Cloudflare Workers
npx wrangler login

# Add account_id to wrangler.toml
# account_id = "your_account_id"

# Create R2 bucket for avatars
npx wrangler r2 bucket create paper

# Set environment secrets
npx wrangler secret put VAULT_PRIVATE_KEY

# Deploy everything
bun run deploy
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Cloudflare account set up (for backend)
- [ ] R2 bucket created (`paper`)
- [ ] VAULT_PRIVATE_KEY secret set
- [ ] PinMe CLI installed (for IPFS deployment)
- [ ] vite.config.ts has `base: "./"` for IPFS

### Vite Configuration for IPFS

```typescript
// vite.config.ts
export default defineConfig({
  base: "./",  // Critical for IPFS deployment
  plugins: [react(), cloudflare()],
  // ... rest of config
});
```

## 🔐 Security & Privacy

- **Client-side Only**: No sensitive data stored on servers
- **Wallet Security**: Non-custodial wallet connections
- **Data Encryption**: All API communications over HTTPS
- **Privacy First**: Minimal data collection and storage
- **Decentralized Storage**: Frontend hosted on IPFS for enhanced censorship resistance
- **Secure Backend**: Cloudflare Workers with environment-based secrets

## 📝 Deployment History

Track your IPFS deployments:

| Version | Date | IPFS CID | Gateway URL |
|---------|------|----------|-------------|
| v0.0.3 | 2025-11-21 | `<your-cid>` | `https://<cid>.pinit.eth.limo/` |

## 🙏 Acknowledgments

- **Pyth Network** for providing institutional-grade price feeds
- **TradingView** for professional charting capabilities
- **Supabase** for backend infrastructure
- **Cloudflare** for edge computing and deployment
- **Shadcn/ui** for beautiful UI components
- **PinMe** for enabling censorship-resistant, permanent frontend deployment
- **IPFS** for decentralized content storage
- **ENS** for human-readable blockchain addresses

## 📄 License

MIT License - See the [LICENSE](LICENSE) file for details

---