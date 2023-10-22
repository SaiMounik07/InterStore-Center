import { useState } from "react";
import ErrorPopup from "../popups/errorPopup";
import AuthService from "../../auth/auth-service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(){

const[name,setName]=useState('');
const[gender,setGender]=useState('');
const[age,setAge]=useState('');
const[email,setEmail]=useState('');
const[password,setpassword]=useState('');
const[confirmPassword,setConfirmPassword]=useState('');
const[mobile,setMobile]=useState('');
const[role,setRole]=useState('');
const [errorMessage,setErrorMessage]=useState();
const[showErrorPopup,setShowErrorPopup]=useState(false);

const history = useNavigate();

const showErrorPopups=()=>{
    setShowErrorPopup(true);
    }
const closeErrorPopup=()=>{
        setShowErrorPopup(false);
    }

const handleRegister=async()=>{
    if(!(password===confirmPassword))
    {
        setShowErrorPopup(true);
        setErrorMessage("password mismatch")
    }
    try{
        const response=await axios.post(AuthService.getBaseUrl()+"/member/addMember",{
            name:name,
            gender:gender,
            age:parseInt(age),
            email:email,
            password:password,
            confirmPassword:confirmPassword,
            mobileNumber:mobile,
            role:role
        });
        if(response.data.error==="user already exists"){
            setErrorMessage(true);
            setErrorMessage("user already exists")
        }
        if(response.data.code===200){
            localStorage.setItem("email",email);
            history("/verify");
        }
        if(response.data.code===400){
            setShowErrorPopup(true);
            setErrorMessage("user already exists");
        }
        }catch(error){
            setShowErrorPopup(true);
            setErrorMessage("System error");
        }

}
    return(
    <div>
       <form className="popup-inner" onSubmit={handleRegister} >
        <h3 className='header'>Register</h3><br></br>
        <div className="container">
            Name:<input type='text'
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="short-input"
            required
            />
            Age:<input type='text'
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
            className="short-input"
            required
            />
            Password:<input type='password'
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            className="short-input"
            required
            />
            ConfirmPassword:<input type='password'
            placeholder="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="short-input"
            required
            />
            Email:
            <input type='email'
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="short-input"
            required
            />
            Mobile Number:
            <input type='text'
            placeholder="MobileNumber"
            onChange={(e) => setMobile(e.target.value)}
            className="short-input"
            required
            />
            Gender:
            <label>
            <input
            type="radio"
            name="gender"
            value="MALE"
            checked={gender === "MALE"}
            onChange={(e) => setGender(e.target.value)}
            />
            Male
            </label>
            <label>
            <input
            type="radio"
            name="gender"
            value="FEMALE"
            checked={gender === "FEMALE"}
            onChange={(e) => setGender(e.target.value)}
            />
            Female
            </label>
            <label>
            <input
            type="radio"
            name="gender"
            value="OTHERS"
            checked={gender === "OTHERS"}
            onChange={(e) => setGender(e.target.value)}
            />
            Others
            </label>
            Role:
            <label>
            <input
            type="radio"
            name="Role"
            value="USER"
            checked={role === "USER"}
            onChange={(e) => setRole(e.target.value)}
            />
            USER
            </label>
            <label>
            <input
            type="radio"
            name="Role"
            value="ADMIN"
            checked={role === "ADMIN"}
            onChange={(e) => setRole(e.target.value)}
            />
            ADMIN
            </label>
            <label>
            <input
            type="radio"
            name="Role"
            value="SUPERADMIN"
            checked={role === "SUPERADMIN"}
            onChange={(e) => setRole(e.target.value)}
            />
            SUPERADMIN
            </label>
            <input className='submitBt' type="submit" value='Submit'/ >
        </div>
       </form>
       {
        showErrorPopup&&(
            <ErrorPopup isVisible={showErrorPopups} onClose={closeErrorPopup} name={errorMessage}/>
        )
       }
    </div>
    );
    
}
export default Register;