// app.js
const http = require('http');

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
let a;
// const getPost = (num) => {
//     var resp;
    
//       .then(datar=>resp=datar)
//     return resp;
      
      
//   };
  
  
// app.post('/', (req, res) => {
//     const { name } = req.body;

//     fetch(`http://api.weatherapi.com/v1/current.json?key=a2d1b9ccb46b4a5fa6644905242407&q=${name}&aqi=no`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => data.current.temp_c)
//         .then(tempF => res.status(200).send({ temperature: tempF }))
//         .catch(error => res.status(500).send({ error: error.message }));
// });

// app.post('/', (req, res) => {
//     const { name } = req.body;
    
//     if (!name) {
//         return res.status(400).send({ error: 'Name field is required' });
//     }

//     const apiUrl = `http://api.weatherapi.com/v1/current.json?key=a2d1b9ccb46b4a5fa6644905242407&q=${name}&aqi=no`;

//     fetch(apiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.error) {
//                 throw new Error(data.error.message);
//             }
//             return data.current.temp_c;
//         })
//         .then(tempF => res.status(200).send({ temperature: tempF }))
//         .catch(error => res.status(500).send({ error: error.message }));
// });
app.post('/', (req, res) => {
    const name = req.body;
    console.log('Received name:', name); // Log the received name
    
    if (!name) {
        return res.status(400).send({ error: 'Name field is required' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name.name}&appid=730a8e9a44eabe53edbe9477cd0bfb50`;
    console.log('Requesting API URL:', apiUrl); // Log the API URL

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            console.log('Received data:', data); // Log the received data
            return data.list[0].main.temp;
        })
        .then(tempC => res.status(200).send({ temperature: tempC }))
        .catch(error => res.status(500).send({ error: error.message }));
});


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
