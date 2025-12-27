import type { Metadata } from "next";
import "./globals.css";

// ⚠️ 关键修正：告诉 Next.js 您的网站域名是什么
// 这样它会自动把所有的图片路径补全为 https://...
export const metadata: Metadata = {
  metadataBase: new URL('https://rocketcard-omega.vercel.app'), // 这里填您 Vercel 分配的那个真实域名

  title: "Rocket郑 - 工业数字化专家",
  description: "点击查看我的 3D 电子名片 | 扫码选型·智能目录",

  // 微信分享卡片配置
  openGraph: {
    title: "Rocket郑 - 工业数字化专家",
    description: "点击查看我的 3D 电子名片 | 扫码选型·智能目录",
    url: '/',
    siteName: 'Rocket Digital',
    images: [
      {
        url: '/share-icon.jpg', // 您的正方形缩略图
        width: 500,
        height: 500,
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },

  // 收藏/书签图标配置
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/share-icon.jpg', // 苹果手机添加到主屏幕时用的图标
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}