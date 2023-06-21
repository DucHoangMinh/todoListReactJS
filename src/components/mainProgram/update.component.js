/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import style from '../../scss/update.module.scss';

function dateToString(date) {
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng và thêm số 0 vào đầu nếu cần
    var day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 vào đầu nếu cần
    var year = date.getFullYear();

    return `${year}-${month}-${day}`;
}
function stringToDate(dateString) {
    var parts = dateString.split('-'); // Tách chuỗi thành mảng gồm 3 phần tử: [dd, mm, yyyy]
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // Lưu ý: Tháng được đánh số từ 0 đến 11
    var day = parseInt(parts[2], 10);
    var dateObject = new Date(year, month, day);
    return dateObject;
}

function update() {
    const [recentName, setRecentName] = useState('');

    const [taskName, setTaskName] = useState();
    const [taskDescrip, setTaskDescrip] = useState();
    const [taskClassify, setTaskClassify] = useState('Không phân loại');
    const [taskDate, setTaskDate] = useState(new Date());
    const [taskNote, setTaskNote] = useState('');
    const [modalMess, setModalMess] = useState('');
    const [modalShow, setModalShow] = useState(false);

    var url = window.location.href;
    var segments = url.split('/');
    var slug = segments.pop();
    useEffect(function () {
        axios
            .get('https://todo-list-api-xi.vercel.app/userdata/detail/' + slug)
            .then((response) => {
                const data = response.data;
                setRecentName(data.name);
                setTaskName(data.name);
                setTaskDescrip(data.description);
                setTaskClassify(data.taskType);
                setTaskDate(new Date(data.expireDay));
                setTaskNote(data.note);
            })
            .catch();
    }, []);

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{modalMess}</h5>
                    <p>Bạn sẽ được đưa về trang chủ</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={handleAccept}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    function handleSendModify() {
        setModalMess('Xác nhận chỉnh sửa chi tiết thông tin nhiệm vụ ' + taskName + ' ?');
        setModalShow(true);
    }
    function handleSendBack() {
        setModalMess('Quay về trang chủ và hủy bỏ mọi thay đổi?');
        setModalShow(true);
    }
    function handleBack() {
        window.location.href = '/home';
    }
    function handleUpdate() {
        const updateTask = {
            name: taskName,
            description: taskDescrip,
            expireDay: taskDate,
            taskType: taskClassify,
            note: taskNote,
        };
        axios
            .get('https://todo-list-api-xi.vercel.app/userdata/update/' + slug, updateTask)
            .then() //Gửi request xong thì chuyển hướng về trang chủ
            .catch((err) => console.log(err));
        setTimeout(function () {
            window.location.href = '/home';
        }, 5000);
    }
    function handleAccept() {
        modalMess.includes('Quay về trang chủ') ? handleBack() : handleUpdate();
    }
    return (
        <div className="add-task-form mt-5 container">
            <h4 className={`display-4 mb-4 ${style.updateHeading}`}>Chỉnh sửa thông tin nhiệm vụ "{recentName}"</h4>
            <div className="mb-4">
                <Form.Label htmlFor="basic-url">Nhập vào tên công việc của bạn</Form.Label>
                <Form.Control
                    value={taskName}
                    placeholder="Ex : Làm bài tập lớn"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <Form.Label htmlFor="basic-url">Mô tả công việc</Form.Label>
                <Form.Control
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={taskDescrip}
                    onChange={(e) => setTaskDescrip(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <Form.Label htmlFor="basic-url">Phân loại công việc</Form.Label>
                <Form.Select
                    aria-label="Default select example"
                    value={taskClassify}
                    onChange={(e) => setTaskClassify(e.target.value)}
                >
                    <option value="0">Không phân loại</option>
                    <option value="1">Việc cá nhân</option>
                    <option value="2">Việc nhà</option>
                    <option value="3">Việc cơ quan</option>
                </Form.Select>
            </div>
            <div className="mb-4">
                <Form.Label htmlFor="basic-url" className="ml-5">
                    Ngày hết hạn của công việc
                </Form.Label>
                <br />
                <input
                    type="date"
                    id="start"
                    name="expireday"
                    value={dateToString(taskDate)}
                    min={dateToString(new Date())}
                    max="2026-12-31"
                    onChange={(e) => setTaskDate(stringToDate(e.target.value))}
                ></input>
            </div>
            <div className="mb-4">
                <Form.Label htmlFor="basic-url">Ghi chú (nếu có)</Form.Label>
                <Form.Control
                    aria-label="Username"
                    aria-describedby="basics-addon1"
                    value={taskNote}
                    onChange={(e) => setTaskNote(e.target.value)}
                />
            </div>
            <div className="d-flex justify-content-between">
                <Button variant="primary" onClick={handleSendBack}>
                    Quay về trang chủ
                </Button>
                <Button variant="success" onClick={handleSendModify}>
                    Gửi chỉnh sửa
                </Button>
            </div>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}
export default update;
