import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SailingIcon from '@mui/icons-material/Sailing';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentIcon from '@mui/icons-material/Payment';
import { IconButton } from '@mui/material';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),

        position: 'relative',
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
    const navigate = useNavigate();

    const theme = useTheme();
    const [open, setOpen] = React.useState(true); // Set to true to open by default

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                        Persistent drawer
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={{ ...(open && { display: 'none' }) }}
                    >

                        <MenuIcon />
                        
                    </IconButton>
                    
                </Toolbar>
            </AppBar>
            <Main open={open}>
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
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    {/* <img src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'></img> */}
                </DrawerHeader>
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

                    <ListItem disablePadding onClick={() => navigate("/AllTourGuides")}>
                        <ListItemButton>
                            <ListItemIcon>
                                <EmojiPeopleIcon className='icon-edit' />
                                <span className='span-edit'> المرشدين</span>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/AllCruises")}>
                        <ListItemButton>
                            <ListItemIcon>
                                <SailingIcon className='icon-edit' />
                                <span className='span-edit'>الرحلات البحرية</span>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/AllPlaces")}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ApartmentIcon className='icon-edit' />
                                <span className='span-edit'>مراكز البيع</span>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding onClick={() => navigate("/AllProducts")}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ProductionQuantityLimitsIcon className='icon-edit' />
                                <span className='span-edit'>المنتجات</span>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/AllReservation")}>
                        <ListItemButton>
                            <ListItemIcon>

                                <BookOnlineIcon className='icon-edit' />
                                <span className='span-edit'>مواعيد الحجز</span>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/PayingOff")}>
                        <ListItemButton>
                            <ListItemIcon>

                                <PaymentIcon className='icon-edit' />
                                <span className='span-edit'>الدفع </span>
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
