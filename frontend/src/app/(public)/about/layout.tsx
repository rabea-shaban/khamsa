import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عن المنصة ورؤيتنا',
  description:
    'تعرف على قصة، ورؤية، وفلسفة منصة خمسة برمجة بالبلدي ومؤسسها ربيع شعبان لتبسيط هندسة البرمجيات وتطوير الويب للمطور العربي.',
  openGraph: {
    title: 'عن منصة خمسة برمجة بالبلدي | نفهم البرمجة بالبلدي، ونبنيها صح',
    description:
      'قصة وفلسفة منصة خمسة برمجة بالبلدي ومؤسسها ربيع شعبان لتبسيط علوم الحاسب والمفاهيم المعمارية للمطور العربي.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
