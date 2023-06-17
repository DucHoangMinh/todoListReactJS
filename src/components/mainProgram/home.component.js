/* eslint-disable react-hooks/rules-of-hooks */
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import addTask from './addTask.component';
import style from '../../scss/home.module.scss';
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

    const userMail = localStorage.getItem('userMail');

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

    return (
        <div>
            <ul class="nav nav-tabs mt-4 mb-4">
                <li class="nav-item" onClick={() => setListState(1)}>
                    <a class="nav-link active" aria-current="page" href="/home">
                        Danh sách việc sắp tới
                    </a>
                </li>
                <li class="nav-item" onClick={() => setListState(2)}>
                    <a class="nav-link" aria-current="page" href="/home">
                        Danh sách việc chưa hoàn thành
                    </a>
                </li>
                <li class="nav-item" onClick={() => setListState(3)}>
                    <a class="nav-link" href="#">
                        Danh sách việc đã hoàn thành
                    </a>
                </li>
            </ul>
            {(listState == 1 ? futureTask : listState == 2 ? notFinishTask : finishedTask).map(function (data) {
                return (
                    <div class="card">
                        <div class="card-header">
                            <h5>Ngày hết hạn : {dateToString(new Date(data.expireDay))}</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{data.name}</h5>
                            <p class="card-text">{data.description}</p>
                            <a href="#" class={`btn btn-primary  ${style['primary-button']}`}>
                                Xem chi tiết
                            </a>
                            <a href="#" class={`btn btn-primary  ${style['primary-button']}`}>
                                Chỉnh sửa chi tiết
                            </a>
                            <a href="#" class={`btn btn-primary ${style['primary-button']}`}>
                                Đánh dấu đã hoàn thành
                            </a>
                            <a href="#" class={`btn btn-danger ${style['delete-button']}`}>
                                Xóa
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
export default home;
