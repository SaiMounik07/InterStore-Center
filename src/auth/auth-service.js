import axios from "axios";

const login=(email,password)=>{
    return axios
    .post("http://localhost:8080/member/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.value.token) {
            try {
                localStorage.setItem("user", JSON.stringify(response));
                localStorage.setItem("token",JSON.stringify(response.data.value.token))
                localStorage.setItem("role",JSON.stringify(response.data.value.role));
              } catch (error) {
                if (error instanceof DOMException && error.name === "QuotaExceededError") {
                  console.error("LocalStorage quota exceeded.");
                } else {
                  console.error("Error storing data in localStorage:", error);
                }
            
        }
    }
        return response.data;
    });
};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
const token=()=>{
    return JSON.parse(localStorage.getItem("token"));
}
const getToken=()=>{
    const token= JSON.parse(localStorage.getItem("token"));
    if (token) {
        return { 
            Authorization: `Bearer ${token}`
            };
    }
}


const AuthService={
login,
getCurrentUser,
getToken,
token,
};
export default AuthService;