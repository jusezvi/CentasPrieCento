import { useNavigate } from "react-router-dom";

function InputRender(prop) {
    return (
        <input type={prop.type} value={prop.value} placeholder={prop.placeholder}></input>

    )
}

function TitleLoginRender() {
    return(<h1> Login to Centas Prie Cento! </h1>);
}

function DoNotHaveAcc() {
    const navigate = useNavigate();
    return (<>
    Do not have Account? Please <button className="btn btn-primary" onClick={()=> navigate("/register")}>Register</button>
    </>
    );
}

function LoginHtmlRender() {
    return (
        <>  
        <TitleLoginRender></TitleLoginRender>
            <form>
                <InputRender type="text" value="" placeholder="Email"></InputRender> <br></br>
                <InputRender type="password" value="" placeholder="Password"></InputRender> <br></br>
                <InputRender type="submit" value="Login"></InputRender>
            </form> 
        <DoNotHaveAcc></DoNotHaveAcc>
        </>
    )
}

export default LoginHtmlRender;