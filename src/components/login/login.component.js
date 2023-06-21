import clsx from 'clsx';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Register from './register.component';

function login() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [logInMessage, setLogInMessage] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [letSignIn, setLetSignIn] = useState(false);
    function handleSubmit() {
        if (email == '' || password == '') {
            setLogInMessage('Tài khoản và mật khẩu không được để trống !!!');
        } else {
            setLogInMessage('');
            fetch('https://todo-list-api-xi.vercel.app/userinfor')
                .then(function (response) {
                    return response.json();
                })
                .then(function (userInfor) {
                    for (var i = 0; i < userInfor.length; i++) {
                        if (email == userInfor[i].email) {
                            if (userInfor[i].password !== password) {
                                setLogInMessage('Sai mật khẩu, vui lòng thử lại');
                            } else {
                                localStorage.setItem('userMail', email);
                                window.location.href = '/home';
                            }
                        }
                    }
                });
        }
    }
    return (
        <div>
            <section class="vh-100" style={{ backgroundColor: '#eee' }}>
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black" style={{ borderRadius: 25 }}>
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p class="text-center h1 fw-bold mb-5 mt-4">Đăng nhập</p>
                                            <form class="mx-1 mx-md-4">
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example3c">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="form3Example3c"
                                                            class="form-control"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example4c">
                                                            Mật khẩu
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="form3Example4c"
                                                            class="form-control"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="form-check d-flex justify-content-center mb-5">
                                                    <label class="form-check-label" for="form2Example3">
                                                        Bạn chưa có tài khoản ? <Link to={'/register'}>Đăng ký</Link>
                                                    </label>
                                                </div>
                                                <div class="d-flex justify-content-center mx-4 mb-lg-4">
                                                    <button
                                                        type="button"
                                                        class="btn btn-primary btn-lg"
                                                        onClick={handleSubmit}
                                                    >
                                                        Đăng nhập
                                                    </button>
                                                </div>
                                                <label style={{ paddingLeft: '17px' }} className="text-danger">
                                                    {logInMessage}
                                                </label>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default login;
