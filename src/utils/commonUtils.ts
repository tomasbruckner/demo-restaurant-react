import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const isRunningInJest = () => {
  return process.env.JEST_WORKER_ID !== undefined;
};

export const formatDate = (date: string) => {
  return date ? format(parseISO(date), 'MMM d, yyyy') : date;
};
