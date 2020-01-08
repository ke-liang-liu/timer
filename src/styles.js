import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  textBtn: {
    width: 62,
    color: 'black',
    textTransform: 'lowercase',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default useStyles;