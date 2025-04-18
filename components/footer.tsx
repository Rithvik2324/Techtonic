import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-8 border-t-2 border-primary/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-pixel text-lg mb-4 text-secondary">TECHTONIC&apos;25</h3>
            <p className="text-sm mb-4">
              The ultimate arcade & retro video game themed technical fest happening on April 30th, 2025.
            </p>
            <p className="text-sm">© 2025 TECHTONIC. All rights reserved.</p>
          </div>

          <div>
            <h3 className="font-pixel text-lg mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#events" className="text-sm hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-sm hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-sm hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-pixel text-lg mb-4 text-secondary">Contact Us</h3>
            <p className="text-sm mb-2">Email: techtonic25@example.com</p>
            <p className="text-sm mb-4">Phone: +91 9876543210</p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/techtonic25"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/techtonic25"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://discord.gg/techtonic25"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
