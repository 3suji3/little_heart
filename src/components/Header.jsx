import { Box, Grid } from "@mui/material"


const Header = () => {
  return (
    <Grid>
      <Box><img src="/img/LOGO.png" alt="로고" /></Box>
      <Grid>명언</Grid>
      <Grid>일기 쓰기</Grid>
    </Grid>
  )
}

export default Header