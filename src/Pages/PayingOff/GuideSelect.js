import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const GuideSelect = ({ guides, selectedGuideId, setSelectedGuideId, setSelectedGuideName, setAddGuide, errors }) => {
    return (
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
    );
};

export default GuideSelect;
