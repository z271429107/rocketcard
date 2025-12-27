import type { Metadata } from "next";
import "./globals.css";

// 这里是您之前设置的微信分享信息
export const metadata: Metadata = {
  title: "Rocket郑 - 工业数字化专家",
  description: "点击查看我的 3D 电子名片 | 扫码选型·智能目录",
};

// ❌ 报错就是因为缺了下面这段 "export default" 函数
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