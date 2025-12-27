'use client';

import { useState } from 'react';

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  // === 功能 1: 生成并下载通讯录文件 (vCard) ===
  const saveContact = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止冒泡，防止点击按钮时卡片翻转

    // vCard 格式字符串
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Rocket 郑
ORG:独立技术专家 (Solopreneur)
TITLE:工业数字化顾问
TEL;TYPE=CELL:18668787770
EMAIL:2714xxx@qq.com
URL:https://您的网站.com
ADR;TYPE=WORK:;;柳翁西路20号中环大厦701;;;;
END:VCARD`;

    // 创建 Blob 对象并触发下载
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Rocket郑.vcf'); // 手机下载后点击即可导入
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

      {/* 提示语 */}
      <div className="mb-8 text-center animate-pulse text-cyan-400 text-sm tracking-widest">
        DIGITAL IDENTITY SYSTEM <br /> CLICK CARD TO SCAN
      </div>

      {/* === 3D 场景容器 === */}
      <div
        className="group h-[220px] w-[360px] cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* 翻转控制层 */}
        <div
          className={`relative h-full w-full transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
            }`}
        >
          {/* === 正面 (Front) === */}
          <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] border border-gray-700">
            {/* 这里的图源替换为您上传到 public 的图片 */}
            <img
              src="/card-front.jpg"
              alt="Front"
              className="h-full w-full object-cover"
            />
            {/* 交互提示指引 */}
            <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded text-xs text-white backdrop-blur-sm">
              👆 点击查看背面
            </div>
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