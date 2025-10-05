import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/loupe.png" alt="Space Detective Logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-xl font-heading font-bold tracking-tight">Space Detective</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Democratizing space exploration through AI-powered citizen science. 
              Join thousands making real contributions to planetary research.
            </p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-bold text-base mb-5">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-base mb-5">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified about new discoveries
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="your@email.com" className="bg-muted/50 border-border" />
              <Button variant="default" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Space Explorer. All rights reserved.</p>
          
        </div>
      </div>
    </footer>;
};