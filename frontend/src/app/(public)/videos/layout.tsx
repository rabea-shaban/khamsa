import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'كبسولات وفيديوهات البرمجة',
  description:
    'أحدث فيديوهات وشروحات البرمجة على يوتيوب وتيك توك وفيسبوك بأسلوب عملي وسهل.',
  openGraph: {
    title: 'كبسولات وفيديوهات البرمجة | خمسة برمجة بالبلدي',
    description:
      'شاهد أحدث كبسولات وشروحات البرمجة السريعة والعملية للمطور العربي.',
  },
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
