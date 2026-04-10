"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Smartphone, Users, TrendingUp, CheckCircle, X, Mail, PlayCircle } from 'lucide-react';

const COLORS = {
  KODAK_YELLOW: "#FFD600",
  KODAK_RED: "#EE2722",
  KODAK_BLACK: "#121212",
};

export default function KodakPitchPage() {
  const [som, setSom] = useState(100000);
  const [conversion, setConversion] = useState(5);
  const [fee, setFee] = useState(9900);
  const [results, setResults] = useState({ monthly: 0, annual: 0, subscribers: 0 });

  // 모달 상태 관리
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // 문의 폼 상태
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const subscribers = Math.floor(som * (conversion / 100));
    const monthly = subscribers * fee;
    const annual = monthly * 12;
    setResults({ monthly, annual, subscribers });
  }, [som, conversion, fee]);

  // 이메일 전송 핸들러
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[코닥 모먼트 클럽] 파트너십 문의 - ${formData.name}`);
    const body = encodeURIComponent(`이름/회사명: ${formData.name}\n회신 이메일: ${formData.email}\n\n문의 내용:\n${formData.message}`);
    window.location.href = `mailto:contact@yeahplus.co.kr?subject=${subject}&body=${body}`;
    setIsContactModalOpen(false);
  };

  return (
    <div className="relative font-sans text-gray-900 bg-[#121212]">
      {/* Snap Scroll Container
        h-screen으로 각 섹션을 100% 뷰포트에 맞춥니다.
      */}
      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-white">      
        
        {/* Slide 1: Hero Section */}
        <section className="h-screen w-full snap-start flex flex-col justify-center items-center bg-[#FFD600] px-6 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="bg-[#EE2722] text-white inline-block px-4 py-1 font-black italic mb-6 shadow-lg">KODAK MOMENT CLUB</div>
            <h1 className="text-5xl md:text-7xl font-black text-[#121212] leading-tight mb-8 drop-shadow-sm">
              1만 장의 디지털 픽셀보다,<br/>
              만질 수 있는 1장의 진짜 추억을 위해.
            </h1>
            <p className="text-xl md:text-2xl font-bold text-[#121212]/80 mb-12">
              Z세대를 위한 프리미엄 아날로그 구독 서비스
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('page-2')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#121212] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition shadow-xl"
              >
                제안서 보기
              </button>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-2 border-2 border-[#121212] text-[#121212] px-8 py-4 rounded-full font-bold hover:bg-white transition shadow-xl bg-[#FFD600]"
              >
                <PlayCircle className="w-5 h-5" /> 데모 시연
              </button>
            </div>
          </motion.div>
        </section>

        {/* Slide 2: Problem & Solution (내용 추가 및 중앙 정렬) */}
        <section id="page-2" className="h-screen w-full snap-start flex flex-col justify-center items-center px-6 bg-[#121212] text-white">
          <div className="max-w-6xl w-full mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#EE2722] font-bold tracking-widest uppercase bg-[#EE2722]/10 px-4 py-1 rounded-full">The Problem & Solution</span>
              <h2 className="text-4xl md:text-5xl font-black mt-6 mb-6 leading-tight">너무 쉽게 찍고, 너무 쉽게 버려집니다.</h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Z세대는 '너무 완벽하고 즉각적인' 디지털 피드에 피로감을 느낍니다.<br/>
                우리는 이들에게 <span className="text-[#FFD600] font-bold">필름 카메라의 '불편함'과 '기다림의 설렘'</span>을 구독 모델로 제공합니다.
              </p>
            </div>

            {/* Before & After 비교 섹션 추가로 화면 채우기 */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-10 rounded-3xl border border-gray-700 flex flex-col justify-center">
                <Smartphone className="w-12 h-12 text-gray-500 mb-6" />
                <h3 className="font-bold text-2xl mb-4 text-gray-300">AS-IS : 의미 잃은 디지털</h3>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-center gap-2"><X className="w-5 h-5 text-red-500"/> 무한정 찍고 다시 보지 않는 갤러리</li>
                  <li className="flex items-center gap-2"><X className="w-5 h-5 text-red-500"/> 누구에게나 똑같은 디지털 필터</li>
                  <li className="flex items-center gap-2"><X className="w-5 h-5 text-red-500"/> 터치 한 번으로 사라지는 휘발성</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-10 rounded-3xl border border-[#FFD600]/30 shadow-[0_0_30px_rgba(255,214,0,0.1)] flex flex-col justify-center">
                <Camera className="w-12 h-12 text-[#FFD600] mb-6" />
                <h3 className="font-bold text-2xl mb-4 text-[#FFD600]">TO-BE : 코닥 모먼트 클럽</h3>
                <ul className="space-y-4 text-gray-200">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#FFD600]"/> 한 달에 24장, 신중하게 누르는 셔터</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#FFD600]"/> 코닥 골드의 완벽한 아날로그 텍스처</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#FFD600]"/> 매월 집으로 배송되는 실물 인화 패키지</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3: Market Size (2025년 최신 데이터 반영 업데이트) */}
        <section id="market-size" className="h-screen w-full snap-start flex flex-col justify-center items-center px-6 bg-gray-50">
          <div className="max-w-6xl w-full mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#EE2722] font-bold tracking-widest uppercase bg-[#EE2722]/10 px-4 py-1 rounded-full text-sm">2025 Market Outlook</span>
              <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4 text-[#121212] tracking-tight">비즈니스 스케일: <span className="text-[#EE2722]">100조 원</span>의 기회</h2>
              <p className="text-gray-500 text-lg md:text-xl mb-16 font-medium">단순한 앱을 넘어, 거대해진 대한민국 구독 경제의 핵심으로 진입합니다.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {/* TAM: 국내 구독경제 전체 규모 */}
              <div className="bg-white p-12 rounded-[40px] shadow-sm border-b-8 border-[#FFD600] flex flex-col justify-center transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-gray-400 font-black mb-4 text-sm tracking-tighter uppercase">TAM (전체 시장)</h3>
                <div className="text-6xl font-black mb-6 text-[#121212]">100조<span className="text-2xl ml-1">원+</span></div>
                <p className="text-gray-500 text-sm leading-relaxed font-semibold">
                  KT경제경영연구소 전망,<br/> 
                  <span className="text-[#121212]">2025년 국내 구독경제 시장 규모.</span><br/>
                  모든 소비가 '소유'에서 '구독'으로 전환되는 시점입니다.
                </p>
              </div>

              {/* SAM: 글로벌 사진 인화 시장 규모 */}
              <div className="bg-white p-12 rounded-[40px] shadow-md border-b-8 border-[#EE2722] flex flex-col justify-center transition-all duration-300 hover:shadow-2xl transform scale-105 z-10 relative bg-gradient-to-b from-white to-red-50/30">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#EE2722] text-white text-xs font-black px-4 py-2 rounded-full shadow-xl tracking-widest">GLOBAL TREND</div>
                <h3 className="text-[#EE2722] font-black mb-4 text-sm tracking-tighter uppercase">SAM (글로벌 인화 시장)</h3>
                <div className="text-6xl font-black mb-6 text-[#121212]">37조<span className="text-2xl ml-1">원</span></div>
                <p className="text-gray-600 text-sm leading-relaxed font-semibold">
                  <span className="text-[#EE2722]">약 273억 1천만 달러 규모.</span><br/>
                  스마트폰 세대의 커스텀 인화 및 포토북 수요가 시장 성장을 견인하고 있습니다.
                </p>
              </div>

              {/* SOM: 코닥 핵심 팬덤 및 수익 타겟 */}
              <div className="bg-[#121212] p-12 rounded-[40px] shadow-2xl text-white border-b-8 border-[#FFD600] flex flex-col justify-center transition-all duration-300 hover:shadow-[0_20px_50px_rgba(255,214,0,0.2)]">
                <h3 className="text-[#FFD600] font-black mb-4 text-sm tracking-tighter uppercase">SOM (수익 타겟)</h3>
                <div className="text-6xl font-black mb-6 text-[#FFD600]">30만<span className="text-2xl ml-1 text-white">명</span></div>
                <p className="text-gray-400 text-sm leading-relaxed font-semibold">
                  코닥 어패럴 유저 및 아날로그 고관여 층.<br/>
                  <span className="text-white">전환율 10% 달성 시, 연 매출 35억 원</span>의<br/>
                  확실한 캐시카우 발생합니다.
                </p>
              </div>
            </div>

            <div className="mt-16 flex items-center justify-center gap-2 text-gray-400 font-bold italic">
              <span className="w-12 h-[1px] bg-gray-300"></span>
              SOURCE: KT경제경영연구소 & Global Photo Printing Market Analysis (2025)
              <span className="w-12 h-[1px] bg-gray-300"></span>
            </div>
          </div>
        </section>

        {/* Slide 4: Validation (크기 키우고 시각적 요소 강조) */}
        <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6 bg-white">
          <div className="max-w-7xl w-full mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#EE2722] font-bold tracking-widest uppercase bg-[#EE2722]/10 px-4 py-1 rounded-full">Validation</span>
              <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4">성공을 확신하는 4가지 근거</h2>
              <p className="text-gray-500 text-lg">시장은 이미 코닥을 원하고 있으며, 지갑을 열 준비를 마쳤습니다.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "레퍼런스 체크", stat: "1,000억+", desc: "코닥 어패럴 국내 연 매출 돌파. 의류로 증명된 강력한 팬덤을 디지털 경험으로 전환합니다.", icon: <TrendingUp className="text-[#EE2722] w-8 h-8" /> },
                { title: "사용자 인터뷰", stat: "80% 이상", desc: "Z세대 50명 FGI 결과, 대다수가 '기다림의 불편함'을 힙(Hip)한 프리미엄 가치로 인식했습니다.", icon: <Users className="text-[#EE2722] w-8 h-8" /> },
                { title: "유사 서비스 성장", stat: "폭발적", desc: "Gudak, NOMO 등 마케팅 없이도 달성한 초기 다운로드 수치가 아날로그 필터 수요를 증명합니다.", icon: <Smartphone className="text-[#EE2722] w-8 h-8" /> },
                { title: "전환율 가설", stat: "5~10%", desc: "감성 고관여 시장 특성상 일반 구독 커머스를 상회하는 압도적인 유료(배송) 전환율을 기대합니다.", icon: <CheckCircle className="text-[#EE2722] w-8 h-8" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 p-10 bg-gray-50 border border-gray-100 rounded-[30px] shadow-sm hover:shadow-xl hover:bg-white transition duration-300 group">
                  <div className="bg-red-50 p-6 rounded-2xl h-fit group-hover:bg-[#EE2722]/10 transition">{item.icon}</div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="font-bold text-2xl text-gray-800">{item.title}</h3>
                      <span className="text-[#EE2722] font-black text-xl">{item.stat}</span>
                    </div>
                    <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 5: Simulator (기존 코드를 중앙 정렬로 래핑) */}
        <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6 bg-[#121212] text-white">
          <div className="max-w-6xl w-full mx-auto bg-[#1A1A1A] p-10 md:p-16 rounded-[40px] border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#FFD600] mb-2">KODAK 시장 검증 시뮬레이터</h2>
                <p className="text-gray-400 font-medium text-lg">데이터에 기반한 수익성 예측 (Annual Recurring Revenue)</p>
              </div>
              <div className="bg-[#EE2722] px-6 py-2 rounded-full font-black text-sm italic shadow-lg shadow-red-500/20">PROFITABILITY CALCULATOR</div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="font-bold text-gray-300 italic text-lg">Target SOM (목표 타겟 모수)</label>
                    <span className="text-[#FFD600] font-black text-xl">{som.toLocaleString()} 명</span>
                  </div>
                  <input type="range" min="10000" max="500000" step="10000" value={som} onChange={(e) => setSom(Number(e.target.value))} className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FFD600]" />
                </div>
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="font-bold text-gray-300 italic text-lg">Conversion Rate (유료 전환율)</label>
                    <span className="text-[#FFD600] font-black text-xl">{conversion} %</span>
                  </div>
                  <input type="range" min="1" max="20" step="1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FFD600]" />
                </div>
                <div className="p-6 bg-[#222] rounded-2xl border border-white/5">
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-widest">Pricing Strategy</h4>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-black text-white italic">₩ 9,900</div>
                    <div className="text-sm text-gray-400 font-medium leading-tight text-left">코닥 골드 24장 인화 및<br/>전용 옐로우 패키지 배송비 포함</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center bg-[#FFD600] p-12 rounded-[30px] text-[#121212] shadow-xl">
                <div className="mb-8">
                  <p className="font-black italic text-sm uppercase mb-2 opacity-70">Estimated Paid Subscribers</p>
                  <div className="text-6xl font-black">{results.subscribers.toLocaleString()} <span className="text-3xl">명</span></div>
                </div>
                <div className="h-px bg-[#121212]/10 mb-8" />
                <div>
                  <p className="font-black italic text-sm uppercase mb-2 opacity-70">Projected Annual Revenue (ARR)</p>
                  <div className="text-6xl font-black">₩ {(results.annual / 100000000).toFixed(1)} <span className="text-3xl">억</span></div>
                  <p className="mt-6 font-bold text-sm bg-black/5 p-4 rounded-xl border border-black/5 leading-relaxed">
                    "보수적으로 잡아 타겟의 {conversion}%만 확보해도, 연간 {Math.floor(results.annual / 100000000)}억 원 이상의 예측 가능한 반복 매출(ARR)이 발생합니다."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6: Footer & CTA (중앙 정렬) */}
        <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6 bg-white relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              우리가 시장성을 증명했습니다.<br/>
              <span className="text-[#EE2722]">이제 코닥의 인프라를 태울 차례입니다.</span>
            </h2>
            <p className="text-gray-500 text-2xl mb-12 font-medium">
              브랜드 자산과 테크놀로지의 완벽한 결합, <br/>코닥 모먼트 클럽과 함께 미래를 현상하십시오.
            </p>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-[#EE2722] text-white px-14 py-6 rounded-full font-black text-2xl hover:scale-105 transition shadow-2xl shadow-red-500/30 flex items-center gap-4 mx-auto"
            >
              <Mail className="w-8 h-8" /> PARTNERSHIP INQUIRY
            </button>
          </div>
          
          {/* Footer Bar (화면 맨 밑 고정) */}
          <footer className="absolute bottom-0 w-full py-8 border-t border-gray-100 px-6 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-bold text-gray-400 gap-4">
              <div>© 2026 KODAK MOMENT CLUB PROJECT. PRODUCED BY YEAHPLUS.</div>
              <div className="flex gap-8">
                <span className="hover:text-gray-800 cursor-pointer transition">BUSINESS PLAN</span>
                <span className="hover:text-gray-800 cursor-pointer transition" onClick={() => setIsVideoModalOpen(true)}>APP DEMO</span>
                <span className="hover:text-gray-800 cursor-pointer transition" onClick={() => setIsContactModalOpen(true)}>CONTACT</span>
              </div>
            </div>
          </footer>
        </section>
      </main>

      {/* --- 모달 영역 --- */}
      <AnimatePresence>
        {/* 1. 데모 시연 영상 플로팅 팝업 */}
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <div className="relative w-full max-w-[400px] aspect-[9/16] bg-[#121212] rounded-[40px] overflow-hidden shadow-2xl border-4 border-[#333]">
              <button 
                onClick={() => setIsVideoModalOpen(false)} 
                className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-[#EE2722] rounded-full p-2 transition"
              >
                <X className="w-6 h-6" />
              </button>
              {/* 영상 소스: public/demo.mp4 파일이 있어야 합니다. */}
              <video 
                src="/kodak_demo.mp4" 
                autoPlay 
                controls 
                loop 
                playsInline 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* 2. 파트너십 문의 폼 팝업 */}
        {isContactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[30px] p-10 shadow-2xl"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-[#EE2722] transition"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="mb-8">
                <span className="bg-[#FFD600] text-[#121212] px-3 py-1 rounded-full font-black text-xs tracking-widest mb-4 inline-block">CONTACT US</span>
                <h3 className="text-3xl font-black text-[#121212]">파트너십 제안하기</h3>
                <p className="text-gray-500 mt-2">코닥의 헤리티지를 수익화할 준비가 되셨나요?</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">소속 및 성함</label>
                  <input 
                    type="text" 
                    required
                    placeholder="예) 하이라이트브랜즈 / 김코닥 이사" 
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">회신받으실 이메일</label>
                  <input 
                    type="email" 
                    required
                    placeholder="example@kodak.com" 
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">문의 내용</label>
                  <textarea 
                    required
                    placeholder="데모 미팅 요청, 기술 제휴 등 자유롭게 남겨주세요." 
                    rows={4} 
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#121212] text-white p-5 rounded-xl font-bold text-lg hover:bg-[#EE2722] hover:shadow-lg hover:shadow-red-500/20 transition duration-300 mt-4 flex justify-center items-center gap-2"
                >
                  <Mail className="w-5 h-5"/> 담당자(contact@yeahplus.co.kr)에게 전송
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}