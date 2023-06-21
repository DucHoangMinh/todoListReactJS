/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { InputGroup, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import style from '../../scss/add.module.scss';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

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
    const [modalMess, setModalMess] = useState('');
    const [taskImage, setTaskImage] = useState(0);
    const [imageURL, setImageURL] = useState(
        'https://firebasestorage.googleapis.com/v0/b/my-simple-crud-f5b5c.appspot.com/o/files%2Fistockphoto-1059266342-612x612.jpg?alt=media&token=ab975821-2cc7-4a43-9cb0-3c9eadae363a',
    );

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
            if (taskImage !== 0) {
                const storageRef = ref(storage, `files/${taskImage.name}`);
                const uploadTask = uploadBytesResumable(storageRef, taskImage);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    },
                    (error) => {
                        alert(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log(downloadURL);
                            setImageURL(downloadURL);
                        });
                    },
                );
            }
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
    function loadImgToFireBase() {
        if (taskImage !== 0) {
            const storageRef = ref(storage, `files/${taskImage.name}`);
            const uploadTask = uploadBytesResumable(storageRef, taskImage);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL);
                        setImageURL(downloadURL);
                    });
                },
            );
        }
    }
    function handleConfirm() {
        if (modalMess.includes('Bạn có chắc chắn muốn thêm nhiệm vụ')) {
            console.log('load xong');
            var newTask = {
                name: taskName,
                description: taskDescrip,
                taskType: taskClassify,
                expireDay: taskDate,
                owner: localStorage.getItem('userMail'),
                photoURL: imageURL,
            };
            axios
                .post('http://localhost:4000/userData/add', newTask)
                .then((window.location.href = '/home'))
                .catch((err) => console.log(err));
        }
    }
    //Xử lý mỗi khi thêm ảnh vào
    function handleAddImage(e) {
        setTaskImage(e.target.files[0]);
    }
    //Xử lý đẩy ảnh lên firebase storage và lấy về URL
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
            {/* <div className="mb-4">
                <Form.Label htmlFor="basic-url">Thêm ảnh gợi nhớ (nếu có)</Form.Label>
                <Form.Control
                    type="file"
                    aria-label="Username"
                    aria-describedby="basics-addon1"
                    onChange={(e) => handleAddImage(e)}
                />
            </div> */}
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
