import {useState, useEffect} from "react";
import axios from "axios";
import {format} from "date-fns";
import {Card, CardHeader, Typography, Grid, Box, Tabs, Tab, Container, Stack} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';


export default function JsonCard(){
  const theme = useTheme();

  return(
    <Card>
    <CardHeader title="Text" />
      <Container>
        <Typography>
          {``}
        </Typography>
      </Container>
    </Card>

  )
};