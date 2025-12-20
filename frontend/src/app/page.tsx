import { Metadata } from "next";
import Link from "next/link";
import { VertexLogo } from "@/components/ui/VertexLogo";
import Image from "next/image";
import { Zap, TrendingUp, Users, ArrowRight, Github, MapPin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { title } from "process";
import SpotlightCard from "./components/SpotlightCard";
import TextPressure from "./components/TextPressure";

export const metadata: Metadata = {
  title: "VERTEX SRM | Student Companion",
  description: "Manage your SRM college timetable, assignments, and academic life with VERTEX SRM. Built for CSE students.",
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="relative group border border-white/10 bg-white/0 text-center rounded-3xl mx-auto transition-all duration-200 p-8 h-full">
      {/* Top Glow */}
      <span className="absolute h-px opacity-100 transition-all duration-500 ease-in-out inset-x-0 top-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-white/50 to-transparent block" />

      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white text-left">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-2 text-left">
        {description}
      </p>

      {/* Bottom Glow */}
      <span className="absolute h-px opacity-100 transition-all duration-500 ease-in-out inset-x-0 bottom-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-white/50 to-transparent block" />
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl max-w-6xl w-[90%] mt-5 h-16">
        <div className="max-w-6xl mx-auto px-2 py-2 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <VertexLogo className="w-10 h-10 text-white/90 ml-2" />
            <span className="text-xl font-semibold tracking-normal text-white/90">VERTEX</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="https://chat.whatsapp.com/DjBKwQX7iNOHjOidVixxcw" className="hover:text-white transition-colors">Community</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
          </div>

          <div className="">
            <Link href="/auth/login" className="px-6 py-3 pb-4 mb-2 rounded-full text-white/80 font-bold gradient-button variant">Login</Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="pt-52 md:pt-60 pb-20 px-6 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://betterstack.com/assets/v2/homepage-v3/hero-bg-408d1e858d0c9969863b4116bf2ad625e96cb10643f5868768c35b604208b9ad.jpg"
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-40 top-[20px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>

        {/* Background Gradients */}
        {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#1f3f6d]/60 blur-[120px] rounded-full pointer-events-none opacity-60" /> */}

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/40 mb-9 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            v7.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl mt-2 font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Your Academic <br />
            Command Center.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ghost the cluttered legacy portals. Vertex is the modern, fast, and
            clarity-driven interface for managing your university schedule,
            attendance, and grades.
          </p>


          {/* <div className="container_orb">
            <Spline
              scene="https://prod.spline.design/OkFgGiVZ-Wf1oSnq/scene.splinecode" 
              />
          </div> */}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-40">
            <Link
              href="/auth/login"
              className="px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2 gradient-button variant "
            >
              <p>  </p>  Get Started <p>  </p>
            </Link>
            <Link
              href="https://github.com/StealthTensor/Vertex"
              target="_blank"
              className="px-8 py-4 bg-transparent hover:bg-white/5 border border-white/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-gray-300"
            >
              <Github size={18} />
              Star on GitHub
            </Link>
          </div>

          {/* Dashboard Preview */}
          {/* <div className="relative mx-auto max-w-5xl">
            <DashboardPreview />

            {/* Glow effect behind dashboard
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl -z-10 rounded-3xl opacity-50" />
          </div> */}
        </div>
      </section>

      {/* SECTION 1: TIMETABLE (Image Left, Text Right) */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-0">
          <div className="flex-1 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-3xl opacity-10" />
            <Image
              src="https://u.cubeupload.com/Trinai308/X3Ow0t.png"
              alt="Timetable Interface"
              className="relative z-10"
              height={770}
              width={770}
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-20"></div>
          </div>
          <div className="flex flex-col justify-center gap-6 max-w-[36rem] -ml-20">
            <span className="text-xs tracking-[0.3em] uppercase text-white/40">
              Timeline
            </span>

            <h2 className="text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
              Your day,
              <br />
              <span>decoded instantly.</span>
            </h2>

            <p className="text-lg text-gray-400 font-light leading-relaxed text-center">
              A cinematic vertical timeline of your schedule.
              See where you need to be, who’s teaching,
              and what’s next — without the legacy portal noise.
            </p>

            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-white text-lg font-semibold">Live</div>
                <div className="text-xs uppercase tracking-wider text-white/40">
                  Updates
                </div>
              </div>
              <div>
                <div className="text-white text-lg font-semibold">Smart</div>
                <div className="text-xs uppercase tracking-wider text-white/40">
                  Conflict Detection
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: GRADEX (Text Left, Image Right) */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-0">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 text-purple-400 font-medium tracking-wide text-sm uppercase">
              <TrendingUp size={16} />
              <span>Simulation</span>
            </div>
            <h2 className="text-5xl md:text-5xl font-bold text-white leading-tight">
              Engineer your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                perfect GPA.
              </span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
              Stop guessing your results. Use GradeX to simulate semester outcomes, toggle credit weights, and calculate exactly what you need to score for that 9+ pointer.
            </p>

            {/* Linear-style feature list */}
            <ul className="space-y-3 pt-2 text-gray-500">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px]">1</div>
                <span>Real-time credit normalization</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px]">2</div>
                <span>Weighted average algorithms</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-3xl opacity-10" />
            <Image
              src="https://u.cubeupload.com/Trinai308/b0WDmD.png"
              alt="GradeX Calculator"
              className="relative z-10"
              height={1000}
              width={1000}
            />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent z-20"></div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MARKS (Image Left, Text Right) */}
      <section className="py-16 md:py-24">
        <div className="max-w-9xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-0">
          <div className="flex-1 relative ml-72">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-3xl opacity-10" />
            <Image
              src="https://u.cubeupload.com/Trinai308/NOWxga.png"
              alt="Marks Analytics"
              className="relative z-10"
              height={770}
              width={770}
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-20"></div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 font-medium tracking-wide text-sm uppercase">
              <Users size={16} /> {/* Or a chart icon */}
              <span>Insights</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Performance, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                visualized.
              </span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
              Go beyond raw numbers. Track your academic trajectory with interactive radar charts and trend lines that break down your performance across every cycle test.
            </p>
            <div className="h-px w-full bg-white/10 my-4" />
          </div>
        </div>
      </section>




      {/* Features Section */}
      <section id="features" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpotlightCard spotlightColor="rgba(40, 34, 110, 0.8)">
              <FeatureCard
                icon={Zap}
                title="Real-time Sync"
                description="Updates from your university portal are pushed instantly. Never miss a attendance change or cancellation again."
              />
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(40, 34, 110, 0.8)">
              <FeatureCard
                icon={TrendingUp}
                title="Predictive SGPA"
                description="Simulate your grades before finals week. Know exactly what you need to score to keep that 9.0."
              />
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(40, 34, 110, 0.8)">
              <div className="relative group border border-white/10 text-center rounded-3xl mx-auto transition-all duration-200 p-8 h-full">
                <div className="absolute top-3 right-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/40 mb-9 animate-fade-in">
                  Coming soon
                </div>
                <span className="absolute h-px opacity-100 transition-all duration-500 ease-in-out inset-x-0 top-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-white/50 to-transparent block" />
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white text-left">Notifications</h3>
                <p className="text-gray-400 leading-relaxed mb-2 text-left">
                  Get notified about important events, exams, and deadlines. Stay ahead in your academic life.
                </p>
                <span className="absolute h-px opacity-100 transition-all duration-500 ease-in-out inset-x-0 bottom-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-white/50 to-transparent block" />
              </div></SpotlightCard>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="bg-black py-16 ">
        <div className=" w-[90%] mx-auto justify-center items-center px-6">

          {/* TOP SECTION */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">

            {/* Left: Big Heading */}
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Build better academic habits fast using Vertex.
              </h2>
            </div>

            {/* Right: Contact Info */}
            <div className="flex flex-col gap-6 text-gray-400 text-sm md:text-base">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-white/80" />
                <span className="max-w-[200px]">
                  SRM University, KTR Campus,<br />
                  Chennai, India 603203
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/80" />
                <a href="mailto:vvertexxx.1@gmail.com" className="hover:text-white transition-colors">
                  vvertexxx.1@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          {/* <div className="h-px bg-white/10 w-full my-12" /> */}

          {/* TEXT PRESSURE */}
          <div style={{ position: 'relative', height: 'auto' }}>
            <TextPressure
              text="VERTEX"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={36}
            />
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12">

            {/* Links */}
            <div className="flex items-center gap-8 text-sm font-medium text-white">
              <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
              <Link href="#features" className="hover:text-gray-300 transition-colors">Features</Link>
              <Link href="/works" className="hover:text-gray-300 transition-colors">Works</Link>
              <Link href="https://chat.whatsapp.com/DjBKwQX7iNOHjOidVixxcw" className="hover:text-gray-300 transition-colors">Support</Link>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              &copy; Copyright 2025, All Rights Reserved
            </p>
          </div>

        </div>
      </footer>
    </main>
  );
}
