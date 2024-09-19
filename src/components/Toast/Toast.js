import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const successNotify = (msg,time) =>toast.success(msg, {
    pposition: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

export const errorNotify = (msg,time)=>toast.error(msg, {
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });