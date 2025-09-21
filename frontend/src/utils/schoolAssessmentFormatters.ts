export const formatStenScore = (score: number): string => {
  if (score >= 9) return 'Very High';
  if (score >= 7) return 'High';
  if (score >= 6) return 'Above Average';
  if (score >= 5) return 'Average';
  if (score >= 3) return 'Below Average';
  return 'Low';
};

export const formatSuitabilityScore = (score: number): string => {
  return `${Math.round(score * 100)}%`;
};

export const formatGrade = (grade: string): string => {
  return `Grade ${grade}`;
};

export const formatCareerField = (field: string): string => {
  return field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const formatTimelineYear = (year: string): string => {
  return `Year ${year}`;
};

export const formatScholarshipAmount = (amount: string): string => {
  if (amount.toLowerCase().includes('varies')) return amount;
  if (amount.includes('₹')) return amount;
  return `₹${amount}`;
};

export const formatCollegeFees = (fees: string): string => {
  if (fees.toLowerCase().includes('varies')) return fees;
  if (fees.includes('₹')) return fees;
  return `₹${fees} per annum`;
};

export const formatSalaryOutlook = (salary: string): string => {
  if (salary.includes('₹')) return salary;
  return `₹${salary}`;
};

export const formatConfidenceLevel = (confidence: number): string => {
  if (confidence >= 0.9) return 'Very High';
  if (confidence >= 0.7) return 'High';
  if (confidence >= 0.5) return 'Moderate';
  return 'Low';
};

export const formatAptitudeDomain = (domain: string): string => {
  const domainMap: Record<string, string> = {
    'Ca': 'Verbal Reasoning',
    'Cl': 'Clerical',
    'Ma': 'Mathematical Reasoning',
    'Na': 'Numerical Ability',
    'Pm': 'Perceptual Reasoning',
    'Ra': 'Rotational Reasoning',
    'Sa': 'Spatial Reasoning',
    'Va': 'Verbal Fluency'
  };
  return domainMap[domain] || domain;
};

export const formatInterestDomain = (domain: string): string => {
  return domain.charAt(0).toUpperCase() + domain.slice(1).toLowerCase();
};