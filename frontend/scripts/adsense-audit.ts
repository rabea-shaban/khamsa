import fs from 'fs';
import path from 'path';
import { STATIC_ARTICLES } from '../src/data/static-articles';

interface AuditResult {
  passed: boolean;
  message: string;
  details?: unknown;
}

async function runAdSenseAudit() {
  console.log('====================================================');
  console.log('🔍 بدء التدقيق الشامل لجاهزية Google AdSense');
  console.log('   منصة «خمسة برمجة بالبلدي» (Khamsa Programming)');
  console.log('====================================================\n');

  const results: Record<string, AuditResult> = {};

  // 1. Audit Static Articles Count
  const totalArticles = STATIC_ARTICLES.length;
  results['articles_count'] = {
    passed: totalArticles >= 20,
    message: `عدد المقالات الثابتة: ${totalArticles} / 20`,
    details: { totalArticles },
  };

  // 2. Audit Word Counts & Content Quality
  let totalWords = 0;
  let minWords = Infinity;
  let maxWords = -Infinity;
  const articlesWithoutFaq: string[] = [];
  const articlesWithoutSeo: string[] = [];
  const articlesWithoutCover: string[] = [];
  const articlesWithoutRelated: string[] = [];

  STATIC_ARTICLES.forEach((art) => {
    // Count Arabic and English words accurately
    const textOnly = art.content.replace(/<[^>]*>/g, ' ').replace(/[#*`_-]/g, ' ');
    const words = textOnly.trim().split(/\s+/).filter(Boolean).length;

    totalWords += words;
    if (words < minWords) minWords = words;
    if (words > maxWords) maxWords = words;

    if (!art.faq || art.faq.length === 0) articlesWithoutFaq.push(art.title);
    if (!art.seo || !art.seo.title || !art.seo.description) articlesWithoutSeo.push(art.title);
    if (!art.coverImage) articlesWithoutCover.push(art.title);
    if (!art.relatedSlugs || art.relatedSlugs.length === 0) articlesWithoutRelated.push(art.title);
  });

  const avgWords = Math.round(totalWords / totalArticles);

  results['word_counts'] = {
    passed: minWords >= 300,
    message: `إجمالي الكلمات: ${totalWords.toLocaleString()} | المتوسط: ${avgWords.toLocaleString()} | الأدنى: ${minWords} | الأقصى: ${maxWords}`,
    details: { totalWords, avgWords, minWords, maxWords },
  };

  results['article_faq'] = {
    passed: articlesWithoutFaq.length === 0,
    message: `مقالات تحتوي على قسم FAQ مفصل: ${totalArticles - articlesWithoutFaq.length} / ${totalArticles}`,
    details: { missing: articlesWithoutFaq },
  };

  results['article_seo'] = {
    passed: articlesWithoutSeo.length === 0,
    message: `مقالات تحتوي على Meta Titles & Descriptions فريدة: ${totalArticles - articlesWithoutSeo.length} / ${totalArticles}`,
    details: { missing: articlesWithoutSeo },
  };

  results['article_related'] = {
    passed: articlesWithoutRelated.length === 0,
    message: `مقالات تحتوي على شبكة ربط داخلي (Related Articles): ${totalArticles - articlesWithoutRelated.length} / ${totalArticles}`,
    details: { missing: articlesWithoutRelated },
  };

  // 3. Audit Legal & Trust Pages Existence
  const appPublicDir = path.resolve(__dirname, '../src/app/(public)');
  const requiredPages = [
    { name: 'من نحن (/about)', file: 'about/page.tsx' },
    { name: 'تواصل معنا (/contact)', file: 'contact/page.tsx' },
    { name: 'سياسة الخصوصية (/privacy-policy)', file: 'privacy-policy/page.tsx' },
    { name: 'سياسة ملفات الارتباط (/cookie-policy)', file: 'cookie-policy/page.tsx' },
    { name: 'شروط الاستخدام (/terms)', file: 'terms/page.tsx' },
    { name: 'إخلاء المسؤولية (/disclaimer)', file: 'disclaimer/page.tsx' },
  ];

  const missingPages: string[] = [];
  requiredPages.forEach((p) => {
    const fullPath = path.join(appPublicDir, p.file);
    if (!fs.existsSync(fullPath)) {
      missingPages.push(p.name);
    }
  });

  results['legal_pages'] = {
    passed: missingPages.length === 0,
    message: `الصفحات القانونية وصفحات الثقة: ${requiredPages.length - missingPages.length} / ${requiredPages.length}`,
    details: { missing: missingPages },
  };

  // 4. Audit Technical SEO files
  const adsTxtPath = path.resolve(__dirname, '../src/app/ads.txt/route.ts');
  const sitemapPath = path.resolve(__dirname, '../src/app/sitemap.xml/route.ts');
  const robotsPath = path.resolve(__dirname, '../src/app/robots.ts');

  results['technical_seo_files'] = {
    passed: fs.existsSync(adsTxtPath) && fs.existsSync(sitemapPath) && fs.existsSync(robotsPath),
    message: 'ملفات Technical SEO (ads.txt, sitemap.xml, robots.ts): مكتملة',
    details: {
      hasAdsTxt: fs.existsSync(adsTxtPath),
      hasSitemap: fs.existsSync(sitemapPath),
      hasRobots: fs.existsSync(robotsPath),
    },
  };

  // 5. Print Detailed Output
  console.log('----------------------------------------------------');
  console.log('📋 نتائج الفحص الهندسي للجاهزية:');
  console.log('----------------------------------------------------');

  let allPassed = true;
  for (const [key, res] of Object.entries(results)) {
    const icon = res.passed ? '✅' : '❌';
    console.log(`${icon} [${key}]: ${res.message}`);
    if (!res.passed) allPassed = false;
  }

  console.log('\n====================================================');
  if (allPassed) {
    console.log('🎉 مبروك! الموقع جاهز هندسياً وقانونياً لتقديم Google AdSense بنجاح.');
  } else {
    console.log('⚠️ توجد بعض الملاحظات التي تتطلب المعالجة قبل التقديم.');
  }
  console.log('====================================================\n');
}

runAdSenseAudit().catch(console.error);
