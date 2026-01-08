import React, { useMemo } from 'react';
import { FeeStructure } from '../types';
import { VISA_MASTER_FEES, ELO_AMEX_FEES } from '../constants';
import { CreditCard } from 'lucide-react';

interface InstallmentTableProps {
  cashPrice: number;
  selectedProfile: 'visaMaster' | 'eloAmex';
  onProfileChange: (profile: 'visaMaster' | 'eloAmex') => void;
}

const InstallmentTable: React.FC<InstallmentTableProps> = ({ 
  cashPrice, 
  selectedProfile, 
  onProfileChange 
}) => {
  const currentFees: FeeStructure = selectedProfile === 'visaMaster' ? VISA_MASTER_FEES : ELO_AMEX_FEES;

  const calculateInstallment = (installments: number, rate: number) => {
    // Formula: We need the Net Recipient Amount (cashPrice) to be equal to TotalCharge * (1 - rate)
    // Therefore: TotalCharge = cashPrice / (1 - rate)
    // Note: Rate is in percentage, so rate/100.
    
    // Safety check for 100% fee (impossible but prevents div by zero)
    if (rate >= 100) return { total: 0, parcel: 0 };

    const totalCharge = cashPrice / (1 - (rate / 100));
    const parcelValue = totalCharge / installments;
    
    return {
      total: totalCharge,
      parcel: parcelValue
    };
  };

  const rows = useMemo(() => {
    const data = [];
    
    // Debit
    const debitCalc = calculateInstallment(1, currentFees.debit);
    data.push({
      label: 'Débito',
      rate: currentFees.debit,
      total: debitCalc.total,
      parcel: debitCalc.parcel
    });

    // Credit 1x to 12x
    for (let i = 1; i <= 12; i++) {
      const key = `credit${i}x`;
      const rate = currentFees[key] as number;
      const calc = calculateInstallment(i, rate);
      data.push({
        label: `${i}x Crédito`,
        rate: rate,
        total: calc.total,
        parcel: calc.parcel
      });
    }
    return data;
  }, [cashPrice, currentFees]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="bg-ninja-card rounded-xl border border-ninja-border overflow-hidden flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-ninja-border bg-ninja-card/50 backdrop-blur">
        <h3 className="text-lg font-bold text-ninja-text flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-ninja-accent" />
          Simulação de Parcelamento
        </h3>
        <p className="text-xs text-ninja-muted mt-1">
          Valores calculados com repasse de juros (Inverso)
        </p>
      </div>

      {/* Tabs */}
      <div className="flex p-2 gap-2 bg-ninja-dark/50">
        <button
          onClick={() => onProfileChange('visaMaster')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedProfile === 'visaMaster'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
              : 'bg-ninja-card text-ninja-muted hover:bg-ninja-border'
          }`}
        >
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full -ml-2"></div>
          </div>
          Visa / Master
        </button>
        <button
          onClick={() => onProfileChange('eloAmex')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedProfile === 'eloAmex'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
              : 'bg-ninja-card text-ninja-muted hover:bg-ninja-border'
          }`}
        >
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
          </div>
          Elo / Amex
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 px-4 py-2 text-xs font-semibold text-ninja-muted uppercase tracking-wider border-b border-ninja-border bg-ninja-dark/30">
        <div className="col-span-1">Parcelas</div>
        <div className="col-span-1 text-right">Taxa</div>
        <div className="col-span-1 text-right">Valor Parc.</div>
        <div className="col-span-1 text-right">Total</div>
      </div>

      {/* Scrollable List */}
      <div className="overflow-y-auto flex-1 p-2 space-y-1">
        {rows.map((row, idx) => (
          <div 
            key={idx} 
            className={`grid grid-cols-4 px-3 py-2.5 rounded-md items-center text-sm transition-colors ${
              idx % 2 === 0 ? 'bg-ninja-dark/20' : 'bg-transparent'
            } hover:bg-ninja-border/30`}
          >
            <div className="col-span-1 font-medium text-ninja-text flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${row.label.includes('Débito') ? 'bg-emerald-400' : 'bg-ninja-accent'}`}></span>
              {row.label}
            </div>
            <div className="col-span-1 text-right text-ninja-muted font-mono text-xs">
              {row.rate.toFixed(2)}%
            </div>
            <div className="col-span-1 text-right font-semibold text-emerald-400">
              {formatCurrency(row.parcel)}
            </div>
            <div className="col-span-1 text-right text-ninja-text">
              {formatCurrency(row.total)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-ninja-border bg-ninja-dark/30 text-center">
        <p className="text-xs text-ninja-muted">
          Pix (0%): <span className="text-emerald-400 font-bold ml-1">{formatCurrency(cashPrice)}</span>
        </p>
      </div>
    </div>
  );
};

export default InstallmentTable;