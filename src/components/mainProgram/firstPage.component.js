import { Link } from 'react-router-dom';
import style from '../../scss/firstpage.module.scss';
import { useEffect } from 'react';

function firstPage() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(function () {
        const loader = document.getElementById('loader');
        setTimeout(function () {
            loader.classList.add('d-none');
        }, 2000);
        if (localStorage.getItem('userMail') !== null) {
            window.location.href = '/home';
        }
    }, []);

    return (
        <div className="container">
            <div className={`${style.loaderWrapper}`} id="loader">
                <span className={`${style.loader}`}>
                    <span className={`${style.loaderInner}`}></span>
                </span>
            </div>
            <div
                style={{
                    textAlign: 'center',
                    marginTop: '20%',
                }}
            >
                <p
                    style={{
                        fontSize: '36px',
                    }}
                >
                    Vui lòng đăng nhập để tiếp tục sử dụng ứng dụng
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: '#fff',
                            padding: '8px 16px',
                            backgroundColor: '#a1ce7a',
                            borderRadius: '12px',
                            marginRight: '20px',
                            fontSize: '20px',
                            width: '200px',
                            display: 'block',
                        }}
                        to={'/login'}
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: '#fff',
                            padding: '8px 16px',
                            backgroundColor: '#a1ce7a',
                            borderRadius: '12px',
                            marginRight: '20px',
                            fontSize: '20px',
                            width: '200px',
                            display: 'block',
                        }}
                        to={'/register'}
                    >
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default firstPage;
