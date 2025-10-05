import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/loupe.png" alt="Space Detector Logo" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-xl font-heading font-bold tracking-tight">Space Explorer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link to="/guide" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Guide
            </Link>
            <Link to="/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/explore">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/guide"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Guide
            </Link>
            <Link
              to="/leaderboard"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              {user ? (
                <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button variant="default" className="w-full" asChild>
                    <Link to="/explore">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
