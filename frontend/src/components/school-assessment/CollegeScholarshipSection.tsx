import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import ConfidenceIndicator from '../shared/ConfidenceIndicator';
import { CollegeScholarshipOutput, RecommendedCollege, ScholarshipOpportunity } from '../../types/schoolAssessmentTypes';
import { formatSuitabilityScore, formatCollegeFees, formatScholarshipAmount } from '../../utils/schoolAssessmentFormatters';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default
}));

const HeaderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #E3F2FD 0%, #E0F7FA 100%)',
  border: 'none',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
}));

const CollegeCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main
  }
}));

const ScholarshipCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  backgroundColor: theme.palette.success.light + '10',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.success.main
  }
}));

const SuitabilityChip = styled(Chip)<{ score: number }>(({ theme, score }) => ({
  fontWeight: 600,
  fontSize: '0.875rem',
  backgroundColor: 
    score >= 0.9 ? theme.palette.success.light :
    score >= 0.7 ? theme.palette.primary.light :
    score >= 0.5 ? theme.palette.warning.light :
    theme.palette.error.light,
  color:
    score >= 0.9 ? theme.palette.success.contrastText :
    score >= 0.7 ? theme.palette.primary.contrastText :
    score >= 0.5 ? theme.palette.warning.contrastText :
    theme.palette.error.contrastText
}));

const BookmarkButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '20',
    transform: 'scale(1.1)'
  }
}));

const SaveButton = styled(Button)(({  }) => ({
  background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(135deg, #388E3C 0%, #689F38 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
  }
}));

const FeesBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`
}));

interface CollegeScholarshipSectionProps {
  data: CollegeScholarshipOutput['data'];
  confidence: number;
  onCollegeBookmark?: (collegeId: string, college: RecommendedCollege) => void;
  onScholarshipSave?: (scholarshipId: string, scholarship: ScholarshipOpportunity) => void;
}

const CollegeScholarshipSection: React.FC<CollegeScholarshipSectionProps> = ({
  data,
  confidence,
  onCollegeBookmark,
  onScholarshipSave
}) => {
  const [bookmarkedColleges, setBookmarkedColleges] = React.useState<Set<string>>(new Set());
  const [savedScholarships, setSavedScholarships] = React.useState<Set<string>>(new Set());

  const handleCollegeBookmark = (college: RecommendedCollege) => {
    const collegeId = college.college_name.replace(/\s+/g, '-').toLowerCase();
    const newBookmarked = new Set(bookmarkedColleges);
    
    if (bookmarkedColleges.has(collegeId)) {
      newBookmarked.delete(collegeId);
    } else {
      newBookmarked.add(collegeId);
    }
    
    setBookmarkedColleges(newBookmarked);
    onCollegeBookmark?.(collegeId, college);
  };

  const handleScholarshipSave = (scholarship: ScholarshipOpportunity) => {
    const scholarshipId = scholarship.scholarship_name.replace(/\s+/g, '-').toLowerCase();
    const newSaved = new Set(savedScholarships);
    
    if (savedScholarships.has(scholarshipId)) {
      newSaved.delete(scholarshipId);
    } else {
      newSaved.add(scholarshipId);
    }
    
    setSavedScholarships(newSaved);
    onScholarshipSave?.(scholarshipId, scholarship);
  };

  return (
    <SectionContainer>
      <HeaderCard>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <AccountBalanceOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              College & Scholarships
            </Typography>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {data.executive_summary}
          </Typography>
        </CardContent>
      </HeaderCard>

      <Stack spacing={4}>
        {/* Recommended Colleges */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Recommended Colleges
            </Typography>
            
            <Stack spacing={3}>
              {data.recommended_colleges.map((college, index) => {
                const collegeId = college.college_name.replace(/\s+/g, '-').toLowerCase();
                const isBookmarked = bookmarkedColleges.has(collegeId);
                
                return (
                  <CollegeCard key={index}>
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            {college.college_name}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {college.location}
                            </Typography>
                            <Chip 
                              label={college.college_type}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </Stack>
                          <SuitabilityChip 
                            label={`${formatSuitabilityScore(college.suitability_score)} Match`}
                            score={college.suitability_score}
                            size="medium"
                          />
                        </Box>
                        <BookmarkButton
                          onClick={() => handleCollegeBookmark(college)}
                          color={isBookmarked ? 'primary' : 'default'}
                        >
                          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </BookmarkButton>
                      </Stack>

                      <Box mb={3}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Suitability Score
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={college.suitability_score * 100} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            backgroundColor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              backgroundColor: 
                                college.suitability_score >= 0.9 ? 'success.main' :
                                college.suitability_score >= 0.7 ? 'primary.main' :
                                college.suitability_score >= 0.5 ? 'warning.main' :
                                'error.main'
                            }
                          }} 
                        />
                      </Box>

                      <Stack spacing={3}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Programs Offered
                          </Typography>
                          <Stack direction="row" flexWrap="wrap" gap={1}>
                            {college.programs_offered.map((program, idx) => (
                              <Chip 
                                key={idx}
                                label={program}
                                size="small"
                                variant="outlined"
                                color="primary"
                                icon={<SchoolIcon />}
                              />
                            ))}
                          </Stack>
                        </Box>

                        <Divider />

                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                          <Box flex={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                              Admission Requirements
                            </Typography>
                            <List dense>
                              <ListItem sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <CheckCircleOutlineIcon sx={{ fontSize: 20, color: 'success.main' }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={college.admission_requirements.entrance_exam}
                                  secondary={college.admission_requirements.requirement}
                                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                  secondaryTypographyProps={{ variant: 'caption' }}
                                />
                              </ListItem>
                            </List>
                          </Box>

                          <Box flex={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                              Fees Structure
                            </Typography>
                            <Stack spacing={1}>
                              <FeesBox>
                                <Typography variant="caption" color="text.secondary">Tuition</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {formatCollegeFees(college.fees_structure.tuition)}
                                </Typography>
                              </FeesBox>
                              <FeesBox>
                                <Typography variant="caption" color="text.secondary">Hostel</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {formatCollegeFees(college.fees_structure.hostel)}
                                </Typography>
                              </FeesBox>
                            </Stack>
                          </Box>

                          <Box flex={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                              Placement Statistics
                            </Typography>
                            <Stack spacing={1}>
                              <FeesBox>
                                <Typography variant="caption" color="text.secondary">Average Salary</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {college.placement_statistics.average_salary}
                                </Typography>
                              </FeesBox>
                              <FeesBox>
                                <Typography variant="caption" color="text.secondary">Placement Rate</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {college.placement_statistics.placement_rate}
                                </Typography>
                              </FeesBox>
                            </Stack>
                          </Box>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CollegeCard>
                );
              })}
            </Stack>
          </CardContent>
        </Card>

        {/* Scholarship Opportunities */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Scholarship Opportunities
            </Typography>
            
            <Stack spacing={3}>
              {data.scholarship_opportunities.map((scholarship, index) => {
                const scholarshipId = scholarship.scholarship_name.replace(/\s+/g, '-').toLowerCase();
                const isSaved = savedScholarships.has(scholarshipId);
                
                return (
                  <ScholarshipCard key={index}>
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            {scholarship.scholarship_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Provider: {scholarship.provider}
                          </Typography>
                          <Stack direction="row" spacing={1} mb={1}>
                            <Chip 
                              label={scholarship.scholarship_type}
                              size="small"
                              color="success"
                              variant="outlined"
                            />
                            <SuitabilityChip 
                              label={`${formatSuitabilityScore(scholarship.compatibility_score)} Compatible`}
                              score={scholarship.compatibility_score}
                              size="small"
                            />
                          </Stack>
                        </Box>
                        <SaveButton
                          variant="contained"
                          onClick={() => handleScholarshipSave(scholarship)}
                          startIcon={<SaveIcon />}
                          size="small"
                        >
                          {isSaved ? 'Saved' : 'Save'}
                        </SaveButton>
                      </Stack>

                      <Box mb={3}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AttachMoneyIcon sx={{ fontSize: 20 }} />
                          Benefit Amount
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                          {formatScholarshipAmount(scholarship.benefit_amount)}
                        </Typography>
                      </Box>

                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Eligibility Criteria
                          </Typography>
                          <List dense>
                            {scholarship.eligibility_criteria.map((criteria, idx) => (
                              <ListItem key={idx} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <CheckCircleOutlineIcon sx={{ fontSize: 20, color: 'success.main' }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={criteria}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>

                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Application Process
                          </Typography>
                          <List dense>
                            {scholarship.application_process.map((step, idx) => (
                              <ListItem key={idx} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <Typography variant="caption" sx={{ 
                                    backgroundColor: 'primary.main', 
                                    color: 'white', 
                                    borderRadius: '50%', 
                                    width: 20, 
                                    height: 20, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: 600
                                  }}>
                                    {idx + 1}
                                  </Typography>
                                </ListItemIcon>
                                <ListItemText 
                                  primary={step}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </Stack>
                    </CardContent>
                  </ScholarshipCard>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </SectionContainer>
  );
};

export default CollegeScholarshipSection;