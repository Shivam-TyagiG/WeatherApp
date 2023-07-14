const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
// console.log(cityName);
const city_name = document.getElementById('city_name')
const tem_real_val = document.getElementById('temp');
// console.log(tem_real_val);
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer')

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value; 
    console.log(cityVal)
    if(cityVal === ""){
        city_name.innerText = `Please write the name before search`;
        datahide.classList.add('data_hide');
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units&appid=66652cb171e08194d1dc09fff6441a52`;
            // console.log(url);
            const response = await fetch(url);
            // console.log("response is "+response);
            const data = await response.json();
            const arrData = [data];
            // console.log(arrData);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            // console.log(city_name.innerText);
            tem_real_val.innerText = (arrData[0].main.temp  - 273.15).toFixed(2);
            
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);
            if (tempMood == "Clear" || tempMood == "Sunny") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rainy") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else if (tempMood == "Snowy") {
                temp_status.innerHTML = "<i class='fas fa-snowflake' style='color: #ffffff;'></i>";
            } else if (tempMood == "Thunderstorm") {
                temp_status.innerHTML = "<i class='fas fa-bolt' style='color: #ffd700;'></i>";
            } else if (tempMood == "Mist" || tempMood == "Haze") {
                temp_status.innerHTML = "<i class='fas fa-smog' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }
            

            datahide.classList.remove('data_hide');


        }catch{
            city_name.innerText = `Please enter the city name properly`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);