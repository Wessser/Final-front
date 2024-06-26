import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useSelector} from "react-redux";
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {  selectIsAuth, logout } from "../../redux/slices/auth";


export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?'))
    dispatch(logout());
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to ="/">
            <div>Qazaq News</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to ="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
