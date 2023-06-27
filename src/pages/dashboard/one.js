// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import Chart, { useChart } from 'src/components/chart';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';

// ----------------------------------------------------------------------

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();

  const [bid, setBidata] = useState([]);

  const newValue = [];

  useEffect(() => {
    const currentDate = new Date();
    const showDate = moment(currentDate).format('HH:mm:ss');
    const randomdata = Math.floor(Math.random() * 10) * 2;
    newValue.push({ randomdata, showDate });

    const interval = setInterval(() => {
      setBidata([...bid, { randomdata, showDate }]);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [bid]);

  console.log(bid);

  const chartData = [
    {
      name: 'Purchase Order',
      data: bid?.map((e) => e.randomdata).slice(-9),
    },
    {
      name: 'Delivery Order',
      data: bid?.map((e) => e.randomdata).slice(-9),
    },
  ];

  const chartOptions = useChart({
    chart: {
      height: 350,
      type: 'line',
      stacked: true,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    markers: {
      size: 0,
      hover: {
        size: 0,
      },
    },
    xaxis: {
      categories: bid?.map((e) => e.showDate).slice(-9),
    },
    title: {
      text: 'Processes',
      align: 'left',
      style: {
        fontSize: '12px',
      },
    },
    subtitle: {
      text: '20',
      floating: true,
      align: 'right',
      offsetY: 0,
      style: {
        fontSize: '22px',
      },
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false,
      },
      position: 'top',
      offsetY: -28,
      offsetX: 60,
    },
  });

  return (
    <>
      <Head>
        <title> Monitoring Transaksi</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          RealTime Transaction MIMS
        </Typography>

        <Chart type="area" series={chartData} options={chartOptions} height={350} />
      </Container>
    </>
  );
}
