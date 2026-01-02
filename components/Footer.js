import Link from 'next/link';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Platform: [
      { name: 'Study Notes', href: '/notes' },
      { name: 'Code Library', href: '/codelab' },
      { name: 'Resume Builder', href: '/resume' },
      { name: 'AI Tools', href: '/ai-tools' },
      { name: 'About Us', href: '/about' }, // ✅ Added here
    ],
    Support: [
      { name: 'Contact Us', href: '/contact' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    Community: [
      { name: 'Join WhatsApp Group', href: 'https://chat.whatsapp.com/HKa2zNywtdEJXgKKkHsRtM' }, // Updated link
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NotesIn
                </span>
                <span className="text-xs text-gray-500 -mt-1">Smart Learning</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering students with smart learning tools, organized study materials, 
              and AI-powered assistance for academic success.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@notesin.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 7610100823</span>
              </div>
              {/* <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div> */}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NotesIn. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-sm text-gray-400">
            Made with ❤️ for students worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
