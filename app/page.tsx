'use client';

import { useState } from 'react';

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleGlitch = () => {
    setIsFlipped(!isFlipped);
  };

  // === vCard 生成逻辑 ===
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0f172a] p-4 overflow-hidden relative">

      {/* 标题提示 */}
      <div className="mb-8 md:mb-12 text-center pointer-events-none select-none">
        <h1 className="text-cyan-400 text-sm md:text-xl tracking-[0.3em] font-bold animate-pulse">
          DIGITAL IDENTITY SYSTEM
        </h1>
        <p className="text-slate-500 text-[10px] md:text-sm mt-2 tracking-widest uppercase">
          Click to Reconstruct / 点击重构
        </p>
      </div>

      {/* === 3D 场景容器 (Scene Container) === */}
      <div className="group w-full max-w-[340px] md:max-w-[900px] aspect-[1.6/1] sm:aspect-[1.6/1] cursor-pointer perspective-1000 z-10">

        {/* === 悬浮容器 (Float Container) === */}
        <div
          className="relative w-full h-full transition-all duration-500 ease-out-elastic group-hover:scale-[1.02] group-hover:-translate-y-2 group-active:scale-[0.98]"
          onClick={toggleGlitch}
        >

          {/* === 卡片主体 === */}
          {/* 这里不再需要 container 的 3D 翻转，因为 Glitch 效果是内部层级的切换 */}
          <div className="relative w-full h-full shadow-2xl">

            {/* === 正面 (Front) === */}
            <div
              className={`
              absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a] z-20
              ${isFlipped ? 'opacity-0 skew-x-12 pointer-events-none' : 'opacity-100'}
              transition-all duration-300 ease-linear
            `}
            >
              {/* 图片层 */}
              <img
                src="/card-front.jpg"
                alt="Front"
                className="h-full w-full object-fill"
              />

              {/* 光效层 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"></div>

              {/* 阴影/光晕增强 */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] rounded-2xl pointer-events-none"></div>
            </div>

            {/* === 背面 (Back) === */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a] z-10"
            >
              <img
                src="/card-back.jpg"
                alt="Back"
                className="h-full w-full object-fill"
              />

              {/* 交互层 */}
              <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none">
                <button
                  onClick={saveContact}
                  className="pointer-events-auto bg-white/10 hover:bg-white/20 hover:scale-105 backdrop-blur-md border border-white/20 text-white text-sm md:text-base font-bold py-2 px-6 rounded-full shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                >
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  <span>保存到通讯录</span>
                </button>
              </div>

              {/* 背面光效 */}
              <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/0 via-cyan-400/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>

          </div>

          {/* === 环境氛围光 (Ambient Glow) === */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10 animate-blob"></div>

        </div>
      </div>

      <div className="mt-8 md:mt-16 text-slate-600 text-[10px] md:text-sm font-mono tracking-widest">
        POWERED BY ROCKET TECH
      </div>
    </main>
  );
}
