/*import { useRouter } from 'next/router'; */
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



function Login() {

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Laukas privalomas'),
        password: Yup.string().required('Laukas privalomas')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const  navigate = useNavigate();

    function onSubmit(data) {
        call(data);
        // console.log(call(data.message));
        return false;
    }
    function responecheck(err) {
        if (err !="undefined") {
            navigate("/")}
        else {
            alert(err)
        }
    }

    function call(data){
        const serverdata = {
          email: data.email,
          password: data.password
        }

        let result =  fetch ('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(serverdata)
        })
        .then(res => res.json())
            .then(data => responecheck(data.message))
            .catch((err) => {
            console.log(err)
        })
        /* return result; */
    }
    





    function TittleLoginRender() {
        return (<h1> Prisijunk į Centas Prie Cento!</h1>);
    }
    function DoNotHaveAcc() {
        const navigate = useNavigate();
        return (
            <>
                Neturite paskyros? <button className="btn btn-primary" onClick={() => navigate("/register")}>Registruotis</button>
            </>
        );
    }

    return (
       <>
        <TittleLoginRender></TittleLoginRender>
            <div className="card m-3 col-lg-4 col-lg-offset-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input name="email" type="text" placeholder='El. Paštas' {...register('email')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <input name="password" type="password" placeholder='Slaptažodis' {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Prisijungti
                        </button>
                    </form>
                </div>
            </div>
        <DoNotHaveAcc></DoNotHaveAcc>
        </>
    );
}

export default Login;