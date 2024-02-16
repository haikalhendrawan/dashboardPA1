import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { usePapaParse } from 'react-papaparse';
// @mui
import {useTheme, styled} from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import {Stack, Button, Container, Typography, IconButton, Tabs, Tab, Modal, Box, FormControl, TextField, FormHelperText, 
  InputAdornment, Paper, InputLabel, Select, MenuItem, Grid, tabScrollButtonClasses} from '@mui/material';
import Scrollbar from '../../components/Scrollbar';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel';

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

  const [selectValue, setSelectValue] = useState('');

  const [isCallingAPI, setIsCallingAPI] = useState(false); // cek apakah sedang query ke database utk mencegah double click add/edit button

  const [isCorrectfile, setIsCorrectFile] = useState(false);

  const [loadProg, setLoadProg] = useState(0);

  const [isAuthorized, setIsAuthorized] = useState(false);

  const intervalRef = useRef(null);

  const fileRef = useRef(null);

  const handleChange = (event) => {
    setSelectValue(event.target.value)
  };

  const handleFileChange = (event) => {
    fileRef.current = event.target.files;
    setFile(event.target.files);
  };

  const handleUpload = async() => {
    try{
      const formData = new FormData();
      formData.append("file", file[0], "file2.csv")
      const response = await axios.post("http://localhost:3015/addAllBudget", formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      if(response.status===200){
        setLoadProg(0);
        setFile(null);
        props.close();
      }
    }catch(err){
      console.log(err)
    };

    // readRemoteFile(csvString, {
    //   complete: async(results) => {
    //     console.log(results.data[0])
    //   },
    // });
  };

  const handleBlur = (event) => {
    if(event.target.value==="ambo"){return setIsAuthorized(true)};
    return setIsAuthorized(false);
  }

  useEffect(() => {
    loadProg>=90 && clearInterval(intervalRef.current);

  },[loadProg])

  return(
      <>
      <Modal open={props.open} onClose={props.close}>
          <Box sx={style}>
            <Scrollbar>
            <Paper sx={{height:'500px', width:'auto', justifyContent:'center'}}>
              <Grid container>
                <Grid item sx={6} md={6} lg={6}>
                  <Stack direction='column' spacing={2} margin={1}>
                    <FormControl sx={{  mt: 2, minWidth: 120 }} size="small">
                      <InputLabel id="type" sx={{typography:'body2'}}>Jenis Data</InputLabel>
                        <Select 
                          required 
                          name="dataType" 
                          value={selectValue} 
                          sx={{typography:'body2'}} 
                          label="Jenis Data" onChange={handleChange} 
                        >
                          {selectStatus.map((item, index) => {
                          return(
                            <MenuItem key={index} sx={{typography:'body2'}} value={item.value}>{item.jenis}</MenuItem>)
                          })}
                        </Select>
                    </FormControl>
                    
                    <Stack direction='row'>
                      <IconButton
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        color='primary'
                        sx={{borderRadius:'50%', width:'20%'}}
                      >
                        <CloudUploadIcon />
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                      </IconButton>

                      <TextField 
                        variant='standard' 
                        value={file && file[0].name} 
                        inputProps={{sx:{fontSize:10}}}
                        InputPropsdisabled>
                        Upload File
                      </TextField>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item sx={6} md={6} lg={6}>
                  <Stack direction='column' spacing={2} margin={1}>
                    <FormControl sx={{  mt: 2, minWidth: 120, display:file?'flex':'none'}} size="small" required>
                      <TextField 
                      type='password' 
                      label='password' 
                      size='small' 
                      sx={{typography:'body2'}} 
                      InputLabelProps={{
                        sx: {
                          typography:'body2',
                        }
                      }}
                      onBlur={handleBlur}
                      required />
                    </FormControl>
                    <Button 
                      variant='contained' 
                      onClick={handleUpload} 
                      endIcon={<SendIcon />} 
                      sx={{display:file?'flex':'none'}}
                      disabled={!isAuthorized || isCallingAPI ? true : false}
                    >
                      Upload File
                    </Button>
                  </Stack>
                </Grid>
                
              </Grid>

              <LinearProgressWithLabel tooltip='file upload progress' value={loadProg} sx={{display:file?'flex':'none'}}/>
            </Paper>
            </Scrollbar>
          </Box>
      </Modal>
      
      </>
  
  )
}