import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import RegionDropdown from './RegionDropdown.tsx';
import { AvalancheReport } from '../DTO/AvalancheReportDTO.ts';
import { AvalancheReportAPI } from '../utilities/avalancheReportAPI.ts';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export default function SignInCard() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [reports, setReports] = useState<AvalancheReport[]>([]);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [filteredReports, setFilteredReports] = useState<AvalancheReport[]>([]);

    const handleRegionChange = (selected: string[]) => {
        setSelectedRegions(selected);
    };

    const getSelectedReports = (regions: string[]): AvalancheReport[] => {
        return reports.filter((report: AvalancheReport) =>
            report.regions.some((region) => regions.some((selectedRegion) => selectedRegion === region.regionID))
        );
    };
    // fehler nicht in region dropdown und wird auch richtig im state gesetzt??

    // get complete avalanche data from api and store it
    useEffect(() => {
        const fetchAvalancheDataForAustria = async () => {
            try {
                const avalancheData = await AvalancheReportAPI.fetchLatestAvalancheReportsFromAustria();
                setReports(avalancheData);
            } catch (error: any) {
                console.error('Error fetching avalanche data:', error);
            }
        };
        fetchAvalancheDataForAustria();
    }, []);

    console.log(filteredReports); // send those to the backend :))

    // get only the reports from the selected regions and store it
    useEffect(() => {
        const selectedReports = getSelectedReports(selectedRegions);
        setFilteredReports(selectedReports);
    }, [selectedRegions, reports]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (emailError || phoneError) {
            event.preventDefault();
            return;
        }
    };

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const telephone = document.getElementById('telephone') as HTMLInputElement;

        let isValid = true;

        const emailRegex = /\S+@\S+\.\S+/;
        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

        const emailValue = email.value.trim();
        const phoneValue = telephone.value.trim();

        if (emailValue === '' && phoneValue === '') {
            setEmailError(true);
            setEmailErrorMessage('Please enter either an email or a phone number.');
            setPhoneError(true);
            setPhoneErrorMessage('Please enter either an email or a phone number.');
            isValid = false;
        } else {
            if (emailValue !== '') {
                if (!emailRegex.test(emailValue)) {
                    setEmailError(true);
                    setEmailErrorMessage('Please enter a valid email address.');
                    isValid = false;
                } else {
                    setEmailError(false);
                    setEmailErrorMessage('');
                }
            } else {
                setEmailError(false);
                setEmailErrorMessage('');
            }

            if (phoneValue !== '') {
                if (!phoneRegex.test(phoneValue)) {
                    setPhoneError(true);
                    setPhoneErrorMessage('Please enter a valid phone number.');
                    isValid = false;
                } else {
                    setPhoneError(false);
                    setPhoneErrorMessage('');
                }
            } else {
                setPhoneError(false);
                setPhoneErrorMessage('');
            }
        }
        return isValid;
    };

    return (
        <Card variant="outlined">
            <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                Sign Up
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >
                <RegionDropdown reports={reports} onSelectionChange={handleRegionChange} />
                <Divider>Enter Mail and/or Phone </Divider>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="telephone">Phone</FormLabel>
                    <TextField
                        error={phoneError}
                        helperText={phoneErrorMessage}
                        name="telephone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+43-123-456"
                        type="telephone"
                        id="telephone"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={phoneError ? 'error' : 'primary'}
                    />
                </FormControl>
                <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
                    Sign Up for Avalanche News! 🏂
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>put some cool stuff in here</Box>
        </Card>
    );
}
