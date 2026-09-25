<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html dir="rtl" lang="ar">
      <head>
        <title>خريطة الموقع XML | خمسة برمجة بالبلدي</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Cairo', system-ui, -apple-system, sans-serif;
            background-color: #050507;
            color: #E2E8F0;
            padding: 30px 20px;
            direction: rtl;
            text-align: right;
            line-height: 1.6;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #121218 0%, #1A1A24 100%);
            border: 1px solid #272732;
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }
          .brand-title {
            font-size: 26px;
            font-weight: 800;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-title span.badge {
            background: linear-gradient(135deg, #FFC107, #FF9800);
            color: #000000;
            font-size: 13px;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 8px;
          }
          .header p {
            color: #94A3B8;
            font-size: 14px;
            margin-top: 6px;
          }
          .stats-card {
            background: #0D0D12;
            border: 1px solid #FFC107;
            padding: 12px 24px;
            border-radius: 14px;
            text-align: center;
          }
          .stats-number {
            font-size: 24px;
            font-weight: 800;
            color: #FFC107;
          }
          .stats-label {
            font-size: 12px;
            color: #94A3B8;
          }
          .table-wrapper {
            background: #0D0D12;
            border: 1px solid #22222D;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background: #14141E;
            color: #CBD5E1;
            font-weight: 700;
            padding: 16px 20px;
            text-align: right;
            border-bottom: 1px solid #272736;
          }
          td {
            padding: 14px 20px;
            border-bottom: 1px solid #1A1A24;
            color: #E2E8F0;
            vertical-align: middle;
          }
          tr:hover td {
            background: #151520;
          }
          a {
            color: #FFC107;
            text-decoration: none;
            word-break: break-all;
            font-weight: 600;
            transition: color 0.2s;
          }
          a:hover {
            color: #FFD54F;
            text-decoration: underline;
          }
          .priority-pill {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            background: rgba(255, 193, 7, 0.15);
            color: #FFC107;
            border: 1px solid rgba(255, 193, 7, 0.3);
          }
          .freq-pill {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            background: #1E1E2D;
            color: #94A3B8;
          }
          .footer {
            margin-top: 25px;
            text-align: center;
            font-size: 12px;
            color: #64748B;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <div class="brand-title">
                <span>خمسة برمجة بالبلدي</span>
                <span class="badge">SITEMAP XML</span>
              </div>
              <p>خريطة الموقع الرسمية المتوافقة مع محركات البحث Google &amp; Bing</p>
            </div>
            <div class="stats-card">
              <div class="stats-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
              <div class="stats-label">إجمالي الروابط المؤرشفة</div>
            </div>
          </div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 50%;">رابط الصفحة (URL)</th>
                  <th style="width: 15%;">الأولوية (Priority)</th>
                  <th style="width: 15%;">معدل التحديث (Changefreq)</th>
                  <th style="width: 20%;">آخر تعديل (Last Modified)</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    </td>
                    <td>
                      <span class="priority-pill"><xsl:value-of select="sitemap:priority"/></span>
                    </td>
                    <td>
                      <span class="freq-pill"><xsl:value-of select="sitemap:changefreq"/></span>
                    </td>
                    <td style="color: #94A3B8; font-family: monospace; font-size: 12px;">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p>© خمسة برمجة بالبلدي - جميع الروابط يتم توليدها ديناميكياً وتحديثها تلقائياً.</p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
