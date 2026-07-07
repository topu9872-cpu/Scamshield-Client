import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Scam<span className="text-gray-400">Shield</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-400">
            Protect yourself from phishing, fake websites, scam messages, and
            online fraud with AI-powered security.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>

          <ul className="space-y-3">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>

          <ul className="space-y-3">
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="#">Support</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>

          <div className="flex gap-4 text-2xl mb-5">
            <a href="https://github.com/topu9872-cpu">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/mehedi-hasan-topu">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578488636020">
              <FaFacebook />
            </a>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <MdEmail />
            <span>topu987@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ScamShield. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
