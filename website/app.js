/* Global Variables */
const apiKey = '31a296fb035ec451688ba5b3d21a57d7';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const btn = document.getElementById('generate');

const getData = async (url='', zip, key) => {
    const response = await fetch(`${url}?zip=${zip}&appid=${key}&units=metric`);
    try{
        const res = await response.json();
        return res;
    }catch(err) {
        console.log(err)
    }
}

const sendData = async (url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/JSON',
        },
        body: JSON.stringify(data)
    });
}

const retrieveData = async (url='') => {
    const response = await fetch(url);
    
    try {
        const res = await response.json();
        return res;
    }catch (err) {
        console.log(err)
    }
}

const updateUI = (data) => {
    let image;
    if(data.temp < 25) {
        image = 'https://images.unsplash.com/photo-1457269449834-928af64c684d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c25vd3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60';
    }else if(data.temp >= 25 && data.temp < 33) {
        image = 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8c3ByaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60';
    }else if(data.temp > 35) {
        image = 'https://images.unsplash.com/photo-1517384084767-6bc118943770?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60';
    }
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${data.temp} ℃`;
    document.getElementById('app').style.backgroundImage = `url(${image})`
    if(data.content) {
        document.getElementById('content').innerHTML = `Content: ${data.content}`;
    }
}

const callTheFetchDataFun = () => {
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    if(!zip) {
        alert("Enter Your US zip code!")
    }else {
        getData(baseURL,zip, apiKey).then(data => {
            console.log(data)
            const object = {data: data, date: newDate, content: content};
            sendData('/sendweather', object).then(() => {
                retrieveData('/all').then(retrievedData => {
                    updateUI(retrievedData);
                })
            })
        });
    }
}

btn.addEventListener('click', callTheFetchDataFun);

