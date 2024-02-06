import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { PersonOutlineOutlined, NotificationsActiveOutlined, LensBlurRounded } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MaintPersonnel, { Assigee, DashCard, DriverCard, MaintAnalyticsCard, ServiceChartCard, ActiveDriverCard } from 'components/role-card';
import Table, { CustomizedTables, ReactVirtualizedTable } from 'components/table';
import { IoSearch } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WorkModal from 'components/modal';
import SideBar from 'components/side-bar';
import MenuBar from 'components/menu-bar';

const Workbay = ()=>{
    const navigate = useNavigate()
    const [vehiclePresent, setVehiclePresent] = useState(true)

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('userInfo'))
        console.log(1)
        if(user === null){
            navigate('/login')
        }else{
            console.log(2)
            let vehicle;
            if (user.loggedInUser.role !== 'driver'){
                vehicle = user.loggedInUser.vehicle
                console.log(2)
                if (vehicle === null || vehicle === undefined){
                    console.log(3)
                    console.log('No vehicle is assigned to you yet')
                    setOpenAlert(true); setAlertMsg("No vehicle is assiged to you yet"); setAlertSeverity('primary'); setVehiclePresent(false)
                }else{
                    console.log(4)
                    setVehiclePresent(true)
                }
            }
            else if (user.loggedInUser.role === 'driver'){
                let owner = user.vehicle_assignee
                vehicle = owner.vehicle
                if (vehicle === null || vehicle === undefined){
                    console.log('No vehicle is assigned to you yet')
                    setOpenAlert(true); setAlertMsg("No vehicle is assiged to you yet"); setAlertSeverity('primary'); setVehiclePresent(false)
                }else{
                    setVehiclePresent(true)
                }
            }
        }
    }, [])

    const handleWorkbay = (e)=>{
        setText(e.target.value)
    }


    return (
        <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>
            <SideBar />
            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{ overflowY:'auto', height: '100vh'}} >
                <Box sx={{width: '100%', height: 'auto'}}>
                {/* right top section */}
                <MenuBar />
                {/* right bottom section */}
                {vehiclePresent? <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >
                    <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: '2rem' }} >
                            <Typography variant='h2' sx={{fontWeight: '600'}}>Workbay</Typography>
                            <WorkModal />
                        </Box>
                        <Box  sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',justifyContent: 'space-between',width: '100%'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}>
                                    <Box sx={{position: 'absolute', p: '.2rem', height: '100%', left: '.15rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><IoSearch size={'1.5rem'} /></Box>
                                    <input className='input  search-input' name = 'serch-text' value={text} placeholder='Search for maint. logs' onChange={(e)=> handleWorkbay(e) }type="text" style={{width: '23rem', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray', paddingLeft: '2.5rem'}}/>   
                                </Box>
                                
                            </Box>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', height: '100%', alignItems: 'center' }}>
                                <input className='input' onChange={(e)=> console.log(e.target.value)} type="date" name="" id="" style={{height: '2.5rem', width: '11rem', outline: 'none', padding: '0 .75rem', fontSize: '1rem'}} />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        {/* the table */}
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden'}}>
                            <CustomizedTables />
                        </Box> 
                    </Box>
                </Grid> :

                <Grid sx={{height: 'calc(100vh - 3.5rem)', mt: '-.5rem'}} > 
                    <Typography variant='h3' fontWeight={'500'}>
                        hmm
                    </Typography>
                </Grid>
                
                }
                </Box>
            </Grid> 
            <AlertMessage />
        </Grid>
    )
}

export default Workbay