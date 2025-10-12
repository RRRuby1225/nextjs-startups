// 文件路径: app/(root)/layout.tsx (修改后)

import Navbar from "../../components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // 1. 保留 <main> 标签，为这个布局区域提供语义化的主内容容器
    <main className="font-work-sans">
      {/* 2. Navbar 只在这里被渲染 */}
      <Navbar />
      {children}
    </main>
  );
}
