-🚀 Social Media Blog Generator
Transform social conversations into engaging blog content with AI-powered aggregation from Twitter, Reddit, and Dev.to .
Show Image Show Image Show Image Show Image Show Image

✨ Key Features

🔄 Multi-Platform Aggregation - Fetch content from Twitter, Reddit, and Dev.to simultaneously
🎯 Smart Summarization - AI-powered content synthesis from multiple social sources
🔊 Text-to-Speech - Built-in audio playback for accessibility and convenience
🔐 JWT Authentication - Secure user management with token-based auth
📱 Responsive Design - Seamless experience across all devices
⚡ Real-time Updates - Live content generation with loading states


🛠️ Tech Stack
FrontendBackendDatabaseAPIsNext.js 15Node.js + ExpressPostgreSQLTwitter API v2TypeScriptPrisma ORM-Reddit APIRedux ToolkitJWT Auth-Dev.to APITailwind CSSAxios-Web Speech API

🚀 Quick Start
Prerequisites

Node.js 18+
PostgreSQL
API Keys (Twitter Bearer Token)

Installation
bash# Clone repository
git clone https://github.com/yourusername/social-blog-generator.git
cd social-blog-generator

# Backend setup
cd backend
npm install
cp .env.example .env
# Add your API keys to .env
npx prisma migrate dev
npm run dev

# Frontend setup (new terminal)
cd ../frontend
npm install
npm run dev
🌐 Access: Frontend at http://localhost:3000 | Backend at http://localhost:5000

💡 How It Works

Enter Tags - Input keywords you want to explore
Multi-Source Fetch - System queries Twitter, Reddit, and Dev.to
Save & Share - Store in database, listen with text-to-speech

javascript// Example: Generate blog from tags
const response = await axios.post('/api/blogs/generate', {
  tags: ['react', 'typescript', 'nextjs']
});

📁 Project Structure
social-blog-generator/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── services/        # Business logic & API integrations
│   │   └── prisma/         # Database schema & migrations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js 15 app directory
│   │   ├── components/     # Reusable UI components
│   │   ├── store/         # Redux slices & services
│   │   └── utils/         # Helper functions
│   └── package.json
└── README.md

⚙️ Configuration
Backend (.env)
envDATABASE_URL="postgresql://user:password@localhost:5432/blogdb"
JWT_SECRET="your-secret-key"
TWITTER_BEARER_TOKEN="your-twitter-token"
PORT=5000
API Endpoints
httpPOST /api/blogs/generate    # Generate new blog
GET  /api/blogs            # List all blogs  
GET  /api/blogs/:id        # Get specific blog
DELETE /api/blogs/:id      # Delete blog
POST /api/auth/login       # User authentication

🎨 Key Features Demo
Multi-Platform Content Aggregation

Twitter: Recent tweets with engagement metrics
Reddit: Top posts from relevant subreddits
Dev.to: Technical articles and discussions

Smart Content Processing

Intelligent summarization of fetched content
Duplicate content filtering
SEO-friendly title generation

Enhanced User Experience

Real-time loading states with Framer Motion
Text-to-speech for accessibility
Responsive pagination
Toast notifications


🤝 Contributing

Fork the repository
Create feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open Pull Request




⭐ Star this repo if you find it helpful!
Built with ❤️ using Next.js, Express, and the power of social media APIs.
