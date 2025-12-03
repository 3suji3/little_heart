import axios from "axios";

const Server = axios.create({
    baseURL: "http://localhost:9999"    
});

export default Server;