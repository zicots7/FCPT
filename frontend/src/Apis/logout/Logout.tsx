
const Logout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("user");

};
export default Logout;