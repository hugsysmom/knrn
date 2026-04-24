import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowRight, Instagram, Facebook, 
  MapPin, Phone, Mail, ChevronRight, Search 
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'about' | 'works' | 'philosophy' | 'journal' | 'services' | 'contact';

// --- Shared Components ---

const Nav = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: { label: string; id: Page }[] = [
    { label: 'ABOUT', id: 'about' },
    { label: 'WORKS', id: 'works' },
    { label: 'PHILOSOPHY', id: 'philosophy' },
    { label: 'JOURNAL', id: 'journal' },
    { label: 'SERVICES', id: 'services' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const isHomePage = currentPage === 'home';
  const headerContainerClass = isScrolled 
    ? 'bg-white/90 backdrop-blur-md text-primary-black py-4 shadow-sm' 
    : (isHomePage ? 'bg-transparent text-white py-10' : 'bg-transparent text-primary-black py-10');
  
  const headerColorClass = isScrolled 
    ? 'text-primary-black' 
    : (isHomePage ? 'text-white' : 'text-primary-black');
    
  const headerOpacityClass = isScrolled 
    ? 'opacity-40' 
    : (isHomePage ? 'opacity-70' : 'opacity-40');

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${headerContainerClass}`}>
        <div className="knrn-container flex items-center justify-between">
          {/* Logo Left */}
          <button onClick={() => setCurrentPage('home')} className={`group flex flex-col items-start min-w-[200px] transition-colors duration-500`}>
            <span className="text-xl font-serif tracking-[0.2em] font-medium">知冉設計</span>
            <span className={`text-[8px] tracking-[0.4em] ${headerOpacityClass} mt-0.5 leading-none font-sans`}>KNRN DESIGN</span>
          </button>

          {/* Centered Main Menu */}
          <div className="hidden lg:flex items-center justify-center flex-grow space-x-10">
            {menuItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-[12px] tracking-[0.3em] uppercase font-medium transition-all duration-500 hover:opacity-100 ${currentPage === item.id ? 'opacity-100 border-b border-current pb-1' : headerOpacityClass}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search Icon Right */}
          <div className={`flex items-center justify-end min-w-[200px] space-x-6 transition-colors duration-500`}>
            <Search size={22} className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
            
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay (for Mobile) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-[#FBFBF9] z-[100] flex flex-col"
          >
            <div className="knrn-container h-full flex flex-col py-10">
              <div className="flex items-center justify-between mb-24">
                <div className="flex flex-col items-start opacity-40">
                  <span className="text-xl font-serif tracking-[0.2em] font-medium">知冉設計</span>
                  <span className="text-[8px] tracking-[0.4em] mt-0.5 leading-none">KNRN DESIGN</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-4 group"
                >
                  <span className="text-[11px] tracking-[0.3em] uppercase font-medium">Close</span>
                  <X size={20} className="font-light" />
                </button>
              </div>

              <div className="flex-grow flex flex-col md:flex-row justify-between items-end md:items-center">
                <div className="flex flex-col space-y-6 md:space-y-4">
                  {menuItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                    >
                      <button 
                        onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                        className={`text-4xl md:text-7xl font-serif text-left transition-all duration-500 hover:italic hover:pl-6 ${currentPage === item.id ? 'text-primary-black underline underline-offset-8 decoration-1' : 'text-primary-black/30 hover:text-black'}`}
                      >
                        {item.label}
                      </button>
                    </motion.div>
                  ))}
                </div>
                
                <div className="hidden lg:block space-y-12 text-right">
                  <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-30">Social</p>
                    <div className="space-y-2">
                       <p className="text-lg hover:underline cursor-pointer">Instagram</p>
                       <p className="text-lg hover:underline cursor-pointer">Facebook</p>
                       <p className="text-lg hover:underline cursor-pointer">Pinterest</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-30">Office</p>
                    <p className="text-lg max-w-xs ml-auto">台北市大安區<br/>一段123號4樓之5</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => (
  <footer className="bg-primary-black text-primary-white/80 py-24 border-t border-white/10">
    <div className="knrn-container grid grid-cols-1 md:grid-cols-3 gap-16">
      <div className="space-y-8">
        <h3 className="text-2xl font-serif text-white">知冉設計 KNRN</h3>
        <p className="text-sm leading-relaxed max-w-xs opacity-60">
          我們致力於創造具有秩序與美感的空間。透過比例、光線與材料，為每一位客戶建立獨一無二的空間結構。
        </p>
        <div className="flex space-x-6">
          <Instagram size={20} className="opacity-60 hover:opacity-100 cursor-pointer" />
          <Facebook size={20} className="opacity-60 hover:opacity-100 cursor-pointer" />
        </div>
      </div>
      
      <div className="space-y-6">
        <h4 className="text-[12px] tracking-[0.3em] uppercase text-white font-medium">聯絡資訊</h4>
        <ul className="space-y-4 text-sm opacity-60">
          <li className="flex items-center gap-3"><MapPin size={16} /> 台北市大安區某某路 00 號</li>
          <li className="flex items-center gap-3"><Phone size={16} /> +886 2 2345 6789</li>
          <li className="flex items-center gap-3"><Mail size={16} /> contact@knrndesign.com</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-[12px] tracking-[0.3em] uppercase text-white font-medium">訂閱最新動態</h4>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Your Email" 
            className="bg-transparent border-b border-white/20 pb-2 text-sm w-full focus:outline-none focus:border-white transition-colors"
          />
          <button className="border-b border-white/20 pb-2 px-4 hover:text-white"><ArrowRight size={16}/></button>
        </div>
        <p className="text-[10px] opacity-40">© 2024 KNRN DESIGN. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Interior Hero"
            className="w-full h-full object-cover grayscale-[0.3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-5xl md:text-8xl lg:text-[110px] font-serif tracking-[0.1em] mb-10"
          >
            知冉設計
          </motion.h1>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex items-center space-x-6 text-[12px] tracking-[0.4em] uppercase opacity-80"
          >
            <span>Architecture</span>
            <span className="opacity-40">|</span>
            <span>Commercial</span>
          </motion.div>
          
          {/* Bottom text as per Polène reference */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.5 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-4xl w-full px-6"
          >
            <p className="text-[13px] md:text-[15px] leading-relaxed font-light tracking-[0.05em] opacity-80 text-center">
              知冉設計不僅僅是空間的裝修，更是一場關於感官與結構的深刻對話。我們將材料、光與比例交織，創造出平靜且具備觸感的空間地景，邀請使用者放慢腳步，感受形式、雙手與材料之間永恆的連結。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Manifesto */}
      <section className="py-40 bg-primary-white">
        <div className="knrn-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-12">
              <h2 className="text-4xl md:text-6xl text-primary-black font-serif leading-[1.3]">
                設計不是風格，而是長時間<br/>成立的空間結構。
              </h2>
              <p className="text-lg text-primary-black/60 leading-relaxed font-light max-w-2xl">
                知冉設計專注於住宅設計、商業空間設計與品牌空間規劃，透過比例、光線與材料建立空間秩序。我們相信好的設計不應隨波逐流，而是能經得起時間考驗的結構。
              </p>
              <button className="flex items-center group space-x-4 text-[12px] tracking-[0.3em] uppercase font-medium">
                <span>關於知冉</span>
                <div className="w-12 h-px bg-primary-black group-hover:w-20 transition-all duration-500" />
              </button>
            </div>
            <div className="lg:col-span-5 aspect-[4/5] bg-warm-gray-light overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                 alt="Manifesto detail"
                 className="w-full h-full object-cover mix-blend-multiply opacity-80"
                 referrerPolicy="no-referrer"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works - Custom Grid */}
      <section className="py-24 bg-[#F5F3F1]">
        <div className="knrn-container mb-24 flex justify-between items-end">
          <div className="space-y-4">
             <span className="text-[11px] tracking-[0.4em] text-warm-gray font-medium uppercase font-sans">Portfolio</span>
             <h2 className="text-4xl md:text-5xl font-serif">精選作品</h2>
          </div>
          <p className="text-sm opacity-40 hidden md:block">Residential / Commercial / Retail</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-warm-gray/20 border-y border-warm-gray/20">
          {[
            { title: "光之住宅 Light Abode", cat: "住宅設計", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000", col: "md:col-span-8" },
            { title: "極簡咖啡藝廊 Mono Cafe", cat: "商業空間", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000", col: "md:col-span-4" },
            { title: "微光診所 Clinic", cat: "醫療空間", img: "https://images.unsplash.com/photo-1629909613654-28a3a7c4d459?q=80&w=1000", col: "md:col-span-4" },
            { title: "山間居所 Hillside", cat: "住宅設計", img: "https://images.unsplash.com/photo-1600566753190-17f0f670e304?q=80&w=1000", col: "md:col-span-8" }
          ].map((item, idx) => (
            <div key={idx} className={`${item.col} group relative aspect-video md:aspect-auto h-[600px] overflow-hidden bg-white`}>
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-full p-12 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="text-[10px] tracking-[0.3em] text-white/70 uppercase block mb-3">{item.cat}</span>
                <h3 className="text-3xl text-white font-serif">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <button className="text-[12px] tracking-[0.4em] uppercase border-b border-primary-black pb-2 hover:text-warm-gray hover:border-warm-gray transition-colors">
              View All Works
           </button>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-40 bg-primary-white">
        <div className="knrn-container text-center max-w-4xl">
           <span className="text-[11px] tracking-[0.4em] text-warm-gray font-medium uppercase mb-8 block">Philosophy</span>
           <h2 className="text-4xl md:text-6xl font-serif mb-12 italic leading-tight">"比例是空間的骨架，光線則是它的呼吸。"</h2>
           <p className="text-lg opacity-60 font-light leading-relaxed mb-12">
             我們深耕空間比例、光線設計與材料研究。在每一個案中，我們不僅是在裝潢空間，更是在為空間策劃一套長久運行的生存策略。
           </p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24">
              {[
                { label: "比例 Proportion", icon: "01" },
                { label: "光線 Light", icon: "02" },
                { label: "材料 Materials", icon: "03" },
                { label: "策略 Strategy", icon: "04" }
              ].map(item => (
                <div key={item.icon} className="space-y-4">
                  <span className="text-2xl font-serif opacity-20">{item.icon}</span>
                  <p className="text-[12px] tracking-widest font-medium uppercase">{item.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}

// --- Works Page Component ---
const WorksPage = () => {
  const categories = ["All", "Residential", "Commercial", "Medical", "Retail", "Other"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  return (
    <div className="pb-40 pt-48 bg-primary-white">
      <div className="knrn-container">
         {/* Mujie Style Header */}
         <div className="text-center mb-32 space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.5em] text-primary-black/30 uppercase font-bold">Portfolio</span>
              <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-primary-black">精選作品</h1>
            </div>
            
            {/* Category Filter - Mujie Design Style */}
            <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-6">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] tracking-[0.3em] uppercase font-medium transition-all duration-500 relative pb-2 group ${activeCategory === cat ? 'text-primary-black' : 'text-primary-black/30 hover:text-primary-black'}`}
                >
                  {cat}
                  <span className={`absolute bottom-0 left-0 h-px bg-primary-black transition-all duration-500 ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              ))}
            </div>
         </div>

         {/* Grid - Mujie Design Style (3:4 ratio) */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
           {[
             { title: "光之住宅 Light Abode", cat: "Residential", loc: "Taipei", id: 1 },
             { title: "極簡咖啡藝廊 Mono Cafe", cat: "Commercial", loc: "Taichung", id: 2 },
             { title: "微光診所 Clinic", cat: "Medical", loc: "Taipei", id: 3 },
             { title: "山間居所 Hillside", cat: "Residential", loc: "Yilan", id: 4 },
             { title: "幾何辦公室 Geometry", cat: "Commercial", loc: "Taipei", id: 5 },
             { title: "原木茶屋 Wood Tea", cat: "Retail", loc: "Kyoto", id: 6 },
             { title: "雲端住宅 Cloud House", cat: "Residential", loc: "Taipei", id: 7 },
             { title: "律動診所 Rhythm", cat: "Medical", loc: "Hsinchu", id: 8 },
             { title: "靜謐居所 Silent", cat: "Residential", loc: "Taipei", id: 9 },
           ].map((project, i) => (
             <motion.div 
               key={project.id} 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1, delay: (i % 3) * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
               className="group cursor-pointer"
             >
                <div className="aspect-[3/4] bg-warm-gray-light overflow-hidden mb-8 relative">
                  <motion.img 
                    src={`https://picsum.photos/seed/knrn_project_${project.id}/1200/1600`} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                    whileHover={{ scale: 1.05 }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center space-x-3 text-[10px] tracking-[0.3em] uppercase text-primary-black/30 font-bold">
                    <span>{project.cat}</span>
                    <span className="w-1 h-1 bg-black/20 rounded-full" />
                    <span>{project.loc}</span>
                  </div>
                  <h3 className="text-xl md:text-[22px] font-serif tracking-wide text-primary-black group-hover:text-warm-gray transition-colors duration-500">
                    {project.title}
                  </h3>
                </div>
             </motion.div>
           ))}
         </div>

         <div className="mt-40 text-center">
            <button className="px-20 py-6 border border-black/10 text-[11px] tracking-[0.5em] uppercase hover:bg-black hover:text-white transition-all duration-700 font-medium">
              Load More Projects
            </button>
         </div>
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'works': return <WorksPage />;
      case 'about': return (
        <div className="pb-40 pt-48">
          <div className="knrn-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                <h1 className="text-7xl font-serif">About <span className="block italic opacity-40">KNRN</span></h1>
                <div className="space-y-8 text-lg font-light leading-relaxed opacity-80">
                  <p>知冉設計（KNRN Design）專注於住宅設計、商業空間設計與品牌空間規劃。</p>
                  <p>我們認為室內設計不應該只是表面材的堆砌，而是基於深思熟慮的「比例」跟「結構」。</p>
                  <p>透過光線的精準導引，與材料原始質感的呈現，我們為每一位使用者創造平靜且具備深度的居住體驗。</p>
                </div>
                <div className="grid grid-cols-2 gap-12 border-t border-black/10 pt-12">
                  <div>
                    <h4 className="text-[12px] tracking-widest uppercase font-semibold mb-4">核心價值</h4>
                    <ul className="text-sm space-y-2 opacity-60">
                      <li>極致比例</li>
                      <li>自然採光</li>
                      <li>真誠材料</li>
                      <li>空間秩序</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[12px] tracking-widest uppercase font-semibold mb-4">服務項目</h4>
                    <ul className="text-sm space-y-2 opacity-60">
                      <li>住宅空間規畫</li>
                      <li>商空品牌設計</li>
                      <li>辦公室空間設計</li>
                      <li>醫療診所規畫</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="aspect-[4/5] bg-warm-gray-light">
                 <img 
                   src="https://images.unsplash.com/photo-1497366754035-7c702683ac82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                   alt="Office"
                   className="w-full h-full object-cover grayscale"
                   referrerPolicy="no-referrer"
                 />
              </div>
            </div>
          </div>
        </div>
      );
      case 'contact': return (
        <div className="pb-40 pt-48">
          <div className="knrn-container">
            <div className="max-w-screen-xl mx-auto">
              <h1 className="text-7xl font-serif mb-24">Start a Connection</h1>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                <div className="lg:col-span-5 space-y-16">
                  <div className="space-y-6">
                    <h4 className="text-[12px] tracking-[0.4em] uppercase font-bold">Office Address</h4>
                    <p className="text-2xl font-serif leading-relaxed">
                      台北市大安區<br/>一段123號4樓之5
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[12px] tracking-[0.4em] uppercase font-bold">Business Inquiry</h4>
                    <p className="text-2xl font-serif leading-relaxed">
                      +886 2 1234 5678<br/>
                      hello@knrndesign.com
                    </p>
                  </div>
                  <div className="flex space-x-8 pt-8">
                    <Instagram size={24} />
                    <Facebook size={24} />
                  </div>
                </div>
                <div className="lg:col-span-7 bg-white p-12 md:p-20 border border-black/5">
                  <form className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="group border-b border-black/10 focus-within:border-black transition-colors">
                         <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2">Full Name</label>
                         <input type="text" className="w-full bg-transparent py-4 focus:outline-none font-serif text-xl" placeholder="Your name" />
                       </div>
                       <div className="group border-b border-black/10 focus-within:border-black transition-colors">
                         <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2">Email</label>
                         <input type="email" className="w-full bg-transparent py-4 focus:outline-none font-serif text-xl" placeholder="Your email" />
                       </div>
                    </div>
                    <div className="group border-b border-black/10 focus-within:border-black transition-colors">
                       <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2">Project Type</label>
                       <select className="w-full bg-transparent py-4 focus:outline-none font-serif text-xl appearance-none">
                         <option>Residential</option>
                         <option>Commercial</option>
                         <option>Brand Identity</option>
                       </select>
                    </div>
                    <div className="group border-b border-black/10 focus-within:border-black transition-colors">
                       <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2">Message</label>
                       <textarea rows={4} className="w-full bg-transparent py-4 focus:outline-none font-serif text-xl resize-none" placeholder="Tell us about your space..." />
                    </div>
                    <button className="w-full bg-primary-black text-white py-6 tracking-[0.5em] uppercase hover:bg-warm-gray transition-colors duration-500">
                      Send Inquiry
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      case 'philosophy': return (
        <div className="pb-40 pt-48">
          <div className="knrn-container">
            <div className="mb-24 max-w-2xl">
               <h1 className="text-7xl font-serif mb-8">Philosophy</h1>
               <p className="text-xl opacity-60 font-light italic leading-loose">
                 "我們追求的不是表象的裝飾，而是深層的空間詩意。"
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
               {[
                 { title: "空間比例 Proportion", desc: "比例是所有美學的基礎。我們從建築尺度出發，思考光線落下的角度與人體感官的互動。", img: "https://images.unsplash.com/photo-1510674485131-dc88d96369b4?q=80&w=1000" },
                 { title: "光線設計 Lighting", desc: "光線不只是照明，它是時間的影子。我們導引自然光，讓空間隨著晝夜更迭呈現迷人的層次。", img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000" },
                 { title: "材料研究 Materials", desc: "材料是觸覺的語言。我們研究石材的冷峻與木材的溫潤，透過真實的質地構築誠實的氛圍。", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000" },
                 { title: "空間策略 Strategy", desc: "設計是解決問題的過程。我們從生活習性與品牌定位出發，為每一平方米訂定清晰的邏輯。", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000" }
               ].map((item, idx) => (
                 <div key={idx} className="space-y-8 group">
                   <div className="aspect-video bg-warm-gray-light overflow-hidden">
                     <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                   </div>
                   <h3 className="text-3xl font-serif">{item.title}</h3>
                   <p className="text-primary-black/60 leading-relaxed font-light">{item.desc}</p>
                   <button className="flex items-center space-x-2 text-[10px] tracking-widest uppercase font-bold text-warm-gray hover:text-black transition-colors">
                     <span>Read More</span>
                     <ChevronRight size={14} />
                   </button>
                 </div>
               ))}
            </div>
          </div>
        </div>
      );
      case 'journal': return (
        <div className="pb-40 pt-48">
          <div className="knrn-container">
            <h1 className="text-7xl font-serif mb-24">Journal</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { date: "2024.03.12", title: "極簡主義的當代演繹", cat: "設計思考" },
                { date: "2024.02.28", title: "石材與木質的異材質接合研究", cat: "材料介紹" },
                { date: "2024.01.15", title: "2024米蘭設計週觀察報告", cat: "設計趨勢" },
                { date: "2023.12.10", title: "商空設計中的光影敘事", cat: "案例分析" },
              ].map((item, idx) => (
                <div key={idx} className="border-t border-black/10 pt-8 space-y-6 group cursor-pointer">
                  <div className="flex justify-between items-center text-[10px] tracking-widest uppercase opacity-40">
                    <span>{item.date}</span>
                    <span className="border border-black/20 px-2 py-0.5 rounded-full">{item.cat}</span>
                  </div>
                  <h3 className="text-2xl font-serif leading-snug group-hover:text-warm-gray transition-colors">{item.title}</h3>
                  <div className="aspect-[4/3] bg-warm-gray-light overflow-hidden">
                    <img src={`https://picsum.photos/seed/journal${idx}/800/600`} alt="Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      case 'services': return (
        <div className="pb-40 pt-48">
          <div className="knrn-container">
            <div className="mb-32 text-center max-w-3xl mx-auto">
               <h1 className="text-7xl font-serif mb-8">Process</h1>
               <p className="text-lg opacity-60 font-light">
                 從初步溝通到完工驗收，我們以嚴謹的標準確保每一個細節都能完美呈現設計初衷。
               </p>
            </div>
            
            <div className="space-y-32">
               {[
                 { step: "01", title: "需求訪談與風格定位", desc: "了解您的生活習慣、偏好與預算空間。建立初步的設計方向與風格基調。" },
                 { step: "02", title: "空間規劃與平面提案", desc: "根據現場勘查數據，進行空間佈局規劃。提供初步平面圖解與比例建議。" },
                 { step: "03", title: "立面設計與材料選定", desc: "深化的立面圖面與3D模擬呈現。精選實體材料樣板，確認質感與光澤。" },
                 { step: "04", title: "施工圖說與工程造價", desc: "繪製詳盡的施工大樣圖，確保施工精準。提供透明、完整的工程預算清單。" },
                 { step: "05", title: "工程發包與現場監造", desc: "嚴選施工團隊，駐地監造確保品質。定期提供工程進度報告與現場照。" },
                 { step: "06", title: "家具採購與完工交屋", desc: "協助選購與配置家具家飾。專業細部清潔與驗收，正式交付空間。" }
               ].map((item, idx) => (
                 <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start group">
                    <div className="md:col-span-2 text-7xl font-serif opacity-10 group-hover:opacity-100 transition-opacity duration-1000">
                      {item.step}
                    </div>
                    <div className="md:col-span-4 py-4">
                      <h3 className="text-3xl font-serif mb-6">{item.title}</h3>
                      <p className="text-primary-black/60 font-light leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="md:col-span-6 aspect-video bg-warm-gray-light overflow-hidden rotate-1 group-hover:rotate-0 transition-transform duration-700">
                       <img src={`https://picsum.photos/seed/process${idx}/1000/600`} alt="Process" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-48 bg-primary-black text-white p-24 text-center">
               <h2 className="text-4xl md:text-6xl font-serif mb-12">準備好開啟您的空間旅程了嗎？</h2>
               <button 
                 onClick={() => setCurrentPage('contact')}
                 className="inline-flex items-center space-x-6 border border-white/20 px-16 py-6 tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500"
               >
                 <span>預約諮詢</span>
                 <ArrowRight size={20} />
               </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
