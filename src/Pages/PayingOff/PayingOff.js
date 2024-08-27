/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import QRCode from 'react-qr-code';
import Drawer from '../../Components/Drawer';
import { baseURL, CRUISE_ACTIVE, CRUISES, CRUISES_CREATE, NATIONALITY, ORDER_CREATE, TICKETS, TICKETS_ACTIVE, TOURGUIDE_ACTIVE, TOURGUIDE_CREATE } from "../../Components/Api";
import Swal from 'sweetalert2';
import utf8 from 'utf8';
import { format } from 'date-fns';
import BoatSelect from './BoatSelect';
import NationalitySelect from './NationalitySelect ';
import TicketTable from './TicketTable';
import TicketList from './TicketList';
import GuideSelect from './GuideSelect';

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
    const [selectedNationalityId, setSelectedNationalityId] = useState(null);
    const [selectedBoatId, setSelectedBoatId] = useState(null);
    const [selectedGuideId, setSelectedGuideId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [printReady, setPrintReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        //NATIONALITY
        axios.get(`${baseURL}/${NATIONALITY}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(response => setNationalities(response.data));

        //TOURGUIDE_ACTIVE
        axios.get(`${baseURL}/${TOURGUIDE_ACTIVE}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(response => setGuides(response.data));

        //CRUISES
        axios.get(`${baseURL}/${CRUISES}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(response => setBoats(response.data));

        fetchGuides();
        fetchBoats();
    }, []);

    const handleAddTicket = (ticket) => {
        if (selectedTicketCategories[ticket.name]) {
            return;
        }

        setTickets([...tickets, {
            ticketId: ticket.id,
            ticketType: ticket.name,
            // ticketcurrency: ticket.currency,
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
        const token = localStorage.getItem('token');
        axios.post(`${baseURL}/${ORDER_CREATE}`, orderData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                const id = response.data.match(/\d+/)[0];
                console.log(`Order created with ID: ${id}`);
                const token = localStorage.getItem('token');
                return axios.get(`${baseURL}/${ORDER_CREATE}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            })
            .then(response => {
                const qrData = response.data;
                qrData.forEach(ticket => {
                    ticket.serialNumbers.forEach(serialInfo => {
                        if (serialInfo.createdAt) {
                            const dateObject = new Date(serialInfo.createdAt);
                            if (!isNaN(dateObject)) {
                                serialInfo.createdAt = format(dateObject, 'dd/MM/yyyy HH:mm:ss');
                            } else {
                                console.error('Invalid date:', serialInfo.createdAt);
                            }
                        }
                    });
                });
                setQrCodeData(qrData);

                setShowQRCodes(true);
            })
            .catch(error => {
                console.error("Error during payment:", error.response ? error.response.data : error.message);
            });
    };

    // Payment Confirmation funcion
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
                    setShowQRCodes(true);

                    setTimeout(() => {
                        setPrintReady(true);
                    }, 1000);

                    setTimeout(() => {
                        setShowQRCodes(false);
                        setPrintReady(false);
                    }, 5000);

                    // Reset selected values
                    setTickets([]);
                    setSelectedTicketCategories({});
                    setSelectedNationalityId("");
                    setSelectedGuideId("");
                    setSelectedBoatId("");
                    setSelectedNationality("");
                    setSelectedGuideName("");
                    setSelectedBoatName("");
                }
            });
        }
    };

    useEffect(() => {
        if (printReady) {
            window.print();
        }
    }, [printReady]);


    // fetch active tour guide 
    const fetchGuides = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${TOURGUIDE_ACTIVE}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
            );
            setGuides(response.data);
        } catch (error) {
            console.error("There was an error fetching the guides!", error);
        }
    };

    // fecth boats 
    const fetchBoats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${CRUISE_ACTIVE}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setBoats(response.data);
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
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${baseURL}/${CRUISES_CREATE}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
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
            const token = localStorage.getItem('token');
            await axios.post(`${baseURL}/${TOURGUIDE_CREATE}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
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
    // const nationalityTranslations = {
    //     "Egyptian": "مصري",
    //     "Saudi": "سعودي",
    //     "Kuwaiti": "كويتي",
    //     "Emirati": "إماراتي",
    //     "Qatari": "قطري",
    //     "Bahraini": "بحريني",
    //     "Omani": "عماني",
    //     "Jordanian": "أردني",
    //     "Lebanese": "لبناني",
    //     "Syrian": "سوري",
    //     "British": "بريطاني",
    //     "American": "أمريكي",
    //     "Canadian": "كندي",
    //     "Australian": "أسترالي"
    // };

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
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/${TICKETS_ACTIVE}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
                );
                setTicketCategories(response.data);
            } catch (error) {
                Swal.fire({
                    text: "حدث خطأ أثناء جلب التذاكر. يرجى المحاولة مرة أخرى لاحقًا.",
                    icon: "error",
                    confirmButtonText: "حسنًا",
                    customClass: {
                        popup: 'small-swal',
                        confirmButton: 'custom-confirm-button'
                    }
                });
                console.error("Error fetching daily reports:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
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
                                    <NationalitySelect
                                        nationalities={nationalities}
                                        selectedNationalityId={selectedNationalityId}
                                        setSelectedNationalityId={setSelectedNationalityId}
                                        setSelectedNationality={setSelectedNationality}
                                        errors={errors}
                                    />

                                    <div className="d-flex align-items-center select-box px-3 ">
                                        {/* fetch tour guide  */}
                                        <GuideSelect
                                            guides={guides}
                                            selectedGuideId={selectedGuideId}
                                            setSelectedGuideId={setSelectedGuideId}
                                            setSelectedGuideName={setSelectedGuideName}
                                            setAddGuide={setAddGuide}
                                            errors={errors}
                                        />

                                        {/* fetch boats */}
                                        <BoatSelect
                                            boats={boats}
                                            selectedBoatId={selectedBoatId}
                                            setSelectedBoatId={setSelectedBoatId}
                                            setSelectedBoatName={setSelectedBoatName}
                                            setAddBoat={setAddBoat}
                                            errors={errors}
                                        />
                                    </div>
                                </div>

                                {/* fetch tickets  */}
                                <TicketList
                                    filteredTickets={filteredTickets}
                                    loading={loading}
                                    handleAddTicket={handleAddTicket}
                                    selectedTicketCategories={selectedTicketCategories}
                                    errors={errors}
                                />

                                {/* TicketTable  */}
                                <TicketTable
                                    tickets={tickets}
                                    handleIncreaseTicketCount={handleIncreaseTicketCount}
                                    handleDecreaseTicketCount={handleDecreaseTicketCount}
                                    handleDeleteTicket={handleDeleteTicket}
                                    total={total}
                                    handlePaymentConfirmation={handlePaymentConfirmation}
                                    showError={showError}
                                    handleCloseError={handleCloseError}
                                />

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

            {/* Qr Code dialog  */}
            <Dialog open={showQRCodes} onClose={() => setShowQRCodes(false)} fullWidth style={{ direction: "rtl" }}>
                <DialogContent>
                    {qrCodeData && qrCodeData.map((ticket, index) => (
                        <div key={index} style={{ textAlign: "center", margin: "10px 0" }}>
                            {ticket.serialNumbers.map((serialInfo, i) => {
                                const qrValue = `
Serial Number : ${serialInfo.serialNumber}
Ticket Title : ${serialInfo.ticketTitle}
Boat Name : ${selectedBoatName} 
TourGuide Name : ${serialInfo.tourGuide}
Nationality : ${serialInfo.nationality}
Price : ${serialInfo.price} $
Created At : ${serialInfo.createdAt}
`;
                                const encodedQRValue = utf8.encode(qrValue);

                                return (
                                    <div key={i} className='qr-box' style={{ marginBottom: '20px', border: '1px solid black', padding: '20px' }}>
                                        <div>
                                            <QRCode value={encodedQRValue} className='qr-size' />
                                        </div>
                                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                            <Typography variant="subtitle1">Serial Number : {serialInfo.serialNumber}</Typography>
                                            <Typography variant="subtitle1">Ticket Title : {serialInfo.ticketTitle}</Typography>
                                            <Typography variant="subtitle1">Boat Name : {selectedBoatName}</Typography>
                                            <Typography variant="subtitle1">Tourguide Name : {serialInfo.tourGuide}</Typography>
                                            <Typography variant="subtitle1">Nationality : {serialInfo.nationality}</Typography>
                                            <Typography variant="subtitle1">Price : {serialInfo.price} $</Typography>
                                            <Typography variant="subtitle1">Created At : {serialInfo.createdAt}</Typography>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </DialogContent>

                <DialogActions className='hide-on-print'>
                    <Button onClick={() => setShowQRCodes(false)}>إغلاق</Button>
                </DialogActions>
            </Dialog>

        </div >
    );
}

export default PayingOff;
