import { HistogramData } from '@/types/api/histogramData';
import Histogram from '@/components/Histogram';
import styles from './page.module.css';

async function Home() {
  const response = await fetch(`${process.env.API_URL}/api/histogram`);
  const histogramData: HistogramData = await response.json();

  return (
    <div className={styles.wrapper}>
      <Histogram data={histogramData.graph}/>
    </div>
  )
}

export default Home;
