import axios from "axios";

const Server = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? "YOUR_RENDER_URL_HERE"  
        : "http://localhost:9999"    
});

export default Server;