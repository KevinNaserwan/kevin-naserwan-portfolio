import Head from 'next/head';
import fs from 'fs';
import path from 'path';

export default function Home({ htmlContent }) {
  return (
    <>
      <Head>
        <title>Kevin Putrayudha Naserwan — Software Engineer & AI Systems</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
  const headMatch = html.match(/<head[^>]*>([\s\S]*)<\/head>/i);
  
  const content = bodyMatch ? bodyMatch[1] : html;

  return {
    props: {
      htmlContent: content,
    },
  };
}
