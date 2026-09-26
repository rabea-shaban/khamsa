import fs from 'fs';
import path from 'path';

const dir = path.resolve('src/data/static-articles/articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const fullPath = path.join(dir, file);
  let content = fs.readFileSync(fullPath, 'utf-8');
  const baseName = file.replace('.ts', '');
  const targetSvg = `/images/articles/${baseName}.svg`;
  
  content = content.replace(/coverImage:\s*['"][^'"]+['"]/, `coverImage: '${targetSvg}'`);
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`Updated ${file} -> ${targetSvg}`);
}

console.log('All 20 articles updated with authentic SVGs!');
