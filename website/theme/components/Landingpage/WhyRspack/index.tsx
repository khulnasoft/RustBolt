import {
  containerStyle,
  innerContainerStyle,
} from '@rstack-dev/doc-ui/section-style';
import { WhyRustbolt as BaseWhyRustbolt } from '@rstack-dev/doc-ui/why-rustbolt';
import { memo, useMemo } from 'react';
import { Link } from 'rspress/theme';
import { useI18n, useI18nUrl } from '../../../i18n';
import CompatibleJson from './assets/Compatible.json';
import Compatible from './assets/Compatible.svg';
import FrameCheckJson from './assets/FrameCheck.json';
import FrameCheck from './assets/FrameCheck.svg';
import LightningJson from './assets/Lightning.json';
import Lightning from './assets/Lightning.svg';
import SpeedometerJson from './assets/Speedometer.json';
import Speedometer from './assets/Speedometer.svg';

type Feature = {
  img: string;
  url: string;
  title: string;
  description: string;
  lottieJsonData: any;
};

const WhyRustbolt = memo(() => {
  const t = useI18n();
  const tUrl = useI18nUrl();

  const features: Feature[] = useMemo(
    () => [
      {
        img: Speedometer,
        url: tUrl('/guide/start/introduction'),
        title: t('FastStartup'),
        description: t('FastStartupDesc'),
        lottieJsonData: SpeedometerJson,
      },
      {
        img: Lightning,
        url: tUrl('/guide/start/introduction'),
        title: t('LightningHMR'),
        description: t('LightningHMRDesc'),
        lottieJsonData: LightningJson,
      },
      {
        img: FrameCheck,
        url: tUrl('/guide/tech/react'),
        title: t('FrameworkAgnostic'),
        description: t('FrameworkAgnosticDesc'),
        lottieJsonData: FrameCheckJson,
      },
      {
        img: Compatible,
        url: tUrl('/guide/compatibility/plugin'),
        title: t('WebpackCompatible'),
        description: t('WebpackCompatibleDesc'),
        lottieJsonData: CompatibleJson,
      },
    ],
    [t, tUrl],
  );

  return (
    <section className={containerStyle}>
      <div className={innerContainerStyle}>
        <BaseWhyRustbolt
          features={features}
          title={t('whyRustbolt')}
          description={t('whyRustboltDesc')}
          LinkComp={Link}
        />
      </div>
    </section>
  );
});

export default WhyRustbolt;
