import { useState, useEffect } from 'react';
import axios from "axios";
// @mui
import {useTheme,styled} from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Stack, Button, Container, Typography, IconButton, Tabs, Tab, Modal, Box, FormControl, TextField, FormHelperText, 
  InputAdornment, Paper, InputLabel, Select, MenuItem, Snackbar, Alert, FormControlLabel, Checkbox, filledInputClasses} from '@mui/material';
import Scrollbar from '../../components/Scrollbar';

// --------------------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height:'200px',
  width: '500px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'12px',
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const selectStatus = [
  {jenis:'Belanja', value:0, color:'error'},
  {jenis:'Pendapatan', value:1, color:'success'},
  {jenis:'Pagu', value:2, color:'success'},
];


// ---------------------------------------------------------------------------------
export default function InjectDataModal(props) {
  const theme = useTheme();

  const [value, setValue] = useState(0);

  const [isCallingAPI, setIsCallingAPI] = useState(false); // cek apakah sedang query ke database utk mencegah double click add/edit button

  const handleChange = (event) => {
    setValue(event.target.value)
  };

  return(
      <>
      <Modal open={props.open} onClose={props.close}>
          <Box sx={style}>
            <Scrollbar>
            <Paper sx={{height:'500px', width:'auto', justifyContent:'center'}}>
              <Stack spacing={2}>
                <FormControl sx={{  minWidth: 120 }} size="small" required>
                  <InputLabel id="type" >Jenis Data</InputLabel>
                    <Select 
                      required 
                      name="dataType" 
                      value={value} 
                      sx={{ width:'50%', typography:'body2'}} 
                      label="Jenis Data" onChange={handleChange} 
                    >
                      {selectStatus.map((item, index) => {
                      return(<MenuItem key={index} sx={{typography:'body2', color:theme.palette[item.color].main}} value={item.value}>{item.jenis}</MenuItem>)
                      })}
                    </Select>
                </FormControl>

                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{width:'50%'}}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Stack>
            </Paper>
            
            </Scrollbar>
          </Box>
      </Modal>

      {/*  snackbar untuk show notification di kanan atas  */}
      {/* <Snackbar open={Boolean(snackbar.open)} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{vertical:'top', horizontal:'right'}} >
        <Alert 
          onClose={handleSnackbarClose} 
          variant="filled" 
          severity={snackbar.color?snackbar.color:'info'} 
          sx={{ width: '100%'}}
        >
          {snackbar?.text}
        </Alert>
      </Snackbar> */}
      
      </>
  
  )
}