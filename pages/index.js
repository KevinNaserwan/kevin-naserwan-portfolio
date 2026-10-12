import Head from 'next/head';
import fs from 'fs';
import path from 'path';

export default function Home({ htmlContent }) {
  return (
    <>
      <Head>
        <title>Kevin Putrayudha Naserwan — Software Engineer &amp; AI Systems</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Portfolio of Kevin Putrayudha Naserwan. Application Developer at PT Bukit Asam (Persero) Tbk. Specializing in high-throughput backend systems, distributed architectures, and AI platform engineering." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Strip html and body tags so it renders cleanly inside Next.js layout
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let content = bodyMatch ? bodyMatch[1] : html;

  // Remove script tags inside body to prevent double execution with next/script
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  return {
    props: {
      htmlContent: content,
    },
  };
}
