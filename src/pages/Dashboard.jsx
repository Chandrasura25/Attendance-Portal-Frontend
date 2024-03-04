import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';

function Dashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false); // Update loading state on
        }
    };
    fetchData();
}, [navigate]);

if (loading) {
  return <div>Loading...</div>;
}

return (
    <div className="body">
        <h1>Welcome to Dashboard</h1>
        {/* Render user data */}
    </div>
);
}

export default Dashboard;