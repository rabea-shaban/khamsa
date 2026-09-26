import React from 'react';
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaFacebookF,
  FaTiktok,
  FaGithub,
  FaYoutube,
  FaXTwitter,
  FaGlobe,
  FaEnvelope,
} from 'react-icons/fa6';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// 1. WhatsApp Official Icon
export function WhatsAppIcon({ className = 'h-4 w-4', size, ...props }: IconProps) {
  return <FaWhatsapp className={className} size={size} {...props} />;
}

// 2. LinkedIn Official Icon
export function LinkedInIcon({ className = 'h-4 w-4', size, ...props }: IconProps) {
  return <FaLinkedinIn className={className} size={size} {...props} />;
}

// 3. Facebook Official Icon
export function FacebookIcon({ className = 'h-4 w-4', size, ...props }: IconProps) {
  return <FaFacebookF className={className} size={size} {...props} />;
}

// 4. TikTok Official Icon
export function TikTokIcon({ className = 'h-4 w-4', size, ...props }: IconProps) {
  return <FaTiktok className={className} size={size} {...props} />;
}

// 5. GitHub Official Icon
export function GitHubIcon({ className = 'h-4 w-4', size, ...props }: IconProps) {
  return <FaGithub className={className} size={size} {...props} />;
}

// 6. YouTube Official Icon
export function YouTubeIcon({ className = 'h-4 w-4', size, ...props }: IconProps) {
  return <FaYoutube className={className} size={size} {...props} />;
}

// 7. X / Twitter Official Icon
export function XTwitterIcon({ className = 'h-4 w-4', size, ...props }: IconProps) {
  return <FaXTwitter className={className} size={size} {...props} />;
}

// 8. Website / Portfolio Icon
export function WebsiteIcon({ className = 'h-4 w-4', size, ...props }: IconProps) {
  return <FaGlobe className={className} size={size} {...props} />;
}

// 9. Email / Mail Icon
export function EmailIcon({ className = 'h-4 w-4', size, ...props }: IconProps) {
  return <FaEnvelope className={className} size={size} {...props} />;
}

// 10. Mostaql (مستقل) Official Logo Vector
export function MostaqlIcon({ className = 'h-4 w-4', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V7h2v10z" />
    </svg>
  );
}
