import axios from 'axios';


export function sample() {
    return axios.post('http://127.0.0.1:3030/product/uyuyu')
        .then(response => {
            console.log(response);
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

export function uploadRecogImage(imageBlob) {
    console.log("uploadRecogImage", imageBlob)
    let data = new FormData();
    data.append('file', imageBlob);
    return axios
        .post(`http://localhost:3030/imagerecog`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            console.log(res)
            return res
        });
}


export function uploadAudio(audioBlob) {
    let data = new FormData();
    data.append('file', audioBlob);
    return axios
        .post(`http://localhost:3030/audiorecog`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            console.log(res)
            return res
        });
}



