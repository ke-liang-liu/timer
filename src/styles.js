import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    // [theme.breakpoints.up('sm')]: {
    //   textAlign: 'left',
    // },
    paddingTop: theme.spacing(1),
  },
  textBtn: {
    width: 62,
    color: 'black',
    textTransform: 'lowercase',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  sessionControl: {
    marginBottom: theme.spacing(1),
  },
  breakControl: {
    marginBottom: theme.spacing(1),
  },
  playControl: {
    marginBottom: theme.spacing(1),
  },
  developer: {
    margin: 'auto',
    marginTop: theme.spacing(1.2),
  }
}));

export default useStyles;