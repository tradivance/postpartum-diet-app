import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, CheckCircle, Star,
  ChevronLeft, ChevronRight, Award, Heart, Zap
} from 'lucide-react';

// --- Colors & Styles (Postpartum Diet Theme) ---
const colors = {
  primary: '#C85A54',    // Warm terracotta/pink
  accent: '#E8B4A8',     // Soft peachy accent
  secondary: '#2B5F4F',  // Deep green
  bgLight: '#FFF8F6',    // Very light warm background
  textGray: '#64748b',
  white: '#ffffff',
};

// --- Scroll Reveal Animation ---
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

// --- Navbar ---
const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'ホーム', href: '#home' },
    { name: 'プログラムについて', href: '#about' },
    { name: '実績', href: '#results' },
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
          <div className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-black tracking-tighter" style={{ backgroundColor: colors.primary }}>♀</div>
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

// --- Hero Carousel ---
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

// --- Hero Section ---
const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <div className="text-center lg:text-left order-2 lg:order-1">
          <Reveal>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6" style={{ color: colors.primary }}>
              出産後の体と心を<br />
              医学的に整える。
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              妊娠・出産で大きく変わった体を、医学的根拠に基づいたプログラムで、<br className="hidden lg:block" />
              安全かつ効果的に本来の状態へ。<br className="hidden lg:block" />
              育児と両立できるオーダーメイド型産後ダイエット。
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

// --- Trust Section ---
const TrustSection = () => {
  const stats = [
    { label: '産婦人科監修', icon: '👨‍⚕️' },
    { label: '助産師推奨', icon: '👩‍⚕️' },
    { label: '10年以上の実績', icon: '⭐' },
    { label: '満足度98%', icon: '❤️' },
  ];

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="font-bold text-gray-700">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- About Section ---
const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?auto=format&fit=crop&q=80&w=800"
                alt="Program"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: colors.primary }}>
                医学的根拠に基づいた<br />安全なプログラム
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  産婦人科医と共同開発した産後専門プログラム。ホルモン変化、骨盤底筋の状態、授乳による影響など、出産後の体の状態を科学的に理解した上で、段階的にアプローチします。
                </p>
                <ul className="space-y-4">
                  {['産婦人科医監修のプログラム設計', '個人の回復状況に合わせたカスタマイズ', '授乳中も安心の栄養管理'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: colors.primary }} />
                      <span className="font-bold text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// --- Results Section ---
const ResultsSection = () => {
  const results = [
    { title: '3ヶ月で体の変化を実感', desc: '多くの方が3ヶ月で体重・体脂肪の減少を感じられています' },
    { title: '産後1年以内なら効果的', desc: 'ホルモン変化が安定する産後1年が勝負。早期スタートが有効です' },
    { title: '育児との両立が可能', desc: '1日15分の自宅運動で、忙しいママも続けられます' },
  ];

  return (
    <section id="results" className="py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.primary }}>
              実績・成果
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              多くのママが実現した産後の体と心の変化
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {results.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4" style={{ borderColor: colors.primary }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Pricing Section ---
const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.primary }}>
              料金プラン
            </h2>
            <p className="text-xl text-gray-600">
              あなたのペースに合わせて選べるプラン
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <Reveal delay={0}>
            <div className="border border-gray-200 rounded-xl p-8 hover:border-[#C85A54] transition-colors">
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>セルフケア</h3>
              <div className="mb-8">
                <span className="text-4xl font-bold" style={{ color: colors.primary }}>9,800</span>
                <span className="text-gray-500 font-bold ml-1">円/月</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['動画レッスン無制限', 'カスタマイズ食事ガイド', 'LINEサポート（月2回）'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <CheckCircle className="w-5 h-5" style={{ color: colors.primary }} /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border-2 font-bold rounded-md" style={{ borderColor: colors.primary, color: colors.primary }}>
                申し込み
              </button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border-2 rounded-xl p-8 shadow-2xl transform md:-translate-y-6 z-10" style={{ borderColor: colors.primary, backgroundColor: colors.bgLight }}>
              <div className="absolute top-0 right-0 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-lg" style={{ backgroundColor: colors.primary }}>
                おすすめ
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>パーソナルコース</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold" style={{ color: colors.primary }}>24,800</span>
                <span className="text-gray-500 font-bold ml-1">円/月</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['セルフケアの全機能', '週1回のオンラインコーチング', 'パーソナル栄養相談', '定期進捗診断'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle className="w-5 h-5" style={{ color: colors.primary }} /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 text-white font-bold rounded-md hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                申し込み
              </button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="border border-gray-200 rounded-xl p-8 hover:border-[#C85A54] transition-colors">
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>マンツーマン</h3>
              <div className="mb-8 pt-2">
                <span className="text-3xl font-bold" style={{ color: colors.primary }}>49,800</span>
                <span className="text-gray-500 font-bold ml-1">円/月</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['パーソナルコースの全機能', '週2回の専属トレーナー', '心理カウンセリング（月2回）', 'ホームジム設置相談'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <CheckCircle className="w-5 h-5" style={{ color: colors.primary }} /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border-2 font-bold rounded-md" style={{ borderColor: colors.primary, color: colors.primary }}>
                申し込み
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// --- FAQ Section ---
const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left hover:text-[#C85A54] transition-colors"
      >
        <span className="font-bold text-lg flex gap-6 items-start" style={{ color: colors.primary }}>
          <span className="text-[#C85A54] text-xl font-serif italic">Q.</span>
          <span className="pt-0.5">{q}</span>
        </span>
        <div className="text-[#C85A54] transition-transform duration-300" style={{ color: colors.primary }}>
          {isOpen ? '−' : '+'}
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

const FAQSection = () => {
  const faqs = [
    { q: "産後いつから始められますか？", a: "帝王切開の場合は6週間、自然分娩の場合は4週間後からがおすすめです。体の回復状況を確認してからスタートします。" },
    { q: "授乳中でも大丈夫ですか？", a: "もちろんです。授乳中のママに特化したプログラムです。栄養バランスを保ちながら安全に進めます。" },
    { q: "育児で忙しいのですが？", a: "1日15分程度の運動から始められます。自宅でできるため、育児と両立可能です。" },
    { q: "効果が出るまでの期間は？", a: "個人差がありますが、3ヶ月で体の変化を感じる方が多いです。心の変化はもっと早い方も多いです。" },
    { q: "どのプランを選べばいい？", a: "まずは無料相談で、あなたの目標と生活スタイルをお聞きし、最適なプランをご提案します。" },
  ];

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: colors.primary }}>
              よくある質問
            </h2>
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

// --- CTA Section ---
const CTASection = () => {
  return (
    <section className="py-24 px-6 text-center text-white" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            産後の体と心を、新しくスタート
          </h2>
          <p className="text-lg mb-10 font-medium opacity-90">
            医学的根拠に基づいた安全で効果的なプログラム。<br />
            まずは無料相談から始めましょう。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#C85A54] border-2 border-white font-bold px-10 py-4 rounded-md hover:opacity-90 transition-opacity">
              無料相談予約
            </button>
            <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-md hover:bg-white/10 transition-colors">
              体験レッスン申し込み
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// --- Footer ---
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
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xs font-black" style={{ color: colors.primary }}>♀</div>
              <span>産後ダイエット</span>
            </button>
            <p className="text-2xl font-bold mb-4 leading-snug">
              出産後の体と心を、<br/>医学的に整える。
            </p>
            <p className="text-sm opacity-70 mt-8">©2025 Postpartum Diet Program</p>
          </div>

          <div>
            <h4 className="font-bold opacity-80 mb-8 uppercase tracking-wider text-sm">Menu</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><a href="#home" className="hover:text-gray-200 transition-colors">ホーム</a></li>
              <li><a href="#about" className="hover:text-gray-200 transition-colors">プログラムについて</a></li>
              <li><a href="#results" className="hover:text-gray-200 transition-colors">実績</a></li>
              <li><a href="#pricing" className="hover:text-gray-200 transition-colors">料金</a></li>
              <li><a href="#faq" className="hover:text-gray-200 transition-colors">よくある質問</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold opacity-80 mb-8 uppercase tracking-wider text-sm">Other</h4>
            <ul className="space-y-4 text-sm opacity-80">
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

// --- Main Component ---
const PostpartumDietPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#C85A54] selection:text-white scroll-smooth">
      <Navbar onNavigate={onNavigate} />
      <Hero />
      <TrustSection />
      <AboutSection />
      <ResultsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default PostpartumDietPage;
