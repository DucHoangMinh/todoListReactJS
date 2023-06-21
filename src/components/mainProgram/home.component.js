/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import { Nav, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { Form, Link, Route, Routes } from 'react-router-dom';
import addTask from './addTask.component';
import style from '../../scss/home.module.scss';
import DetailTask from './detailTask.component';

const { useState, useEffect } = require('react');

function dateToString(date) {
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng và thêm số 0 vào đầu nếu cần
    var day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 vào đầu nếu cần
    var year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
function dateToMonthYear(date) {
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng và thêm số 0 vào đầu nếu cần
    var year = date.getFullYear();
    return `${year}-${month}`;
}
function home() {
    const [taskList, setTaskList] = useState([]);
    const [listState, setListState] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [modalMess, setModalMess] = useState('');
    const [modalData, setModalData] = useState({});

    const [activeClass1, setActiveClass1] = useState(true);
    const [activeClass2, setActiveClass2] = useState(false);
    const [activeClass3, setActiveClass3] = useState(false);
    const [startMonthFilter, setStartMonthFilter] = useState(dateToMonthYear(new Date()));
    const [endMonthFilter, setEndMonthFilter] = useState('');
    const [filterSelect, setFilterSelect] = useState(-1);

    var myCart = document.getElementsByClassName('myCard');
    function handleMarkFinish(data) {
        setModalData(data);
        setModalMess('Xác nhận nhiệm vụ ' + data.name + ' này đã hoàn thành?');
        setModalShow(true);
    }
    function handleMarkDelete(data) {
        setModalData(data);
        setModalMess('Bạn có chắc chắn muốn xóa nhiệm vụ ' + data.name + ' khỏi danh sách quản lý?');
        setModalShow(true);
    }
    //Hàm xử lý việc xác nhận đánh dấu là đã hoàn thành
    function handleFinish(data) {
        axios
            .put('http://localhost:4000/userData/update/finish/' + data.slug, { finish: true })
            .then((window.location.href = '/home'))
            .catch();
    }
    //Hàm xử lý việc xác nhận là muốn xóa
    function handleDelete(data) {
        axios
            .get('http://localhost:4000/userData/delete/' + data.slug)
            .then()
            .catch();
        setTimeout(function () {
            window.location.href = '/home';
        }, 500);
    }
    function handleAccept(data) {
        modalMess.includes('Xác nhận nhiệm vụ') ? handleFinish(data) : handleDelete(data);
    }
    function resetDislayItem() {
        for (var i = 0; i < futureTask.length; i++) {
            myCart[i].classList.remove('d-none');
        }
    }
    function handleFilterStartMonth(e) {
        setStartMonthFilter(e.target.value);
        const date = new Date(e.target.value);
        resetDislayItem();
        for (var i = 0; i < futureTask.length; i++) {
            if (
                !(
                    new Date(futureTask[i].expireDay).getMonth() >= new Date(e.target.value).getMonth() &&
                    new Date(futureTask[i].expireDay).getMonth() <=
                        new Date(endMonthFilter === '' ? '2100-12-12' : endMonthFilter).getMonth() &&
                    new Date(futureTask[i].expireDay).getFullYear() >= new Date(e.target.value).getFullYear() &&
                    new Date(futureTask[i].expireDay).getFullYear() <=
                        new Date(endMonthFilter === '' ? '2100-12-12' : endMonthFilter).getFullYear()
                )
            ) {
                myCart[i].classList.add('d-none');
            }
        }
    }
    function handleFilterEndMonth(e) {
        setEndMonthFilter(e.target.value);
        const date = new Date(e.target.value);
        resetDislayItem();
        for (var i = 0; i < futureTask.length; i++) {
            if (
                !(
                    new Date(futureTask[i].expireDay).getMonth() <= new Date(e.target.value).getMonth() &&
                    new Date(futureTask[i].expireDay).getMonth() >=
                        new Date(startMonthFilter === '' ? '2100-12-12' : startMonthFilter).getMonth() &&
                    new Date(futureTask[i].expireDay).getFullYear() <= new Date(e.target.value).getFullYear() &&
                    new Date(futureTask[i].expireDay).getFullYear() >=
                        new Date(startMonthFilter === '' ? '2100-12-12' : startMonthFilter).getFullYear()
                )
            ) {
                myCart[i].classList.add('d-none');
            }
        }
    }
    function handleCheckValidTime() {}
    function handleFilterType(e) {
        setFilterSelect(e.target.value);
    }
    function resetFilter() {
        setEndMonthFilter('');
        setStartMonthFilter(dateToMonthYear(new Date()));
        resetDislayItem();
    }
    const userMail = localStorage.getItem('userMail');
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Xác nhận thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalMess}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Hủy</Button>
                    <Button onClick={() => handleAccept(props.data)}>Xác nhận</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    //Lấy danh sách tất cả những công việc của người đó
    useEffect(function () {
        axios
            .get('http://localhost:4000/userdata/tasklist/' + userMail)
            .then((response) => {
                setTaskList(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    //Sắp xếp lại các danh sách theo thứ tự ngày tháng
    if (taskList.length > 1) {
        taskList.sort(function (a, b) {
            return new Date(a.expireDay) - new Date(b.expireDay);
        });
    }
    //Mảng lưu các nhiệm vụ trong tương lai mà chưa hoàn thành
    var futureTask = taskList.filter(function (taskItem) {
        return taskItem.finish == false && new Date(taskItem.expireDay) >= new Date();
    });
    // console.log(futureTask);
    //Mảng lưu các nhiệm vụ đã qua mà chưa hoàn thành
    var notFinishTask = taskList.filter(function (taskItem) {
        return taskItem.finish == false && new Date(taskItem.expireDay) < new Date();
    });
    //Mảnh lưu các nhiệm vụ đã hoàn thành
    var finishedTask = taskList.filter(function (taskItem) {
        return taskItem.finish == true;
    });
    window.onload = function () {
        const updateButton = document.getElementsByClassName('update-btn');
    };
    return (
        <div>
            <div className={style['home-header']}>
                <div className={style['backgroudWrapper']}>
                    <img
                        className={style['backgroundImage']}
                        src="https://firebasestorage.googleapis.com/v0/b/my-simple-crud-f5b5c.appspot.com/o/files%2Fhome-bkg.jpg?alt=media&token=b3bd6ef4-74a8-4c25-b99c-c615e1486f83"
                        alt="Ảnh nền trang chủ"
                    ></img>
                    <div className={style['titleWrapper']}>
                        <h3>Xin chào {userMail}</h3>
                        <p>Đây là danh sách công việc của bạn</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <ul class={`${style['taskListSelect']}`}>
                    <li
                        class={`select-item  ${activeClass1 ? style.nowDisplay : ''}`}
                        onClick={() => {
                            setListState(1);
                            setActiveClass1(true);
                            setActiveClass2(false);
                            setActiveClass3(false);
                        }}
                    >
                        <a class="nav-link active" aria-current="page" href="#">
                            Trong tương lai
                        </a>
                    </li>
                    <li
                        class={`select-item  ${activeClass2 ? style.nowDisplay : ''}`}
                        onClick={() => {
                            setListState(2);
                            setActiveClass1(false);
                            setActiveClass2(true);
                            setActiveClass3(false);
                        }}
                    >
                        <a class="nav-link" aria-current="page" href="#">
                            Chưa hoàn thành
                        </a>
                    </li>
                    <li
                        class={`select-item  ${activeClass3 ? style.nowDisplay : ''}`}
                        onClick={() => {
                            setListState(3);
                            setActiveClass1(false);
                            setActiveClass2(false);
                            setActiveClass3(true);
                        }}
                    >
                        <a class="nav-link" href="#">
                            Đã hoàn thành
                        </a>
                    </li>
                    <Link to="/home/add" class={`${style['add-task-button']}`}>
                        <span>Thêm nhiệm vụ</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-calendar2-plus"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM8 8a.5.5 0 0 1 .5.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 8 8z" />
                        </svg>
                    </Link>
                </ul>
                <div className={`${style.homeFilterWrapper} ${listState === 1 ? '' : 'd-none'}`}>
                    <div className={`${style.textFilterWrapper}`}>
                        <label className={`${style.filterLabel}`}>Thời gian từ : </label>
                        <input
                            className={`${style.filterMonthInput}`}
                            value={startMonthFilter}
                            type="month"
                            onChange={(e) => handleFilterStartMonth(e)}
                        ></input>
                        <label className={`${style.filterLabel}`}>đến : </label>
                        <input
                            className={`${style.filterMonthInput}`}
                            value={endMonthFilter}
                            type="month"
                            onChange={(e) => handleFilterEndMonth(e)}
                        ></input>
                        <button className={`${style.filterMonthReset}`} onClick={resetFilter}>
                            Hủy lọc
                        </button>
                    </div>
                    <div className={`${style.selectFilterWrapper}`}>
                        <label className={`${style.filterLabel}`}>Phân loại : </label>
                        <select onChange={(e) => handleFilterType(e)}>
                            <option value="-1">Tất cả</option>
                            <option value="0">Không phân loại</option>
                            <option value="1">Việc cá nhân</option>
                            <option value="2">Việc nhà</option>
                            <option value="3">Việc cơ quan</option>
                        </select>
                    </div>
                </div>
                {(listState == 1 ? futureTask : listState == 2 ? notFinishTask : finishedTask).map(function (data) {
                    return (
                        <div
                            class={`card mb-4 myCard ${
                                filterSelect == -1 || filterSelect == data.taskType ? '' : 'd-none'
                            }`}
                        >
                            <div class="card-header">
                                <h5>Ngày hết hạn : {dateToString(new Date(data.expireDay))}</h5>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{data.name}</h5>
                                <p class="card-text">{data.description}</p>
                                <Link to={`/home/detail/${data.slug}`} class={`btn ${style['primary-button']}`}>
                                    Xem chi tiết
                                </Link>
                                <Link
                                    to={'/home/update/' + data.slug}
                                    //Nếu ở chỗ danh sách việc sắp tới thì mới hiển thị nút này
                                    class={`btn ${listState === 1 ? '' : 'd-none'} update-btn  ${
                                        style['primary-button']
                                    }`}
                                >
                                    Chỉnh sửa chi tiết
                                </Link>
                                <Link
                                    //Nếu ở danh sách những việc đã hoàn thành thì sẽ không hiển thị nút này nữa
                                    class={`btn ${listState === 3 ? 'd-none' : ''} ${style['primary-button']}`}
                                    onClick={() => handleMarkFinish(data)}
                                >
                                    Đánh dấu đã hoàn thành
                                </Link>
                                <a
                                    href="#"
                                    class={`btn btn-danger ${style['delete-button']}`}
                                    onClick={() => handleMarkDelete(data)}
                                >
                                    Xóa
                                </a>
                            </div>
                            <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                data={modalData}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={`${style.homeFooter}`}>
                <div className={`${style.footerWrapper} containter`}>
                    <p className={`${style.footerTitle}`}>
                        The site is still in beta, contact me if you encounter any errors
                    </p>
                    <p className={`${style.footerContact}`}>
                        Contact me
                        <a href="https://www.facebook.com/duck.hoangminh/" className={`${style.footerContactItem}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-facebook"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                        </a>
                        <a href="https://github.com/DucHoangMinh" className={`${style.footerContactItem}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-github"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </a>
                        <a className={`${style.footerContactItem}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-telegram"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/duc_hm/" className={`${style.footerContactItem}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-instagram"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            </svg>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default home;
