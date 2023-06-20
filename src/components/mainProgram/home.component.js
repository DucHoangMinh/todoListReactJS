/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import { Nav, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
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
function home() {
    const [taskList, setTaskList] = useState([]);
    const [listState, setListState] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [modalMess, setModalMess] = useState('');
    const [modalData, setModalData] = useState({});

    const [activeClass1, setActiveClass1] = useState(true);
    const [activeClass2, setActiveClass2] = useState(false);
    const [activeClass3, setActiveClass3] = useState(false);
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
            .then()
            .catch();
        setTimeout(function () {
            window.location.href = '/home';
        }, 500);
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
                {(listState == 1 ? futureTask : listState == 2 ? notFinishTask : finishedTask).map(function (data) {
                    return (
                        <div class="card mb-4">
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
        </div>
    );
}
export default home;
