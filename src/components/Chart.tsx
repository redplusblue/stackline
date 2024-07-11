import React from 'react';
import { useAppSelector } from '../store/hooks';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart: React.FC = () => {
    const currentProduct = useAppSelector((state) => state.product.currentProduct);
    // Graph tension: 0 for straight lines, 1 for smooth curves
    const tension: number = 0.4;

    // Parse YYYY-MM-DD date string to Date object
    function parseDate(dateString: string): Date {
        const parts = dateString.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        return date;
    }


    if (!currentProduct) {
        return <div>No product selected</div>;
    }

    // Sort sales data by date
    const sortedSales = [...currentProduct.sales].sort((a, b) =>
        new Date(a.weekEnding).getTime() - new Date(b.weekEnding).getTime()
    );

    const labels = sortedSales.map((sale) => sale.weekEnding);
    const retailSales = sortedSales.map((sale) => sale.retailSales);
    const wholesaleSales = sortedSales.map((sale) => sale.wholesaleSales);

    // min and max values for y-axis
    const allSales = [...retailSales, ...wholesaleSales];
    const minSale = Math.min(...allSales);
    const maxSale = Math.max(...allSales);
    const padding = (maxSale - minSale) * 2;

    const data = {
        labels,
        datasets: [
            {
                label: 'Retail Sales',
                data: retailSales,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: tension,
            },
            {
                label: 'Wholesale Sales',
                data: wholesaleSales,
                borderColor: 'rgb(180, 180, 180)',
                backgroundColor: 'rgba(180, 180, 180, 0.5)',
                tension: tension,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },

                ticks: {
                    maxTicksLimit: 12,
                    callback: function (_value, index) {
                        const date = new Date(parseDate(labels[index]));
                        return date.toLocaleString('default', { month: 'short' });
                    }
                }
            },
            y: {
                grid: {
                    display: false,
                },
                border: { display: false },
                ticks: {
                    display: false,
                },
                min: minSale - padding,
                max: maxSale + padding,
            }
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    };

    return (
        <div style={{ height: '400px', width: '100%' }} >
            <Line options={options} data={data} />
        </div >
    );
};

export default Chart;