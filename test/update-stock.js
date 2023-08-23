const axios = require('axios')

axios.put('http://localhost:3000/api/stocks/64e5a218be27a8299deed0b9', {
    code: 'P000001',
    name: 'Apple Juice',
    price: 800
})
.then(res => {
    console.log(res);
})
.catch(err => console.log(err))