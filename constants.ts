import { FeeStructure } from './types';

// Fees extracted exactly from the provided image
export const VISA_MASTER_FEES: FeeStructure = {
  name: 'Visa / Mastercard',
  debit: 1.37,
  credit1x: 3.15,
  credit2x: 5.39,
  credit3x: 6.12,
  credit4x: 6.85,
  credit5x: 7.57,
  credit6x: 8.28,
  credit7x: 8.99,
  credit8x: 9.69,
  credit9x: 10.38,
  credit10x: 11.06,
  credit11x: 11.74,
  credit12x: 12.40,
};

export const ELO_AMEX_FEES: FeeStructure = {
  name: 'Elo / Amex',
  debit: 2.58,
  credit1x: 4.91,
  credit2x: 6.47,
  credit3x: 7.20,
  credit4x: 7.92,
  credit5x: 8.63,
  credit6x: 9.33,
  credit7x: 10.03,
  credit8x: 10.72,
  credit9x: 11.41,
  credit10x: 12.08,
  credit11x: 12.75,
  credit12x: 13.41,
};

export const DEFAULT_USD_RATE = 5.50; // Fallback default
export const DEFAULT_IMPORT_TAX = 5.0;
export const DEFAULT_SALES_TAX = 5.0; // Profit/Markup
