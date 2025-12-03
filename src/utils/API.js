import axios from "axios";

const Server = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? "https://littleheartbackend-production.up.railway.app"  
        : "http://localhost:9999"    
});

export default Server;