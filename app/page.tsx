"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Smartphone, Users, TrendingUp, CheckCircle, X, Mail, PlayCircle, Globe } from 'lucide-react';

const COLORS = {
  KODAK_YELLOW: "#FFD600",
  KODAK_RED: "#EE2722",
  KODAK_BLACK: "#121212",
};

// 🌐 한/영 다국어 번역 딕셔너리
const TRANSLATIONS = {
  ko: {
    heroTag: "KODAK MOMENT CLUB",
    heroTitle: <>1만 장의 디지털 픽셀보다,<br className="hidden sm:block" />만질 수 있는 1장의 진짜 추억을 위해.</>,
    heroSub: "Z세대를 위한 프리미엄 아날로그 구독 서비스",
    btnProposal: "제안서 보기",
    btnDemo: "데모 시연",
    
    probSolTag: "The Problem & Solution",
    probTitle: "너무 쉽게 찍고, 너무 쉽게 버려집니다.",
    probDesc: <>Z세대는 '너무 완벽하고 즉각적인' 디지털 피드에 피로감을 느낍니다.<br className="hidden md:block" />우리는 이들에게 <span className="text-[#FFD600] font-bold">필름 카메라의 '불편함'과 '기다림의 설렘'</span>을 구독 모델로 제공합니다.</>,
    asisTitle: "AS-IS : 의미 잃은 디지털",
    asis1: "무한정 찍고 다시 보지 않는 갤러리",
    asis2: "누구에게나 똑같은 디지털 필터",
    asis3: "터치 한 번으로 사라지는 휘발성",
    tobeTitle: "TO-BE : 코닥 모먼트 클럽",
    tobe1: "한 달에 24장, 신중하게 누르는 셔터",
    tobe2: "코닥 골드의 완벽한 아날로그 텍스처",
    tobe3: "매월 집으로 배송되는 실물 인화 패키지",

    marketTag: "2025 Market Outlook",
    marketTitle: <>비즈니스 스케일: <span className="text-[#EE2722]">100조 원</span>의 기회</>,
    marketDesc: "단순한 앱을 넘어, 거대해진 대한민국 구독 경제의 핵심으로 진입합니다.",
    tamTitle: "TAM (전체 시장)",
    tamUnit: <>100조<span className="text-xl md:text-2xl ml-1">원+</span></>,
    tamDesc: <>KT경제경영연구소 전망,<br/> <span className="text-[#121212]">2025년 국내 구독경제 시장 규모.</span><br/>모든 소비가 '소유'에서 '구독'으로 전환되는 시점입니다.</>,
    samTitle: "SAM (글로벌 인화 시장)",
    samUnit: <>37조<span className="text-xl md:text-2xl ml-1">원</span></>,
    samDesc: <><span className="text-[#EE2722]">약 273억 1천만 달러 규모.</span><br/>스마트폰 세대의 커스텀 인화 및 포토북 수요가 성장을 견인합니다.</>,
    somTitle: "SOM (수익 타겟)",
    somUnit: <>30만<span className="text-xl md:text-2xl ml-1 text-white">명</span></>,
    somDesc: <>코닥 어패럴 유저 및 아날로그 고관여 층.<br/><span className="text-white">전환율 10% 달성 시, 연 매출 35억 원</span>의 확실한 캐시카우 발생.</>,

    valTag: "Validation",
    valTitle: "성공을 확신하는 4가지 근거",
    valDesc: "시장은 이미 코닥을 원하고 있으며, 지갑을 열 준비를 마쳤습니다.",
    val1Title: "레퍼런스 체크", val1Stat: "1,000억+", val1Desc: "코닥 어패럴 국내 연 매출 돌파. 증명된 팬덤을 디지털 경험으로 전환합니다.",
    val2Title: "사용자 인터뷰", val2Stat: "80% 이상", val2Desc: "Z세대 FGI 결과, '기다림의 불편함'을 프리미엄 가치로 인식했습니다.",
    val3Title: "유사 서비스 성장", val3Stat: "폭발적", val3Desc: "Gudak, NOMO 등 초기 다운로드 수치가 아날로그 필터 수요를 증명합니다.",
    val4Title: "전환율 가설", val4Stat: "5~10%", val4Desc: "감성 고관여 시장 특성상 압도적인 유료(배송) 전환율을 기대합니다.",

    teamTag: "The Architect",
    teamTitle: "누가 이 감성을 설계했는가?",
    teamDesc: "글로벌 최고 수준의 시각 기술과 대한민국 1위 사진 인프라의 결합",
    teamProfile: "창업자 / 총괄 디렉터",
    teamHistory1: "현) 인생네컷(Life Four Cuts) CTO",
    teamHistory1Desc: "대한민국 Z세대 아날로그 사진 문화를 주도하는 1위 브랜드 기술 총괄",
    teamHistory2: "전) Lucasfilm 시니어 TD 출신 / VFX 수퍼바이저",
    teamHistory2Desc: "할리우드 최고 수준의 렌더링 및 시각 구현 기술력",
    teamHistory3: "전) 대학교수 (CG/VFX 전문가)",
    teamHistory3Desc: "탄탄한 학술적 배경을 바탕으로 한 테크니컬 리더십",

    simTag: "시장 검증 시뮬레이터",
    simDesc: "데이터에 기반한 수익성 예측 (ARR)",
    simSomLabel: "Target SOM (목표 타겟 모수)",
    simCvrLabel: "Conversion Rate (유료 전환율)",
    simPriceLabel: "Pricing Strategy",
    simPriceDesc: <>코닥 골드 24장 인화 및<br/>전용 패키지 배송비 포함</>,
    simResultSub: "Estimated Paid Subscribers",
    simResultArr: "Projected Annual Revenue (ARR)",
    formatUsers: (num: number) => <>{num.toLocaleString()} <span className="text-2xl md:text-3xl">명</span></>,
    formatArr: (annual: number) => <>₩ {(annual / 100000000).toFixed(1)} <span className="text-2xl md:text-3xl">억</span></>,
    simNote: (cvr: number, annual: number) => `"보수적으로 잡아 타겟의 ${cvr}%만 확보해도, 연간 ${Math.floor(annual / 100000000)}억 원 이상의 예측 가능한 매출(ARR)이 발생합니다."`,

    ctaTitle: <>우리가 시장성을 증명했습니다.<br/><span className="text-[#EE2722]">이제 코닥의 인프라를 태울 차례입니다.</span></>,
    ctaDesc: <>브랜드 자산과 테크놀로지의 완벽한 결합. <br/>코닥 모먼트 클럽과 함께 미래를 현상하십시오.</>,

    modalTitle: "파트너십 제안하기",
    modalDesc: "코닥의 헤리티지를 수익화할 준비가 되셨나요?",
    formName: "소속 및 성함",
    formNamePH: "예) 하이라이트브랜즈 / 홍길동 이사",
    formEmail: "회신받으실 이메일",
    formMessage: "문의 내용",
    formMessagePH: "데모 미팅 요청, 기술 제휴 등 자유롭게 남겨주세요.",
    formSubmit: "담당자(contact@yeahplus.co.kr)에게 전송",
  },
  en: {
    heroTag: "KODAK MOMENT CLUB",
    heroTitle: <>For one real, touchable memory,<br className="hidden sm:block" />rather than 10,000 digital pixels.</>,
    heroSub: "Premium analog subscription service for Gen Z",
    btnProposal: "View Proposal",
    btnDemo: "App Demo",
    
    probSolTag: "The Problem & Solution",
    probTitle: "Too easy to capture, too easy to discard.",
    probDesc: <>Gen Z feels fatigued by 'too perfect and instant' digital feeds.<br className="hidden md:block" />We provide them with the <span className="text-[#FFD600] font-bold">'inconvenience' and 'thrill of waiting'</span> of film cameras as a subscription.</>,
    asisTitle: "AS-IS : Meaningless Digital",
    asis1: "Endless scrolling, rarely looking back",
    asis2: "The exact same digital filters for everyone",
    asis3: "Volatile memories disappearing with one touch",
    tobeTitle: "TO-BE : KODAK Moment Club",
    tobe1: "24 shots a month, pressing the shutter carefully",
    tobe2: "The perfect analog texture of Kodak Gold",
    tobe3: "Physical photo package delivered monthly",

    marketTag: "2025 Market Outlook",
    marketTitle: <>Business Scale: <span className="text-[#EE2722]">$75B</span> Opportunity</>,
    marketDesc: "Beyond a simple app, we enter the core of the massive subscription economy.",
    tamTitle: "TAM (Total Addressable Market)",
    tamUnit: <>100T<span className="text-xl md:text-2xl ml-1">KRW+</span></>,
    tamDesc: <>KT Economic Research Institute forecast,<br/> <span className="text-[#121212]">Korea's subscription economy size in 2025.</span></>,
    samTitle: "SAM (Global Photo Printing)",
    samUnit: <>37T<span className="text-xl md:text-2xl ml-1">KRW</span></>,
    samDesc: <><span className="text-[#EE2722]">Estimated at $27.31 Billion.</span><br/>Custom printing and photobook demand is driving growth.</>,
    somTitle: "SOM (Serviceable Obtainable Market)",
    somUnit: <>300K<span className="text-xl md:text-2xl ml-1 text-white">Users</span></>,
    somDesc: <>Kodak Apparel users & analog enthusiasts.<br/><span className="text-white">With a 10% conversion rate, 3.5B KRW annual ARR</span>.</>,

    valTag: "Validation",
    valTitle: "4 Reasons We Are Confident",
    valDesc: "The market already wants KODAK and is ready to open their wallets.",
    val1Title: "Reference Check", val1Stat: "100B KRW+", val1Desc: "Kodak Apparel exceeded 100B KRW in sales. We convert this proven fandom.",
    val2Title: "User Interviews", val2Stat: "80%+", val2Desc: "FGI showed the majority perceive 'waiting' as a premium, hip value.",
    val3Title: "Competitor Growth", val3Stat: "Explosive", val3Desc: "Explosive initial downloads of apps like Gudak prove analog demand.",
    val4Title: "Conversion Hypothesis", val4Stat: "5~10%", val4Desc: "Due to the emotional high-involvement nature, we expect an overwhelming paid conversion rate.",

    teamTag: "The Architect",
    teamTitle: "Who Designed This Experience?",
    teamDesc: "Top-tier global VFX tech meets Korea's #1 photo infrastructure.",
    teamProfile: "Founder / Executive Director",
    teamHistory1: "Current CTO of 'Life Four Cuts' (인생네컷)",
    teamHistory1Desc: "Leading the technology for Korea's #1 Gen Z analog photo booth brand.",
    teamHistory2: "Former Lucasfilm Senior TD / VFX Supervisor",
    teamHistory2Desc: "World-class visual fidelity and rendering technology from Hollywood.",
    teamHistory3: "Former University Professor (CG/VFX)",
    teamHistory3Desc: "Solid academic background and technical leadership.",

    simTag: "Market Validation Simulator",
    simDesc: "Data-driven profitability forecasting (ARR)",
    simSomLabel: "Target SOM (Users)",
    simCvrLabel: "Conversion Rate (%)",
    simPriceLabel: "Pricing Strategy",
    simPriceDesc: <>Includes 24 Kodak Gold prints &<br/>exclusive yellow package delivery fee</>,
    simResultSub: "Estimated Paid Subscribers",
    simResultArr: "Projected Annual Revenue (ARR)",
    formatUsers: (num: number) => <>{num.toLocaleString()} <span className="text-2xl md:text-3xl">Users</span></>,
    formatArr: (annual: number) => <>₩ {(annual / 1000000000).toFixed(2)} <span className="text-2xl md:text-3xl">B</span></>,
    simNote: (cvr: number, annual: number) => `"Even conservatively capturing ${cvr}% of the target generates a predictable ARR of over ${(annual / 1000000000).toFixed(1)} Billion KRW."`,

    ctaTitle: <>We have proven the marketability.<br/><span className="text-[#EE2722]">Now it's time to leverage KODAK.</span></>,
    ctaDesc: <>The perfect combination of brand assets and technology. <br/>Develop the future with KODAK Moment Club.</>,

    modalTitle: "Propose a Partnership",
    modalDesc: "Are you ready to monetize KODAK's heritage?",
    formName: "Name / Organization",
    formNamePH: "e.g. Kodak Alaris / John Doe",
    formEmail: "Reply Email",
    formMessage: "Message",
    formMessagePH: "Feel free to request a demo meeting, tech partnership, etc.",
    formSubmit: "Send to Contact",
  }
};

export default function KodakPitchPage() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const t = TRANSLATIONS[lang];

  const [som, setSom] = useState(300000);
  const [conversion, setConversion] = useState(10);
  const [fee, setFee] = useState(9900);
  const [results, setResults] = useState({ monthly: 0, annual: 0, subscribers: 0 });

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const subscribers = Math.floor(som * (conversion / 100));
    const monthly = subscribers * fee;
    const annual = monthly * 12;
    setResults({ monthly, annual, subscribers });
  }, [som, conversion, fee]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectTitle = lang === 'ko' ? '[코닥 모먼트 클럽] 파트너십 문의' : '[KODAK Moment Club] Partnership Inquiry';
    const subject = encodeURIComponent(`${subjectTitle} - ${formData.name}`);
    const body = encodeURIComponent(`Name/Org: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:contact@yeahplus.co.kr?subject=${subject}&body=${body}`;
    setIsContactModalOpen(false);
  };

  return (
    <div className="relative font-sans text-gray-900 bg-[#121212]">
      
      {/* 언어 변환 토글 (모바일에서도 탭하기 쉽게 여백 조정) */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200 p-1 scale-90 md:scale-100 transform origin-top-right">
        <Globe className="w-4 h-4 ml-3 text-gray-400 hidden sm:block" />
        <div className="flex ml-0 sm:ml-2">
          <button onClick={() => setLang('ko')} className={`px-3 md:px-4 py-2 rounded-full text-sm font-bold transition ${lang === 'ko' ? 'bg-[#FFD600] text-[#121212] shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}>KO</button>
          <button onClick={() => setLang('en')} className={`px-3 md:px-4 py-2 rounded-full text-sm font-bold transition ${lang === 'en' ? 'bg-[#FFD600] text-[#121212] shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}>EN</button>
        </div>
      </div>

      <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white">      
        
        {/* Slide 1: Hero */}
        <section className="min-h-[100dvh] w-full snap-start flex flex-col justify-center items-center bg-[#FFD600] px-4 py-20 md:py-0 md:px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full">
            <div className="bg-[#EE2722] text-white inline-block px-4 py-1 font-black italic mb-4 md:mb-6 shadow-lg text-sm md:text-base">{t.heroTag}</div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-[#121212] leading-tight md:leading-tight mb-6 md:mb-8 drop-shadow-sm break-keep">{t.heroTitle}</h1>
            <p className="text-lg md:text-2xl font-bold text-[#121212]/80 mb-10 md:mb-12 break-keep">{t.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full max-w-xs sm:max-w-none mx-auto">
              <button onClick={() => document.getElementById('page-2')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-[#121212] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition shadow-xl text-center">
                {t.btnProposal}
              </button>
              <button onClick={() => setIsVideoModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#121212] text-[#121212] px-8 py-4 rounded-full font-bold hover:bg-white transition shadow-xl bg-[#FFD600]">
                <PlayCircle className="w-5 h-5" /> {t.btnDemo}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Slide 2: Problem & Solution */}
        <section id="page-2" className="min-h-[100dvh] w-full snap-start flex flex-col justify-center items-center px-4 py-20 md:py-0 md:px-6 bg-[#121212] text-white">
          <div className="max-w-6xl w-full mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <span className="text-[#EE2722] font-bold tracking-widest uppercase bg-[#EE2722]/10 px-3 py-1 rounded-full text-xs md:text-sm">{t.probSolTag}</span>
              <h2 className="text-3xl md:text-5xl font-black mt-6 mb-4 md:mb-6 leading-tight break-keep">{t.probTitle}</h2>
              <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl mx-auto break-keep">{t.probDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-gray-800 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-gray-700 flex flex-col justify-center">
                <Smartphone className="w-8 h-8 md:w-12 md:h-12 text-gray-500 mb-4 md:mb-6" />
                <h3 className="font-bold text-xl md:text-2xl mb-4 text-gray-300">{t.asisTitle}</h3>
                <ul className="space-y-3 text-sm md:text-base text-gray-400">
                  <li className="flex items-center gap-2"><X className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0"/> {t.asis1}</li>
                  <li className="flex items-center gap-2"><X className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0"/> {t.asis2}</li>
                  <li className="flex items-center gap-2"><X className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0"/> {t.asis3}</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 md:p-10 rounded-2xl md:rounded-3xl border border-[#FFD600]/30 shadow-[0_0_30px_rgba(255,214,0,0.1)] flex flex-col justify-center">
                <Camera className="w-8 h-8 md:w-12 md:h-12 text-[#FFD600] mb-4 md:mb-6" />
                <h3 className="font-bold text-xl md:text-2xl mb-4 text-[#FFD600]">{t.tobeTitle}</h3>
                <ul className="space-y-3 text-sm md:text-base text-gray-200">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#FFD600] shrink-0"/> {t.tobe1}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#FFD600] shrink-0"/> {t.tobe2}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#FFD600] shrink-0"/> {t.tobe3}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3: Market Size */}
        <section id="market-size" className="min-h-[100dvh] w-full snap-start flex flex-col justify-center items-center px-4 py-20 md:py-0 md:px-6 bg-gray-50">
          <div className="max-w-6xl w-full mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <span className="text-[#EE2722] font-bold tracking-widest uppercase bg-[#EE2722]/10 px-3 py-1 rounded-full text-xs md:text-sm">{t.marketTag}</span>
              <h2 className="text-3xl md:text-6xl font-black mt-4 md:mt-6 mb-3 md:mb-4 text-[#121212] tracking-tight break-keep">{t.marketTitle}</h2>
              <p className="text-gray-500 text-sm md:text-xl mb-10 md:mb-16 font-medium break-keep">{t.marketDesc}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
              <div className="bg-white p-8 md:p-12 rounded-3xl md:rounded-[40px] shadow-sm border-b-8 border-[#FFD600] flex flex-col justify-center">
                <h3 className="text-gray-400 font-black mb-2 md:mb-4 text-xs md:text-sm tracking-tighter uppercase">{t.tamTitle}</h3>
                <div className="text-4xl md:text-6xl font-black mb-3 md:mb-6 text-[#121212]">{t.tamUnit}</div>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold break-keep">{t.tamDesc}</p>
              </div>
              <div className="bg-white p-8 md:p-12 rounded-3xl md:rounded-[40px] shadow-md border-b-8 border-[#EE2722] flex flex-col justify-center relative bg-gradient-to-b from-white to-red-50/30">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#EE2722] text-white text-[10px] md:text-xs font-black px-3 py-1.5 md:py-2 rounded-full shadow-xl tracking-widest whitespace-nowrap">GLOBAL TREND</div>
                <h3 className="text-[#EE2722] font-black mb-2 md:mb-4 text-xs md:text-sm tracking-tighter uppercase">{t.samTitle}</h3>
                <div className="text-4xl md:text-6xl font-black mb-3 md:mb-6 text-[#121212]">{t.samUnit}</div>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-semibold break-keep">{t.samDesc}</p>
              </div>
              <div className="bg-[#121212] p-8 md:p-12 rounded-3xl md:rounded-[40px] shadow-2xl text-white border-b-8 border-[#FFD600] flex flex-col justify-center">
                <h3 className="text-[#FFD600] font-black mb-2 md:mb-4 text-xs md:text-sm tracking-tighter uppercase">{t.somTitle}</h3>
                <div className="text-4xl md:text-6xl font-black mb-3 md:mb-6 text-[#FFD600]">{t.somUnit}</div>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-semibold break-keep">{t.somDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4: Validation */}
        <section className="min-h-[100dvh] w-full snap-start flex flex-col justify-center items-center px-4 py-20 md:py-0 md:px-6 bg-white">
          <div className="max-w-7xl w-full mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <span className="text-[#EE2722] font-bold tracking-widest uppercase bg-[#EE2722]/10 px-3 py-1 rounded-full text-xs md:text-sm">{t.valTag}</span>
              <h2 className="text-3xl md:text-5xl font-black mt-4 md:mt-6 mb-3 md:mb-4 break-keep">{t.valTitle}</h2>
              <p className="text-gray-500 text-sm md:text-lg break-keep">{t.valDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {[
                { title: t.val1Title, stat: t.val1Stat, desc: t.val1Desc, icon: <TrendingUp className="text-[#EE2722] w-6 h-6 md:w-8 md:h-8" /> },
                { title: t.val2Title, stat: t.val2Stat, desc: t.val2Desc, icon: <Users className="text-[#EE2722] w-6 h-6 md:w-8 md:h-8" /> },
                { title: t.val3Title, stat: t.val3Stat, desc: t.val3Desc, icon: <Smartphone className="text-[#EE2722] w-6 h-6 md:w-8 md:h-8" /> },
                { title: t.val4Title, stat: t.val4Stat, desc: t.val4Desc, icon: <CheckCircle className="text-[#EE2722] w-6 h-6 md:w-8 md:h-8" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 md:gap-6 p-6 md:p-10 bg-gray-50 border border-gray-100 rounded-2xl md:rounded-[30px] shadow-sm">
                  <div className="bg-red-50 p-4 md:p-6 rounded-xl md:rounded-2xl h-fit">{item.icon}</div>
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
                      <h3 className="font-bold text-lg md:text-2xl text-gray-800">{item.title}</h3>
                      <span className="text-[#EE2722] font-black text-base md:text-xl">{item.stat}</span>
                    </div>
                    <p className="text-gray-500 leading-relaxed text-xs md:text-lg break-keep">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 5: Simulator */}
        <section className="min-h-[100dvh] w-full snap-start flex flex-col justify-center items-center px-4 py-20 md:py-0 md:px-6 bg-[#121212] text-white">
          <div className="max-w-6xl w-full mx-auto bg-[#1A1A1A] p-6 md:p-16 rounded-3xl md:rounded-[40px] border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4 md:gap-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-black text-[#FFD600] mb-2">{t.simTag}</h2>
                <p className="text-gray-400 font-medium text-sm md:text-lg">{t.simDesc}</p>
              </div>
              <div className="bg-[#EE2722] px-4 md:px-6 py-2 rounded-full font-black text-[10px] md:text-sm italic shadow-lg">PROFITABILITY CALCULATOR</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="space-y-8 md:space-y-10">
                <div>
                  <div className="flex justify-between mb-3 md:mb-4">
                    <label className="font-bold text-gray-300 italic text-sm md:text-lg">{t.simSomLabel}</label>
                    <span className="text-[#FFD600] font-black text-base md:text-xl">{som.toLocaleString()}</span>
                  </div>
                  <input type="range" min="10000" max="500000" step="10000" value={som} onChange={(e) => setSom(Number(e.target.value))} className="w-full h-2 md:h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FFD600]" />
                </div>
                <div>
                  <div className="flex justify-between mb-3 md:mb-4">
                    <label className="font-bold text-gray-300 italic text-sm md:text-lg">{t.simCvrLabel}</label>
                    <span className="text-[#FFD600] font-black text-base md:text-xl">{conversion} %</span>
                  </div>
                  <input type="range" min="1" max="20" step="1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} className="w-full h-2 md:h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FFD600]" />
                </div>
                <div className="p-4 md:p-6 bg-[#222] rounded-xl md:rounded-2xl border border-white/5">
                  <h4 className="text-xs md:text-sm font-bold text-gray-500 uppercase mb-3 md:mb-4 tracking-widest">{t.simPriceLabel}</h4>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="text-2xl md:text-4xl font-black text-white italic">₩ 9,900</div>
                    <div className="text-[10px] md:text-sm text-gray-400 font-medium leading-tight text-left break-keep">{t.simPriceDesc}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center bg-[#FFD600] p-8 md:p-12 rounded-2xl md:rounded-[30px] text-[#121212] shadow-xl">
                <div className="mb-6 md:mb-8">
                  <p className="font-black italic text-[10px] md:text-sm uppercase mb-1 md:mb-2 opacity-70">{t.simResultSub}</p>
                  <div className="text-4xl md:text-6xl font-black">{t.formatUsers(results.subscribers)}</div>
                </div>
                <div className="h-px bg-[#121212]/10 mb-6 md:mb-8" />
                <div>
                  <p className="font-black italic text-[10px] md:text-sm uppercase mb-1 md:mb-2 opacity-70">{t.simResultArr}</p>
                  <div className="text-4xl md:text-6xl font-black">{t.formatArr(results.annual)}</div>
                  <p className="mt-4 md:mt-6 font-bold text-xs md:text-sm bg-black/5 p-3 md:p-4 rounded-lg md:rounded-xl border border-black/5 leading-relaxed break-keep">
                    {t.simNote(conversion, results.annual)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6: The Architect */}
        <section className="min-h-[100dvh] w-full snap-start flex flex-col justify-center items-center px-4 py-20 md:py-0 md:px-6 bg-white">
          <div className="max-w-7xl w-full mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <span className="text-[#EE2722] font-bold tracking-widest uppercase bg-[#EE2722]/10 px-3 py-1 rounded-full text-xs md:text-sm">{t.teamTag}</span>
              <h2 className="text-3xl md:text-5xl font-black mt-4 md:mt-6 mb-3 md:mb-4">{t.teamTitle}</h2>
              <p className="text-gray-500 text-sm md:text-lg break-keep">{t.teamDesc}</p>
            </div>

            <div className="bg-[#121212] rounded-3xl md:rounded-[40px] p-6 md:p-12 shadow-2xl flex flex-col xl:flex-row gap-8 md:gap-12 items-center text-white border border-gray-800 relative overflow-hidden group">
              
              <div className="flex flex-col sm:flex-row xl:flex-col gap-6 shrink-0 z-10 w-full xl:w-fit items-center justify-center">
                <div className="w-32 h-32 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#FFD600] to-[#EE2722] p-1 shrink-0 shadow-[0_0_30px_rgba(255,214,0,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#222] overflow-hidden border-4 border-[#121212]">
                    <img src="/images/eko_pix.jpeg" alt="Founder Eugene Ko" className="w-full h-full object-cover object-center" />
                  </div>
                </div>

                <div className="w-full max-w-[240px] md:max-w-none md:w-80 xl:w-64 aspect-[4/3] bg-[#222] rounded-2xl md:rounded-3xl border-4 border-gray-700 shadow-xl overflow-hidden relative">
                  <img src="/images/lucasfilm_group.jpg" alt="With George Lucas at Lucasfilm" className="w-full h-full object-cover object-center" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4">
                    <p className="text-[10px] md:text-xs font-bold text-[#FFD600] tracking-tight text-center md:text-left">With George Lucas @ Lucasfilm</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 z-10 w-full text-center xl:text-left">
                <div className="mb-8 md:mb-10 flex flex-col items-center xl:items-start">
                  <h3 className="text-2xl md:text-4xl font-black text-[#FFD600] mb-2 md:mb-3 italic tracking-tighter">Eugene Ko, <span className="text-white text-xl md:text-3xl font-bold not-italic">The Architect</span></h3>
                  <p className="text-gray-400 font-medium text-sm md:text-lg max-w-xl">{t.teamProfile}</p>
                  
                  <div className="flex flex-wrap justify-center xl:justify-start gap-3 md:gap-4 mt-4 md:mt-5">
                      <a href="https://www.linkedin.com/in/eugene-ko-32910a154/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0A66C2] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        LinkedIn
                      </a>
                      <a href="https://www.imdb.com/name/nm6031012/?ref_=fn_t_1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-[#F5C518] text-black px-4 md:px-5 py-2 md:py-2.5 rounded-full font-black text-xs md:text-sm">
                        IMDb
                      </a>
                    </div>
                  <div className="h-1 w-12 md:w-20 bg-[#EE2722] mt-6 md:mt-8 rounded-full hidden xl:block"></div>
                </div>
                
                <div className="space-y-4 md:space-y-8 text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 bg-gray-900/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-800">
                    <div className="bg-[#EE2722] text-white px-3 md:px-5 py-1.5 md:py-2 rounded-md md:rounded-lg font-black text-[10px] md:text-xs shrink-0 w-fit italic tracking-widest">CURRENT</div>
                    <div>
                      <h4 className="text-lg md:text-2xl font-bold text-white tracking-tight">{t.teamHistory1}</h4>
                      <p className="text-gray-400 text-xs md:text-base mt-1 font-medium leading-relaxed break-keep">{t.teamHistory1Desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 bg-gray-900/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-800">
                    <div className="bg-[#FFD600] text-[#121212] px-3 md:px-5 py-1.5 md:py-2 rounded-md md:rounded-lg font-black text-[10px] md:text-xs shrink-0 w-fit italic tracking-widest">CAREER</div>
                    <div>
                      <h4 className="text-lg md:text-2xl font-bold text-white tracking-tight">{t.teamHistory2}</h4>
                      <p className="text-gray-400 text-xs md:text-base mt-1 font-medium leading-relaxed break-keep">{t.teamHistory2Desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 bg-gray-900/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-800">
                    <div className="bg-gray-700 text-gray-300 px-3 md:px-5 py-1.5 md:py-2 rounded-md md:rounded-lg font-black text-[10px] md:text-xs shrink-0 w-fit italic tracking-widest">CAREER</div>
                    <div>
                      <h4 className="text-lg md:text-2xl font-bold text-white tracking-tight">{t.teamHistory3}</h4>
                      <p className="text-gray-400 text-xs md:text-base mt-1 font-medium leading-relaxed break-keep">{t.teamHistory3Desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 7: Footer & CTA */}
        <section className="min-h-[100dvh] w-full snap-start flex flex-col justify-center items-center px-4 py-20 md:py-0 md:px-6 bg-white relative">
          <div className="text-center max-w-4xl mx-auto w-full">
            <h2 className="text-3xl md:text-7xl font-black mb-6 md:mb-8 leading-tight break-keep">{t.ctaTitle}</h2>
            <p className="text-gray-500 text-base md:text-2xl mb-8 md:mb-12 font-medium break-keep">{t.ctaDesc}</p>
            <button onClick={() => setIsContactModalOpen(true)} className="w-full sm:w-auto bg-[#EE2722] text-white px-8 md:px-14 py-4 md:py-6 rounded-full font-black text-lg md:text-2xl hover:scale-105 transition shadow-2xl flex items-center justify-center gap-2 md:gap-4 mx-auto">
              <Mail className="w-6 h-6 md:w-8 md:h-8" /> contact@yeahplus.co.kr
            </button>
          </div>
          
          <footer className="absolute bottom-0 w-full py-6 md:py-8 border-t border-gray-100 px-4 md:px-6 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-bold text-gray-400 gap-4">
              <div className="text-center md:text-left">© 2026 KODAK MOMENT CLUB PROJECT.</div>
              <div className="flex gap-6 md:gap-8">
                <span className="hover:text-gray-800 cursor-pointer transition" onClick={() => setIsVideoModalOpen(true)}>APP DEMO</span>
                <span className="hover:text-gray-800 cursor-pointer transition" onClick={() => setIsContactModalOpen(true)}>CONTACT</span>
              </div>
            </div>
          </footer>
        </section>
      </main>

      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[9/16] bg-[#121212] rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border-2 md:border-4 border-[#333]">
              <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-[#EE2722] rounded-full p-2 transition">
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <video src="/kodak_demo.mp4" autoPlay controls loop playsInline className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}

        {isContactModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white rounded-2xl md:rounded-[30px] p-6 md:p-10 shadow-2xl my-auto">
              <button onClick={() => setIsContactModalOpen(false)} className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-[#EE2722] transition">
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              <div className="mb-6 md:mb-8">
                <span className="bg-[#FFD600] text-[#121212] px-2 md:px-3 py-1 rounded-full font-black text-[10px] md:text-xs tracking-widest mb-3 md:mb-4 inline-block">CONTACT US</span>
                <h3 className="text-2xl md:text-3xl font-black text-[#121212] break-keep">{t.modalTitle}</h3>
                <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2 break-keep">{t.modalDesc}</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5 md:mb-2">{t.formName}</label>
                  <input type="text" required placeholder={t.formNamePH} className="w-full bg-gray-50 border border-gray-200 p-3 md:p-4 rounded-lg md:rounded-xl focus:outline-none focus:border-[#FFD600] text-sm md:text-base" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5 md:mb-2">{t.formEmail}</label>
                  <input type="email" required placeholder="example@kodak.com" className="w-full bg-gray-50 border border-gray-200 p-3 md:p-4 rounded-lg md:rounded-xl focus:outline-none focus:border-[#FFD600] text-sm md:text-base" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5 md:mb-2">{t.formMessage}</label>
                  <textarea required placeholder={t.formMessagePH} rows={3} className="w-full bg-gray-50 border border-gray-200 p-3 md:p-4 rounded-lg md:rounded-xl focus:outline-none focus:border-[#FFD600] resize-none text-sm md:text-base" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" className="w-full bg-[#121212] text-white p-4 md:p-5 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:bg-[#EE2722] transition mt-2 md:mt-4 flex justify-center items-center gap-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5"/> {t.formSubmit}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}