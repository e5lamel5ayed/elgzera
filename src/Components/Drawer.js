import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SailingIcon from '@mui/icons-material/Sailing';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaymentIcon from '@mui/icons-material/Payment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

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
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(!isMobile);
    const [openReports, setOpenReports] = React.useState(false);
    const role = localStorage.getItem('role'); // Get the role from localStorage

    React.useEffect(() => {
        setOpen(!isMobile);
    }, [isMobile]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleReportsClick = () => {
        setOpenReports(!openReports);
    };

    const handleReportClick = (path) => {
        navigate(path);
        setOpenReports(false); // Collapse the reports menu after navigation
    };
    const customStyles = {
        collapse: {
            backgroundColor: '#f0f0f0',
        },
        listItem: {
            padding: '0px',
            '&:hover': {
                backgroundColor: '#e0e0e0',
            },
        },
        listItemText: {
            color: '#333',
        },
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: "#fcf7f7" }} position="fixed" open={open}>
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={{ ...(open && { display: 'none' }), color: "#000" }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Main open={open}>
                <DrawerHeader />
            </Main>
            <Drawer
                className='color'
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
                <DrawerHeader sx={{ backgroundColor: "#fcf7f7" }}>
                    <IconButton sx={{ color: "#000" }} onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <img style={{ width: "64%" }} src='\imgs\orane.png' alt='orange' />
                </DrawerHeader>
                <Divider />
                <List sx={{ backgroundColor: "#fcf7f7", height: "100%" }}>
                    {role === 'admin' && (
                        <>
                            <ListItem disablePadding onClick={() => navigate("/Home")}>
                                <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ListItemIcon>
                                        <SpaceDashboardIcon className='icon-edit' />
                                    </ListItemIcon>
                                    <span className='span-edit'>الرئيسية</span>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={() => navigate("/AllTickets")}>
                                <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ListItemIcon>
                                        <CategoryIcon className='icon-edit' />
                                    </ListItemIcon>
                                    <span className='span-edit'>اضافة تذكرة</span>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={() => navigate("/AllCategories")}>
                                <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ListItemIcon>
                                        <ConfirmationNumberIcon className='icon-edit' />
                                    </ListItemIcon>
                                    <span className='span-edit'>فئات التذاكر</span>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={() => navigate("/AllTourGuides")}>
                                <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ListItemIcon>
                                        <EmojiPeopleIcon className='icon-edit' />
                                    </ListItemIcon>
                                    <span className='span-edit'>المرشدين</span>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={() => navigate("/AllCruises")}>
                                <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ListItemIcon>
                                        <SailingIcon className='icon-edit' />
                                    </ListItemIcon>
                                    <span className='span-edit'>المراكب</span>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={() => navigate("/AllPlaces")}>
                                <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ListItemIcon>
                                        <ApartmentIcon className='icon-edit' />
                                    </ListItemIcon>
                                    <span className='span-edit'>مراكز البيع</span>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={() => navigate("/AllProducts")}>
                                <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ListItemIcon>
                                        <ProductionQuantityLimitsIcon className='icon-edit' />
                                    </ListItemIcon>
                                    <span className='span-edit'>المنتجات</span>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={handleReportsClick}>
                                <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ListItemIcon>
                                        <AssessmentIcon className='icon-edit' />
                                    </ListItemIcon>
                                    <span className='span-edit'>التقارير</span>
                                    <ExpandMoreIcon />
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={openReports} sx={customStyles.collapse}>
                                <List component="div" disablePadding>
                                    <ListItem button sx={customStyles.listItem} onClick={() => handleReportClick("/daily-report")}>
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <span className='span-edit-collapse' style={customStyles.listItemText}>تقرير يومي تفصيلي</span>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem button sx={customStyles.listItem} onClick={() => handleReportClick("/total-daily-report")}>
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <span className='span-edit-collapse' style={customStyles.listItemText}>تقرير يومي اجمالي</span>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem disablePadding onClick={() => navigate("/PayingOff")}>
                                <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ListItemIcon>
                                        <PaymentIcon className='icon-edit' />
                                    </ListItemIcon>
                                    <span className='span-edit'>حجز تذكرة</span>
                                </ListItemButton>
                            </ListItem>
                        </>
                    )}
                    {role === 'user' && (
                        <ListItem disablePadding onClick={() => navigate("/PayingOff")}>
                            <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <ListItemIcon>
                                    <PaymentIcon className='icon-edit' />
                                </ListItemIcon>
                                <span className='span-edit'>حجز تذكرة</span>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </Box>
    );
}
