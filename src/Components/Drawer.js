import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import ArticleIcon from '@mui/icons-material/Article';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        position: 'relative',
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Main>
                <DrawerHeader />
            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={true} // Set open to true to make the drawer always open
            >
                <DrawerHeader />
                <Divider />
                <List>
                    <ListItem disablePadding onClick={() => navigate("/")}>
                        <ListItemButton>
                            <ListItemIcon>
                                <SpaceDashboardIcon className='icon-edit' />
                                <span className='span-edit'>الرئيسيه</span>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => navigate("/All")}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ConfirmationNumberIcon className='icon-edit' />
                                <span className='span-edit'>اضافه تذكره</span>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => navigate("/AllCategories")}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CategoryIcon className='icon-edit' />
                                <span className='span-edit'>فئات التذاكر</span>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
}
