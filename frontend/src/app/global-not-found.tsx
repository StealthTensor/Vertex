import React from 'react';
import Link from "next/link";

/**
 * A sub-component to render the terminal window.
 * This is separated to make the "glitch" effect easier to build
 * by stacking multiple copies of this component.
 */
const TerminalContent = () => (
  <div className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-4 shadow-lg">
    {/* Terminal Header */}
    <div className="flex items-center gap-1.5 border-b border-neutral-700 pb-3 mb-3">
      <div className="h-3 w-3 rounded-full bg-red-500"></div>
      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
      <div className="h-3 w-3 rounded-full bg-green-500"></div>
      <span className="ml-2 text-sm text-neutral-400">Error: 404</span>
    </div>
    
    {/* Terminal Body */}
    <div className="font-mono text-xs sm:text-sm">
      <p className="text-neutral-400">
        $ <span className="text-white">Error: 404 - Base module not found</span>
      </p>
      {/* Use a <pre> tag to preserve the whitespace and newlines */}
      <pre className="text-blue-400 my-2">
        {'####################################\n'}
        {'####################################'}
      </pre>
      <p className="text-neutral-400">
        Suggestion: <span className="text-green-400">get back to /base</span>
      </p>
      <p className="mt-1 text-neutral-400">
        API Key: <span className="text-yellow-400">Not needed</span>
      </p>
      <p className="mt-1 text-neutral-400">Click here to reboot Base</p>
    </div>
  </div>
);

/**
 * The 404 Not Found page component, styled to match the provided image.
 */
export default function GlobalNotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-white p-6 sm:p-10 md:p-16">
      
      {/* Page Header Content */}
      <div className="w-full max-w-3xl">
        {/* Icon (as seen in the image) */}
        <div className="h-10 w-10 rounded-lg bg-blue-600"></div>
        
        {/* Title */}
        <h1 className="mt-6 text-5xl md:text-7xl font-bold text-black tracking-tighter">
          Got lost?
        </h1>
      </div>

      {/* Glitch Effect Container */}
      <div className="relative mt-12 w-full max-w-3xl">
        {/* Glitch Layer 1 (bottom, blurred) */}
        <div className="absolute left-2 top-2 w-full opacity-60 blur-[1px] md:left-4 md:top-4">
          <TerminalContent />
        </div>
        {/* Glitch Layer 2 (middle, less offset) */}
        <div className="absolute -left-1 -top-1 w-full opacity-70 md:-left-2 md:-top-2">
          <TerminalContent />
        </div>
        {/* Main Terminal (top, sharp) */}
        <div className="relative z-10 w-full">
          <TerminalContent />
        </div>
      </div>

      {/* Button Container */}
      <div className="mt-8 w-full max-w-3xl sm:mt-12">
        <Link
          href="/"
          className="group"
        >
          <span className="
            flex items-center justify-center
            fixed bottom-6 inset-x-6 z-20 py-4 px-6
            text-center font-medium text-white bg-neutral-900 rounded-lg
            transition-all duration-300
            hover:bg-neutral-700
            sm:relative sm:inset-auto sm:z-auto sm:inline-flex sm:py-3 sm:px-8
          ">
            Back to home
          </span>
        </Link>
      </div>
    </main>
  );
}