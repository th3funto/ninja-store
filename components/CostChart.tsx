import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CostChartProps {
  baseCost: number;
  importFee: number;
  profit: number;
}

const CostChart: React.FC<CostChartProps> = ({ baseCost, importFee, profit }) => {
  const data = [
    { name: 'Custo Base', value: baseCost, color: '#3b82f6' }, // Blue
    { name: 'Taxa Import.', value: importFee, color: '#f43f5e' }, // Rose
    { name: 'Lucro/Venda', value: profit, color: '#10b981' }, // Emerald
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="w-full h-48 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Legend 
            verticalAlign="middle" 
            align="right" 
            layout="vertical"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Label */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none hidden sm:block" style={{ marginLeft: '-40px'}}>
         {/* Offset purely visual due to legend taking right space */}
      </div>
    </div>
  );
};

export default CostChart;
