const axios = require('axios')

axios.get('http://localhost:3000/api/stocks/64e5a218be27a8299deed0b9')
.then((res) => {
    console.log(res.data);
})
.catch(err => console.log(err))