const axios = require('axios')

axios.get('http://localhost:3000/api/stocks', {
    params: {
        'page': 1,
        'perpage': 10,
        'search': 'Orange'
    }
})
.then((res) => {
    console.log(res.data);
})
.catch((err) => console.log(err))