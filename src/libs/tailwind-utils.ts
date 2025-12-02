import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilidad para combinar clases de Tailwind CSS de forma condicional
 * Combina clsx y tailwind-merge para manejar conflictos de clases
 * @param inputs - Array de valores de clase (strings, objetos, arrays)
 * @returns String de clases combinadas y optimizadas
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
