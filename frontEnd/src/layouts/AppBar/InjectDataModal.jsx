import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { usePapaParse } from 'react-papaparse';
// @mui
import { useTheme, styled } from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import {Stack, Button, Container, Typography, IconButton, Tabs, Tab, Modal, Box, FormControl, TextField, FormHelperText, 
  InputAdornment, Paper, InputLabel, Select, MenuItem, Grid, tabScrollButtonClasses} from '@mui/material';
import Scrollbar from '../../components/Scrollbar';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel';
import { sanitizeFile } from '../../utility/sanitizeFile';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useDIPA from "../../sections/home/useDIPA";

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
  {jenis:'Pagu', value:1, color:'success'},
  // {jenis:'Pendapatan', value:2, color:'success'},
];
// ---------------------------------------------------------------------------------
export default function InjectDataModal(props) {
  const theme = useTheme();

  const [selectValue, setSelectValue] = useState(0);

  const {data, getData, getLast30Days, getY30Days} = useDIPA();

  const [isCallingAPI, setIsCallingAPI] = useState(false); // cek apakah sedang query ke database utk mencegah double click add/edit button

  const [isCorrectfile, setIsCorrectFile] = useState(false);

  const [loadProg, setLoadProg] = useState(0);

  const [isAuthorized, setIsAuthorized] = useState(false);

  const intervalRef = useRef(null);

  const [file, setFile] = useState(null);

  const handleChange = async(event) => {
    setSelectValue(event.target.value);
    const bool = await sanitizeFile(file[0], event.target.value);
    setIsCorrectFile(bool);
  };

  const handleFileChange = async(event) => {
    setFile(event.target.files);
    const bool = await sanitizeFile(event.target.files[0], selectValue);
    setIsCorrectFile(bool);
  };

  const handleUpload = async() => {
    try{
      setIsCallingAPI(true);
      setLoadProg(90);
      const formData = new FormData();
      const date = new Date().getTime();
      const url = selectValue===0
                  ?`${import.meta.env.VITE_API_URL}/addAllSpending`
                  :`${import.meta.env.VITE_API_URL}/addAllBudget`;
      const fileName = selectValue===0
                        ?`${date}_belanja.csv`
                        :`${date}_pagu.csv`;
      formData.append("file", file[0], fileName);
      const response = await axios.post(url, formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      if(response.status===200){
        setLoadProg(100);
        console.log(response.data);
      }
    }catch(err){
      console.log(err);
      setIsCallingAPI(false);
    }finally{
      setIsCallingAPI(false);
    }
  };

  const handleBlur = (event) => {
    if(event.target.value==="ambo"){return setIsAuthorized(true)};
    return setIsAuthorized(false);
  };

  async function reset (){
    setFile(null);
    setIsCallingAPI(false);
    setIsCorrectFile(false);
    setIsAuthorized(false);
    setLoadProg(0);
  };

  useEffect(() => {
    loadProg===100 && setTimeout(async () => {
      reset();
      await props.close();
      window.location.reload();
    },0)

  },[loadProg])

  return(
      <>
      <Modal open={props.open}>
          <Box sx={style}>
            <IconButton style={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }} onClick={() => { props.close(); reset(); }}>
              <HighlightOffIcon />
            </IconButton>
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
                        value={file?file[0].name:''} 
                        inputProps={{sx:{fontSize:10}}}
                        >
                        Upload File
                      </TextField>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item sx={6} md={6} lg={6}>
                  <Stack direction='column' spacing={2} margin={1}>
                    <FormControl sx={{  mt: 2, minWidth: 120, display:isCorrectfile?'flex':'none'}} size="small" required>
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
                      sx={{display:isCorrectfile?'flex':'none'}}
                      disabled={!isAuthorized || isCallingAPI ? true : false}
                    >
                      Upload File
                    </Button>
                  </Stack>
                </Grid>
                
              </Grid>

              <LinearProgressWithLabel tooltip='file upload progress' value={loadProg} sx={{display:isCorrectfile?'flex':'none'}} />
              <Typography variant='body2' sx={{fontSize:12}}> Last successful update {props?.history} </Typography>
            </Paper>
            </Scrollbar>
          </Box>
      </Modal>
      
      </>
  
  )
}