import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector} from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from './Login.module.scss';

export const Registration = () => {
  
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {register, handleSubmit, setError, formState:{errors, isValid}} = useForm({
      defaultValues: {
        fullName:'Валерий Флоря',
        email: "wessertv@gmail.com",
        password: "qwerty12345",
      },
      mode: "onChange",
    });

    const onSubmit = (values) => {
      dispatch(fetchRegister(values));
    };
  
    if (isAuth) {
      return <Navigate to="/" replace />;
    }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField         
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", {required: 'Укажите имя'})}
          className={styles.field} label="Полное имя" 
          fullWidth 
          />
        <TextField        
          error={Boolean(errors.email?.message)}
          type="email"
          helperText={errors.email?.message}
          {...register("email", {required: 'Укажите почту'})}
          className={styles.field} label="E-Mail" 
          fullWidth />
        <TextField         
          error={Boolean(errors.password?.message)}
          type="password"
          helperText={errors.password?.message}
          {...register("password", {required: 'Укажите пароль'})}
          className={styles.field} label="Пароль" 
          fullWidth 
          />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
