import { useState } from "react";
import LoaderIcon from "react-loader-icon";
import AuthService from "../../auth/auth-service";
import ErrorPopup from "../popups/errorPopup";
import { Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verify(){
    const history = useNavigate();

    const[otp,setOtp]=useState('');
    const[load,isLoad]=useState(false);
    const[showErrorPopup,setShowErrorPopup]=useState(false);
    const[errorMessage,setErrorMessage]=useState('');
    const showErrorPopups=()=>{
        setShowErrorPopup(true);
        }
    const closeErrorPopup=()=>{
            setShowErrorPopup(false);
        }
    const submitOTP=async()=>{
        try{
            isLoad(true);
            const response=await axios.post(AuthService.getBaseUrl()+"/member/verify",{
                email:localStorage.getItem("email"),
                otp:otp
            });
                    if(!!response.data){
                        isLoad(false);
                    }
                if(response.data.value==="otp time expired"){
                    setShowErrorPopup(true);
                    setErrorMessage("otp time expired");
                }else if(response.data.value==="entered otp is not correct"){
                    setShowErrorPopup(true);
                    setErrorMessage("entered otp is not correct");
                }else if(!(response.data.code===200)){
                    setShowErrorPopup(true);
                    setErrorMessage("some exception");
                }
                if(response.data.code===200){
                    history("/login");
                    localStorage.clear();
                }

        }catch(error){
            setShowErrorPopup(true);
            setErrorMessage("some exception");
        }
    }
    const sendOtp=async()=>{
        try{
            isLoad(true);
            const response=await axios.get(AuthService.getBaseUrl()+"/member/resend",{
                headers:{
                    email:localStorage.getItem("email")
                }
            });
            if(response.data){
                isLoad(false);
            }
            if(response.data.code===200){
                setShowErrorPopup(true);
                setErrorMessage("otp sent successfully!");
            }

        }catch(error){
        setShowErrorPopup(true);
        setErrorMessage("some exception");
        }
    }
return(
<div>
   <form className="verify_section" onSubmit={submitOTP}>
   <h3 className='header'>Verify OTP</h3><br></br>
    <div className="otp-class">
    Enter OTP:
    </div>
    <div className="otp">
    <input type='text'
            placeholder="otp"
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
            required
            />
    <input className='submitBt' type="submit" value='Submit'/ ><br></br>
        {
            load&&(<LoaderIcon color={"red"} />)
        }
        <div className="resend-otp">
        <Button className="submitB" value="Send" onClick={sendOtp}>Resend otp</Button>
        </div>
    </div>
    {
        showErrorPopup&&(
            <ErrorPopup isVisible={showErrorPopups} onClose={closeErrorPopup} name={errorMessage}/>
        )
       }
   </form>
</div>
);
}
export default Verify;