import React, { useRef, useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Stack, 
  Alert,
  LinearProgress,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UploadContainer = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: '16px',
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.grey[50],
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main + '08'
  },
  '&.drag-over': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main + '15',
    transform: 'scale(1.02)'
  }
}));

const FilePreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '12px',
  marginTop: theme.spacing(2)
}));

const HiddenInput = styled('input')({
  display: 'none'
});

interface FileUploadSectionProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  file,
  onFileChange,
  error,
  required = true
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a PDF or DOCX file only.';
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return 'File size must be less than 10MB.';
    }
    
    return null;
  };

  const handleFileSelect = async (selectedFile: File) => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      onFileChange(null);
      return;
    }

    setUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    onFileChange(selectedFile);
    setUploading(false);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
        Upload your Resume {required && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Upload your resume in PDF or DOCX format (max 10MB)
      </Typography>

      {!file ? (
        <UploadContainer
          className={dragOver ? 'drag-over' : ''}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          elevation={0}
        >
          <Stack spacing={2} alignItems="center">
            <CloudUploadOutlinedIcon 
              sx={{ 
                fontSize: '3rem', 
                color: 'primary.main',
                opacity: dragOver ? 1 : 0.7
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {dragOver ? 'Drop your file here' : 'Choose File or Drag & Drop'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              PDF, DOCX up to 10MB
            </Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              disabled={uploading}
            >
              Browse Files
            </Button>
          </Stack>
        </UploadContainer>
      ) : (
        <FilePreview>
          <DescriptionOutlinedIcon sx={{ color: 'primary.main', mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {file.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </Typography>
          </Box>
          <Button
            size="small"
            onClick={handleRemoveFile}
            startIcon={<DeleteOutlineIcon />}
            sx={{ color: 'error.main' }}
          >
            Remove
          </Button>
        </FilePreview>
      )}

      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress />
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 1, color: 'text.secondary' }}>
            Uploading...
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileInputChange}
      />
    </Stack>
  );
};

export default FileUploadSection;