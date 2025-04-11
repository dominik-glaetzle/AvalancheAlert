import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import RegionDropdown from './RegionDropdown.tsx';
import { AvalancheReport } from '../DTO/AvalancheReportDTO.ts';
import { AvalancheReportAPI } from '../utilities/avalancheReportAPI.ts';
import { createUser } from '../appwrite.ts';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { User } from '../DTO/UserDTO.ts';
import { useNavigate } from 'react-router-dom';

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
    const [mode, setMode] = useState<'signup' | 'login'>('signup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const navigate = useNavigate();

    const [successMessageOpen, setSuccessMessageOpen] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        firstname: '',
        lastname: '',
        password: '',
    });

    const [reports, setReports] = useState<AvalancheReport[]>([]);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [filteredReports, setFilteredReports] = useState<AvalancheReport[]>([]); // construct email from those
    console.log(filteredReports);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await AvalancheReportAPI.fetchLatestAvalancheReportsFromAustria();
                setReports(data);
            } catch (error) {
                console.error('Error fetching avalanche data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = reports.filter((report) =>
            report.regions.some((region) => selectedRegions.includes(region.regionID))
        );
        setFilteredReports(filtered);
    }, [selectedRegions, reports]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateInputs()) return;

        if (mode === 'signup') {
            const user = new User({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone: phone,
                regions: selectedRegions,
            });
            createUser(user)
                .then(() => setSuccessMessageOpen(true))
                .catch((error) => console.error('Error saving subscription:', error));
        } else {
            navigate('/dashboard');
        }
    };

    const validateInputs = () => {
        const newErrors: typeof errors = { email: '', phone: '', firstname: '', lastname: '', password: '' };
        let isValid = true;

        if (!email) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid.';
            isValid = false;
        }

        if (mode === 'signup') {
            if (!phone || !/^\+?[0-9\s\-()]{7,15}$/.test(phone)) {
                newErrors.phone = 'Phone number is invalid.';
                isValid = false;
            }

            if (firstname.trim().length < 2) {
                newErrors.firstname = 'Please enter a valid firstname.';
                isValid = false;
            }

            if (lastname.trim().length < 2) {
                newErrors.lastname = 'Please enter a valid lastname.';
                isValid = false;
            }

            if (password.trim().length < 6) {
                newErrors.password = 'Password must be at least 6 characters.';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <>
            <Card variant="outlined">
                <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                    Avalanche Alert
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
                >
                    {mode === 'signup' && (
                        <>
                            <FormControl>
                                <TextField
                                    error={!!errors.firstname}
                                    helperText={errors.firstname}
                                    id="firstname"
                                    name="firstname"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    placeholder="Firstname"
                                    autoComplete="given-name"
                                    required
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    error={!!errors.lastname}
                                    helperText={errors.lastname}
                                    id="lastname"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    placeholder="Lastname"
                                    autoComplete="family-name"
                                    required
                                    variant="outlined"
                                />
                            </FormControl>
                            <RegionDropdown reports={reports} onSelectionChange={setSelectedRegions} />
                            <FormControl>
                                <FormLabel htmlFor="telephone">Phone</FormLabel>
                                <TextField
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    name="telephone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+43-123-456"
                                    type="telephone"
                                    id="telephone"
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Create Password</FormLabel>
                                <TextField
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                        </>
                    )}

                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            error={!!errors.email}
                            helperText={errors.email}
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            autoComplete="email"
                            required
                            fullWidth
                            variant="outlined"
                        />
                    </FormControl>
                    {mode === 'login' && (
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                    )}

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button type="submit" fullWidth variant="contained">
                            {mode === 'signup' ? 'Sign Up  🏂' : 'Login 🏂'}
                        </Button>
                        <Button fullWidth onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
                            {mode === 'signup' ? 'Already registered?' : 'Need an account?'}
                        </Button>
                    </Box>
                </Box>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={successMessageOpen}
                autoHideDuration={2000}
                onClose={() => setSuccessMessageOpen(false)}
            >
                <Alert severity="info" sx={{ width: '100%' }}>
                    Successfully subscribed!
                </Alert>
            </Snackbar>
        </>
    );
}
