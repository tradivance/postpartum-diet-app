import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, CheckCircle,
  LayoutDashboard, PieChart, Activity, Users,
  Lightbulb, ArrowLeftRight, Code, Bell,
  ArrowRight, Plus, Minus, ChevronLeft, ChevronRight
} from 'lucide-react';

// --- Colors & Styles (Postpartum Diet Theme) ---
const colors = {
  primary: '#C85A54',    // Warm terracotta/pink (postpartum diet theme)
  accent: '#E8B4A8',     // Soft peachy accent
  secondary: '#2B5F4F',  // Deep green (wellness theme)
  bgLight: '#FFF8F6',    // Very light warm background
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
    { name: '悩みについて', href: '#problems' },
    { name: '特徴', href: '#features' },
    { name: 'プログラム', href: '#programs' },
    { name: 'よくある質問', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 font-bold text-2xl cursor-pointer"
          style={{ color: colors.primary }}
        >
          <div className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-black tracking-tighter" style={{ backgroundColor: colors.primary }}>+</div>
          <span>産後ダイエット</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-bold text-gray-600 hover:text-[#C85A54] transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="font-bold text-sm hover:opacity-70 transition-opacity" style={{ color: colors.primary }}>
            無料相談予約
          </button>
          <button className="text-white text-sm font-bold px-6 py-2.5 rounded-md transition-all shadow-lg hover:-translate-y-0.5" style={{ backgroundColor: colors.primary }}>
            体験レッスン申し込み
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
              無料相談予約
            </button>
            <button className="w-full py-4 text-white font-bold rounded-md" style={{ backgroundColor: colors.primary }}>
              体験レッスン申し込み
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
    "https://images.unsplash.com/photo-1542221066-7281bb810e31?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1506756381648-546add64b515?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=1200"
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
          <div className="absolute inset-0 bg-gradient-to-tr from-[#C85A54]/10 to-transparent" />
        </div>
      ))}

      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors" style={{ color: colors.primary }}>
          <ChevronLeft size={16} />
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors" style={{ color: colors.primary }}>
          <ChevronRight size={16} />
        </button>
      </div>

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
        <div className="text-center lg:text-left order-2 lg:order-1">
          <Reveal>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6" style={{ color: colors.primary }}>
              出産後の体の変化に<br />
              向き合う、専門的サポート。
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              妊娠・出産による体の変化は個人差が大きいもの。<br className="hidden lg:block" />
              医学的根拠に基づいた産後ダイエットプログラムで、<br className="hidden lg:block" />
              無理なく、安全に、自分のペースで体を整える。
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="bg-white text-[#C85A54] border-2 font-bold px-8 py-3.5 rounded-md text-base hover:bg-gray-50 transition-all" style={{ borderColor: colors.primary }}>
                無料相談予約
              </button>
              <button className="text-white font-bold px-8 py-3.5 rounded-md text-base hover:shadow-lg transition-all hover:-translate-y-0.5" style={{ backgroundColor: colors.primary }}>
                体験レッスン申し込み
              </button>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2 w-full max-w-2xl mx-auto lg:max-w-none">
          <Reveal delay={200} className="relative">
            <div className="absolute -top-10 -right-10 w-full h-full rounded-3xl transform rotate-3 -z-10" style={{ backgroundColor: colors.bgLight }} />
            <div className="absolute -bottom-10 -left-6 w-2/3 h-2/3 bg-gray-50 rounded-full blur-3xl -z-10" />
            <HeroCarousel />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const LogoTicker = () => {
  const logos = ['医学博士監修', '助産師推奨', '多数の産婦人科で採用', '実績10年以上', '満足度98%', '認定トレーナー'];

  return (
    <div className="py-10 border-y border-gray-100 bg-white overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-scroll {
          animation: scroll-left 30s linear infinite;
        }
        .logo-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-sm font-bold text-gray-400 tracking-widest uppercase text-center">信頼の実績</p>
      </div>

      <div className="w-full overflow-hidden">
        <div className="flex gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 logo-scroll whitespace-nowrap">
          {logos.map((logo, i) => (
            <span key={i} className="text-xl md:text-2xl font-bold font-sans tracking-tight flex-shrink-0">{logo}</span>
          ))}
          {logos.map((logo, i) => (
            <span key={`duplicate-${i}`} className="text-xl md:text-2xl font-bold font-sans tracking-tight flex-shrink-0">{logo}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Problems = () => {
  const problems = [
    {
      title: "体の変化に\nどう対応したら\nいいかわからない",
      desc: "妊娠中に支える筋肉が弱まり、骨盤も大きく変わっています。素人判断での無理なダイエットは危険です。"
    },
    {
      title: "授乳中でも\n安全にダイエット\nできるか不安",
      desc: "栄養バランスが大切な授乳期。赤ちゃんへの影響を考えながら、自分の体も整えたい。"
    },
    {
      title: "育児しながら\n自分のケアに\n時間が取れない",
      desc: "毎日の育児で忙しく、ジムに通う時間もない。短時間で効果的なプログラムが必要。"
    }
  ];

  return (
    <section id="problems" className="py-32 text-white relative" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <Reveal>
            <span className="font-bold tracking-widest uppercase text-sm mb-4 block opacity-80">お悩み</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">こんなことで<br />お悩みではないですか？</h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {problems.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 h-full group">
                <div className="w-12 h-1 mb-8 rounded-full group-hover:w-20 transition-all duration-300 bg-white" />
                <h3 className="text-xl font-bold mb-6 whitespace-pre-line leading-relaxed">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-80 text-gray-100">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden" style={{ backgroundColor: colors.secondary }}>
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">すべて、私たちにお任せください</h3>
              <p className="text-green-100">医学的根拠に基づいた安全で効果的なプログラム。</p>
            </div>
            <div className="bg-white p-4 rounded-full relative z-10 cursor-pointer hover:scale-110 transition-transform shadow-lg">
              <ArrowRight className="w-6 h-6" style={{ color: colors.secondary }} />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const StickyFeatureSection = ({ id, title, subtitle, items }) => {
  return (
    <section id={id} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <Reveal>
                <span className="font-bold tracking-widest uppercase text-sm block mb-4" style={{ color: colors.primary }}>
                  {subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: colors.primary }}>
                  {title}
                </h2>
              </Reveal>
            </div>
          </div>

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
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                          <span className="font-bold text-gray-700 text-sm">{check}</span>
                        </li>
                      ))}
                    </ul>
                    {item.quote && (
                      <div className="mt-8 pl-6 border-l-4" style={{ borderColor: colors.primary }}>
                        <p className="text-sm font-bold text-gray-500 mb-2">体験者の声:</p>
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
      title: "医学的根拠に基づいた安全なプログラム",
      desc: "産婦人科医と共同開発したプログラムです。ホルモン変化、骨盤底筋の状態、授乳による体への影響など、出産後の体の状態を理解した上で、段階的に安全にアプローチします。",
      image: "https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?auto=format&fit=crop&q=80&w=1000",
      checks: [
        "産婦人科医監修のプログラム設計",
        "個人の回復状況に合わせたカスタマイズ",
        "授乳中も安心の栄養管理サポート"
      ],
      quote: "医学的な根拠があるので、安心して取り組めました。赤ちゃんにも母乳にも影響がないということが実感できました。"
    },
    {
      title: "自宅でできるプログラムと専門家のサポート",
      desc: "育児で忙しいママのために、自宅でできるエクササイズと食事管理をセット。定期的なオンラインコーチングで、疑問点もすぐに解消でき、モチベーションも保ちやすい環境です。",
      image: "https://images.unsplash.com/photo-1587280382256-afc9a440b51e?auto=format&fit=crop&q=80&w=1000",
      checks: [
        "自宅でできる動画エクササイズ",
        "週1回のオンラインコーチング",
        "LINEでの栄養相談サポート"
      ],
      quote: "移動時間がないので、育児との両立ができました。オンラインコーチングのおかげで、正しいフォームも学べます。"
    },
    {
      title: "心身のバランスを整えるホリスティックなアプローチ",
      desc: "体の変化だけでなく、出産後のメンタルケアも重視。育児ストレスと上手く付き合い、自信を取り戻すサポートを行います。充実感を感じながら、体も心も健康な状態へ。",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000",
      checks: [
        "メンタルヘルスケアプログラム",
        "コミュニティを通じた仲間との交流",
        "定期的なカウンセリングサポート"
      ],
      quote: "体を整えることで、心も軽くなるのを感じました。同じ時期を過ごすママたちとの繋がりも心強いです。"
    }
  ];

  return (
    <StickyFeatureSection
      id="features"
      title={<>私たちの<br/>こだわりについて</>}
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
        <p className={`text-lg mb-10 font-medium ${bgLight ? 'text-gray-600' : 'text-red-100'}`}>{text}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className={`font-bold px-10 py-4 rounded-md transition-colors border-2 ${bgLight ? 'bg-[#C85A54] text-white border-[#C85A54] hover:opacity-90' : 'bg-white text-[#C85A54] border-white hover:bg-gray-100'}`}>
            無料相談予約
          </button>
          <button className={`font-bold px-10 py-4 rounded-md transition-colors border-2 ${bgLight ? 'border-[#C85A54] text-[#C85A54] hover:bg-gray-50' : 'border-white text-white hover:bg-white/10'}`}>
            体験レッスン申し込み
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);

const Programs = () => {
  const programs = [
    { icon: <Activity />, title: "パーソナルコーチング", desc: "専属トレーナーが1対1で、あなたの体と心に向き合います。" },
    { icon: <Users />, title: "グループレッスン", desc: "同じ時期のママたちと一緒に学ぶ、サポーティブな環境。" },
    { icon: <Code />, title: "動画ライブラリ", desc: "いつでも好きな時に見られるエクササイズ動画を完全配信。" },
    { icon: <Bell />, title: "栄養管理サポート", desc: "管理栄養士による食事プランと個別相談。" },
    { icon: <Lightbulb />, title: "メンタルサポート", desc: "心理カウンセラーによる産後メンタルケア。" },
    { icon: <ArrowLeftRight />, title: "生活習慣改善", desc: "睡眠、ストレス管理など、生活全般のサポート。" },
    { icon: <LayoutDashboard />, title: "進捗管理ダッシュボード", desc: "体と心の変化を可視化して、モチベーション維持。" },
    { icon: <PieChart />, title: "コミュニティ交流", desc: "ママ向けコミュニティで、経験やアドバイスを共有。" },
  ];

  return (
    <section id="programs" className="py-32" style={{ backgroundColor: colors.bgLight }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <Reveal>
            <span className="font-bold tracking-widest uppercase text-sm block mb-4" style={{ color: colors.primary }}>Program</span>
            <h2 className="text-4xl font-bold" style={{ color: colors.primary }}>プログラム内容</h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((item, idx) => (
            <Reveal key={idx} delay={idx * 50}>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-gray-100 hover:border-[#C85A54]">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: colors.bgLight, color: colors.primary }}>
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
            <span className="font-bold tracking-widest uppercase text-sm block mb-4" style={{ color: colors.primary }}>Price</span>
            <h2 className="text-4xl font-bold" style={{ color: colors.primary }}>料金プラン</h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <Reveal delay={0}>
            <div className="border border-gray-200 rounded-xl p-8 hover:border-[#C85A54] transition-colors bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold" style={{ color: colors.primary }}>ライト</h3>
                <span className="text-xs font-bold bg-gray-100 text-[#C85A54] px-3 py-1 rounded-full">お手軽</span>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold" style={{ color: colors.primary }}>9,800</span>
                <span className="text-gray-500 font-bold ml-1">円/月</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['動画エクササイズライブラリ', '栄養管理ガイド（PDF）', 'メール相談（月2回）', '進捗管理ツール', 'コミュニティアクセス'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <CheckCircle className="w-5 h-5" style={{ color: colors.primary }} /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border-2 font-bold rounded-md hover:bg-gray-50 transition-colors" style={{ borderColor: colors.primary, color: colors.primary }}>
                申し込み
              </button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border-2 rounded-xl p-8 relative shadow-2xl transform md:-translate-y-6 z-10" style={{ borderColor: colors.primary, backgroundColor: '#FFF8F6' }}>
              <div className="absolute top-0 right-0 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-lg" style={{ backgroundColor: colors.primary }}>
                おすすめ
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>スタンダード</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold" style={{ color: colors.primary }}>19,800</span>
                <span className="text-gray-500 font-bold ml-1">円/月</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['ライトの全機能', '週1回のオンラインコーチング', 'パーソナル栄養相談', 'LINEサポート（無制限）', '定期進捗診断'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle className="w-5 h-5" style={{ color: colors.primary }} /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 text-white font-bold rounded-md hover:opacity-90 transition-opacity shadow-lg" style={{ backgroundColor: colors.primary }}>
                申し込み
              </button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="border border-gray-200 rounded-xl p-8 hover:border-[#C85A54] transition-colors bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold" style={{ color: colors.primary }}>プレミアム</h3>
                <span className="text-xs font-bold bg-gray-100 text-[#C85A54] px-3 py-1 rounded-full">フル</span>
              </div>
              <div className="mb-8 pt-2">
                <span className="text-3xl font-bold" style={{ color: colors.primary }}>39,800</span>
                <span className="text-gray-500 font-bold ml-1">円/月</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['スタンダードの全機能', '週2回の個別コーチング', '心理カウンセリング（月2回）', 'パーソナル栄養プラン作成', 'ホームジム設置相談'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <CheckCircle className="w-5 h-5" style={{ color: colors.primary }} /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border-2 font-bold rounded-md hover:bg-gray-50 transition-colors" style={{ borderColor: colors.primary, color: colors.primary }}>
                申し込み
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
        className="w-full py-8 flex items-center justify-between text-left hover:text-[#C85A54] transition-colors group"
      >
        <span className="font-bold text-lg flex gap-6 items-start" style={{ color: colors.primary }}>
          <span className="text-[#C85A54] text-xl font-serif italic">Q.</span>
          <span className="pt-0.5">{q}</span>
        </span>
        <div className="text-[#C85A54] transition-transform duration-300" style={{ color: colors.primary }}>
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 mb-8 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex gap-6">
          <span className="text-[#C85A54] text-xl font-serif italic font-bold opacity-0">A.</span>
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
    { q: "産後どのくらいから始められますか？", a: "通常、帝王切開の場合は6週間、自然分娩の場合は4週間後から始めることをお勧めしています。体の回復状況を確認してからスタートします。" },
    { q: "授乳中でも大丈夫ですか？", a: "もちろんです。授乳中のママに特化したプログラムです。栄養バランスを保ちながら、赤ちゃんへの影響を最小限に抑えた方法をご提案します。" },
    { q: "育児で忙しいのですが、続けられますか？", a: "はい。自宅でできるプログラムで、1日15分程度の運動から始められます。オンラインコーチングも夜間に対応しています。" },
    { q: "効果が出るまでどのくらいかかりますか？", a: "個人差がありますが、多くの方が3ヶ月で体の変化を感じられています。心の変化はもっと早く、2週間程度で感じる方も多いです。" },
    { q: "どのプランを選べばいいですか？", a: "まずは無料相談で、あなたの目標と生活スタイルをお聞きし、最適なプランをご提案します。途中でプランの変更も可能です。" },
    { q: "支払い方法は何がありますか？", a: "クレジットカード、銀行振込、PayPayなど複数の支払い方法に対応しています。" }
  ];

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal>
            <span className="font-bold tracking-widest uppercase text-sm block mb-4" style={{ color: colors.primary }}>FAQ</span>
            <h2 className="text-4xl font-bold" style={{ color: colors.primary }}>よくある質問</h2>
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
              className="flex items-center gap-3 font-bold text-3xl mb-8 cursor-pointer"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xs font-black" style={{ color: colors.primary }}>+</div>
              <span>産後ダイエット</span>
            </button>
            <p className="text-2xl font-bold mb-4 leading-snug">
              出産後の体の変化に<br/>向き合う、専門的サポート。
            </p>
            <p className="text-sm opacity-70 mt-8">©2025 Postpartum Diet Support, Inc.</p>
          </div>

          <div>
            <h4 className="font-bold opacity-80 mb-8 uppercase tracking-wider text-sm">Sitemap</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><a href="#" className="hover:text-gray-200 transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-yellow-200 rounded-full"></div> ホーム</a></li>
              <li><a href="#problems" className="hover:text-gray-200 transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-yellow-200 rounded-full"></div> お悩み</a></li>
              <li><a href="#features" className="hover:text-gray-200 transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-yellow-200 rounded-full"></div> こだわり</a></li>
              <li><a href="#programs" className="hover:text-gray-200 transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-yellow-200 rounded-full"></div> プログラム</a></li>
              <li><a href="#faq" className="hover:text-gray-200 transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-yellow-200 rounded-full"></div> よくある質問</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold opacity-80 mb-8 uppercase tracking-wider text-sm">Other</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><a href="#" className="hover:text-white transition-colors">運営会社</a></li>
              <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
              <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ブログ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PostpartumDietPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#C85A54] selection:text-white scroll-smooth">
      <Navbar onNavigate={onNavigate} />
      <Hero />
      <LogoTicker />
      <Problems />
      <CTA
        title="あなたの産後の体と心を、専門家がサポート。"
        text={
          <>
            詳しい資料では、プログラムの内容や実践者の声、<br className="hidden md:inline" />
            体の変化の実例をご紹介しています。まずは無料相談で、<br className="hidden md:inline" />
            あなたのお悩みをお聞かせください。
          </>
        }
        bgLight
      />
      <Features />
      <Programs />
      <Pricing />
      <FAQ />
      <CTA title="産後の体と心を、新しくスタート。" text="まずは無料相談から。専門家があなたのペースに合わせてサポートします。" />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default PostpartumDietPage;
