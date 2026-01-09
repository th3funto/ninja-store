export interface FeeStructure {
  name: string;
  debit: number;
  credit1x: number;
  credit2x: number;
  credit3x: number;
  credit4x: number;
  credit5x: number;
  credit6x: number;
  credit7x: number;
  credit8x: number;
  credit9x: number;
  credit10x: number;
  credit11x: number;
  credit12x: number;
  [key: string]: number | string; // Index signature for dynamic access
}

export interface CalculationResult {
  baseCostBrl: number;
  importFeeValue: number;
  totalCost: number;
  profitValue: number;
  finalCashPrice: number;
  rawCashPrice: number; // Valor exato antes do arredondamento
}