import axios from "axios";

const Server = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? "https://littleheart-production-6695.up.railway.app"  
        : "http://localhost:9999"    
});

export default Server;