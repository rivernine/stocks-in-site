import React from "react";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Copyright from './Copyright';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CoefficientChartGridContainer from './chart/CoefficientChartGridContainer';
import SearchContainer from './search/SearchContainer';

import { Route, Link } from 'react-router-dom';

const drawerWidth = 240;
const contact = `contact: indexduck@gmail.com
  `;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: theme.palette.background.default,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 300,
    position: "relative"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  logo: {
    display: "block",
    margin: "10px 0px 10px auto",
    borderRadius: '9px',
    width: "250px",
    height: "45px",
  },
  bottomPush: {
    position: "fixed",
    bottom: 0,
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 1000,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 25, right: 25 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

function Dashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [appBarStr, setAppBarStr] = React.useState("유사도순위 <누적순매수✖종가>");
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} >
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 1
          }}
        >
          <img src="/images/whitelabel.png"  />
        </Box>
      </div>
      <List>
        <ListItem button key='유사도순위' onClick={() => {setAppBarStr("유사도순위 <누적순매수✖종가>")}} component={Link} to={'/chart'}>
          <ListItemIcon><ShowChartIcon /></ListItemIcon>
          <ListItemText primary='유사도순위' />
        </ListItem>
        <ListItem button key='종목검색' onClick={() => {setAppBarStr("종목검색")}} component={Link} to={'/search'}>
          <ListItemIcon><ScreenSearchDesktopIcon /></ListItemIcon>
          <ListItemText primary='종목검색' />
        </ListItem>

      </List>
      <div className={classes.bottomPush}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Typography component="p" variant="subtitle3" color="initial" noWrap align="center" style={{whiteSpace: 'pre-line'}}>{contact}</Typography>
        </Box>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="Remy Sharp" sx={{ mr: 2, border: 0 }} src="/images/indexduck_logo.png" />
          <Typography variant="h6" noWrap>
            {appBarStr}
          </Typography>



        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} id="back-to-top-anchor" />

        <Container maxWidth="xl" className={classes.container}>
          <Route path="/" component={CoefficientChartGridContainer} exact />
          <Route path="/chart" component={CoefficientChartGridContainer} />
          <Route path="/search" component={SearchContainer} />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
        <ScrollTop {...props}>
          <Fab color="primary" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </main>
    </div>
  );
}

export default Dashboard;