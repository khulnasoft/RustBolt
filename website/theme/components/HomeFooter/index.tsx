import { memo } from 'react';
import { useLang } from 'rspress/runtime';
import { Link } from 'rspress/theme';
import { useI18n } from '../../i18n/index';
import styles from './index.module.scss';

function useFooterData() {
  const t = useI18n();
  const lang = useLang();
  const getLink = (link: string) => (lang === 'en' ? link : `/${lang}${link}`);

  return [
    {
      title: t('guide'),
      items: [
        {
          title: t('quickStart'),
          link: getLink('/guide/start/quick-start'),
        },
        {
          title: t('features'),
          link: getLink('/guide/features/asset-module'),
        },
        {
          title: t('migration'),
          link: getLink('/guide/migration/webpack'),
        },
        {
          title: t('compatibility'),
          link: getLink('/guide/compatibility/plugin'),
        },
      ],
    },
    {
      title: 'API',
      items: [
        {
          title: t('cli'),
          link: getLink('/api/cli'),
        },
        {
          title: 'Plugin API',
          link: getLink('/api/plugin-api/index'),
        },
        {
          title: 'Loader API',
          link: getLink('/api/loader-api/index'),
        },
        {
          title: 'JavaScript API',
          link: getLink('/api/javascript-api'),
        },
      ],
    },
    {
      title: t('ecosystem'),
      items: [
        {
          title: 'Rsbuild',
          link: 'https://rsbuild.dev/',
        },
        {
          title: 'Rspress',
          link: 'https://rspress.dev/',
        },
        {
          title: 'Rsdoctor',
          link: 'https://rsdoctor.dev/',
        },
        {
          title: 'Rslib',
          link: 'https://github.com/khulnasoft/rslib',
        },
      ],
    },
    {
      title: t('community'),
      items: [
        {
          title: 'GitHub',
          link: 'https://github.com/khulnasoft/rustbolt',
        },
        {
          title: 'Discord',
          link: 'https://discord.gg/sYK4QjyZ4V',
        },
        {
          title: 'Twitter (X)',
          link: 'https://twitter.com/rustbolt_dev',
        },
        {
          title: 'Awesome Rustbolt',
          link: 'https://github.com/khulnasoft/awesome-rustbolt',
        },
      ],
    },
  ];
}

export const HomeFooter = memo(() => {
  const footerData = useFooterData();
  return (
    <div
      className="flex flex-col border-t items-center mt-24 hidden sm:flex"
      style={{ borderColor: 'var(--rp-c-divider-light)' }}
    >
      <div className="pt-12 pb-4 w-full justify-around max-w-6xl flex">
        {footerData.map(item => (
          <div key={item.title} className="flex flex-col items-start">
            <h2 className="font-bold my-4 text-lg">{item.title}</h2>
            <ul className="flex flex-col gap-3">
              {item.items.map(subItem => (
                <li key={subItem.title}>
                  <Link href={subItem.link}>
                    <span className={`font-normal ${styles.text}`}>
                      {subItem.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
});
