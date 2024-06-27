const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon")
        const apiKey="29f4ab4663d0d5ec91b3f7229339fb39";
        const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        async function checkWeather(city){
            const response=await fetch(apiUrl + city +`&appid=${apiKey}`);
            if(response.status == 404){
                document.querySelector(".error").style.display="block";
                document.querySelector(".weather").style.display="none";
            }else{
            var data = await response.json();
            // console.log(data)
            var temper = Math.round(data.main.temp)
            console.log(temper)
            document.querySelector(".city").innerHTML=data.name;
            document.querySelector(".temp").innerHTML= Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML=data.main.humidity + "%"; 
            document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";
            if(data.weather[0].main == "Clouds"){
                weatherIcon.src="images/clouds.png";
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src="images/clear.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src="images/drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src="images/mist.png";
            }

            document.querySelector(".weather").style.display="block"
            document.querySelector(".error").style.display="none";}
            displaySuggestion(temper)
        }
        function displaySuggestion(temper) {
            const suggestion = document.getElementById('suggestion');
            let message;

            if (temper <= 0) {
                message = 'It\'s freezing! Stay warm and wear heavy winter clothing.';
            } else if (temper > 0 && temper <= 15) {
                message = 'It\'s quite chilly. A jacket and warm clothing are recommended.';
            } else if (temper > 15 && temper <= 25) {
                message = 'The weather is mild. A light jacket or sweater should be enough.';
            } else if (temper > 25 && temper <= 35) {
                message = 'It\'s warm. Light clothing and staying hydrated are advised.';
            } else {
                message = 'It\'s very hot! Wear light clothing, stay hydrated, and avoid the sun during peak hours.';
            }

            suggestion.innerHTML = message;
        }
        searchBtn.addEventListener("click",()=>{
            checkWeather(searchBox.value);
            

        })
        