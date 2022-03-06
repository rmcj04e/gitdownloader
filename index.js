var axios = require('axios')
var clone = require('git-clone')
var readline = require('readline-sync');

var gitapi = "https://api.github.com";

console.log('###################################')
console.log('Git downloader by rmcj')
console.log('Written: 6.03.22')
console.log('###################################')


var userList = readline.question('Введите список пользователей через запятую, репозитории которых надо склонировать, пример: user1,user2,user3 \n').split(',')

userList.forEach((usr) => {
    const user = usr.trim()
    console.log(`Клонируем репозитории пользователя ${user} ...`)

    axios.get(`${gitapi}/users/${user}/repos`)
    .then((response) => {
        response.data.forEach((el) => {
            clone(el.clone_url, `./repos/${user}/${el.name}`, {}, () => {
                console.log(`Репозиторий ${el.name} склонирован в папку: repos/${user}/${el.name}`)
            })
        }) 
    })
    .catch((err) => {
        console.log('Что-то пошло не так при получении списка репозиториев!')
        console.log(err)
    })
})
