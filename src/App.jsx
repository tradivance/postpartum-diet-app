import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, CheckCircle,
  LayoutDashboard, PieChart, Activity, Users,
  Lightbulb, ArrowLeftRight, Code, Bell,
  ArrowRight, Plus, Minus, ChevronLeft, ChevronRight
} from 'lucide-react';
import PostpartumDietPage from './PostpartumDietPage';

// --- Colors & Styles ---
const colors = {
  primary: '#051C2C',    // Base Color (Very Dark Navy)
  accent: '#2251FF',     // Accent Color (Vivid Blue)
  bgLight: '#f0f4f8',    // Very Light Blue/Gray Background
  textGray: '#64748b',   // Muted Text
  white: '#ffffff',
};

// --- Animation Components ---

// Scroll Reveal Component
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- UI Components ---

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'ホーム', href: '#' },
    { name: '特徴', href: '#features' },
    { name: '機能', href: '#functions' },
    { name: '料金', href: '#pricing' },
    { name: 'よくある質問', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 font-bold text-2xl cursor-pointer hover:opacity-80 transition-opacity"
          style={{ color: colors.primary }}
        >
          <div className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-black tracking-tighter" style={{ backgroundColor: colors.primary }}>AI</div>
          <span>AI SincStudio</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-bold text-gray-600 hover:text-[#2251FF] transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="font-bold text-sm hover:opacity-70 transition-opacity" style={{ color: colors.primary }}>
            資料ダウンロード
          </button>
          <button className="text-white text-sm font-bold px-6 py-2.5 rounded-md transition-all shadow-lg hover:-translate-y-0.5" style={{ backgroundColor: colors.accent }}>
            お問い合わせ
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" style={{ color: colors.primary }}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-xl h-screen">
          {links.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-800 py-2">
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <button className="w-full py-4 border font-bold rounded-md" style={{ borderColor: colors.primary, color: colors.primary }}>
              資料ダウンロード
            </button>
            <button className="w-full py-4 text-white font-bold rounded-md" style={{ backgroundColor: colors.accent }}>
              お問い合わせ
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200", // Dashboard 1
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200", // Dashboard 2
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200"  // Dashboard 3
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white aspect-[4/3] md:aspect-[16/10] w-full group border border-gray-100">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#051C2C]/10 to-transparent" />
        </div>
      ))}
      
      {/* Carousel Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white text-[#051C2C] shadow-md transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white text-[#051C2C] shadow-md transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Column: Text Content */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <Reveal>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6" style={{ color: colors.primary }}>
              資産のすべてを把握し、<br />
              利益を最大化する。
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              収益、オフィス、保険など、企業のすべての資産をひとつに。<br className="hidden lg:block" />
              AI SincStudioは、戦略的な投資判断と従業員支援を同時に実現する、<br className="hidden lg:block" />
              次世代の資産管理プラットフォームです。
            </p>
          </Reveal>
          
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="bg-white text-[#051C2C] border-2 font-bold px-8 py-3.5 rounded-md text-base hover:bg-gray-50 transition-all" style={{ borderColor: colors.primary }}>
                資料ダウンロード
              </button>
              <button className="text-white font-bold px-8 py-3.5 rounded-md text-base hover:shadow-lg transition-all hover:-translate-y-0.5" style={{ backgroundColor: colors.accent }}>
                お問い合わせ
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Carousel */}
        <div className="order-1 lg:order-2 w-full max-w-2xl mx-auto lg:max-w-none">
          <Reveal delay={200} className="relative">
            {/* Decorative background shape behind the image */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-blue-50 rounded-3xl transform rotate-3 -z-10" />
            <div className="absolute -bottom-10 -left-6 w-2/3 h-2/3 bg-gray-50 rounded-full blur-3xl -z-10" />
            
            <HeroCarousel />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const LogoTicker = () => {
  const logos = ['Esenta', 'Vertexia', 'Fortitude', 'Solidora', 'Nortac', 'Inventura'];

  return (
    <div className="py-10 border-y border-gray-100 bg-white overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .logo-scroll {
          animation: scroll-left 30s linear infinite;
        }
        .logo-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-sm font-bold text-gray-400 tracking-widest uppercase text-center">導入企業</p>
      </div>

      <div className="w-full overflow-hidden">
        <div className="flex gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 logo-scroll whitespace-nowrap">
          {/* Original logos */}
          {logos.map((logo, i) => (
            <span key={i} className="text-xl md:text-2xl font-bold font-sans tracking-tight flex-shrink-0">{logo}</span>
          ))}
          {/* Duplicated logos for seamless loop */}
          {logos.map((logo, i) => (
            <span key={`duplicate-${i}`} className="text-xl md:text-2xl font-bold font-sans tracking-tight flex-shrink-0">{logo}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Problem = () => {
  const problems = [
    {
      title: "会社全体の\n“資産の全体像”が\n見えていない",
      desc: "部門ごとに管理がバラバラで、今会社にどれだけの資産があり、どう活用できるかの全体像が把握できていない。"
    },
    {
      title: "会社として\n内部留保をうまく投資に\n回せていない",
      desc: "資産としての余力はあるのに、投資判断に必要な情報が揃っていないために、機会損失が起きている。"
    },
    {
      title: "従業員に\n将来のライフプランを\n提示できていない",
      desc: "福利厚生や積立制度が形骸化し、従業員一人ひとりの将来に合わせた支援やアドバイスができていない。"
    }
  ];

  return (
    <section className="py-32 text-white relative" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <Reveal>
            <span className="font-bold tracking-widest uppercase text-sm mb-4 block text-blue-200">Problem</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">こんなことで<br />お悩みではないですか？</h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {problems.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 h-full group">
                <div className="w-12 h-1 mb-8 rounded-full group-hover:w-20 transition-all duration-300" style={{ backgroundColor: colors.accent }} />
                <h3 className="text-xl font-bold mb-6 whitespace-pre-line leading-relaxed">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-70 text-gray-300">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden" style={{ backgroundColor: colors.accent }}>
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">すべてAI SincStudioで解決できます</h3>
              <p className="text-blue-100">資産管理を経営の武器に変える、新しいプラットフォーム。</p>
            </div>
            <div className="bg-white p-4 rounded-full relative z-10 cursor-pointer hover:scale-110 transition-transform shadow-lg">
              <ArrowRight className="w-6 h-6" style={{ color: colors.accent }} />
            </div>
            
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// Sticky Feature Layout
const StickyFeatureSection = ({ id, title, subtitle, items }) => {
  return (
    <section id={id} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <Reveal>
                <span className="font-bold tracking-widest uppercase text-sm block mb-4" style={{ color: colors.accent }}>
                  {subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: colors.primary }}>
                  {title}
                </h2>
              </Reveal>
            </div>
          </div>

          {/* Scrollable Right Column */}
          <div className="lg:w-2/3 flex flex-col gap-32">
            {items.map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="flex flex-col gap-8 group">
                  <div className="overflow-hidden rounded-xl shadow-lg border border-gray-100 aspect-[16/10] bg-gray-50 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: colors.primary }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      {item.desc}
                    </p>
                    <ul className="space-y-4 bg-[#f8fafc] p-6 rounded-lg border border-gray-100">
                      {item.checks.map((check, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} />
                          <span className="font-bold text-gray-700 text-sm">{check}</span>
                        </li>
                      ))}
                    </ul>
                    {item.quote && (
                      <div className="mt-8 pl-6 border-l-4" style={{ borderColor: colors.accent }}>
                        <p className="text-sm font-bold text-gray-500 mb-2">導入企業の声:</p>
                        <p className="italic text-gray-700">"{item.quote}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const featureItems = [
    {
      title: "経営資源の全体像を把握し、最適な投資判断を",
      desc: "企業が保有する資産情報が部門やカテゴリーごとに分散されている現状を変えます。AI SincStudioは、収益、現金、オフィス、保険、株式など、あらゆる資産情報を統合し、ひとつのダッシュボードで可視化します。",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      checks: [
        "収益、保険、株式などの資産情報を一元管理",
        "全社的な経営資源を可視化・比較・分析",
        "投資判断のスピードと精度を高める"
      ],
      quote: "これまで複数のツールや資料を行き来していた経営会議の準備が、AI SincStudio導入後はひとつのダッシュボードで完結するようになりました。"
    },
    {
      title: "多角的な視点で、資産の価値と将来を見通す",
      desc: "組織単位でも、個人単位でも、資産状況を柔軟に分析・シミュレーションできる点が強みです。予算策定、保険設計、積立計画など、多様な場面で将来の資産の推移を見据えた判断が可能になります。",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
      checks: [
        "チーム単位・個人単位での資産分析に対応",
        "将来の資産価値シミュレーションを実行",
        "戦略立案と実行をサポートする機能設計"
      ],
      quote: "新規プロジェクトにかかるコストと資産の動きをシミュレーションできたことで、社内の稟議がスムーズになりました。"
    },
    {
      title: "従業員の将来設計を支援し、組織としての資産形成へ",
      desc: "従業員が加入している保険や積立制度の実態を可視化し、最適なサポートを実現。従業員一人ひとりのライフプラン情報を可視化し、必要な支援や制度設計を柔軟に行うことが可能です。",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
      checks: [
        "従業員ごとの保険・積立情報を可視化",
        "ライフステージに応じた福利厚生提案を実現",
        "税制メリットを活かした合理的な資産形成へ"
      ],
      quote: "社員それぞれの保険や積立の状況を把握できるようになり、画一的だった福利厚生制度を見直すきっかけになりました。"
    }
  ];

  return (
    <StickyFeatureSection 
      id="features"
      title={<>AI SincStudio<br/>の特徴について</>}
      subtitle="Feature"
      items={featureItems}
    />
  );
};

const CTA = ({ title, text, bgLight }) => (
  <section className={`py-24 px-6 text-center ${bgLight ? 'bg-white' : ''}`} style={{ backgroundColor: bgLight ? 'white' : colors.primary, color: bgLight ? colors.primary : 'white' }}>
    <div className="max-w-4xl mx-auto">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{title}</h2>
        <p className={`text-lg mb-10 font-medium ${bgLight ? 'text-gray-600' : 'text-blue-200'}`}>{text}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className={`font-bold px-10 py-4 rounded-md transition-colors border-2 ${bgLight ? 'bg-[#051C2C] text-white border-[#051C2C] hover:opacity-90' : 'bg-white text-[#051C2C] border-white hover:bg-gray-100'}`}>
            資料をダウンロード
          </button>
          <button className={`font-bold px-10 py-4 rounded-md transition-colors border-2 ${bgLight ? 'border-[#051C2C] text-[#051C2C] hover:bg-gray-50' : 'border-white text-white hover:bg-white/10'}`}>
            お問い合わせ
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);

const Functions = () => {
  const funcs = [
    { icon: <LayoutDashboard />, title: "ダッシュボード", desc: "企業資産を一元化して表示。収益・保険・オフィスなどの全体像を可視化できます。" },
    { icon: <PieChart />, title: "資産分析", desc: "資産カテゴリごとの推移や構成をグラフで可視化。詳細な内訳も把握できます。" },
    { icon: <Activity />, title: "シミュレーション", desc: "将来の資産変動を複数シナリオで予測。経営判断の精度を高めます。" },
    { icon: <Users />, title: "従業員情報管理", desc: "個人ごとの保険や積立の状況を整理し、企業側で把握・活用できるようにします。" },
    { icon: <Lightbulb />, title: "ライフプラン提案", desc: "従業員の属性に応じた保険・積立プランを自動で提案。個別最適な支援を実現します。" },
    { icon: <ArrowLeftRight />, title: "視点切り替え", desc: "個人・チーム・全社など、用途に応じてデータの視点を柔軟に切り替えられます。" },
    { icon: <Code />, title: "データ連携", desc: "外部システムからのデータ自動取り込みに対応。運用負荷を大幅に削減します。" },
    { icon: <Bell />, title: "アラート通知", desc: "資産の変動や契約更新などの重要な変化を検知し、自動でお知らせします。" },
  ];

  return (
    <section id="functions" className="py-32" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <Reveal>
            <span className="font-bold tracking-widest uppercase text-sm block mb-4" style={{ color: colors.accent }}>Function</span>
            <h2 className="text-4xl font-bold text-[#051C2C]">主な機能</h2>
          </Reveal>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {funcs.map((item, idx) => (
            <Reveal key={idx} delay={idx * 50}>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-gray-100 hover:border-blue-200">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: '#f0f4f8', color: colors.accent }}>
                  {React.cloneElement(item.icon, { size: 24 })}
                </div>
                <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal>
            <span className="font-bold tracking-widest uppercase text-sm block mb-4" style={{ color: colors.accent }}>Price</span>
            <h2 className="text-4xl font-bold text-[#051C2C]">料金プラン</h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Standard */}
          <Reveal delay={0}>
            <div className="border border-gray-200 rounded-xl p-8 hover:border-[#2251FF] transition-colors bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#051C2C]">スタンダード</h3>
                <span className="text-xs font-bold bg-gray-100 text-[#2251FF] px-3 py-1 rounded-full">お手軽</span>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-[#051C2C]">29,800</span>
                <span className="text-gray-500 font-bold ml-1">円/月</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['資産ダッシュボード', '資産分析', '従業員情報管理', 'メールサポート（月1回）', 'CSVデータ連携対応'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#2251FF]" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border-2 border-[#2251FF] text-[#2251FF] font-bold rounded-md hover:bg-blue-50 transition-colors">
                お申し込み
              </button>
            </div>
          </Reveal>

          {/* Pro */}
          <Reveal delay={100}>
            <div className="border-2 border-[#2251FF] bg-[#fbfdff] rounded-xl p-8 relative shadow-2xl transform md:-translate-y-6 z-10">
              <div className="absolute top-0 right-0 bg-[#2251FF] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-lg">
                1番人気
              </div>
              <h3 className="text-xl font-bold text-[#051C2C] mb-4">プロ</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-[#051C2C]">59,800</span>
                <span className="text-gray-500 font-bold ml-1">円/月</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['スタンダードの全機能', '資産シミュレーション', 'ライフプラン提案', 'API連携', '優先サポート', '視点切り替え機能'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#2251FF]" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-[#2251FF] text-white font-bold rounded-md hover:opacity-90 transition-opacity shadow-lg">
                お申し込み
              </button>
            </div>
          </Reveal>

          {/* Enterprise */}
          <Reveal delay={200}>
            <div className="border border-gray-200 rounded-xl p-8 hover:border-[#2251FF] transition-colors bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#051C2C]">エンタープライズ</h3>
                <span className="text-xs font-bold bg-gray-100 text-[#2251FF] px-3 py-1 rounded-full">カスタム</span>
              </div>
              <div className="mb-8 pt-2">
                <span className="text-3xl font-bold text-[#051C2C]">要相談</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['プロの全機能', 'スケーラビリティ対応', 'UIカスタマイズ・独自連携', '導入支援・運用レポート', '専任サポートチーム対応'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#2251FF]" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border-2 border-[#2251FF] text-[#2251FF] font-bold rounded-md hover:bg-blue-50 transition-colors">
                お問い合わせ
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left hover:text-[#2251FF] transition-colors group"
      >
        <span className="font-bold text-lg text-[#051C2C] flex gap-6 items-start">
          <span className="text-[#2251FF] text-xl font-serif italic">Q.</span> 
          <span className="pt-0.5">{q}</span>
        </span>
        <div className={`text-[#2251FF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 mb-8 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex gap-6">
          <span className="text-[#2251FF] text-xl font-serif italic font-bold opacity-0">A.</span>
          <p className="text-gray-600 leading-relaxed font-medium pl-12 border-l-2 border-gray-100">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "他の会計・財務ツールと何が違うのですか？", a: "AI SincStudioは、収益だけでなく、オフィスや保険、積立、株式などあらゆる資産を統合して可視化できる点が特長です。従業員のライフプラン支援まで対応する設計です。" },
    { q: "どのような企業に向いていますか？", a: "中堅〜成長フェーズの企業で、資産や福利厚生制度を持ち、部門を横断した情報活用を求める企業に特におすすめです。" },
    { q: "従業員の個人情報はどのように扱われますか？", a: "従業員の保険・積立情報は企業が管理可能な範囲に限定し、同意の上で取り扱います。セキュリティも厳重に管理しています。" },
    { q: "外部ツールやデータとの連携は可能ですか？", a: "はい。主要な財務・人事システムとの連携に対応しており、CSVやAPIでの取り込みが可能です。" }
  ];

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal>
            <span className="font-bold tracking-widest uppercase text-sm block mb-4" style={{ color: colors.accent }}>FAQ</span>
            <h2 className="text-4xl font-bold text-[#051C2C]">よくある質問</h2>
          </Reveal>
        </div>
        <div className="flex flex-col">
          {faqs.map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <FAQItem {...item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }) => {
  return (
    <footer className="text-white pt-24 pb-12 px-6" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 font-bold text-3xl mb-8 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xs font-black" style={{ color: colors.primary }}>AI</div>
              <span>AI SincStudio</span>
            </button>
            <p className="text-2xl font-bold mb-4 leading-snug">
              資産のすべてを把握し、<br/>利益を最大化する。
            </p>
            <p className="text-sm text-blue-200 mt-8">©2025 AI SincStudio, Inc.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-blue-200 mb-8 uppercase tracking-wider text-sm">Sitemap</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div> ホーム</a></li>
              <li><a href="#features" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div> 特徴</a></li>
              <li><a href="#functions" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div> 機能</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div> 料金</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div> よくある質問</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-blue-200 mb-8 uppercase tracking-wider text-sm">Other</h4>
            <ul className="space-y-4 text-sm text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors">運営会社</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ロードマップ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">アップデート情報</a></li>
              <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (currentPage === 'postpartum-diet') {
    return <PostpartumDietPage onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#2251FF] selection:text-white scroll-smooth">
      <Navbar onNavigate={handleNavigate} />
      <Hero />
      <LogoTicker />
      <Problem />
      <CTA
        title="資産管理を、戦略の武器に。"
        text={
          <>
            資料では、主な機能や導入イメージ、<br className="hidden md:inline" />
            税制メリットまで詳しくご紹介しています。ご相談もお気軽にご連絡ください。
          </>
        }
        bgLight
      />
      <Features />
      <Functions />
      <Pricing />
      <FAQ />
      <CTA title="AI SincStudioで、新しい資産管理へ。" text="まずは資料ダウンロードから。導入効果や事例を詳しくご紹介します。" />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
