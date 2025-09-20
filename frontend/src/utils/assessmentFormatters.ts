// Formatting functions for assessment results data
export const formatConfidenceScore = (score: number): string => {
  return `${Math.round(score * 100)}%`;
};

export const formatSalaryRange = (min: number, max: number, currency: string = 'INR'): string => {
  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };
  
  return `${currency} ${formatNumber(min)} - ${formatNumber(max)} per annum`;
};

export const formatProcessingTime = (seconds: number): string => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDuration = (duration: string): string => {
  return duration;
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value * 100)}%`;
};

export const formatSkillDemand = (demand: string): string => {
  return demand;
};

export const formatPriority = (priority: string): string => {
  return priority;
};