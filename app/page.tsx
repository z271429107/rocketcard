'use client';

import { useState } from 'react';

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  // === vCard 生成逻辑 (保持不变) ===
  const saveContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Rocket 郑
ORG:超级个体 (Solopreneur)
TITLE:工业数字化顾问
TEL;TYPE=CELL:18668787770
EMAIL:271429107@qq.com
URL:https://zs.dzml.com.cn
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

      {/* 标题 - 增加呼吸灯效果 */}
      <div className="mb-10 text-center">
        <h1 className="text-cyan-400 text-lg tracking-[0.3em] font-bold animate-pulse">
          DIGITAL IDENTITY
        </h1>
        <p className="text-slate-500 text-xs mt-2 tracking-widest uppercase">
          Click Card to Flip / 点击卡片翻转
        </p>
      </div>

      {/* === 3D 场景容器 === */}
      {/* 关键修改：md:scale-150 在电脑屏幕上放大1.5倍 */}
      <div
        className="group h-[220px] w-[360px] cursor-pointer perspective-1000 transition-transform duration-500 md:scale-150"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative h-full w-full transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
            }`}
        >
          {/* === 正面 (保持原样，您的3D图很棒) === */}
          <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.4)] border border-slate-700/50">
            <img
              src="/card-front.jpg"
              alt="Front"
              className="h-full w-full object-cover"
            />
            {/* 增加一个扫描光效 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-white/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>

          {/* === 背面 (重构：使用代码绘制金属质感) === */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)]">

            {/* 1. 背景层：模拟金属拉丝银色 */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300"></div>
            {/* 金属噪点纹理 */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* 2. 内容层：排版 */}
            <div className="relative h-full flex flex-col p-6 text-gray-800 font-sans">

              {/* 头部：名字与职位 */}
              <div className="flex justify-between items-start border-b border-gray-400/30 pb-3 mb-3">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900">Rocket 郑</h2>
                  <p className="text-xs text-gray-600 font-bold uppercase mt-1 tracking-wider">Solopreneur / 独立专家</p>
                </div>
                {/* 右上角 Logo (如果您有SVG logo最好，没有用文字代替) */}
                <div className="text-cyan-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
              </div>

              {/* 中部：联系信息 (Grid布局对齐) */}
              <div className="space-y-2 text-xs font-medium pl-1">
                <div className="flex items-center group/item cursor-pointer" onClick={handleCall}>
                  <span className="w-12 text-gray-500">MOBILE</span>
                  <span className="text-gray-900 group-hover/item:text-cyan-700 transition-colors">186 6878 7770</span>
                </div>
                <div className="flex items-center">
                  <span className="w-12 text-gray-500">WECHAT</span>
                  <span className="text-gray-900">z271429107</span>
                </div>
                <div className="flex items-center">
                  <span className="w-12 text-gray-500">EMAIL</span>
                  <span className="text-gray-900 scale-90 origin-left">271429107@qq.com</span>
                </div>
                <div className="flex items-start mt-1">
                  <span className="w-12 text-gray-500 shrink-0">ADDR</span>
                  <span className="text-gray-900 leading-tight scale-90 origin-top-left">柳翁西路20号中环大厦701</span>
                </div>
              </div>

              {/* 底部：操作按钮 (悬浮且不遮挡) */}
              <div className="mt-auto flex gap-2">
                <button
                  onClick={saveContact}
                  className="flex-1 bg-gray-900 hover:bg-black text-white text-[10px] font-bold py-2 px-3 rounded shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  保存到通讯录
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="mt-12 text-slate-600 text-[10px] font-mono">
        POWERED BY ROCKET TECH
      </div>
    </main>
  );
}