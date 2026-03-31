# CareerCraft - AI-Powered Resume Builder

CareerCraft is a modern, AI-powered resume builder designed to help you create professional, ATS-optimized resumes efficiently.

## Features

- **Live Preview:** See your resume update in real-time as you type.
- **Multiple Templates:** Choose from beautifully designed templates (Classic, Modern, Minimal).
- **AI Enhancement:**
  - **Bullet Point Enhancer:** Rewrite your experience bullets dynamically using AI.
  - **Summary Generator:** Automatically craft a professional summary based on your details.
  - **ATS Checker:** Compare your resume against a job description to find missing keywords.
- **PDF Export:** Export your finished resume to a high-quality PDF in A4 format.
- **Auto-Save:** Your progress is automatically saved to local storage.
- **Dark Mode UI:** A sleek, glassmorphic dark theme for the editor and a light theme for the actual resume.

## Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS v3
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI Integration:** OpenAI GPT-4o-mini (via Vite Proxy)
- **PDF Generation:** html2canvas, jsPDF

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- An OpenAI API Key for the AI features.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AutomateStack/CareerCraft.git
   cd CareerCraft
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add your OpenAI API key:
     ```env
     VITE_OPENAI_API_KEY=your_openai_api_key_here
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment to Vercel

The application is structured to be easily deployed to Vercel.

1. Push your repository to GitHub.
2. Sign in to Vercel and import your GitHub repository.
3. In the project settings on Vercel, navigate to **Environment Variables** and add `VITE_OPENAI_API_KEY` with your OpenAI API Key.
4. Click **Deploy**.

*Note: For production, a serverless function is recommended for API calls to prevent your API key from being exposed if CORS rules are completely bypassed in a static build.*
