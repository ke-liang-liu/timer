import React, { useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [status, setStatus] = useState('stop'); // 'stop' || 'running'
  const [type, setType] = useState('session');  // 'session' || 'break'
  const [totalSeconds, setTotalSeconds] = useState(1500);

  function reset() {
    setBreakLength(5);
    setSessionLength(25);
    setStatus('stop');
    setType('session');
    setTotalSeconds(1500);
    //TODO
  }
  function handleBreakLength(e) {
    const newValue = breakLength + Number(e.currentTarget.value);
    if (newValue < 1 || newValue > 60) { return }
    setBreakLength(newValue);
  }
  function handleSessionLength(e) {
    const newValue = sessionLength + Number(e.currentTarget.value);
    if (newValue < 1 || newValue > 60) { return }
    setSessionLength(newValue);
  }


  function getTimeLeft() {
    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds - min * 60;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    return min + ':' + sec;
  }
  function startOrPause() {

  }

  return (
    <Container className="App" maxWidth="sm">
      <Typography id='timer-label' variant="h4">
        Session Time Countdown
        </Typography>
      <Typography variant="h4">
        <span id='time-left'>{getTimeLeft()}</span> <br />
      </Typography>
      <span>min&nbsp;&nbsp;&nbsp;sec</span>
      <Divider />

      <Grid container>
        <Grid item xs={4}>
          <Typography id='break-label'>Break Time Length</Typography>
          <ButtonGroup size='small' variant="contained" aria-label="split button">
            <Button id='break-decrement' aria-label="add" onClick={handleBreakLength} value='-1'>
              <RemoveIcon />
            </Button>
            <Button variant='text' disabled style={{ color: 'black' }}>
              <span id='break-length'>{breakLength}</span>&nbsp;min
            </Button>
            <Button id='break-increment' aria-label="add" onClick={handleBreakLength} value='1'>
              <AddIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <Typography>&nbsp;</Typography>
          <ButtonGroup size='small' variant="contained" aria-label="split button">
            <Button id='start_stop' onClick={startOrPause}>
              <PlayArrowIcon />
              <PauseIcon />
            </Button>
            <Button id='reset' onClick={reset}>
              <StopIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <Typography id='session-label'>Session Time Length</Typography>
          <ButtonGroup size='small' variant="contained" aria-label="split button">
            <Button id='session-decrement' aria-label="add" onClick={handleSessionLength} value='-1'>
              <RemoveIcon />
            </Button>
            <Button variant='text' disabled style={{ color: 'black' }}>
              <span id='session-length'>{sessionLength}</span>&nbsp;min
            </Button>
            <Button id='session-increment' aria-label="add" onClick={handleSessionLength} value='1'>
              <AddIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

    </Container>
  );
}

export default App;
