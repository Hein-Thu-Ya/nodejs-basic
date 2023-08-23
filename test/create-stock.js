const axios = require('axios')

axios.post('http://localhost:3000/api/stocks', {
    code: 'P000001',
    name: 'Apple',
    price: 500
})
.then(res => {
    console.log(res);
})
.catch(err => console.log(err))