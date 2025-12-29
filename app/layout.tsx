import type { Metadata } from "next";
import "./globals.css";

// ⚠️ 核心：指定实际部署域名（包含子目录）
const BaseUrl = 'https://www.dzml.com.cn/card';

export const metadata: Metadata = {
  metadataBase: new URL(BaseUrl),

  title: "Rocket郑 | 工业数字化顾问",
  description: "点击查看我的 3D 电子名片。提供精准选型、安全传输、快速分享的数字化解决方案。",

  // 微信分享卡片配置
  openGraph: {
    title: "Rocket郑 | 工业数字化顾问",
    description: "点击查看 3D 电子名片，访问官网。",
    url: BaseUrl,
    siteName: 'Rocket Digital',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        // 使用完整绝对路径确保微信能抓取
        url: `${BaseUrl}/wechat.png`,
        width: 300,
        height: 300,
        alt: 'Rocket郑 - 3D电子名片'
      }
    ],
  },

  // 收藏夹和桌面图标配置
  icons: {
    icon: '/favicon.ico',
    apple: `${BaseUrl}/share-icon.jpg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      {/* 增加一个 head 标签来强制移动端视图 */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="antialiased">
        {/* === 微信分享兼容 Hack: 放在 body 第一张图片 === */}
        <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}>
          <img src={`${BaseUrl}/wechat.png`} alt="thumbnail" />
        </div>
        {children}
      </body>
    </html>
  );
}