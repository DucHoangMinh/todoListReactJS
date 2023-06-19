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
                // console.log(response.data);
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
            <ul class="nav nav-tabs mt-4 mb-4">
                <li class="nav-item" onClick={() => setListState(1)}>
                    <a class="nav-link active" aria-current="page" href="#">
                        Danh sách việc sắp tới
                    </a>
                </li>
                <li class="nav-item" onClick={() => setListState(2)}>
                    <a class="nav-link" aria-current="page" href="#">
                        Danh sách việc cũ chưa hoàn thành
                    </a>
                </li>
                <li class="nav-item" onClick={() => setListState(3)}>
                    <a class="nav-link" href="#">
                        Danh sách việc đã hoàn thành
                    </a>
                </li>
                <Link to="/home/add" class={`btn btn-outline-success  ${style['add-task-button']}`}>
                    Thêm một nhiệm vụ mới
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
                            <Link
                                to={`/home/detail/${data.slug}`}
                                class={`btn btn-primary  ${style['primary-button']}`}
                            >
                                Xem chi tiết
                            </Link>
                            <Link
                                to={'/home/update/' + data.slug}
                                //Nếu ở chỗ danh sách việc sắp tới thì mới hiển thị nút này
                                class={`btn ${listState === 1 ? '' : 'd-none'} btn-primary update-btn  ${
                                    style['primary-button']
                                }`}
                            >
                                Chỉnh sửa chi tiết
                            </Link>
                            <Button
                                //Nếu ở danh sách những việc đã hoàn thành thì sẽ không hiển thị nút này nữa
                                class={`btn btn-primary ${listState === 3 ? 'd-none' : ''} ${style['primary-button']}`}
                                onClick={() => handleMarkFinish(data)}
                            >
                                Đánh dấu đã hoàn thành
                            </Button>
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
    );
}
export default home;
