import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.API_URL;

  
  const getUser = async()=>{
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/getuser`, {
        headers:{
          Authorization:`Bearer ${userToken}`
        }
      });
      if(response.status==200){
        setUser(response.data);
      }
    } catch (error) {
      
    }
    setLoading(false);
  }


  useEffect(()=>{
    if(userToken!=null){
      getUser();
    }
  },[userToken]);
  
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) setUserToken(token);
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, user, setUserToken, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
