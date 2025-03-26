import { BackgroundImage } from '@rstack-dev/doc-ui/background-image';
import { Benchmark } from './Benchmark';
import FullyFeatured from './FullyFeatured';
import Hero from './Hero';
import ToolStack from './ToolStack';
import WhoIsUsing from './WhoIsUsing';
import WhyRustbolt from './WhyRustbolt';
import styles from './index.module.scss';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <BackgroundImage />
      <Hero />
      <WhyRustbolt />
      <Benchmark />
      <FullyFeatured />
      <ToolStack />
      <WhoIsUsing />
    </div>
  );
};

export default LandingPage;
