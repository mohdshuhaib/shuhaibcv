"use client";

import React, { useState, useRef, MouseEvent, ReactNode } from "react";
import {
  Mail,
  Smartphone,
  Calendar,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Github,
  ChevronDown,
  BookOpen,
  Eye,
  Send,
  MonitorPlay,
  Layout,
  Briefcase,
  Quote,
} from "lucide-react";

// --- DATA ---
const personalInfo = {
  name: "Mohammed Shuhaib M",
  title: "Web developer",
  image: "/profimg.jpeg", // Replace with your actual image path or standard placeholder
  email: "hafizshuhaibwafy@gmail.com",
  phone: "+91 9645184118",
  birthday: "December 15, 2003",
  location: "Thiruvananthapuram, Kerala, India",
  socials: [
    { icon: Facebook, link: "https://www.facebook.com/tvmshuhaib" },
    { icon: Twitter, link: "https://x.com/hafiz_shuhaib" },
    { icon: Instagram, link: "https://www.instagram.com/hafiz_shuhaib_tvm/" },
    { icon: Github, link: "https://github.com/mohdshuhaib" },
  ],
};

const services = [
  {
    title: "Web design",
    description: "Expert in designing intuitive and visually appealing web interfaces using React, focusing on responsive layouts and seamless user experiences.",
    icon: Layout,
  },
  {
    title: "Web development",
    description: "Experienced in building full-stack web applications using tools like NextJS, Supabase, TailwindCSS, Vercel to create dynamic, scalable, and robust solutions.",
    icon: MonitorPlay,
  },
  {
    title: "Mobile apps",
    description: "Skilled in developing cross-platform mobile applications using React Native, delivering efficient, responsive, and user-friendly experiences.",
    icon: Smartphone,
  },
  {
    title: "Office Productivity",
    description: "Proficient in managing and optimizing tasks using Microsoft Office tools, including Word, Excel, and PowerPoint, to enhance efficiency.",
    icon: Briefcase,
  },
];

const testimonials = [
  {
    name: "Basith, Graphic Designer",
    image: "/baith manu.png",
    text: `"I had the pleasure of working with Shuhaib on my portfolio, and the experience was exceptional. The website perfectly captures my work and creativity, and the design is both professional and engaging. As a graphic designer working with multiple companies, having a portfolio that stands out is crucial, and Shuhaib delivered beyond my expectations."`,
  },
  {
    name: "Murshid, Video Editor",
    image: "/mursh.png",
    text: `"Shuhaib crafted an amazing portfolio that truly showcases my skills as a video editor and photographer. The design is sleek, and the functionality is seamless, making it easy for clients to view my work. Shuhaib captured the essence of my brand and presented it in a way that is both visually stunning and highly professional."`,
  },
  {
    name: "Safvan, Fest Convener",
    image: "/safu.png",
    text: `"Shuhaib developed a fantastic website for our college fest, i'm the fest convener of PMSA College (2024-25) streamlining all our work and making the event a huge success. The site was not only visually appealing but also incredibly user-friendly, allowing us to manage updates, schedules, and team scores with ease."`,
  },
];

const timeline = {
  education: [
    { title: "Darul Huda, Kollam, Kerala", years: "2013 — 2017", description: "Pursued Hifzul Quran education alongside completing studies up to the 9th standard. Fostered discipline, dedication, and a deep understanding of Islamic teachings." },
    { title: "MBHS Kaniyapuram & KYHSS Malappuram", years: "2018 — 2020", description: "Completed 10th standard in 2018. Pursued Humanities from 2018 to 2020. Nurtured critical thinking, communication skills, and a passion for social sciences." },
    { title: "PMSA College, Malappuram, Kerala", years: "2021 — Present", description: "Pursuing Wafy degree and BA Politics at Calicut University. Enrolled in Web Development Course in NodDesk Company. Preparing to address contemporary societal challenges." },
  ],
  experience: [
    { title: "Portfolio Website Developer", years: "2022 — Present", description: "Created custom portfolio websites for various clients, tailoring each site to showcase their individual work and brand effectively. Delivered responsive and optimized websites." },
    { title: "Web Developer - MASA Fest 2023-24", years: "2023 — 2024", description: "Developed and maintained the official website for MASA Fest 2023-24, enhancing the event's online presence with dynamic features and real-time updates." },
    { title: "Web Developer - MASA Fest 2024-25", years: "2024 — 2025", description: "Led the development of the MASA Fest 2024-25 website, focusing on creating an engaging and functional platform for the college fest." },
    { title: "Web Developer - WSF Sports Meet 2025-26", years: "2025 — 2026", description: "Led the development of the WSF Sports Meet 2024-25 website. Designed and implemented advanced features, including live score updates and event schedules." },
  ],
};

const skills = [
  { name: "Web design", value: 95 },
  { name: "Web developing", value: 60 },
  { name: "Graphic design", value: 50 },
  { name: "Office Productivity", value: 90 },
];

const projects = [
  { title: "Linu Ice Cream Saudi", category: "Web design", image: "/linu.png", link: "https://www.linuicecream.com/" },
  { title: "Tammaz Restaurant saudi", category: "Web design", image: "/tammaz.png", link: "https://tammaz.net/" },
  { title: "Pothu Way fest", category: "Web development", image: "/pothuport.png", link: "https://pmsamasa.github.io/fest/" },
  { title: "Pachamme Tottoli fest", category: "Web development", image: "/pachammeport.png", link: "https://masapmsa2025.github.io/fest/" },
  { title: "Portfolio Basith", category: "Web design", image: "https://github.com/mohdshuhaib/myImages/blob/main/basiport.png?raw=true", link: "https://basithmanoorcv.vercel.app/" },
  { title: "Portfolio Murshid", category: "Web design", image: "https://github.com/mohdshuhaib/myImages/blob/main/murshiport.png?raw=true", link: "https://mohdmurshi.github.io/murshidcv/" },
  { title: "Samastha Motto Competition", category: "Others", image: "https://github.com/mohdshuhaib/myImages/blob/main/motto.png?raw=true", link: "https://inshirah-pmsa.github.io/samasthaMotto/" },
  { title: "WSF Sports Meet Dashboard", category: "Web development", image: "https://github.com/mohdshuhaib/myImages/blob/main/wafysports.png?raw=true", link: "https://5thwafysports.vercel.app/" },
];

// --- 3D TILT CARD WRAPPER ---
const TiltCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
      }}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
    >
      {children}
    </div>
  );
};

// --- COMPONENTS ---
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl relative lg:sticky lg:top-8 h-max overflow-hidden transition-all duration-500 z-10">
      <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-6 relative">
        <div className="w-24 h-24 lg:w-36 lg:h-36 rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-700 to-neutral-800 shadow-xl shrink-0 flex items-center justify-center">
          <img
            src={personalInfo.image}
            alt={personalInfo.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://ui-avatars.com/api/?name=Mohammed+Shuhaib&background=2b2b2c&color=ffdb70&size=150";
            }}
          />
        </div>

        <div className="text-left lg:text-center flex-1">
          <h1 className="text-white text-xl lg:text-2xl font-semibold mb-2 tracking-wide">
            {personalInfo.name}
          </h1>
          <p className="bg-neutral-800 text-white text-xs lg:text-sm px-4 py-1.5 rounded-lg inline-block font-light shadow-inner">
            {personalInfo.title}
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden absolute top-0 right-0 p-2 text-[#ffdb70] bg-neutral-800 rounded-bl-2xl rounded-tr-2xl shadow-lg border border-neutral-700"
        >
          {isOpen ? <ChevronDown className="rotate-180 transition-transform" /> : <ChevronDown className="transition-transform" />}
        </button>
      </div>

      <div className={`transition-all duration-500 ease-in-out lg:opacity-100 lg:max-h-[1000px] overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 lg:mt-6'}`}>
        <div className="h-px w-full bg-neutral-800 my-6 hidden lg:block"></div>

        <ul className="flex flex-col gap-6">
          <ContactItem icon={Mail} title="Email" value={personalInfo.email} link={`mailto:${personalInfo.email}`} />
          <ContactItem icon={Smartphone} title="Phone" value={personalInfo.phone} link={`https://wa.link/o1e718`} />
          <ContactItem icon={Calendar} title="Birthday" value={personalInfo.birthday} />
          <ContactItem icon={MapPin} title="Location" value={personalInfo.location} />
        </ul>

        <div className="h-px w-full bg-neutral-800 my-6"></div>

        <ul className="flex justify-start lg:justify-center gap-4">
          {personalInfo.socials.map((social, idx) => (
            <li key={idx}>
              <a href={social.link} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-[#ffdb70] transition-colors duration-300">
                <social.icon size={20} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const ContactItem = ({ icon: Icon, title, value, link }: any) => (
  <li className="flex items-center gap-4 group">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex justify-center items-center text-[#ffdb70] shadow-md group-hover:shadow-[#ffdb70]/20 transition-all duration-300">
      <Icon size={20} className="group-hover:scale-110 transition-transform" />
    </div>
    <div className="w-[calc(100%-4rem)]">
      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">{title}</p>
      {link ? (
        <a href={link} className="text-white text-sm hover:text-[#ffdb70] transition-colors truncate block">
          {value}
        </a>
      ) : (
        <p className="text-white text-sm truncate">{value}</p>
      )}
    </div>
  </li>
);

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) => {
  const tabs = ["About", "Resume", "Portfolio", "Contact"];
  return (
    <nav className="fixed bottom-0 left-0 w-full lg:absolute lg:top-0 lg:bottom-auto lg:right-0 lg:w-max bg-neutral-900/80 lg:bg-neutral-800/90 backdrop-blur-md border border-neutral-800 lg:rounded-bl-3xl lg:rounded-tr-3xl z-50">
      <ul className="flex justify-center lg:justify-start gap-2 lg:gap-8 px-6 lg:px-12 py-4 lg:py-5">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => setActiveTab(tab)}
              className={`text-sm lg:text-base font-medium transition-colors duration-300 ${
                activeTab === tab ? "text-[#ffdb70]" : "text-neutral-300 hover:text-white"
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-8 relative">
    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">{title}</h2>
    <div className="h-1.5 w-12 bg-gradient-to-r from-[#ffdb70] to-yellow-500 rounded-full"></div>
  </div>
);

const AboutSection = () => (
  <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <SectionHeader title="About me" />
    <div className="text-neutral-300 space-y-4 text-sm lg:text-base leading-relaxed font-light">
      <p>
        I'm Mohammed Shuhaib, a passionate web developer on a journey to transform your digital dreams into reality.
        I enjoy turning complex problems into simple, beautiful, and intuitive designs.
      </p>
      <p>
        With a foundation in +2 education and specialized training as a web developer, I breathe life into websites
        with my coding prowess. At 20 years young, I'm driven by an insatiable appetite for learning and a
        relentless work ethic that fuels my dedication to perfection.
      </p>
    </div>

    <h3 className="text-2xl font-semibold text-white mt-12 mb-6">What I'm Doing</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {services.map((service, idx) => (
        <TiltCard key={idx}>
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-800 p-6 rounded-2xl h-full shadow-lg flex items-start gap-4 group">
            <div className="text-[#ffdb70] mt-1 group-hover:scale-110 transition-transform">
              <service.icon size={36} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">{service.title}</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          </div>
        </TiltCard>
      ))}
    </div>

    <h3 className="text-2xl font-semibold text-white mt-12 mb-6">Testimonials</h3>
    <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
      {testimonials.map((test, idx) => (
        <TiltCard key={idx} className="min-w-[100%] lg:min-w-[calc(50%-12px)] snap-center">
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-800 p-8 pt-12 rounded-2xl shadow-lg relative mt-8 h-[calc(100%-2rem)]">
            <div className="absolute -top-8 left-8 w-16 h-16 rounded-xl overflow-hidden border-2 border-neutral-700 shadow-xl bg-neutral-800">
              <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-white font-medium mb-4 ml-1">{test.name}</h4>
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 text-neutral-700 opacity-50 rotate-180 w-8 h-8" />
              <p className="text-neutral-400 text-sm leading-relaxed relative z-10 italic">
                {test.text}
              </p>
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  </section>
);

const ResumeSection = () => (
  <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <SectionHeader title="Resume" />

    <div className="mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center text-[#ffdb70] shadow-md border border-neutral-700">
          <BookOpen size={24} />
        </div>
        <h3 className="text-2xl font-semibold text-white">Education</h3>
      </div>
      <div className="ml-6 border-l-2 border-neutral-800 pl-8 space-y-10 relative">
        {timeline.education.map((item, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute w-4 h-4 bg-[#ffdb70] rounded-full -left-[41px] top-1 shadow-[0_0_0_4px_#171717] group-hover:scale-125 transition-transform duration-300"></div>
            <h4 className="text-white font-medium text-lg mb-1">{item.title}</h4>
            <span className="text-[#ffdb70] text-sm font-medium mb-3 inline-block">{item.years}</span>
            <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center text-[#ffdb70] shadow-md border border-neutral-700">
          <Briefcase size={24} />
        </div>
        <h3 className="text-2xl font-semibold text-white">Experience</h3>
      </div>
      <div className="ml-6 border-l-2 border-neutral-800 pl-8 space-y-10 relative">
        {timeline.experience.map((item, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute w-4 h-4 bg-[#ffdb70] rounded-full -left-[41px] top-1 shadow-[0_0_0_4px_#171717] group-hover:scale-125 transition-transform duration-300"></div>
            <h4 className="text-white font-medium text-lg mb-1">{item.title}</h4>
            <span className="text-[#ffdb70] text-sm font-medium mb-3 inline-block">{item.years}</span>
            <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-semibold text-white mb-8">My Skills</h3>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg">
        <div className="space-y-6">
          {skills.map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-white font-medium">{skill.name}</h5>
                <span className="text-neutral-400 text-sm">{skill.value}%</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#ffdb70] to-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PortfolioSection = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web design", "Web development", "Others"];

  const filteredProjects = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader title="Portfolio" />

      <ul className="flex flex-wrap items-center gap-4 lg:gap-8 mb-8 text-sm lg:text-base">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => setFilter(cat)}
              className={`transition-colors duration-300 ${
                filter === cat ? "text-[#ffdb70] font-medium" : "text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <TiltCard key={idx}>
            <a href={project.link} target="_blank" rel="noreferrer" className="block group">
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3] bg-neutral-800">
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-[#ffdb70] transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                    <Eye size={24} />
                  </div>
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-white font-medium text-lg mb-1 group-hover:text-[#ffdb70] transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-sm">{project.category}</p>
            </a>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <SectionHeader title="Contact" />

    <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-lg mb-10 h-80">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4021.6496218717025!2d76.81585067506543!3d8.633718995051082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05eb02c272f0e3%3A0x8754a3987addaa7d!2sMadeena%20Manzil!5e1!3m2!1sen!2sin!4v1724516487313!5m2!1sen!2sin"
        width="100%"
        height="100%"
        loading="lazy"
        className="grayscale invert opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700"
      ></iframe>
    </div>

    <h3 className="text-2xl font-semibold text-white mb-6">Contact Form</h3>
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Full name"
          required
          className="w-full bg-neutral-900 border border-neutral-800 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-[#ffdb70] transition-colors shadow-inner"
        />
        <input
          type="email"
          placeholder="Email address"
          required
          className="w-full bg-neutral-900 border border-neutral-800 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-[#ffdb70] transition-colors shadow-inner"
        />
      </div>
      <textarea
        placeholder="Your Message"
        required
        className="w-full bg-neutral-900 border border-neutral-800 text-white px-6 py-4 rounded-xl h-40 resize-none focus:outline-none focus:border-[#ffdb70] transition-colors shadow-inner"
      ></textarea>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-neutral-800 hover:bg-neutral-700 text-[#ffdb70] border border-neutral-700 hover:border-[#ffdb70] transition-all duration-300 px-8 py-4 rounded-xl font-medium flex items-center gap-3 group shadow-lg"
        >
          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          Send Message
        </button>
      </div>
    </form>
  </section>
);

// --- MAIN PAGE (APP) ---
export default function App() {
  const [activeTab, setActiveTab] = useState("About");

  return (
    <div className="min-h-screen bg-[#121212] text-neutral-300 font-sans selection:bg-[#ffdb70] selection:text-black py-8 lg:py-16 px-4 sm:px-8">
      {/* Background radial gradient effect */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800/30 via-[#121212] to-[#121212] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 relative z-10">

        {/* Sidebar Component */}
        <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden pb-24 lg:pb-10 min-h-[70vh]">

          {/* Navigation */}
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Render Active Tab Content with a wrapper for absolute positioning context if needed */}
          <div className="mt-4 lg:mt-8">
            {activeTab === "About" && <AboutSection />}
            {activeTab === "Resume" && <ResumeSection />}
            {activeTab === "Portfolio" && <PortfolioSection />}
            {activeTab === "Contact" && <ContactSection />}
          </div>

        </div>
      </div>

      {/* Helper utility styles that aren't native standard tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
