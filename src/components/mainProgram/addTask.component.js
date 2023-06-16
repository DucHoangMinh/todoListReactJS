import { InputGroup, Form, Button } from 'react-bootstrap';
function getCurrentDate() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng và thêm số 0 vào đầu nếu cần
    const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 vào đầu nếu cần
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}
function addTask() {
    return (
        <div className="add-task-form mt-5">
            <div className="mb-4">
                <Form.Label htmlFor="basic-url">Nhập vào tên công việc của bạn</Form.Label>
                <Form.Control
                    placeholder="Ex : Làm bài tập lớn"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
            </div>
            <div className="mb-4">
                <Form.Label htmlFor="basic-url">Mô tả công việc</Form.Label>
                <Form.Control aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="mb-4">
                <Form.Label htmlFor="basic-url">Phân loại công việc</Form.Label>
                <Form.Select aria-label="Default select example">
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
                    value={getCurrentDate()}
                    min="2018-01-01"
                    max="2024-12-31"
                ></input>
            </div>
            <div className="mb-4">
                <Form.Label htmlFor="basic-url">Ghi chú (nếu có)</Form.Label>
                <Form.Control aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="d-flex justify-content-between">
                <Button variant="success">Quay về trang chủ</Button>
                <Button variant="primary">Thêm vào danh sách</Button>
            </div>
        </div>
    );
}
export default addTask;
