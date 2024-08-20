import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const BoatSelect = ({ boats, selectedBoatId, setSelectedBoatId, setSelectedBoatName, setAddBoat, errors }) => {
    return (
        <div className='w-100'>
            <div className='d-flex justify-content-between align-items-center'>
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
    );
};

export default BoatSelect;
