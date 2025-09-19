import { SkillLevel, Priority, CareerMatchLevel } from '../types/assessmentResultsTypes';

// Formatting functions for assessment results
export const formatSkillLevel = (level: SkillLevel): string => {
  const levelMap = {
    [SkillLevel.BEGINNER]: 'Beginner',
    [SkillLevel.INTERMEDIATE]: 'Intermediate', 
    [SkillLevel.ADVANCED]: 'Advanced',
    [SkillLevel.EXPERT]: 'Expert'
  };
  return levelMap[level];
};

export const formatPriority = (priority: Priority): string => {
  const priorityMap = {
    [Priority.HIGH]: 'High Priority',
    [Priority.MEDIUM]: 'Medium Priority',
    [Priority.LOW]: 'Low Priority'
  };
  return priorityMap[priority];
};

export const formatTimeframe = (weeks: number): string => {
  if (weeks < 4) {
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  }
  const months = Math.ceil(weeks / 4);
  return `${months} month${months > 1 ? 's' : ''}`;
};

export const formatCareerMatch = (match: CareerMatchLevel): string => {
  const matchMap = {
    [CareerMatchLevel.EXCELLENT]: 'Excellent Match',
    [CareerMatchLevel.GOOD]: 'Good Match',
    [CareerMatchLevel.FAIR]: 'Fair Match', 
    [CareerMatchLevel.POOR]: 'Poor Match'
  };
  return matchMap[match];
};

export const formatSalaryRange = (min: number, max: number): string => {
  const formatNumber = (num: number): string => {
    if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    }
    return `${(num / 1000).toFixed(0)}K`;
  };
  return `₹${formatNumber(min)} - ₹${formatNumber(max)}`;
};