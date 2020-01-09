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
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import useStyles from './styles';

function App() {
  const classes = useStyles();
  const [remainSeconds, setRemainSeconds] = useState(1500);
  const [breakLength, setBreakLength] = useState(() => {
    const localData = localStorage.getItem('timerBreakLength');
    if (localData === null || localData === 'null' || isNaN(localData) || localData === '') {
      return 5;
    }
    return Number(localData);
  });
  const [sessionLength, setSessionLength] = useState(() => {
    const localData = localStorage.getItem('timerSessionLength');
    if (localData === null || localData === 'null' || isNaN(localData) || localData === '') {
      setRemainSeconds(25 * 60);
      return 25;
    }
    setRemainSeconds(Number(localData) * 60);
    return Number(localData);
  });
  const [status, setStatus] = useState('stop'); // 'stop' || 'running'
  const [type, setType] = useState('Session');  // 'Session' || 'Break'
  const [intervalID, setIntervalID] = useState('');
  const [displayTimeLeft, setDisplayTimeLeft] = useState('25:00');
  const [bgColor, setBgColor] = useState('white');

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
    // setBreakLength(5);
    // setSessionLength(25);
    // setDisplayTimeLeft('25:00');
    setRemainSeconds(sessionLength * 60);
    setStatus('stop');
    setType('Session');
    setIntervalID('');
    setBgColor('white');
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
      localStorage.setItem('timerBreakLength', breakLength);
      localStorage.setItem('timerSessionLength', sessionLength);
      setStatus('running');
      let counter = remainSeconds;
      let typeStr = type;
      let color = bgColor
      const id = setInterval(() => {
        counter--;
        if (counter < 0) {
          setBgColor('white');
          audio.play();
          let obj = changeType(typeStr);
          counter = obj.counter;
          typeStr = obj.typeStr;
        } if (0 <= counter && counter <= 30) {
          color = changeColor(color);
          setRemainSeconds(counter);
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
  const changeColor = (_color) => {
    if (_color === 'white' || _color === 'lightgreen') {
      setBgColor('red');
      return 'red';
    } else {
      setBgColor('lightgreen');
      return 'lightgreen';
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
    <div style={{ width: '100%', height: '100vh', backgroundColor: `${bgColor}` }}>
      <Container className={classes.root} maxWidth="sm">
        <Typography variant="h5">
          <span id='timer-label'>{type}</span> Time Countdown
      </Typography>
        {type === 'Session' ? (
          <div><DirectionsBikeIcon fontSize='large' /></div>
        ) : (
            <div><FreeBreakfastIcon fontSize='large' /></div>
          )}
        <Typography variant="h5">
          <span id='time-left'>{displayTimeLeft}</span><br />
        </Typography>
        <span>min&nbsp;&nbsp;sec</span>
        <Divider className={classes.divider} />

        <Grid container>
          <Grid item className={classes.sessionControl} xs={12} sm={6}>
            <Typography id='session-label'>Session Time Length</Typography>
            <ButtonGroup variant="contained" aria-label="split button">
              <Button disabled style={{ color: 'black' }}>
                <DirectionsBikeIcon />
              </Button>
              <Button className={classes.textBtn} variant='text' disabled style={{ color: 'black' }}>
                <span id='session-length'>{sessionLength}</span>&nbsp;min
            </Button>
              <Button id='session-decrement' disabled={status === 'running'} aria-label="decrement" onClick={handleSessionLength} value='-1'>
                <RemoveIcon />
              </Button>
              <Button id='session-increment' disabled={status === 'running'} aria-label="increment" onClick={handleSessionLength} value='1'>
                <AddIcon />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item className={classes.breakControl} xs={12} sm={6}>
            <Typography id='break-label'>Break Time Length</Typography>
            <ButtonGroup variant="contained" aria-label="split button">
              <Button disabled style={{ color: 'black' }}>
                <FreeBreakfastIcon />
              </Button>
              <Button className={classes.textBtn} variant='text' disabled style={{ color: 'black' }}>
                <span id='break-length'>{breakLength}</span>&nbsp;min
            </Button>
              <Button id='break-decrement' disabled={status === 'running'} aria-label="decrement" onClick={handleBreakLength} value='-1'>
                <RemoveIcon />
              </Button>
              <Button id='break-increment' disabled={status === 'running'} aria-label="increment" onClick={handleBreakLength} value='1'>
                <AddIcon />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item className={classes.playControl} xs={12} sm={12}>
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
          <div className={classes.developer}>
            <Typography variant="body2" align='center'>
              Designed and Coded By Keliang Liu
          </Typography>
          </div>
        </Grid>
        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" />
      </Container>
    </div>
  );
}
export default App;
