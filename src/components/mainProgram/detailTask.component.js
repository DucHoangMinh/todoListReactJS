/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../../scss/detailTask.module.scss';
function dateToString(date) {
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng và thêm số 0 vào đầu nếu cần
    var day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 vào đầu nếu cần
    var year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
function detailTask() {
    var url = window.location.href;
    var segments = url.split('/');
    var slug = segments.pop();
    var taskTypeList = ['Không phân loại', 'Việc cá nhân', 'Việc nhà', 'Việc cơ quan'];
    const [data, setData] = useState({});
    useEffect(function () {
        axios
            .get('http://localhost:4000/userdata/detail/' + slug)
            .then((response) => {
                setData(response.data);
            })
            .catch();
    }, []);
    return (
        <div className="container">
            <div class="card mt-5">
                <div className={`${style.detailInfor}`}>
                    <h5 className={`card-header ${style.cardHeader}`}>
                        Chi tiết
                        <svg
                            style={{ marginLeft: '4px', marginBottom: '2px' }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-info-circle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                    </h5>
                    <div className={`card-body ${style.cardBody}`}>
                        <div className={`${style.cardImgWrapper}`}>
                            <img className={`${style.cardImg}`} alt="Ảnh nhiệm vụ" src={data.photoURL}></img>
                        </div>
                        <div className={`${style.otherInfor}`}>
                            <h4 class="card-title">
                                <span className={`${style.inforTitle}`}>Tên nhiệm vụ</span> : {data.name}
                            </h4>
                            <p class="card-text">
                                <span className={`${style.inforTitle}`}>Phân loại</span> : {taskTypeList[data.taskType]}
                            </p>
                            <p class="card-text">
                                <span className={`${style.inforTitle}`}>Chi tiết nhiệm vụ</span> : {data.description}
                            </p>
                            <p class="card-text">
                                <span className={`${style.inforTitle}`}>Ngày hết hạn</span> :{' '}
                                {dateToString(new Date(data.expireDay))}
                            </p>
                            <p class="card-text">
                                <span className={`${style.inforTitle}`}>Ghi chú</span> : {data.note}
                            </p>
                            <Link to="/home" className={`btn ${style.detailButton}`}>
                                Về trang chủ
                            </Link>
                            <Link to={'/home/update/' + data.slug} className={`btn ${style.detailButton}`}>
                                Chỉnh sửa
                            </Link>
                            <a href="#" className={`btn btn-danger ${style.delButton}`}>
                                Xóa
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default detailTask;
