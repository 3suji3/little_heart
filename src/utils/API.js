import axios from "axios";

const Server = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? "https://little-heart-sujis-projects-07c6a1ca.vercel.app/"  
        : "http://localhost:9999"    
});

export default Server;