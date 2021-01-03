const data = {
    food: [
        {
            id: 1,
            nama: "Lemper",
            harga: 5000,
            sumOrder: 0
        },
        {
            id: 2,
            nama: "Nogo Sari",
            harga: 4000,
            sumOrder: 0
        },
        {
            id: 3,
            nama: "Onde onde",
            harga: 6000,
            sumOrder: 0
        },
        {
            id: 4,
            nama: "Klepon",
            harga: 2500,
            sumOrder: 0
        },
    ],
    drink: [
        {
            id: 1,
            nama: "Sinom",
            harga: 10000,
            sumOrder: 0
        },
        {
            id: 2,
            nama: "Temu Lawak",
            harga: 9000,
            sumOrder: 0
        },
        {
            id: 3,
            nama: "Beras Kencur",
            harga: 6000,
            sumOrder: 0
        },
        {
            id: 4,
            nama: "Kunyit Asem",
            harga: 4000,
            sumOrder: 0
        },
    ],
    sumOrderOfFood: 0,
    sumOrderOfDrink: 0,
    sumOfPrice: 0
}

const _food = document.getElementsByClassName("food-container")[0]
const _drink = document.getElementsByClassName("drink-container")[0]
const _sumOrderFood = document.getElementsByClassName("sum-order-food")[0]
const _sumOrderDrink = document.getElementsByClassName("sum-order-drink")[0]
const _sumPrice = document.getElementsByClassName("sum-of-price")[0]

let _foodList = ""
let _drinkList = ""

const render = () => {
    _foodList = ""
    _drinkList = ""

    data.food.map(val => {
        _foodList += `
        <div class="row d-flex align-items-center">
        <div class="col-6">
            <h4>${val.nama}</h4>
            <p>${val.harga}</p>
        </div>
        <div class="col-6 d-flex justify-content-end align-items-center">
            <div class="row">
                <div class="col"><button onclick="btnKurang(${val.id},'food')" class="btn btn-secondary kurang">-</button></div>
                <div class="col"><span class="mx-2">${val.sumOrder}</span></div>
                <div class="col"><button onclick="btnTambah(${val.id},'food')" class="btn btn-primary tambah">+</button></div>
            </div>
        </div></div>`
    })

    data.drink.map(val => {
        _drinkList += `
        <div class="row d-flex align-items-center">
        <div class="col-6">
            <h4>${val.nama}</h4>
            <p>${val.harga}</p>
        </div>
        <div class="col-6 d-flex justify-content-end align-items-center">
            <div class="row">
                <div class="col"><button onclick="btnKurang(${val.id},'drink')" class="btn btn-secondary kurang">-</button></div>
                <div class="col"><span class="mx-2">${val.sumOrder}</span></div>
                <div class="col"><button onclick="btnTambah(${val.id},'drink')" class="btn btn-primary tambah">+</button></div>
            </div>
        </div></div>`
    })

    _food.innerHTML = _foodList
    _drink.innerHTML = _drinkList
    _sumOrderFood.innerText = data.sumOrderOfFood
    _sumOrderDrink.innerText = data.sumOrderOfDrink
    _sumPrice.innerText = data.sumOfPrice

}

render()


const _btnKurang = document.getElementsByClassName("kurang")[0]
const _btnTambah = document.getElementsByClassName("tambah")[0]

const btnKurang = (id, type) => {
    if (type === "food") {
        data.food.map(x => {
            if (x.id === id) {
                if (x.sumOrder > 0) {
                    x.sumOrder = x.sumOrder - 1
                    data.sumOfPrice -= x.harga
                } else {
                    x.sumOrder = 0
                }
            }
        })
    } else if (type === "drink") {
        data.drink.map(x => {
            if (x.id === id) {
                if (x.sumOrder > 0) {
                    x.sumOrder = x.sumOrder - 1
                    data.sumOfPrice -= x.harga
                } else {
                    x.sumOrder = 0
                }
            }
        })
    }
    render()
    sumDataFood()
    sumDataDrink()
}

const btnTambah = (id, type) => {
    if (type === "food") {
        data.food.map(x => {
            if (x.id === id) {
                x.sumOrder = x.sumOrder + 1
                data.sumOfPrice += x.harga
            }
        })
    } else if (type === "drink") {
        data.drink.map(x => {
            if (x.id === id) {
                x.sumOrder = x.sumOrder + 1
                data.sumOfPrice += x.harga
            }
        })
    }
    render()
    sumDataFood()
    sumDataDrink()

}

const sumDataFood = () => {
    data.sumOrderOfFood = 0;
    data.food.map(x => {
        data.sumOrderOfFood += x.sumOrder
    })
    _sumOrderFood.innerText = data.sumOrderOfFood
}

const sumDataDrink = () => {
    data.sumOrderOfDrink = 0;
    data.drink.map(x => {
        data.sumOrderOfDrink += x.sumOrder
    })
    _sumOrderDrink.innerText = data.sumOrderOfDrink
}



