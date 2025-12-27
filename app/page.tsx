'use client';

import { useState } from 'react';

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  // === vCard 生成逻辑 (不变) ===
  const saveContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Rocket 郑
ORG:独立技术专家 (Solopreneur)
TITLE:工业数字化顾问
TEL;TYPE=CELL:18668787770
EMAIL:271429107@qq.com
URL:https://rocketcard-omega.vercel.app
ADR;TYPE=WORK:;;柳翁西路20号中环大厦701;;;;
END:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Rocket郑.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = 'tel:18668787770';
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0f172a] p-4 overflow-hidden selection:bg-cyan-500 selection:text-white">

      {/* 标题提示 */}
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-cyan-400 text-sm md:text-xl tracking-[0.3em] font-bold animate-pulse">
          DIGITAL IDENTITY SYSTEM
        </h1>
        <p className="text-slate-500 text-[10px] md:text-sm mt-2 tracking-widest uppercase">
          Tap Card to Flip / 点击卡片翻转
        </p>
      </div>

      {/* === 3D 场景容器 (核心修改区域) === */}
      {/* 修改说明：
         1. w-[90vw] max-w-[380px] aspect-[1.6/1]: 手机竖屏的最佳比例。
         2. landscape:w-[60vh] landscape:max-w-[600px]: 手机横屏时，让卡片变宽。
         3. md:w-[650px] md:h-[410px] md:max-w-none: 电脑端强制使用巨大尺寸！
      */}
      <div
        className="group w-[90vw] max-w-[380px] aspect-[1.6/1] landscape:aspect-[1.6/1] landscape:h-[80vh] landscape:w-auto md:w-[650px] md:h-[410px] md:max-w-none cursor-pointer perspective-1000 transition-all duration-500"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative h-full w-full transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
            }`}
        >
          {/* === 正面 (Front) === */}
          <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] md:shadow-[0_0_60px_rgba(6,182,212,0.4)] border border-slate-700/50">
            <img
              src="/card-front.jpg"
              alt="Front"
              className="h-full w-full object-cover"
            />
            {/* 电脑端增加更强的光效 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-white/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden md:block"></div>
          </div>

          {/* === 背面 (Back) - 彻底修复布局BUG === */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] md:shadow-[0_0_60px_rgba(255,255,255,0.15)] bg-gradient-to-br from-gray-100 to-gray-300 font-sans">

            {/* 纹理层 */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            {/* 内容层：使用 Flex 布局确保稳固 */}
            <div className="relative h-full flex flex-col justify-between p-5 md:p-8 text-gray-800">

              {/* 上部分：主要信息 */}
              <div>
                <div className="flex justify-between items-start border-b border-gray-400/50 pb-3 mb-3 md:mb-5">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900">Rocket 郑</h2>
                    <p className="text-xs md:text-base text-gray-600 font-bold uppercase mt-1 tracking-wider">Solopreneur / 独立数字化专家</p>
                  </div>
                  <svg className="w-8 h-8 md:w-12 md:h-12 text-cyan-700/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>

                {/* 联系方式列表 - 电脑端字体更大 */}
                <div className="space-y-2 md:space-y-4 text-xs md:text-lg font-bold pl-1">
                  <div className="flex items-center group/item cursor-pointer hover:text-cyan-700 transition-colors" onClick={handleCall}>
                    <span className="w-14 md:w-24 text-gray-500 text-[10px] md:text-sm font-normal">MOBILE</span>
                    <span>186 6878 7770</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-14 md:w-24 text-gray-500 text-[10px] md:text-sm font-normal">WECHAT</span>
                    <span>z271429107</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-14 md:w-24 text-gray-500 text-[10px] md:text-sm font-normal">EMAIL</span>
                    <span>271429107@qq.com</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-14 md:w-24 text-gray-500 text-[10px] md:text-sm font-normal shrink-0 mt-1">ADDR</span>
                    <span className="leading-tight">柳翁西路20号中环大厦701</span>
                  </div>
                </div>
              </div>

              {/* 下部分：按钮 (永远在底部，不遮挡) */}
              <div className="mt-4 md:mt-0">
                <button
                  onClick={saveContact}
                  className="w-full bg-gray-900 hover:bg-black text-white text-xs md:text-base font-bold py-3 md:py-4 rounded-lg shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3