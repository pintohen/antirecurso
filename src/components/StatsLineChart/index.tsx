'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import regression, { DataPoint } from 'regression';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface StatsLineChartProps {
  labels: string[];
  data: number[];
  text: string;
}

const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 20,
      ticks: {
        stepSize: 0.5
      }
    }
  }
};

const StatsLineChart: React.FC<StatsLineChartProps> = ({ labels, data, text }) => {
  const dataPoints = data.map((value, index) => [index, value] as DataPoint);
  const regressionLine = regression.linear(dataPoints).points.map((point) => point[1]);

  const d = {
    labels,
    datasets: [
      {
        label: text,
        data,
        borderColor: 'rgb(200, 100, 22)',
        backgroundColor: 'rgb(200, 100, 22, 0.5)'
      },
      {
        label: 'Evolução',
        data: regressionLine,
        borderColor: 'rgb(100, 100, 100)',
        backgroundColor: 'rgb(100, 100, 100, 0.5)'
      }
    ]
  };
  return (
    <Line
      data={d}
      style={{
        position: 'relative',
        width: 'full',
        overflowX: 'scroll'
      }}
      options={options}
    />
  );
};

export default StatsLineChart;
