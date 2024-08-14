/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, MenuItem, OutlinedInput, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import QRCode from 'react-qr-code';
import Drawer from '../../Components/Drawer';
import { baseURL, CRUISES, CRUISES_CREATE, NATIONALITY, ORDER_CREATE, TICKETS, TOURGUIDE, TOURGUIDE_ACTIVE, TOURGUIDE_CREATE } from "../../Components/Api";
import Swal from 'sweetalert2';
import utf8 from 'utf8';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { format } from 'date-fns';

function PayingOff() {
    const [nationalities, setNationalities] = useState([]);
    const [guides, setGuides] = useState([]);
    const [boats, setBoats] = useState([]);
    const [ticketCategories, setTicketCategories] = useState([]);
    const [selectedNationality, setSelectedNationality] = useState('');
    const [selectedGuideName, setSelectedGuideName] = useState('');
    const [selectedBoatName, setSelectedBoatName] = useState('');
    const [selectedTicketCategories, setSelectedTicketCategories] = useState({});
    const [tickets, setTickets] = useState([]);
    const [total, setTotal] = useState(0);
    const [showQRCodes, setShowQRCodes] = useState(false);
    const [qrCodeData, setQrCodeData] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDay, setCurrentDay] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        axios.get(`${baseURL}/${NATIONALITY}`).then(response => setNationalities(response.data));
        axios.get(`${baseURL}/${TOURGUIDE_ACTIVE}`).then(response => setGuides(response.data));
        axios.get(`${baseURL}/${CRUISES}`).then(response => setBoats(response.data));
        fetchGuides();
        fetchBoats();
    }, []);

    const handleAddTicket = (ticket) => {
        setTickets([...tickets, {
            ticketId: ticket.id,
            ticketType: ticket.name,
            ticketcurrency: ticket.currency,
            ticketCount: 1,
            ticketPrice: ticket.price,
            nationality: selectedNationality,
            guideName: selectedGuideName,
            boatName: selectedBoatName,
        }]);
        setSelectedTicketCategories({ ...selectedTicketCategories, [ticket.name]: true });
    };

    const handleIncreaseTicketCount = (index) => {
        const newTickets = [...tickets];
        newTickets[index].ticketCount += 1;

        // Update the ticket in the state
        setTickets(newTickets);

        // Update the total ticket count
        setTotal(total + newTickets[index].ticketPrice);
    }

    const handleDecreaseTicketCount = (index) => {
        const newTickets = [...tickets];
        if (newTickets[index].ticketCount > 1) {
            newTickets[index].ticketCount -= 1;
            setTickets(newTickets);
        }
    };

    const handleDeleteTicket = (index, ticketType) => {
        const newTickets = tickets.filter((_, i) => i !== index);
        setTickets(newTickets);
        const newSelectedTicketCategories = { ...selectedTicketCategories };
        delete newSelectedTicketCategories[ticketType];
        setSelectedTicketCategories(newSelectedTicketCategories);
    };

    useEffect(() => {
        const totalAmount = tickets.reduce((acc, ticket) => acc + (ticket.ticketPrice * ticket.ticketCount), 0);
        setTotal(totalAmount);
    }, [tickets]);

    const handleCloseDialog = () => {
        setShowQRCodes(false);
    };

    const handleCloseError = () => {
        setShowError(false);
    };
    const validateForm = () => {
        let valid = true;
        const newErrors = { nationality: '', guide: '', boat: '', tickets: '' };

        if (!selectedNationality) {
            newErrors.nationality = 'يجب اختيار الجنسية';
            valid = false;
        }
        if (!selectedGuideName) {
            newErrors.guide = 'يجب اختيار المرشد';
            valid = false;
        }
        if (!selectedBoatName) {
            newErrors.boat = 'يجب اختيار المركب';
            valid = false;
        }
        if (tickets.length === 0) {
            newErrors.tickets = 'يجب إضافة تذكرة';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // payment function
    const handlePayment = () => {
        const orderItems = [];

        tickets.forEach(ticket => {
            for (let i = 0; i < ticket.ticketCount; i++) {
                orderItems.push({
                    price: ticket.ticketPrice,
                    ticketId: ticket.ticketId,
                    quantity: 1,
                });
            }
        });

        const orderData = {
            nationalityId: selectedNationalityId,
            cruiseId: selectedBoatId,
            tourGuideId: selectedGuideId,
            orderItems: orderItems
        };

        axios.post(`${baseURL}/${ORDER_CREATE}`, orderData)
            .then(response => {
                const id = response.data.match(/\d+/)[0];
                console.log(`Order created with ID: ${id}`);
                return axios.get(`https://org-bay.runasp.net/api/orders/${id}`);
            })
            .then(response => {
                const qrData = response.data;
                qrData.forEach(ticket => {
                    ticket.createdAt = format(new Date(ticket.createdAt), 'dd/MM/yyyy HH:mm:ss');
                });
                setQrCodeData(qrData);
                setShowQRCodes(true);
            })
            .catch(error => {
                console.error("Error during payment:", error.response ? error.response.data : error.message);
            });
    };

    const handlePaymentConfirmation = () => {
        if (validateForm()) {
            Swal.fire({
                title: "هل انت متاكد من الدفع؟",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                cancelButtonText: "إلغاء",
                confirmButtonText: "نعم متاكد",
                customClass: {
                    popup: 'small-swal'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    handlePayment();
                }
            });
        }
    };

    // print function 
    const [selectedNationalityId, setSelectedNationalityId] = useState(null);
    const [selectedBoatId, setSelectedBoatId] = useState(null);
    const [selectedGuideId, setSelectedGuideId] = useState(null);

    const handlePrint = async () => {
        window.print();
        setTickets([]);
        setSelectedTicketCategories({});
        handleCloseDialog();
    };

    // fetch active tour guide 
    const fetchGuides = async () => {
        try {
            const response = await axios.get(`${baseURL}/${TOURGUIDE_ACTIVE}`);
            setGuides(response.data);
        } catch (error) {
            console.error("There was an error fetching the guides!", error);
        }
    };

    // fecth boats 
    const fetchBoats = async () => {
        try {
            const response = await axios.get(`${baseURL}/${CRUISES}`);
            const activeBoats = response.data.filter(boat => boat.status === "Active");
            setBoats(activeBoats);
        } catch (error) {
            console.error("There was an error fetching the boats!", error);
        }
    };

    // add cruises 
    const [addBoat, setAddBoat] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitBoat = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name) newErrors.name = "من فضلك ادخل الاسم";
        if (!formData.status) newErrors.status = " من فضلك اختر الحالة";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const payload = {
                name: formData.name,
                status: formData.status === "Active" ? 1 : 2,
            };

            const response = await axios.post(
                `${baseURL}/${CRUISES_CREATE}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            fetchBoats();
            setAddBoat(false);
            Swal.fire("تم إضافة المركب بنجاح");
        } catch (error) {
            console.log("Error adding cruise:", error, error.message);
        }
    };

    // add guide 
    const [addGuide, setAddGuide] = useState(false);
    const [formDataguide, setFormDataguide] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        profitRate: "",
        status: ''
    });
    const [guideErrors, setGuideErrors] = useState({});

    const handleChangeGuide = (e) => {
        const { name, value } = e.target;
        setFormDataguide({ ...formDataguide, [name]: value });
    };

    const handleSubmitguide = async (e) => {
        e.preventDefault();
        const newErrors = {};
        const phoneNumberPattern = /^(012|010|011|015)\d{8}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formDataguide.name) newErrors.name = "من فضلك ادخل الاسم";

        if (!formDataguide.email) {
            newErrors.email = "من فضلك ادخل البريد الإلكتروني";
        } else if (!emailRegex.test(formDataguide.email)) {
            newErrors.email = "من فضلك ادخل بريد إلكتروني صحيح";

        } if (!formDataguide.status) newErrors.status = "من فضلك اختر الحالة ";
        if (!formDataguide.phoneNumber) {
            newErrors.phoneNumber = "من فضلك ادخل رقم الهاتف";
        } else if (!phoneNumberPattern.test(formDataguide.phoneNumber)) {
            newErrors.phoneNumber = "رقم الهاتف يجب أن يبدأ بـ 012 أو 010 أو 011 أو 015 ويكون 11 رقم";
        }
        const profitRate = parseFloat(formDataguide.profitRate);
        if (!formDataguide.profitRate) {
            newErrors.profitRate = "من فضلك ادخل نسبة الربح";
        }
        if (profitRate > 100) {
            newErrors.profitRate = "يجب أن تكون رقمًا أقل من أو تساوي 100";
        }
        if (profitRate <= 0) {
            newErrors.profitRate = "يجب أن تكون رقمًا أكبر من صفر";
        }
        if (isNaN(profitRate)) {
            newErrors.profitRate = "يجب أن تكون رقمًا";
        }

        if (Object.keys(newErrors).length > 0) {
            setGuideErrors(newErrors);
            return;
        }

        try {
            const payload = {
                name: formDataguide.name,
                email: formDataguide.email,
                phoneNumber: formDataguide.phoneNumber,
                profitRate: formDataguide.profitRate,
                status: formDataguide.status === "Active" ? 1 : 2,
            };

            await axios.post(`${baseURL}/tour-guides/create`, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            fetchGuides();
            setAddGuide(false);
            Swal.fire("تم إضافة المرشد بنجاح");
        }
        catch (error) {
            console.error("There was an error adding the tour guide!", error);
        }
    };

    // change nationality from english to arabic 
    const nationalityTranslations = {
        "Egyptian": "مصري",
        "Saudi": "سعودي",
        "Kuwaiti": "كويتي",
        "Emirati": "إماراتي",
        "Qatari": "قطري",
        "Bahraini": "بحريني",
        "Omani": "عماني",
        "Jordanian": "أردني",
        "Lebanese": "لبناني",
        "Syrian": "سوري",
        "British": "بريطاني",
        "American": "أمريكي",
        "Canadian": "كندي",
        "Australian": "أسترالي"
    };

    // change currency from english to arabic 
    const currencyNames = {
        0: "دولار أمريكي",
        1: "يورو",
        2: "جنيه مصري",
        3: "جنيه إسترليني",
        4: "ريال سعودي",
        5: "درهم إماراتي",
        6: "دينار كويتي"
    };

    // filter tickets to the day tickets
    useEffect(() => {
        axios.get(`${baseURL}/${TICKETS}`).then(response => setTicketCategories(response.data));
    }, []);

    // get day function 
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            setCurrentDay(now.toLocaleDateString('en-US', { weekday: 'long' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ar-EG', options);
    };

    const filteredTickets = ticketCategories.filter(ticket =>
        ticket.days.some(day => day.name === currentDay)
    );

    // get day to qr code 
    const currentDate = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('ar-EG', options);

    return (
        <div>
            <Drawer />
            <Box className='box-container'>
                <div className='card table-style ' style={{ direction: "rtl" }}>
                    <div className="card-body">
                        <div className="container">
                            <div className='row'>
                                <div className="col-md-4 px-0 pt-3 mb-2 pay-container">

                                    <div className='col-12 text-right d-flex'>
                                        <p className='m-0'>اليوم : </p>
                                        <p className='text-info mr-1 m-0' style={{ fontSize: "20px" }}>{formatDate(currentTime)}</p>
                                    </div>

                                    {/* fetch nationality */}
                                    <div className='px-3'>
                                        <label htmlFor="nationality" className="d-flex font-weight-bold">الجنسية</label>
                                        <Select
                                            id="nationality"
                                            value={selectedNationalityId || ''}
                                            onChange={(e) => {
                                                const selectedNationality = nationalities.find(nationality => nationality.id === e.target.value);
                                                if (selectedNationality) {
                                                    setSelectedNationalityId(selectedNationality.id);
                                                    setSelectedNationality(selectedNationality.name);
                                                }
                                            }}
                                            className="form-control"
                                        >
                                            {nationalities.map((nationality) => (
                                                <MenuItem key={nationality.id} value={nationality.id}>
                                                    {nationalityTranslations[nationality.name]}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.nationality && <div className="error-log">{errors.nationality}</div>}
                                    </div>

                                    <div className="d-flex align-items-center select-box px-3 ">
                                        {/* fetch tour guide  */}
                                        <div className="guide-box m-1 w-100">
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <label htmlFor="guideName" className="d-flex font-weight-bold">اسم المرشد</label>
                                                <IconButton onClick={() => setAddGuide(true)}>
                                                    <AddIcon className='addIcon' />
                                                </IconButton>
                                            </div>
                                            <Select
                                                id="guideName"
                                                value={selectedGuideId || ''}
                                                onChange={(e) => {
                                                    const selectedGuide = guides.find(guide => guide.id === e.target.value);
                                                    if (selectedGuide) {
                                                        setSelectedGuideId(selectedGuide.id);
                                                        setSelectedGuideName(selectedGuide.name);
                                                    }
                                                }}
                                                className="form-control"
                                            >
                                                {guides.map((guide) => (
                                                    <MenuItem key={guide.id} value={guide.id}>{guide.name}</MenuItem>
                                                ))}
                                            </Select>
                                            {errors.guide && <div className="error-log">{errors.guide}</div>}
                                        </div>

                                        {/* fetch boats */}
                                        <div className='w-100'>
                                            <div className='d-flex justify-content-between align-items-center '>
                                                <label htmlFor="boatName" className="d-flex font-weight-bold">اسم المركب</label>
                                                <IconButton onClick={() => setAddBoat(true)}>
                                                    <AddIcon className='addIcon' />
                                                </IconButton>
                                            </div>
                                            <Select
                                                id="boatName"
                                                value={selectedBoatId || ''}
                                                onChange={(e) => {
                                                    const selectedBoat = boats.find(boat => boat.id === e.target.value);
                                                    if (selectedBoat) {
                                                        setSelectedBoatId(selectedBoat.id);
                                                        setSelectedBoatName(selectedBoat.name);
                                                    }
                                                }}
                                                className="form-control"
                                            >
                                                {boats.map((boat) => (
                                                    <MenuItem key={boat.id} value={boat.id}>
                                                        {boat.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.boat && <div className="error-log">{errors.boat}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8 pay-container mb-2 pt-3">
                                    <h5 className='text-right'>التذاكر المتاحة في اليوم الحالي :</h5>

                                    {/* fetch tickets */}
                                    <div className="ticket-box d-flex justify-content-center align-items-center flex-wrap">
                                        {Array.isArray(filteredTickets) && filteredTickets.length > 0 ? (
                                            filteredTickets.map((ticket, index) => (
                                                <div className='my-1' key={ticket.id}>
                                                    <div className={`d-flex justify-content-center align-items-center ticket px-3 mx-1 ticket-color-${index % 10}`}>
                                                        <IconButton variant="outlined" disabled={selectedTicketCategories[ticket.name]} onClick={() => handleAddTicket(ticket)}>
                                                            <ConfirmationNumberIcon sx={{
                                                                color: '#275a88',
                                                                fontSize: '40px',
                                                                transition: 'color 0.3s ease',
                                                                '&:hover': {
                                                                    color: '#1DA2DC',
                                                                }
                                                            }} />
                                                        </IconButton>
                                                        <span>{ticket.name}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className='text-info mr-1 m-0' style={{ fontSize: "20px" }}>لا يوجد تذاكر اليوم</p>

                                        )}
                                    </div>
                                    {errors.tickets && <div className="error-log">{errors.tickets}</div>}
                                </div>

                                {/* <div className="col-md-9 pay-container mb-2 pt-3">
                                    <h5 className='text-right '>التذاكر المتاحة في اليوم الحالي :</h5>

                                    <div className="ticket-box d-flex justify-content-center align-items-center flex-wrap">
                                        {Array.isArray(filteredTickets) && filteredTickets.map((ticket) => (
                                            <div className='my-1' key={ticket.id}>
                                                <div className="d-flex justify-content-center align-items-center ticket px-3 mx-1">
                                                    <IconButton variant="outlined" disabled={selectedTicketCategories[ticket.name]} onClick={() => handleAddTicket(ticket)}>
                                                        <ConfirmationNumberIcon sx={{
                                                            color: '#275a88',
                                                            fontSize: '40px',
                                                            transition: 'color 0.3s ease',
                                                            '&:hover': {
                                                                color: '#1DA2DC',
                                                            }
                                                        }} />
                                                    </IconButton>
                                                    <span>{ticket.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.tickets && <div className="error-log">{errors.tickets}</div>}
                                </div> */}

                                {/* table  */}
                                <div className="col-md-12 p-0 mt-2">
                                    <TableContainer sx={{ borderRadius: "10px" }} component={Paper}>
                                        <Table>
                                            <TableHead className='table-head-style text-white' style={{ backgroundColor: "#275a88" }}>
                                                <TableRow className=' text-white'>
                                                    <TableCell className="text-center" style={{ color: "#fff", fontSize: "18px" }}>نوع التذكرة</TableCell>
                                                    <TableCell className="text-center" style={{ color: "#fff", fontSize: "18px" }}>السعر</TableCell>
                                                    <TableCell className="text-center" style={{ color: "#fff", fontSize: "18px" }}>عدد التذاكر</TableCell>
                                                    <TableCell className="text-center" style={{ color: "#fff", fontSize: "18px" }}>الإجراءات</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {tickets.map((ticket, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="text-center" style={{ fontSize: "18px" }}>{ticket.ticketType}</TableCell>
                                                        <TableCell className="text-center" style={{ fontSize: "18px" }}>{ticket.ticketPrice * ticket.ticketCount} $</TableCell>
                                                        <TableCell className="text-center">
                                                            <IconButton onClick={() => handleIncreaseTicketCount(index)}>
                                                                <AddIcon sx={{ backgroundColor: "#199119", borderRadius: "3px", padding: "0px", marginRight: "5px", color: "#fff" }} />
                                                            </IconButton>
                                                            {ticket.ticketCount}
                                                            <IconButton onClick={() => handleDecreaseTicketCount(index)}>
                                                                <RemoveIcon sx={{ backgroundColor: "#c72c2c", borderRadius: "3px", padding: "0px", marginLeft: "5px", color: "#fff" }} />                                                                    </IconButton>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <IconButton onClick={() => handleDeleteTicket(index, ticket.ticketType)}>
                                                                <DeleteIcon sx={{ color: "red" }} />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell className="text-center font-weight-bold text-dark" sx={{ fontSize: "25px" }}>
                                                        المجموع الكلي
                                                    </TableCell>
                                                    <TableCell className="text-center font-weight-bold text-dark" sx={{ fontSize: "18px" }}>
                                                        {total} $
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Button
                                                            variant="contained"
                                                            sx={{ fontSize: "19px", backgroundColor: "#275a88" }}
                                                            startIcon={<PaymentIcon className='ml-2' />}
                                                            onClick={handlePaymentConfirmation}
                                                            aria-hidden={false}
                                                        >
                                                            دفع
                                                        </Button>

                                                        <Snackbar open={showError} autoHideDuration={3000} onClose={handleCloseError}>
                                                            <Alert onClose={handleCloseError} severity="error">
                                                                لا توجد بيانات للدفع!
                                                            </Alert>
                                                        </Snackbar>
                                                    </TableCell>

                                                </TableRow>

                                            </TableFooter>
                                        </Table>
                                    </TableContainer>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Box >

            {/* add boats dialog  */}
            <Dialog open={addBoat} onClose={() => setAddBoat(false)} fullWidth style={{ direction: "rtl" }}>
                <DialogTitle>
                    <Typography style={{ display: "flex", justifyContent: "start", fontSize: "20px" }}>
                        إضافة مركب جديد
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div className='container'>
                        <div className='row'>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name" className="d-flex">
                                        الاسم
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        aria-describedby="nameHelp"
                                    />
                                    {errors.name && (
                                        <h6 className="error-log">{errors.name}</h6>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="status" className="d-flex">
                                    الحالة
                                </label>
                                <TextField
                                    id="status"
                                    name="status"
                                    select
                                    value={formData.status}
                                    onChange={handleChange}
                                    size="small"
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">اختر الحالة</option>
                                    <option value="Active">نشط</option>
                                    <option value="InActive">غير نشط</option>
                                </TextField>
                                {errors.status && (
                                    <h6 className="error-log">{errors.status}</h6>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddBoat(false)}>إلغاء</Button>
                    <Button onClick={handleSubmitBoat} variant="contained" disableElevation>
                        إضافة
                    </Button>
                </DialogActions>
            </Dialog>

            {/* add guides dialog  */}
            < Dialog open={addGuide} onClose={() => setAddGuide(false)} fullWidth style={{ direction: "rtl" }}>
                <DialogTitle>
                    <Typography style={{ display: "flex", justifyContent: "start", fontSize: "20px" }}>
                        إضافة مرشد جديد
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.name}>
                                    <OutlinedInput
                                        size='small'
                                        autoFocus
                                        margin="dense"
                                        id="guideNameInput"
                                        name="name"
                                        placeholder="اسم المرشد"
                                        value={formDataguide.name}
                                        onChange={handleChangeGuide}
                                    />
                                    <div className='error-log'>{guideErrors.name}</div>
                                </FormControl>
                            </div>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.status}>
                                    <Select
                                        size='small'
                                        labelId="guideStatusLabel"
                                        id="guideStatusSelect"
                                        name="status"
                                        value={formDataguide.status}
                                        onChange={handleChangeGuide}
                                        displayEmpty
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            اختر حالة المرشد
                                        </MenuItem>
                                        <MenuItem value="Active">نشط</MenuItem>
                                        <MenuItem value="InActive">غير نشط</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className='error-log'>
                                    {guideErrors.status}
                                </div>
                            </div>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.profitRate}>
                                    <OutlinedInput
                                        size='small'
                                        margin="dense"
                                        id="guideProfitRateInput"
                                        name="profitRate"
                                        placeholder="نسبة الربح"
                                        value={formDataguide.profitRate}
                                        onChange={handleChangeGuide}
                                        endAdornment={
                                            <InputAdornment position="end">%</InputAdornment>
                                        }
                                    />
                                    <div className='error-log'>
                                        {guideErrors.profitRate}
                                    </div>
                                </FormControl>
                            </div>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.email}>
                                    <OutlinedInput
                                        size='small'
                                        margin="dense"
                                        id="guideEmailInput"
                                        name="email"
                                        placeholder="البريد الالكتروني"
                                        value={formDataguide.email}
                                        onChange={handleChangeGuide}
                                    />
                                    <div className='error-log'>
                                        {guideErrors.email}
                                    </div>
                                </FormControl>
                            </div>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.phoneNumber}>
                                    <OutlinedInput
                                        size='small'
                                        margin="dense"
                                        id="guidePhoneNumberInput"
                                        name="phoneNumber"
                                        placeholder="الهاتف"
                                        value={formDataguide.phoneNumber}
                                        onChange={handleChangeGuide}
                                    />
                                    <div className='error-log'>
                                        {guideErrors.phoneNumber}
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddGuide(false)}>إلغاء</Button>
                    <Button onClick={handleSubmitguide} variant="contained" disableElevation>
                        إضافة
                    </Button>
                </DialogActions>
            </Dialog >

            {/* QRCode dialog  */}
            <Dialog open={showQRCodes} onClose={handleCloseDialog} fullWidth style={{ direction: "rtl" }}>
                <DialogTitle>الـ QR Code</DialogTitle>
                <DialogContent>
                    {qrCodeData && qrCodeData.map((ticket, index) => {
                        const qrValue = `
                            رقم التسلسل: ${ticket.serialNumber}
                            نوع التذكرة: ${ticket.ticketTitle}
                            اسم المركب: ${selectedBoatName} 
                            اسم المرشد: ${ticket.tourGuide}
                            الجنسية: ${nationalityTranslations[ticket.nationality]}
                            السعر: ${ticket.price} $
                            تاريخ الطباعة: ${ticket.createdAt}
                            `;
                        const encodedQRValue = utf8.encode(qrValue);

                        return (
                            <div key={index} style={{ textAlign: "center", margin: "10px 0" }}>
                                {[...Array(ticket.quantity)].map((_, i) => (
                                    <div key={i} style={{ marginBottom: '10px' }}>
                                        <QRCode value={encodedQRValue} />
                                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                            <Typography variant="subtitle1">رقم التسلسل : {ticket.serialNumber}</Typography>
                                            <Typography variant="subtitle1">نوع التذكرة : {ticket.ticketTitle}</Typography>
                                            <Typography variant="subtitle1">اسم المركب : {selectedBoatName}</Typography>
                                            <Typography variant="subtitle1">اسم المرشد : {ticket.tourGuide}</Typography>
                                            <Typography variant="subtitle1">الجنسية : {nationalityTranslations[ticket.nationality]}</Typography>
                                            <Typography variant="subtitle1">السعر : {ticket.price} $</Typography>
                                            <Typography variant="subtitle1">تاريخ الطباعة: {ticket.createdAt}</Typography>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handlePrint}>طباعة</Button>
                    <Button onClick={handleCloseDialog}>إغلاق</Button>
                </DialogActions>
            </Dialog>

        </div >
    );
}

export default PayingOff;
