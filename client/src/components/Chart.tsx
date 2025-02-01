import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

// Define the types for the groupedExpenses
interface GroupedExpense {
  label: string;
  _sum: {
    amount: number;
  };
  _count: {
    id: number;
  };
}

interface ExpensePieChartProps {
  groupedExpenses: GroupedExpense[];
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ groupedExpenses }) => {
  
  const labels = groupedExpenses.map((item) => item.label);
  const data = groupedExpenses.map((item) => item._sum.amount);
  if(groupedExpenses.length==0)
  {
    return (
      <div className='font-black text-center'>
        <p>No Data</p>
      </div>
    )
  }
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Expense Amounts',
        data: data,
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A6'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Ensure the type is one of the valid legend positions
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: RS.${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className='w-[300px] h-[300px]'>
      <div className='font-sans font-black'><p>Expense Distribution by Label</p></div>
      <Pie data={chartData} options={options} width={10} height={10} />
    </div>
  );
};

export default ExpensePieChart;
