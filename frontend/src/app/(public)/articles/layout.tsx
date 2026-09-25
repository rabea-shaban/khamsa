import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المقالات والشروحات التقنية',
  description:
    'شروحات ومقالات تقنية عميقة ومبسطة في تطوير الويب، هندسة البرمجيات، جافاسكريبت، وتايب سكريبت من الألف إلى الياء.',
  openGraph: {
    title: 'المقالات والشروحات التقنية | خمسة برمجة بالبلدي',
    description:
      'شروحات ومقالات تقنية عميقة ومبسطة في تطوير الويب، هندسة البرمجيات، وجافاسكريبت بأسلوب عملي.',
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
