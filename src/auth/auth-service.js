import axios from "axios";

const login=(email,password)=>{
    return axios
    .post(getBaseUrl()+"/member/login", {
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
const getBaseUrl=()=>{
  return "https://valid-tail-production.up.railway.app";
}

const AuthService={
login,
getCurrentUser,
getToken,
token,
getBaseUrl
};
export default AuthService;