
import { Grid } from '@mui/material';
import { Box } from '@mui/system'


export const TherapyDogLayout = ( { children } : any ) => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="left"
      justifyContent="top"
      sx={{ width: '100%', height: '100vh', backgroundImage: `linear-gradient(
        to right,
        rgb(255, 255, 255),
        rgb(255, 255, 255),
        rgba(255, 255, 255, 0.952),
        rgba(255, 255, 255, 0.733),
        rgba(255, 255, 255, 0),
        rgb(255, 0, 0,0)
        ), url(${"/background.png"})`, backgroundAttachment:'local' }}
    >
      <Box sx={{ display: 'flex' }}>
          <Box 
              component='main'
              sx={{ flexGrow: 1 }}
          >
              { children }
          </Box>
      </Box>
    </Grid>
  )
}