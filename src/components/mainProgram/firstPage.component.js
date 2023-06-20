import { Link } from 'react-router-dom';

function firstPage() {
    if (localStorage.getItem('userMail') !== null) {
        window.location.href = '/home';
    }
    return (
        <div className="container">
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
