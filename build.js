const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    format: 'cjs',
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: 'node',
    outfile: 'out/extension.js',
    external: ['vscode'],
    logLevel: 'silent',
    plugins: [
      esbuildProblemMatcherPlugin,
      {
        name: 'copy-webview',
        setup(build) {
          build.onEnd(() => {
            // 复制 webview 文件
            const srcWebview = path.join(__dirname, 'src', 'webview');
            const outWebview = path.join(__dirname, 'out', 'webview');

            if (!fs.existsSync(outWebview)) {
              fs.mkdirSync(outWebview, { recursive: true });
            }

            const files = fs.readdirSync(srcWebview);
            files.forEach(file => {
              const srcFile = path.join(srcWebview, file);
              const destFile = path.join(outWebview, file);
              fs.copyFileSync(srcFile, destFile);
            });
          });
        }
      }
    ],
  });

  if (watch) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: 'esbuild-problem-matcher',
  setup(build) {
    build.onStart(() => {
      console.log('[watch] build started');
    });
    build.onEnd(result => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        console.error(`    ${location.file}:${location.line}:${location.column}:`);
      });
      console.log('[watch] build finished');
    });
  },
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});
