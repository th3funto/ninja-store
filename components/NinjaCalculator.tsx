import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Package, 
  Info,
  Copy,
  Check,
  Wand2
} from 'lucide-react';
import InputGroup from './InputGroup';
import InstallmentTable from './InstallmentTable';
import CostChart from './CostChart';
import { DEFAULT_USD_RATE, DEFAULT_IMPORT_TAX, DEFAULT_SALES_TAX, VISA_MASTER_FEES, ELO_AMEX_FEES } from '../constants';
import { CalculationResult } from '../types';

const NinjaCalculator: React.FC = () => {
  // --- State ---
  const [productName, setProductName] = useState('Iphone 16 / 125gb');
  const [usdPrice, setUsdPrice] = useState<string>('800'); // Input as string to handle empty states better
  const [exchangeRate, setExchangeRate] = useState<string>(DEFAULT_USD_RATE.toString());
  const [importTax, setImportTax] = useState<string>(DEFAULT_IMPORT_TAX.toString());
  const [salesTax, setSalesTax] = useState<string>(DEFAULT_SALES_TAX.toString());
  const [cardProfile, setCardProfile] = useState<'visaMaster' | 'eloAmex'>('visaMaster');
  const [copied, setCopied] = useState(false);
  const [smartRounding, setSmartRounding] = useState(true);
  
  const [result, setResult] = useState<CalculationResult>({
    baseCostBrl: 0,
    importFeeValue: 0,
    totalCost: 0,
    profitValue: 0,
    finalCashPrice: 0
  });

  // --- Logic ---
  useEffect(() => {
    const usd = parseFloat(usdPrice) || 0;
    const rate = parseFloat(exchangeRate) || 0;
    const iTax = parseFloat(importTax) || 0;
    const sTax = parseFloat(salesTax) || 0;

    // 1. Convert USD to BRL
    const baseCostBrl = usd * rate;

    // 2. Calculate Import Fee (Importer's fee)
    // Assuming importer fee is on top of the product value
    const importFeeValue = baseCostBrl * (iTax / 100);

    // 3. Total Cost to acquire
    const totalCost = baseCostBrl + importFeeValue;

    // 4. Calculate Initial Target Profit
    let targetProfit = totalCost * (sTax / 100);

    // 5. Calculate Raw Final Price
    let finalCashPrice = totalCost + targetProfit;

    // 6. Apply Smart Rounding (Optional)
    if (smartRounding) {
      // Rounds to nearest 5 (e.g., 4704 -> 4705, 4706 -> 4705, 4708 -> 4710)
      // To force "cleaner" looks like the user example (4704 -> 4700), standard rounding to 5 is usually safest
      // but if we wanted strictly 4704 -> 4700 we'd need round to 10. 
      // Based on "de 5 em 5", we use this:
      finalCashPrice = Math.round(finalCashPrice / 5) * 5;

      // Reverse calculate profit so the math (Cost + Profit = Price) stays true
      targetProfit = finalCashPrice - totalCost;
    }

    setResult({
      baseCostBrl,
      importFeeValue,
      totalCost,
      profitValue: targetProfit,
      finalCashPrice
    });

  }, [usdPrice, exchangeRate, importTax, salesTax, smartRounding]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handleCopy = () => {
    const fees = cardProfile === 'visaMaster' ? VISA_MASTER_FEES : ELO_AMEX_FEES;
    
    // Helper to calculate parcel value
    const getParcel = (installments: number, feeKey: string) => {
       const rate = fees[feeKey] as number;
       // Total = Price / (1 - rate%)
       const total = result.finalCashPrice / (1 - (rate / 100));
       return total / installments;
    };

    const val6x = getParcel(6, 'credit6x');
    const val10x = getParcel(10, 'credit10x');
    const val12x = getParcel(12, 'credit12x');

    const fmtPrice = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    // Note: User requested format
    // 📲Produto
    // R$: 6.598 a vista.
    // 💳6x R$125 | 10x R$748,88 | 12x R$632,31
    // *juros por conta do comprador.

    const text = `📲${productName}
R$: ${fmtPrice(result.finalCashPrice)} a vista.
💳6x R$${fmtPrice(val6x)} | 10x R$${fmtPrice(val10x)} | 12x R$${fmtPrice(val12x)}
*juros por conta do comprador.`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ninja-accent to-purple-400 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-ninja-accent" />
            Ninja Store
          </h1>
          <p className="text-ninja-muted mt-1">Calculadora de Precificação & Vendas</p>
        </div>
        <div className="px-4 py-2 rounded-full bg-ninja-card border border-ninja-border text-xs text-ninja-muted font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Sistema Operacional
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Inputs & Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Inputs */}
          <div className="bg-ninja-card rounded-xl border border-ninja-border p-6 shadow-xl">
            <h2 className="text-lg font-bold text-ninja-text mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-400" />
              Dados do Produto
            </h2>
            
            <InputGroup 
              label="Item / Descrição"
              value={productName}
              onChange={setProductName}
              type="text"
              placeholder="Ex: Playstation 5"
              className="mb-4"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputGroup 
                label="Preço Dólar (USD)"
                value={usdPrice}
                onChange={setUsdPrice}
                prefix="$"
                className="col-span-1"
              />
              <InputGroup 
                label="Cotação (BRL)"
                value={exchangeRate}
                onChange={setExchangeRate}
                prefix="R$"
                className="col-span-1"
              />
            </div>

            <div className="h-px bg-ninja-border my-6 relative">
              <span className="absolute left-1/2 -top-2.5 -ml-4 px-2 bg-ninja-card text-xs text-ninja-muted">Taxas</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="relative">
                 <InputGroup 
                  label="Taxa Importador"
                  value={importTax}
                  onChange={setImportTax}
                  suffix="%"
                />
                 <div className="absolute top-0 right-0 -mt-1 -mr-1 group">
                    <Info className="w-3 h-3 text-ninja-muted cursor-help"/>
                    <div className="hidden group-hover:block absolute z-10 w-48 p-2 bg-black text-xs text-white rounded -top-8 right-0 shadow-lg border border-ninja-border">
                      Percentual pago ao importador sobre o valor convertido.
                    </div>
                 </div>
               </div>

               <div className="relative">
                <InputGroup 
                  label="Minha Margem"
                  value={salesTax}
                  onChange={setSalesTax}
                  suffix="%"
                />
                 <div className="absolute top-0 right-0 -mt-1 -mr-1 group">
                    <Info className="w-3 h-3 text-ninja-muted cursor-help"/>
                    <div className="hidden group-hover:block absolute z-10 w-48 p-2 bg-black text-xs text-white rounded -top-8 right-0 shadow-lg border border-ninja-border">
                      Percentual de lucro adicionado sobre o custo total.
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Card: Summary & Breakdown */}
          <div className="bg-ninja-card rounded-xl border border-ninja-border p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-ninja-accent/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            <h2 className="text-lg font-bold text-ninja-text mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Resultado
            </h2>

            {/* Visual Breakdown */}
            <div className="mb-6 -mx-4">
               <CostChart 
                  baseCost={result.baseCostBrl} 
                  importFee={result.importFeeValue} 
                  profit={result.profitValue} 
               />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-ninja-muted">Custo Produto (R$)</span>
                <span className="font-mono text-ninja-text">{formatCurrency(result.baseCostBrl)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-rose-400">Importação ({importTax}%)</span>
                <span className="font-mono text-rose-400">+ {formatCurrency(result.importFeeValue)}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-ninja-border border-dashed">
                <span className="text-ninja-muted font-medium">Custo Total</span>
                <span className="font-mono text-ninja-text font-bold">{formatCurrency(result.totalCost)}</span>
              </div>
               <div className="flex justify-between items-center text-sm">
                <span className="text-emerald-400">Margem (aprox. {salesTax}%)</span>
                <span className="font-mono text-emerald-400">+ {formatCurrency(result.profitValue)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-ninja-border">
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs text-ninja-muted uppercase font-bold tracking-widest block">
                  Preço Final (À Vista)
                </label>
                
                {/* Smart Rounding Toggle */}
                <button 
                  onClick={() => setSmartRounding(!smartRounding)}
                  className={`text-xs flex items-center gap-1.5 px-2 py-1 rounded transition-all border ${
                    smartRounding 
                      ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                      : 'bg-ninja-dark border-ninja-border text-ninja-muted hover:border-ninja-muted'
                  }`}
                  title="Arredonda o valor final para múltiplos de 5 (ex: R$105,00)"
                >
                  <Wand2 className="w-3 h-3" />
                  {smartRounding ? 'Arredondado' : 'Exato'}
                </button>
              </div>

              <div className="bg-ninja-dark rounded-lg p-4 border border-ninja-border/50 text-center shadow-inner relative overflow-hidden group">
                 {/* Visual indicator for rounding */}
                 {smartRounding && (
                   <div className="absolute top-1 right-1">
                     <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                      </span>
                   </div>
                 )}
                <span className="text-3xl font-bold text-white tracking-tight">
                  {formatCurrency(result.finalCashPrice)}
                </span>
              </div>
              
              {/* Copy Button */}
              <button 
                onClick={handleCopy}
                className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all transform active:scale-95 ${
                  copied 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-ninja-accent hover:bg-ninja-accent/90 text-white shadow-lg shadow-ninja-accent/20'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar Oferta
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Installments (7 cols) */}
        <div className="lg:col-span-7 h-full min-h-[500px]">
           <InstallmentTable 
              cashPrice={result.finalCashPrice} 
              selectedProfile={cardProfile}
              onProfileChange={setCardProfile}
           />
        </div>

      </div>
    </div>
  );
};

export default NinjaCalculator;