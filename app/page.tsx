'use client';

import { useState } from 'react';

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0f172a] p-4 overflow-hidden">

      {/* 标题提示 */}
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-cyan-400 text-sm md:text-xl tracking-[0.3em] font-bold animate-pulse">
          DIGITAL IDENTITY SYSTEM
        </h1>
        <p className="text-slate-500 text-[10px] md:text-sm mt-2 tracking-widest uppercase">
          Tap Card to Flip / 点击卡片翻转
        </p>
      </div>

      {/* === 3D 场景容器 === */}
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
              className="h-full w-full object-fill"
            />
            {/* 电脑端光效 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-white/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden md:block"></div>
          </div>

          {/* === 背面 (Back) - 回归图片版 === */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] md:shadow-[0_0_60px_rgba(255,255,255,0.15)] bg-gray-200">

            {/* 1. 直接使用您的原图作为背景 (object-fill 确保填满不留白) */}
            <img
              src="/card-back.jpg"
              alt="Back"
              className="h-full w-full object-fill"
            />

            {/* 2. 交互层：只保留一个很有质感的“保存按钮” */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">

              {/* 这里的按钮使用了“毛玻璃”效果 (backdrop-blur)，既看得清按钮，又隐约透出底下的金属质感 */}
              <button
                onClick={saveContact}
                className="w-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs md:text-lg font-bold py-3 md:py-4 rounded-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {/* 下载图标 */}
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>

                保存到通讯录
              </button>
            </div>

          </div>

        </div>
      </div>

      <div className="mt-8 md:mt-16 text-slate-600 text-[10px] md:text-sm font-mono tracking-widest">
        POWERED BY ROCKET TECH
      </div>
    </main>
  );
}