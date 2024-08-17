import { Box } from '@mui/material'
import Drawer from '../../Components/Drawer';
import DailyReport from './DailyReport';
import TotalDailyReport from './TotalDailyReport';

const ReportList = () => {
    return (
        <div>
            <Drawer />
            <div className='box-container'>
                <Box>
                    <div>
                        {/* day reports  */}
                        <DailyReport />

                        {/* all day reports  */}
                        <TotalDailyReport />
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default ReportList