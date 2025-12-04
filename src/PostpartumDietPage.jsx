import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

// --- Colors & Styles (W2 PILATES Theme) ---
const colors = {
  pink: '#E33292',
  black: '#333333',
  gray: '#F9F9F9',
  gold: '#B69C32',
  white: '#ffffff',
  darkGray: '#999999',
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
    { name: 'ABOUT', href: '#about' },
    { name: 'METHOD', href: '#method' },
    { name: 'PRICE', href: '#plan' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="font-en font-bold text-2xl tracking-tighter text-black hover:opacity-70 transition-opacity cursor-pointer"
            >
              W2 <span style={{ color: colors.pink }}>PILATES</span>
            </button>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {links.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm font-medium hover:text-pink-500 transition-colors font-en tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="text-white px-6 py-3 rounded-md text-sm font-bold hover:opacity-90 transition-opacity shadow-lg tracking-wider"
              style={{ backgroundColor: colors.pink }}
            >
              無料カウンセリング
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-xl">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-lg font-bold text-gray-800 py-2"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="w-full text-white py-4 rounded-md text-sm font-bold text-center"
              style={{ backgroundColor: colors.pink }}
            >
              無料カウンセリング
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1599447332720-d3ec03389140?q=80&w=2574&auto=format&fit=crop"
          alt="産後ピラティス"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 mt-16">
        <div className="max-w-2xl">
          <p className="font-bold text-pink-500 mb-4 tracking-[0.2em] text-sm md:text-base font-en">POSTPARTUM CARE</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight" style={{ fontFamily: "'Shippori Mincho', serif" }}>
            産前の身体よりも、<br />
            <span style={{ color: colors.pink }}>美しく整える。</span>
          </h1>
          <div className="w-20 h-1 mb-8" style={{ backgroundColor: colors.pink }}></div>
          <p className="text-base md:text-lg text-gray-700 mb-10 leading-loose font-medium">
            「体重」を落とすだけではない。<br />
            崩れた骨盤バランスを医学的視点で整え、<br className="hidden md:block" />
            一生モノの「痩せやすい身体」をつくる産後ダイエット。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-white px-10 py-4 rounded-sm font-bold hover:opacity-90 transition-colors shadow-xl text-center tracking-widest"
              style={{ backgroundColor: colors.pink }}
            >
              体験トレーニングを予約
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-en tracking-widest text-gray-500">SCROLL</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.pink }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

// --- Concerns Section ---
const ConcernsSection = () => {
  const concerns = [
    { title: '体重が戻らない', icon: '⏰', desc: '産後数ヶ月経っても、妊娠前の体重に戻らない。特に下腹部や腰回りの脂肪が落ちにくくなった。' },
    { title: '骨盤の歪み・腰痛', icon: '❤️', desc: '抱っこや授乳の姿勢で腰や肩が痛い。骨盤がグラグラする感覚があり、尿漏れなどのトラブルも。' },
    { title: '体型の変化・崩れ', icon: '😊', desc: 'お尻が垂れて大きくなった、肋骨が開いて寸胴に見えるなど、ボディラインの変化に悩んでいる。' },
  ];

  return (
    <section className="py-20 md:py-32 px-4" style={{ backgroundColor: colors.gray }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4" style={{ fontFamily: "'Shippori Mincho', serif" }}>こんなお悩みはありませんか？</h2>
          <div className="w-12 h-0.5 bg-pink-500 mx-auto" style={{ backgroundColor: colors.pink }}></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {concerns.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="bg-white p-10 shadow-lg hover:shadow-xl transition-shadow border-t-4" style={{ borderColor: colors.pink }}>
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Shippori Mincho', serif" }}>{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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
    <section id="about" className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 z-0" style={{ borderColor: colors.pink }}></div>
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
              alt="W2ピラティスの指導風景"
              className="relative z-10 shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <Reveal>
              <h2 className="text-sm font-bold font-en tracking-widest mb-4" style={{ color: colors.pink }}>ABOUT W2 PILATES</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-8 leading-normal" style={{ fontFamily: "'Shippori Mincho', serif" }}>
                産後の身体は、<br />「リハビリ」が必要です。
              </h3>
              <p className="text-gray-600 mb-6 leading-loose">
                出産は全治数ヶ月の交通事故と同じくらいのダメージを身体に受けると言われています。
                無理な食事制限や激しい運動は、かえって身体を壊す原因になりかねません。
              </p>
              <p className="text-gray-600 mb-8 leading-loose">
                W2では、医療現場でも使用される骨盤底筋群を鍛えるマシン「HIFEM」と、解剖学に基づいた「ピラティス」を組み合わせ、
                まずはダメージを受けた身体を回復させ、
                <strong className="text-black border-b-2 pb-0.5" style={{ borderColor: colors.pink }}>医学的根拠に基づいて安全にボディメイク</strong>を行います。
              </p>
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
              }} className="inline-block border-2 text-black px-10 py-3 rounded-sm text-sm font-bold hover:opacity-80 transition-colors tracking-widest" style={{ borderColor: colors.black }}>
                詳しく見る
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Method Section ---
const MethodSection = () => {
  const methods = [
    {
      num: '01',
      title: 'HIFEMマシンで骨盤底筋群をケア',
      desc: '座っているだけで骨盤底筋群を鍛えられる最新マシン「HIFEM」を導入。産後に緩んでしまったインナーマッスルを、運動が苦手な方でも効率的に引き締めることが可能です。尿漏れ改善や膣トレにも効果を発揮します。',
      img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop',
    },
    {
      num: '02',
      title: '完全オーダーメイドのマンツーマン指導',
      desc: '帝王切開、自然分娩、産後の経過期間など、お一人おひとりの状態に合わせてメニューを構成します。AI管理されたトレーニングマシンとトレーナーの知識で、あなたに最適な負荷設定を実現します。',
      img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2574&auto=format&fit=crop',
    },
    {
      num: '03',
      title: 'お子様連れでも安心産後専用環境',
      desc: 'ベビーカーでの入店が可能で、お子様が見える位置でトレーニングを行えます。「子供がいるから通えない」というママの悩みを解消し、リフレッシュできる時間を提供します。',
      img: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=2071&auto=format&fit=crop',
    },
  ];

  return (
    <section id="method" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-en mb-4 text-black tracking-widest">3 REASONS</h2>
          <p className="text-gray-500" style={{ fontFamily: "'Shippori Mincho', serif" }}>W2が産後ママに選ばれる理由</p>
        </div>

        <div className="space-y-24">
          {methods.map((method, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
                <div className="md:w-1/2">
                  <div className="text-pink-500 font-en font-bold text-6xl opacity-20 mb-2" style={{ color: colors.pink }}>{method.num}.</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "'Shippori Mincho', serif" }}>
                    {method.title}
                  </h3>
                  <p className="text-gray-600 leading-loose">{method.desc}</p>
                </div>
                <div className={`md:w-1/2 relative ${idx % 2 === 1 ? '' : ''}`}>
                  <div className={`absolute ${idx % 2 === 1 ? 'bottom-0 left-0 -translate-x-4' : 'bottom-0 right-0 translate-x-4'} w-2/3 h-2/3 -z-10 transform translate-y-4`} style={{ backgroundColor: colors.gray }}></div>
                  <img src={method.img} alt={method.title} className="w-full h-80 object-cover shadow-md" />
                </div>
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
  const plans = [
    { name: '体験トレーニング', originalPrice: '¥7,100', price: '¥3,550', desc: 'カウンセリング + 骨盤チェック + ピラティス (90分)' },
    { name: '月4回コース', price: '¥35,200', desc: '週1回のペースで確実に体型を戻したい方に', perSession: '1回あたり ¥8,800', popular: true },
  ];

  return (
    <section id="plan" className="py-20 md:py-32" style={{ backgroundColor: colors.gray }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4" style={{ fontFamily: "'Shippori Mincho', serif" }}>料金プラン</h2>
          <div className="w-12 h-0.5 bg-pink-500 mx-auto" style={{ backgroundColor: colors.pink }}></div>
          <p className="text-gray-500 mt-4 font-en tracking-wider">PRICE</p>
        </div>

        <div className="bg-white border-2 p-8 text-center mb-12 shadow-xl relative overflow-hidden" style={{ borderColor: colors.pink }}>
          <div className="absolute top-0 right-0 text-white text-xs px-4 py-1" style={{ backgroundColor: colors.pink }}>CAMPAIGN</div>
          <h3 className="text-pink-500 font-bold text-xl md:text-2xl mb-4" style={{ fontFamily: "'Shippori Mincho', serif", color: colors.pink }}>期間限定キャンペーン実施中！</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-black">
            <div className="text-lg">入会金 <span className="line-through text-gray-400">¥35,600</span></div>
            <div className="hidden md:block text-2xl">→</div>
            <div className="text-4xl md:text-5xl font-bold font-en" style={{ color: colors.pink }}>¥0</div>
          </div>
          <p className="text-sm text-gray-500 mt-4">※体験当日入会の方に限ります</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className={`bg-white p-10 shadow-sm ${plan.popular ? 'border-2 shadow-lg' : 'border border-gray-200'}`} style={plan.popular ? { borderColor: colors.pink } : {}}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-xs px-4 py-1 rounded-full" style={{ backgroundColor: colors.pink }}>人気No.1</div>
                )}
                <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "'Shippori Mincho', serif", color: colors.pink }}>{plan.name}</h3>
                <div className="w-8 h-0.5 mx-auto mb-6" style={{ backgroundColor: colors.pink }}></div>
                <p className="text-gray-500 text-sm mb-8 text-center">{plan.desc}</p>
                {plan.originalPrice && (
                  <div className="flex justify-center items-end gap-2 mb-2">
                    <span className="text-gray-400 line-through text-sm">{plan.originalPrice}</span>
                    <span className="text-4xl font-bold font-en" style={{ color: colors.black }}>{plan.price}</span>
                    <span className="text-sm pb-1">(税込)</span>
                  </div>
                )}
                {!plan.originalPrice && (
                  <>
                    <div className="flex justify-center items-end gap-2 mb-2">
                      <span className="text-4xl font-bold font-en" style={{ color: colors.pink }}>{plan.price}</span>
                      <span className="text-sm pb-1">(税込)</span>
                    </div>
                    {plan.perSession && (
                      <p className="text-xs text-gray-400 mb-8 text-center font-en">{plan.perSession}</p>
                    )}
                  </>
                )}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block w-full py-4 rounded-sm font-bold text-center tracking-widest text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: plan.popular ? colors.pink : colors.black }}
                >
                  {plan.popular ? '無料カウンセリング' : '体験を申し込む'}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- FAQ Section ---
const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <details className="group bg-gray-100 rounded-lg" open={isOpen} onToggle={() => setIsOpen(!isOpen)}>
      <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
        <span className="flex items-center gap-4">
          <span className="font-en font-bold text-xl" style={{ color: colors.pink }}>Q.</span>
          <span className="text-black">{q}</span>
        </span>
        <span className="transition group-open:rotate-180">
          <ChevronDown size={20} />
        </span>
      </summary>
      <p className="text-gray-600 mt-0 px-6 pb-6 pl-14 leading-relaxed">
        {a}
      </p>
    </details>
  );
};

const FAQSection = () => {
  const faqs = [
    { q: "産後いつから始められますか？", a: "自然分娩の方は産後2ヶ月〜、帝王切開の方は産後3ヶ月〜を目安にご案内しております。1ヶ月検診で医師の運動許可が出てからお越しいただくことを推奨しています。" },
    { q: "子供を連れて行っても大丈夫ですか？", a: "はい、大丈夫です。ベビーカーのまま入店いただけます。バウンサーなどの設備がある店舗もございますので、ご予約時にお伝えください。" },
    { q: "運動経験が全くないのですが...", a: "W2ピラティスの会員様の8割はピラティス未経験です。マンツーマンで呼吸の仕方から丁寧に指導しますので、運動が苦手な方こそおすすめです。" },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black" style={{ fontFamily: "'Shippori Mincho', serif" }}>よくあるご質問</h2>
          <p className="text-gray-500 font-en tracking-wider">FAQ</p>
        </div>

        <div className="space-y-6">
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
    <section id="contact" className="py-20 md:py-32 text-white relative" style={{ backgroundColor: colors.black }}>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ fontFamily: "'Shippori Mincho', serif" }}>
          ママになっても、<br />
          <span style={{ color: colors.pink }}>「私」を楽しむ身体へ。</span>
        </h2>
        <p className="text-gray-300 mb-12 leading-loose">
          まずは無料カウンセリング、または体験トレーニングで<br />
          お身体の状態をご相談ください。
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a
            href="#"
            className="text-white w-full md:w-80 py-5 rounded-sm font-bold shadow-lg text-lg transition-all hover:opacity-90 tracking-widest"
            style={{ backgroundColor: colors.pink }}
          >
            体験トレーニングを予約
          </a>
          <a
            href="#"
            className="text-black w-full md:w-80 py-5 rounded-sm font-bold text-lg transition-all hover:bg-gray-200 tracking-widest bg-white"
          >
            LINEで相談する
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-white text-black pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 pb-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="font-en font-bold text-3xl tracking-tighter mb-6 block cursor-pointer hover:opacity-70 transition-opacity"
            >
              W2 <span style={{ color: colors.pink }}>PILATES</span>
            </button>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              医学的根拠に基づくパーソナルピラティスジム。<br />
              解剖学×トレーニングで、一瞬ではなく一生モノの身体づくりを。
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 font-en tracking-widest text-sm" style={{ color: colors.pink }}>MENU</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#about" className="hover:opacity-60 transition-opacity">W2ピラティスについて</a></li>
              <li><a href="#method" className="hover:opacity-60 transition-opacity">メソッド</a></li>
              <li><a href="#plan" className="hover:opacity-60 transition-opacity">料金</a></li>
              <li><a href="#faq" className="hover:opacity-60 transition-opacity">よくある質問</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 font-en tracking-widest text-sm" style={{ color: colors.pink }}>CONTACT</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#" className="hover:opacity-60 transition-opacity">店舗一覧</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">お問い合わせ</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">プライバシーポリシー</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs font-en border-t border-gray-100 pt-8">
          &copy; 2025 W2 PILATES all rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Main Component ---
const PostpartumDietPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:text-white scroll-smooth" style={{ selectionColor: colors.pink }}>
      <Navbar onNavigate={onNavigate} />
      <Hero />
      <ConcernsSection />
      <AboutSection />
      <MethodSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default PostpartumDietPage;
