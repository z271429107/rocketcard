import type { Metadata } from "next";
import "./globals.css";

// ⚠️ 核心修复：强制指定您的 Vercel 域名作为根路径
// 这样微信才能准确找到图片
const BaseUrl = 'https://rocketcard-omega.vercel.app';

export const metadata: Metadata = {
  // 这一行告诉 Next.js 所有相对路径都要基于这个域名补全
  metadataBase: new URL(BaseUrl),

  title: "Rocket郑 | 工业数字化顾问",
  description: "点击查看我的 3D 电子名片。提供精准选型、安全传输、快速分享的数字化解决方案。",

  // 微信朋友圈和会话分享配置
  openGraph: {
    title: "Rocket郑 | 工业数字化顾问",
    description: "点击查看 3D 电子名片，访问官网。",
    url: '/',
    siteName: 'Rocket Digital',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/card-front.jpg', // Next.js 会自动将其解析为以 metadataBase 为前缀的绝对路径
        width: 800,
        height: 500,
        alt: 'Rocket郑 - 3D电子名片'
      }
    ],
  },

  // 收藏夹和桌面图标配置
  icons: {
    icon: '/favicon.ico', // 确保您的 public 文件夹里有这个文件
    apple: `${BaseUrl}/share-icon.jpg`, // 苹果手机图标
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
      <body className="antialiased">{children}</body>
    </html>
  );
}