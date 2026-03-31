import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl font-heading font-bold text-gradient mb-4">404</div>
        <h1 className="font-heading text-2xl font-semibold text-textLight mb-3">
          Page Not Found
        </h1>
        <p className="text-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home size={16} />
            Go Home
          </Link>
          <Link to="/builder" className="btn-secondary">
            <ArrowLeft size={16} />
            Open Builder
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
