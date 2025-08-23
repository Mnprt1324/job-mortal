import { FaFacebookSquare, FaInfinity, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  const footerLinks = {
    resources: [
      { name: "About us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Products", href: "#" },
      { name: "Contact", href: "#" }
    ],
    community: [
      { name: "Feature", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Credit", href: "#" },
      { name: "FAQ", href: "#" }
    ],
    quickLinks: [
      { name: "Jobs", href: "#" },
      { name: "Companies", href: "#" },
      { name: "Resume Builder", href: "#" },
      { name: "Career Tips", href: "#" }
    ],
    more: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Support", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: FaInstagramSquare, href: "#", label: "Instagram" },
    { icon: FaFacebookSquare, href: "#", label: "Facebook" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <FaInfinity className="text-blue-500 text-3xl" />
              <span className="font-bold text-2xl text-slate-800 ml-2">ZipJob</span>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              ZipJob is a powerful job portal web app designed to bridge the gap between job seekers and recruiters. 
              It offers an intuitive platform for discovering job opportunities, applying seamlessly, and managing applications efficiently.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-200 transform hover:scale-110"
                >
                  <Icon className="text-2xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Resources */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 text-sm transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Community</h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 text-sm transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 text-sm transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* More */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.more.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 text-sm transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center">
              <FaInfinity className="text-blue-500 text-xl" />
              <span className="font-semibold text-slate-700 ml-2">ZipJob</span>
            </div>
            
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} ZipJob. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};