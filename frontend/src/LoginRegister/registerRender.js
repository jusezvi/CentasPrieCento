import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


function Registration() {
  
  const validationSchema = Yup.object().shape({
      username: Yup.string()
        .required('Laukas privalomas')
        .min(4, 'Vartojo vardas privalo sudaryti bet 4 simboliai'),
    
      email: Yup.string()
        .required('Laukas privalomas')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Neteisingas El. Paštas'),
      password: Yup.string()
        .required('Laukas privalomas')
        .min(4, 'Slaptažodi privalo sudaryti bent 4 simboliai'),
      confirmPassword: Yup.string()
        .required('Laukas privalomas')
        .oneOf([Yup.ref('password')], 'Slaptažodžiai nesutampa'),
    });
  
  
  const formOptions = { resolver: yupResolver(validationSchema) };
  
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  
  function onSubmit(data) {
    alert('Sveikinu prisiregistravus prie Centas Prie Cento');
    console.log(data);
    return false;
  }
  
  //const onSubmit = data => console.log(data);
    //console.log(errors);
    
  
  
  
  
    function TitleRegisterRender() {
        return (<h1> Registruokis į Centas Prie Cento!</h1>);
    }
    function AlreadyHaveAcc() {
        const navigate = useNavigate();
        return (
            <>
                Turite paskyrą? <button className="btn btn-primary" onClick={() => navigate("/login")}>Prisijungti</button>
            </>
        );
    }
  

    return (
        <>
            <TitleRegisterRender></TitleRegisterRender><br></br>
              <div className="card m-3 col-lg-4 col-lg-offset-4">
                <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col">
                      
                      <input name="username" type="text" placeholder="Vartotojo vardas"  {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    
                    <div className="form-group col">
                      <input name="email" type="email" placeholder="El. Paštas"  {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    
                    <div className="form-group col">
                      <input name="password" type="password" placeholder="Slaptažodis"  {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    
                    <div className="form-group col">
                      <input name="confirmPassword" type="password" placeholder="Slaptažodžio patvirtinimas" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                </div>
                  
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary mr-1">Registruotis</button>
                        
                    </div>
                </form>
            </div>
        </div>
            
        <AlreadyHaveAcc></AlreadyHaveAcc>
        </>
    )

}

export default Registration;