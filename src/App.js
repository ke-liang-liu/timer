import React, { useState, useEffect } from 'react';
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
import RefreshIcon from '@material-ui/icons/Refresh';
import useStyles from './styles';

function App() {
  const classes = useStyles();
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [status, setStatus] = useState('stop'); // 'stop' || 'running'
  const [type, setType] = useState('Session');  // 'Session' || 'Break'
  const [intervalID, setIntervalID] = useState('');
  const [remainSeconds, setRemainSeconds] = useState(1500);
  const [displayTimeLeft, setDisplayTimeLeft] = useState('25:00');
  const audio = document.getElementById("beep");
  useEffect(() => {
    let min = Math.floor(remainSeconds / 60);
    let sec = remainSeconds - min * 60;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    let timeStr = min + ':' + sec;
    setDisplayTimeLeft(timeStr);
  }, [remainSeconds]);

  const reset = () => {
    clearInterval(intervalID);
    setBreakLength(5);
    setSessionLength(25);
    setStatus('stop');
    setType('Session');
    setIntervalID('');
    setRemainSeconds(1500);
    setDisplayTimeLeft('25:00');
    audio.pause();
    audio.currentTime = 0; // be rewound to the beginning
  }
  const handleBreakLength = (e) => {
    if (status === 'running') { return };
    const newValue = breakLength + Number(e.currentTarget.value);
    if (newValue < 1 || newValue > 99) { return }
    setBreakLength(newValue);
  }
  const handleSessionLength = (e) => {
    if (status === 'running') { return };
    const newValue = sessionLength + Number(e.currentTarget.value);
    if (newValue < 1 || newValue > 99) { return }
    setSessionLength(newValue);
    setRemainSeconds(newValue * 60);
  }

  const startOrPause = () => {
    if (status === 'stop') {
      setStatus('running');
      let counter = remainSeconds;
      let typeStr = type;
      const id = setInterval(() => {
        counter--;
        if (counter < 0) {
          audio.play();
          let obj = changeType(typeStr);
          counter = obj.counter;
          typeStr = obj.typeStr;
        } else {
          setRemainSeconds(counter);
        }
      }, 1000);
      setIntervalID(id);
    } else {
      setStatus('stop');
      clearInterval(intervalID);
    }
  }
  const changeType = (str) => {
    if (str === 'Session') {
      setType('Break');
      setRemainSeconds(breakLength * 60);
      return { typeStr: 'Break', counter: breakLength * 60 }
    } else {
      setType('Session');
      setRemainSeconds(sessionLength * 60);
      return { typeStr: 'Session', counter: sessionLength * 60 }
    }
  }
  return (
    <Container className={classes.root} maxWidth="sm">
      <Typography variant="h5">
        <span id='timer-label'>{type}</span> Time Countdown
        </Typography>
      <Typography variant="h5">
        <span id='time-left'>{displayTimeLeft}</span><br />
      </Typography>
      <span>min&nbsp;&nbsp;sec</span>
      <Divider className={classes.divider} />

      <Grid container>
        <Grid item xs={12} sm={4}>
          <Typography id='session-label'>Session Time Length</Typography>
          <ButtonGroup variant="contained" aria-label="split button">
            <Button id='session-decrement' aria-label="add" onClick={handleSessionLength} value='-1'>
              <RemoveIcon />
            </Button>
            <Button className={classes.textBtn} variant='text' disabled style={{ color: 'black' }}>
              <span id='session-length'>{sessionLength}</span>&nbsp;min
            </Button>
            <Button id='session-increment' aria-label="add" onClick={handleSessionLength} value='1'>
              <AddIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item className={classes.playControl} xs={12} sm={4}>
          <Typography>&nbsp;</Typography>
          <ButtonGroup variant="contained" aria-label="split button">
            <Button id='start_stop' onClick={startOrPause}>
              <PlayArrowIcon />
              <PauseIcon />
            </Button>
            <Button id='reset' onClick={reset}>
              <StopIcon />
              <RefreshIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography id='break-label'>Break Time Length</Typography>
          <ButtonGroup variant="contained" aria-label="split button">
            <Button id='break-decrement' aria-label="add" onClick={handleBreakLength} value='-1'>
              <RemoveIcon />
            </Button>
            <Button className={classes.textBtn} variant='text' disabled style={{ color: 'black' }}>
              <span id='break-length'>{breakLength}</span>&nbsp;min
            </Button>
            <Button id='break-increment' aria-label="add" onClick={handleBreakLength} value='1'>
              <AddIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <div className={classes.developer}>
          <Typography variant="body2" align='center'>
            Designed and Coded By Keliang Liu
          </Typography>
        </div>
      </Grid>
      <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" />
    </Container>
  );
}
export default App;
