/*import { useRouter } from 'next/router'; */
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



function Login() {
    /* const router = useRouter(); */ 

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Laukas privalomas'),
        password: Yup.string().required('Laukas privalomas')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

     function onSubmit({ username, password }) {
        /*return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            /*.catch(alertService.error); */
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
                            <input name="username" type="text" placeholder='Vartotojo vardas' {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
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