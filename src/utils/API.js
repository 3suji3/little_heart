import axios from "axios";

const Server = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? "YOUR_RENDER_URL_HERE"  // Render 배포 후 여기에 URL 입력
        : "http://localhost:9999"    
});

export default Server;