import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Links, Route, Routes } from 'react-router-dom';
import style from '../../scss/registerForm.module.scss';
function register() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userName, setUserName] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userMail, setUserMail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userPass, setUserPass] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [reUserPass, setReUserPass] = useState('');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [inputNameMessage, setInputNameMessage] = useState(' ');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [inputEmailMessage, setInputEmailMessage] = useState(' ');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [inputPassMessage, setInputPassMessage] = useState(' ');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [inputRePassMessage, setInputRePassMessage] = useState(' ');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [registerMessage, setRegisterMessage] = useState('');

    function handleOnChangeName(e) {
        setUserName(e.target.value);
        setRegisterMessage('');
        const inputName = document.getElementById('inputName');
        inputName.onblur = () => {
            if (!inputName.value) {
                setInputNameMessage('Tên của bạn không được để trống!!!');
            } else {
                setInputNameMessage('');
            }
        };
    }

    function handleOnChangeEmail(e) {
        setRegisterMessage('');
        var api = 'https://todo-list-api-xi.vercel.app/userinfor';
        fetch(api)
            .then((reponse) => reponse.json())
            .then((userInfor) => {
                for (var i = 0; i < userInfor.length; i++) {
                    if (userInfor[i].email == e.target.value) {
                        setInputEmailMessage('Email này đã được sử dụng, vui lòng đăng nhập');
                    }
                }
            });

        setUserMail(e.target.value);

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailFormat.test(e.target.value) == false) {
            setInputEmailMessage('Định dạng email chưa chính xác');
        } else {
            setInputEmailMessage('');
        }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    function handleOnChangePass(e) {
        setRegisterMessage('');
        setUserPass(e.target.value);

        const passRegex = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
        if (passRegex.test(e.target.value) == false) {
            setInputPassMessage('Mật khẩu từ 6 đến 20 ký tự,bao gồm ít nhất 1 chữ cái và 1 số');
        } else {
            setInputPassMessage('');
        }
    }

    function handleOnChangeRePass(e) {
        setReUserPass(e.target.value);
        var inputPassField = document.getElementById('inputPassField');
        var reinputPassField = document.getElementById('reinputPassField');

        if (inputPassField.value !== reinputPassField.value) {
            setInputRePassMessage('Mật khẩu không trùng khớp!!!');
        } else {
            setInputRePassMessage('');
        }
    }

    function handleSubmit(e) {
        if (inputNameMessage == '' && inputEmailMessage == '' && inputPassMessage == '' && inputRePassMessage == '') {
            e.preventDefault();
            const newUserInfor = {
                name: userName,
                email: userMail,
                password: userPass,
            };
            axios
                .post('https://todo-list-api-xi.vercel.app/userinfor/add', newUserInfor)
                .then((window.location.href = '/home'));
            setUserName('');
            setReUserPass('');
            setUserPass('');
            setUserMail('');
            localStorage.setItem('userMail', userMail);
        } else {
            setRegisterMessage('Vui lòng nhập đầy đủ các trường !!!');
        }
    }
    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng Ký</p>

                                            <form className="mx-1 mx-md-4" n onSubmit={handleSubmit}>
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example1c">
                                                            Tên của bạn
                                                        </label>
                                                        <input
                                                            value={userName}
                                                            type="text"
                                                            id="inputName"
                                                            className="form-control"
                                                            name="name"
                                                            onChange={handleOnChangeName}
                                                            placeholder="Ex : Nguyễn Văn A"
                                                        />
                                                        <label id="inputNameMessage" className={style.statusMessage}>
                                                            {inputNameMessage}
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example3c">
                                                            Email
                                                        </label>
                                                        <input
                                                            value={userMail}
                                                            type="email"
                                                            id="form3Example3c"
                                                            className="form-control"
                                                            name="email"
                                                            onChange={handleOnChangeEmail}
                                                            placeholder="Ex : 123@gmail.com"
                                                        />
                                                        <label id="inputEmailMessage" className={style.statusMessage}>
                                                            {inputEmailMessage}
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example4c">
                                                            Mật khẩu
                                                        </label>
                                                        <input
                                                            value={userPass}
                                                            type="password"
                                                            id="inputPassField"
                                                            className="form-control"
                                                            name="password"
                                                            onChange={handleOnChangePass}
                                                        />
                                                        <label className="text-danger">{inputPassMessage}</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example4cd">
                                                            Nhập lại mật khẩu
                                                        </label>
                                                        <input
                                                            value={reUserPass}
                                                            type="password"
                                                            id="reinputPassField"
                                                            className="form-control"
                                                            onChange={handleOnChangeRePass}
                                                        />
                                                        <label className={style.statusMessage}>
                                                            {inputRePassMessage}
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <label className="form-check-label" for="form2Example3">
                                                        Đã có tài khoản ? <Link to={'/login'}>Đăng nhập</Link>
                                                    </label>
                                                </div>
                                                <div className=" mx-4 mb-3 mb-lg-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary col-12 mb-4"
                                                        data-toggle="modal"
                                                        data-target="#confirmLogin"
                                                        onClick={handleSubmit}
                                                    >
                                                        Đăng ký
                                                    </button>
                                                    <label className="col-12">{registerMessage}</label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div
                className="modal fade"
                id="confirmLogin"
                tabindex="-1"
                aria-labelledby="confirmLoginLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="confirmLoginLabel">
                                Modal title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default register;
