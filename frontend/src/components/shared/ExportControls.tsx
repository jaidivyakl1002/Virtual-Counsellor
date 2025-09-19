import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ExportButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(135deg, #0F4C75 0%, #146C94 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(20, 108, 148, 0.3)'
  },
  transition: 'all 0.3s ease'
}));

interface ExportControlsProps {
  onDownloadPDF?: () => void;
  onDownloadJSON?: () => void;
  onCopyLink?: () => void;
  onShare?: (platform: 'linkedin' | 'email') => void;
  onSave?: () => void;
  showSaveOption?: boolean;
}

const ExportControls: React.FC<ExportControlsProps> = ({
  onDownloadPDF,
  onDownloadJSON,
  onCopyLink,
  onShare,
  onSave,
  showSaveOption = true
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action: () => void) => {
    action();
    handleClose();
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <ExportButton
        startIcon={<SimCardDownloadOutlinedIcon />}
        onClick={onDownloadPDF}
        size="medium"
      >
        Download Report
      </ExportButton>

      <Tooltip title="More options">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ 
            border: 1, 
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="export-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: { xs: '100%', sm: 240 },
            width: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: '100vw', sm: 320 }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          root: {
            sx: {
              '& .MuiPaper-root': {
                width: { xs: '100%', sm: 'auto' }
              }
            }
          }
        }}
      >
        <MenuItem onClick={() => handleMenuAction(onDownloadJSON || (() => {}))}>
          <ListItemIcon>
            <FileCopyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download as JSON</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleMenuAction(onCopyLink || (() => {}))}>
          <ListItemIcon>
            <FileCopyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => handleMenuAction(() => onShare?.('linkedin'))}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share on LinkedIn</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleMenuAction(() => onShare?.('email'))}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share via Email</ListItemText>
        </MenuItem>

        {showSaveOption && (
          <>
            <Divider />
            <MenuItem onClick={() => handleMenuAction(onSave || (() => {}))}>
              <ListItemIcon>
                <BookmarkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Save Analysis</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>
    </Stack>
  );
};

export default ExportControls;