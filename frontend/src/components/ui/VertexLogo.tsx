import React from 'react';

export const VertexLogo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5V6h-5V4.5A2.5 2.5 0 0 1 12 2z" />
    <path d="M12 11c-1.66 0-3 1.34-3 3v2h6v-2c0-1.66-1.34-3-3-3z" />
    <path d="M9 6V4.5a2.5 2.5 0 0 1 2.5-2.5h1A2.5 2.5 0 0 1 15 4.5V6" />
    <path d="M18 10v4.5a6.5 6.5 0 0 1-6.5 6.5h-1A6.5 6.5 0 0 1 4 14.5V10c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2z" />
    <path d="M9 11v3" />
    <path d="M15 11v3" />
  </svg>
);
