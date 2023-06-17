const { default: axios } = require('axios');
const { useState } = require('react');

function home() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [taskList, setTaskList] = useState([]);
    // axios.get('');

    return <div>Đây là trang chủ</div>;
}
export default home;
