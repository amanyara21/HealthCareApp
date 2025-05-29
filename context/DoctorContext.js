import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
    const { user, userToken } = useContext(AuthContext);
    const [hasDetails, setHasDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                if (user?.role === 'DOCTOR') {
                    console.log(`${process.env.API_URL}/doctor/get-doctor-detail`)
                    console.log(`${process.env.API_URL}/doctor/get-doctor-detail`)
                    const response = await axios.get(`${process.env.API_URL}/doctor/get-doctor-detail`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    });
                    if (response.data) {
                        setHasDetails(true);
                    } else {
                        setHasDetails(false);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.log('Doctor detail check error:', error.response?.data?.message);
                setHasDetails(false);
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [userToken]);

    return (
        <DoctorContext.Provider value={{ hasDetails, loading, setHasDetails }}>
            {children}
        </DoctorContext.Provider>
    );
};
