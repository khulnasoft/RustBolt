import path from 'node:path';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginRss } from '@rspress/plugin-rss';
import { pluginGoogleAnalytics } from 'rsbuild-plugin-google-analytics';
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';
import { pluginFontOpenSans } from 'rspress-plugin-font-open-sans';
import pluginSitemap from 'rspress-plugin-sitemap';
import { defineConfig } from 'rspress/config';

const PUBLISH_URL = 'https://rustbolt.dev';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rustbolt',
  description: 'The fast Rust-based web bundler',
  logo: {
    light: 'https://assets.rustbolt.dev/rustbolt/navbar-logo-light.png',
    dark: 'https://assets.rustbolt.dev/rustbolt/navbar-logo-dark.png',
  },
  icon: 'https://assets.rustbolt.dev/rustbolt/favicon-128x128.png',
  lang: 'en',
  globalStyles: path.join(__dirname, 'theme', 'index.css'),
  markdown: {
    checkDeadLinks: true,
    highlightLanguages: [['rs', 'rust']],
  },
  search: {
    codeBlocks: true,
  },
  route: {
    cleanUrls: true,
  },
  ssg: {
    strict: true,
  },
  plugins: [
    pluginSitemap({
      domain: PUBLISH_URL,
    }),
    pluginFontOpenSans(),
    pluginRss({
      siteUrl: PUBLISH_URL,
      feed: [
        {
          id: 'blog-rss',
          test: '/blog',
          title: 'Rustbolt Blog',
          language: 'en',
          output: {
            type: 'rss',
            filename: 'blog-rss.xml',
          },
        },
        {
          id: 'blog-rss-zh',
          test: '/zh/blog',
          title: 'Rustbolt 博客',
          language: 'zh-CN',
          output: {
            type: 'rss',
            filename: 'blog-rss-zh.xml',
          },
        },
      ],
    }),
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/khulnasoft/rustbolt',
      },
      {
        icon: 'discord',
        mode: 'link',
        content: 'https://discord.gg/sYK4QjyZ4V',
      },
      {
        icon: 'x',
        mode: 'link',
        content: 'https://twitter.com/rustbolt_dev',
      },
      {
        icon: 'bluesky',
        mode: 'link',
        content: 'https://bsky.app/profile/rustbolt.dev',
      },
      {
        icon: 'lark',
        mode: 'link',
        content:
          'https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=3c3vca77-bfc0-4ef5-b62b-9c5c9c92f1b4',
      },
    ],
    locales: [
      {
        lang: 'en',
        title: 'Rustbolt',
        description: 'The fast Rust-based web bundler',
        label: 'English',
        editLink: {
          docRepoBaseUrl:
            'https://github.com/khulnasoft/rustbolt/tree/main/website/docs',
          text: '📝 Edit this page on GitHub',
        },
      },
      {
        lang: 'zh',
        title: 'Rustbolt',
        description: '基于 Rust 的高性能 web 打包工具',
        label: '简体中文',
        editLink: {
          docRepoBaseUrl:
            'https://github.com/khulnasoft/rustbolt/tree/main/website/docs',
          text: '📝 在 GitHub 上编辑此页',
        },
      },
    ],
  },
  head: [
    ({ routePath }) => {
      const getOgImage = () => {
        if (routePath.endsWith('blog/announcing-0-7')) {
          return 'assets/rustbolt-og-image-v0-7.png';
        }
        if (routePath.endsWith('blog/announcing-1-0-alpha')) {
          return 'assets/rustbolt-og-image-v1-0-alpha.png';
        }
        if (routePath.endsWith('blog/announcing-1-0')) {
          return 'assets/rustbolt-og-image-v1-0.png';
        }
        if (routePath.endsWith('blog/announcing-1-1')) {
          return 'assets/rustbolt-og-image-v1-1.png';
        }
        if (routePath.endsWith('blog/announcing-1-2')) {
          return 'assets/rustbolt-og-image-v1-2.png';
        }
        // default
        return 'rustbolt-og-image.png';
      };
      return `<meta property="og:image" content="https://assets.rustbolt.dev/rustbolt/${getOgImage()}">`;
    },
  ],
  builderConfig: {
    dev: {
      lazyCompilation: true,
    },
    plugins: [
      pluginSass(),
      pluginGoogleAnalytics({ id: 'G-XKKCNZZNJD' }),
      pluginOpenGraph({
        title: 'Rustbolt',
        type: 'website',
        url: PUBLISH_URL,
        description: 'Fast Rust-based web bundler',
        twitter: {
          site: '@rustbolt_dev',
          card: 'summary_large_image',
        },
      }),
    ],
    source: {
      preEntry: ['./theme/tailwind.css'],
      alias: {
        '@builtIns': path.join(__dirname, 'components', 'builtIns'),
        '@components': path.join(__dirname, 'components'),
        '@hooks': path.join(__dirname, 'hooks'),
      },
    },
    server: {
      open: true,
    },
    html: {
      tags: [
        // for baidu SEO verification
        {
          tag: 'meta',
          attrs: {
            name: 'baidu-site-verification',
            content: 'codeva-bE2dFTowhk',
          },
        },
      ],
    },
  },
});
