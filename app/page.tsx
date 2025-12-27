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

  // === 功能 2: 拨打电话 ===
  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = 'tel:18668787770';
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-gray-900 to-black">

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

          {/* === 背面 (Back) === */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] border border-gray-700">
            <div className="relative h-full w-full">
              <img
                src="/card-back.jpg"
                alt="Back"
                className="h-full w-full object-cover"
              />

              {/* === 隐形交互热区 (根据您的图片布局调整位置) === */}

              {/* 1. 电话热区 (假设在图片中间位置) */}
              <button
                onClick={handleCall}
                className="absolute top-[35%] left-[10%] w-[60%] h-[12%] bg-blue-500/0 hover:bg-blue-500/10 active:bg-blue-500/20 transition-colors rounded"
              >
                {/* 调试时把 bg-blue-500/0 改成 /30 就能看到热区在哪 */}
              </button>

              {/* 2. 微信/保存通讯录热区 */}
              <button
                onClick={saveContact}
                className="absolute bottom-[10%] left-[10%] w-[80%] h-[15%] bg-green-500/20 hover:bg-green-500/30 text-white text-xs font-bold rounded flex items-center justify-center backdrop-blur-sm border border-green-400/30 shadow-lg animate-pulse"
              >
                📲 点击保存到通讯录
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* 底部版权 */}
      <div className="mt-10 text-gray-500 text-xs">
        Powered by Rocket Tech
      </div>
    </main>
  );
}