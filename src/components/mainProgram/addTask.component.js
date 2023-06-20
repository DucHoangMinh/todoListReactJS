/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { InputGroup, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import style from '../../scss/add.module.scss';

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

function addTask() {
    const [taskName, setTaskName] = useState('');
    const [taskDescrip, setTaskDescrip] = useState('');
    const [taskClassify, setTaskClassify] = useState('Không phân loại');
    const [taskDate, setTaskDate] = useState(new Date());
    const [taskNote, setTaskNote] = useState('');
    const [modalMess, setModalMess] = useState('');

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalMess}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const [modalShow, setModalShow] = useState(false);

    function handleBackButton() {
        setModalMess('Bạn có muốn hủy bỏ mọi thay đổi và trở về trang chủ?');
        setModalShow(true);
    }
    function handleAddButton() {
        setModalMess(`Bạn có chắc chắn muốn thêm nhiệm vụ ${taskName} , hạn vào ngày ${dateToString(taskDate)} ?`);
        if (dataValid()) {
            setModalShow(true);
        }
    }
    function dataValid() {
        if (taskName === '' || taskDescrip === '') {
            alert('Bạn không thể để trống tên và mô tả công việc !!!');
            return false;
        }
        return true;
    }
    function handleConfirm() {
        if (modalMess.includes('Bạn có chắc chắn muốn thêm nhiệm vụ')) {
            var newTask = {
                name: taskName,
                description: taskDescrip,
                taskType: taskClassify,
                expireDay: taskDate,
                note: taskNote,
                owner: localStorage.getItem('userMail'),
            };
            axios
                .post('http://localhost:4000/userData/add', newTask)
                .then()
                .catch((err) => console.log(err));
        }
        setTimeout(function () {
            window.location.href = '/home';
        }, 500);
    }
    return (
        <div className="add-task-form mt-5 container">
            <h1 class={`display-4 mb-4 ${style.addHeading}`}>Thêm công việc vào danh sách quản lý</h1>
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
                    as={'textarea'}
                    rows={3}
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
                    as={'textarea'}
                    rows={3}
                    aria-label="Username"
                    aria-describedby="basics-addon1"
                    value={taskNote}
                    onChange={(e) => setTaskNote(e.target.value)}
                />
            </div>
            <div className="d-flex justify-content-between">
                <Button variant="primary" onClick={handleBackButton}>
                    Quay về trang chủ
                </Button>
                <Button variant="success" onClick={() => handleAddButton()}>
                    Thêm vào danh sách
                </Button>
            </div>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}
export default addTask;
