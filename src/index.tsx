import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "fontsource-roboto/400-normal.css"

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { AllItemsChart, HourlyScrobblesChart, DailyScrobblesChart } from './charts';
import { ScrobbleList } from './scrobble-list';
import { ScrobbleSummary } from './scrobble-summary';

const useStyles = makeStyles((theme: Theme) => createStyles({
    anchor: {
        color: 'black',
        textDecoration: 'none',
    },
    drawer: {
        width: 240,
    },
    drawerPaper: {
        width: 240,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
  })
)

function App() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Router>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper, }}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to="/" className={classes.anchor}>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Link to="/create" className={classes.anchor}>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Create new item" />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main>
                    <Container>
                        <Switch>
                            <Route path="/create">
                                <h1>Create</h1>
                            </Route>
                            <Route path="/">
                                <h1>Life Scrobbler</h1>
                                <ScrobbleSummary />
                                <h2>Recent</h2>
                                <ScrobbleList />
                                <h2>Top Items</h2>
                                <Card>
                                    <CardContent>
                                        <AllItemsChart/>
                                    </CardContent>
                                </Card>
                                <h2>Hourly View of Scrobbles (last 3 days)</h2>
                                <Card>
                                    <CardContent>
                                        <HourlyScrobblesChart />
                                    </CardContent>
                                </Card>
                                <h2>Daily View of Scrobbles (last 30 days)</h2>
                                <Card>
                                    <CardContent>
                                        <DailyScrobblesChart />
                                    </CardContent>
                                </Card>
                            </Route>
                        </Switch>
                    </Container>
                </main>
            </Router>
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));
