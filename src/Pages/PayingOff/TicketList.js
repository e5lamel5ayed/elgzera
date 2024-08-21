import React from 'react';
import IconButton from '@mui/material/IconButton';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Loading } from '../../Components/Loading';

const TicketList = ({ filteredTickets, loading, handleAddTicket, selectedTicketCategories, errors }) => {
    return (
        <div className='col-md-8 pay-container mb-2 pt-3'>
            {/* fetch tickets  */}
            <h5 className='text-right'>التذاكر المتاحة في اليوم الحالي :</h5>

            <div className="ticket-box d-flex justify-content-center align-items-center flex-wrap">
                {loading ? (
                    <Loading />
                ) : (
                    Array.isArray(filteredTickets) && filteredTickets.length > 0 ? (
                        filteredTickets.map((ticket, index) => {
                            const isAdded = selectedTicketCategories[ticket.name];
                            return (
                                <div
                                    className={`my-1 ${isAdded ? 'ticket-disabled' : 'ticket-hover'}`}
                                    key={ticket.id}
                                    onClick={() => !isAdded && handleAddTicket(ticket)}
                                >
                                    <div className={`d-flex justify-content-center align-items-center ticket px-3 mx-1 ticket-color-${index % 10}`}>
                                        <IconButton
                                            variant="outlined"
                                            disabled={isAdded}
                                        >
                                            <ConfirmationNumberIcon
                                                sx={{
                                                    color: isAdded ? '#275b8898' : '#275a88',
                                                    fontSize: '40px',
                                                    transition: 'color 0.3s ease',
                                                }}
                                            />
                                        </IconButton>
                                        <span>{ticket.name}</span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        ''
                    )
                )}
            </div>
            {errors.tickets && <div className="error-log">{errors.tickets}</div>}
        </div>

    );
};

export default TicketList;
