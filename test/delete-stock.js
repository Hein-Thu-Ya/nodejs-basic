const axios = require('axios')

axios.delete('http://localhost:3000/api/stocks/64e5a22abe27a8299deed0bb')
.then(res => {
    console.log(res);
})
.catch(err => console.log(err))