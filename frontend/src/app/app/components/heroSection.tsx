import Image from "next/image";
import React from "react";
import LandingImage from "@/../public/Landing/LandingImage.png";
import { Github, Terminal, Code } from "lucide-react";
import { VertexLogo } from "@/components/ui/VertexLogo";

const HeroSection = () => {
  return (
    <div className="flex-1 flex flex-col ">
      <div className="lg:py-10 py-10  w-full container flex mx-auto flex-col justify-center items-center">
        <div className="vertex-card-subtle px-4 py-2 lg:text-sm text-xs vertex-transition flex items-center gap-3">
          <Terminal size={16} className="text-white" />
          <span className="relative mx-1 bg-white w-2 h-2">
            <span className="absolute w-2 h-2 bg-white/70 animate-ping" />
          </span>
          <span className="vertex-heading text-xs">SYSTEM ONLINE</span>
          <span className="vertex-card px-2 py-1 text-xs flex gap-2 items-center">
            <Code size={12} />
            VERTEX
          </span>
        </div>
        <Content />
      </div>
      <div className="w-full flex justify-center items-center "></div>
    </div>
  );
};

export default HeroSection;

const Content = () => {
  return (
    <div className="py-10 flex flex-col w-full items-center justify-center gap-6 text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        <VertexLogo className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
      </div>
      <h1 className="lg:text-7xl text-4xl font-bold leading-tight vertex-heading">
        <span className="text-white">/</span>VERTEX
      </h1>
      <div className="vertex-card-subtle px-6 py-3 mt-6 max-w-3xl">
        <p className="lg:text-lg text-base vertex-body text-center">
          {'>'} ELITE
          <br />
          <span className="text-white/70">[ SHARP • DIGITAL • UNCOMPROMISING ]</span>
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button className="vertex-btn-secondary gap-3 flex items-center">
          <Github className="w-4 h-4" />
          <span>SOURCE</span>
        </button>
        <button className="vertex-btn gap-3 flex items-center">
          <Terminal className="w-4 h-4" />
          <span>ACCESS</span>
        </button>
      </div>
      <div className="relative vertex-card p-2 mt-8 lg:w-[85%] w-[95%] vertex-transition">
        <div className="absolute inset-0 bg-white/10 blur-2xl -z-10" />
        <Image
          src={LandingImage}
          alt="VERTEX HACKER ACADEMIC SYSTEM - Terminal Interface"
          className="w-full h-auto border border-white shadow-2xl"
          priority
          fetchPriority="high"
          width={1006}
          height={499}
        />
        <div className="absolute top-4 left-4 vertex-card-subtle px-3 py-1">
          <span className="vertex-heading text-xs">VERTEX.TERM v5.0</span>
        </div>
      </div>
    </div>
  );
};
