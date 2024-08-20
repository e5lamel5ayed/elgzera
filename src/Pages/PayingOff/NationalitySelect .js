import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const NationalitySelect = ({ nationalities, selectedNationalityId, setSelectedNationalityId, setSelectedNationality, errors }) => {
    return (
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
                        {nationality.name}
                    </MenuItem>
                ))}
            </Select>
            {errors.nationality && <div className="error-log">{errors.nationality}</div>}
        </div>
    );
};

export default NationalitySelect;
