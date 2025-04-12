import { Avatar, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext.tsx';

function Sidebar() {
    const { user } = useAuth();

    return (
        <Card
            sx={{ backgroundColor: '#D3D3D3' }}
            variant="outlined"
            className="bg-green-500 w-80 h-175 mt-5 ml-5 p-4 shadow"
        >
            <div className="flex justify-center mb-4">
                <Card
                    variant="outlined"
                    sx={{ backgroundColor: '#B0B0B0' }}
                    className="w-72 h-[120px] flex flex-col items-center justify-center mb-6"
                >
                    <Avatar src="https://i.pravatar.cc/100" alt="A" sx={{ width: 56, height: 56 }} className="mb-2" />
                    <Typography variant="h6" className="text-black">
                        {user.name}
                    </Typography>
                </Card>
            </div>
            <ul className="flex flex-col gap-2">
                <li className="hover:text-blue-500 cursor-pointer">Home</li>
                <li className="hover:text-blue-500 cursor-pointer">Users</li>
                <li className="hover:text-blue-500 cursor-pointer">Products</li>
                <li className="hover:text-blue-500 cursor-pointer">Reports</li>
            </ul>
        </Card>
    );
}

export default Sidebar;
