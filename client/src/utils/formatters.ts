import { format, parseISO } from 'date-fns';

export const formatCurrency = (value: number | undefined): string => {
  if (value === undefined || value === null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch (error) {
    return dateString;
  }
};

export const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'yyyy-MM-dd');
  } catch (error) {
    return '';
  }
};

export const calculateMEDDICScore = (deal: any): number => {
  const checkboxFields = [
    'metric_complete',
    'economic_buyer_complete',
    'decision_criteria_complete',
    'decision_process_complete',
    'identified_pain_complete',
    'champion_complete',
    'competition_complete',
  ];
  
  const completed = checkboxFields.filter(field => deal[field] === true || deal[field] === 1).length;
  return Math.round((completed / checkboxFields.length) * 100);
};

export const getMEDDICStatus = (score: number): { label: string; color: string } => {
  if (score >= 80) return { label: 'Strong', color: 'text-green-600' };
  if (score >= 50) return { label: 'Moderate', color: 'text-yellow-600' };
  return { label: 'Weak', color: 'text-red-600' };
};

// Made with Bob
