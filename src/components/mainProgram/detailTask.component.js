/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function detailTask() {
    var url = window.location.href;
    var segments = url.split('/');
    var slug = segments.pop();
    console.log(slug);
    const [data, setData] = useState({});
    useEffect(function () {
        axios
            .get('http://localhost:4000/userdata/detail/' + slug)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch();
    }, []);
    return (
        <div>
            <div class="card mt-5">
                <h5 class="card-header">Chi tiết công việc</h5>
                <div class="card-body">
                    <h5 class="card-title">Tên nhiệm vụ : {data.name}</h5>
                    <p class="card-text">Chi tiết nhiệm vụ : {data.description}</p>
                    <p class="card-text">Ngày hết hạn nhiệm vụ : {data.expireDay}</p>
                    <p class="card-text">Ghi chú : {data.note}</p>
                    <Link to="/home" class="btn btn-primary">
                        Về trang chủ
                    </Link>
                    <a href="#" class="btn btn-primary">
                        Chỉnh sửa
                    </a>
                    <a href="#" class="btn btn-danger">
                        Xóa
                    </a>
                </div>
            </div>
        </div>
    );
}
export default detailTask;
