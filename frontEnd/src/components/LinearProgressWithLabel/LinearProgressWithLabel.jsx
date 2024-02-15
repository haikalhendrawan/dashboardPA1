import { Typography, LinearProgress, Box, Tooltip} from '@mui/material';
import {useTheme} from '@mui/material/styles';


export default function LinearProgressWithLabel(props) {
  return (
    <Tooltip title={props.tooltip}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" {...props} />
          </Box>
          <Box sx={{ minWidth: 40 }}> 
            <Typography variant="body2" color="text.secondary" noWrap>
              {`${Math.round(props.value,)}%`}
            </Typography>
          </Box>
      </Box>
    </Tooltip>
  );
};