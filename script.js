const api = {
    key: '0c4bb56bc55aaa8de064cd8f2f6e3b61',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box')

searchBox.addEventListener('keypress', setQuery)

function setQuery(e) {
    if (e.keyCode == 13) {
        console.log(searchBox.value);
        getResults(searchBox.value)
    }
}


function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=Metric&appid=${api.key}`)
        .then(res => {
            return res.json()
        })
        .then(displayResults)
}
function displayResults(res) {
    console.log(res);
    const city = document.querySelector('.city')
    city.innerHTML = `${res.name}, ${res.sys.country}`

    let now = new Date()
    const date = document.querySelector('.date')
    date.innerHTML = dateBuild(now)
    let temp=document.querySelector('.temp')
    temp.innerHTML=`${Math.round(res.main.temp)}<span>°C</span>`
    let weather=document.querySelector('.weather')
    weather.innerHTML=res.weather[0].main
    let hi_low=document.querySelector('.hi-low')
    hi_low.innerHTML=`${Math.round(res.main.temp_min)}°C / ${Math.round(res.main.temp_max)}°C`
}

function dateBuild(now) {
    const  months= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let day=weekDays[now.getDay()]
    let date=now.getDate()
    let month=months[now.getMonth()]
    let year=now.getFullYear()

    return `${day} ${date} ${month} ${year}`
}
