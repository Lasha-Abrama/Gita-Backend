// 1) დაწერეთ ფუნცქია რომელიც დალოგავს მაუსის კოორდინატებს მხოლოდ მას შემდეგ რაც მაუსი გაჩერდება, გამოიყენეთ debaunce ტექნიკა. მინიშნება: window.addEventListener('mousemove',(e) => {
//     console.log(e.clientX, e.clientY)
// })

function debounce(callback, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, ms);
  };
}

window.addEventListener(
  "mousemove",
  debounce((e) => {
    console.log(e.clientX, e.clientY);
  }, 300),
);

// 2) შექმენით html-ში ბათონი და ყოველ ბათონის ქლიქზე დაარექუესთეთ შემდეგი API-დან და მიღებული შედეგი გამოაჩნიეთ https://dummyjson.com/quotes ისევე როგორც რენდომ კატის ფაქტზე ვქენით.

const quoteBtn = document.querySelector(".quoteBtn");
const quoteText = document.querySelector(".quoteText");
async function getRandQuote() {
  const resp = await fetch("https://dummyjson.com/quotes");
  const data = await resp.json();

  const randInd = Math.floor(Math.random() * data.quotes.length);
  quoteText.textContent = data.quotes[randInd].quote;
}
quoteBtn.addEventListener("click", () => {
  getRandQuote();
});

// 3) დაწერეთ ფუნცქია რომელიც წამოიღებს იუზერების ინფორმაციას შემდეგი API-დან https://dummyjson.com/users თქვენი მიზანია გააკეთოთ ფეჯინეიშენი სულ არის 200-ზე მეტი იუზერი და დიფოტად მოდის 30. მინიშნება, თუ სრულ რაოდენობას გაყოფთ ლიმიტზე მიიღებთ ფეიჯების რაოდენობას, რაც შეეხება როგორ უნდა გამოთვალოთ skip ფროფერთი. skip = (page - 1) * limit) limit = 30
const usersContainer = document.querySelector(".container");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const pages = Math.ceil(208 / 30);
let currPage = 1;
async function getUsersInfo(page) {
  const limit = 30;
  const skip = (page - 1) * limit;
  const resp = await fetch(
    `https://dummyjson.com/users?skip=${skip}&limit=${limit}`,
  );
  const data = await resp.json();
  drawUsers(data.users);
}

function drawUsers(users) {
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    const userDiv = document.createElement("div");
    const userName = document.createElement("p");
    const userEmail = document.createElement("p");
    const userPhone = document.createElement("p");
    const userAge = document.createElement("p");

    userName.textContent = `Name: ${user.firstName} ${user.lastName}`;
    userEmail.textContent = `Email: ${user.email}`;
    userPhone.textContent = `Phone: ${user.phone}`;
    userAge.textContent = `Age: ${user.age}`;

    userDiv.appendChild(userName);
    userDiv.appendChild(userEmail);
    userDiv.appendChild(userPhone);
    userDiv.appendChild(userAge);

    userDiv.style.border = "2px solid blue";

    usersContainer.appendChild(userDiv);
  });
}

prevBtn.addEventListener("click", () => {
  if (currPage > 1) {
    currPage--;
    getUsersInfo(currPage);
  }
});

nextBtn.addEventListener("click", () => {
  if (currPage < pages) {
    currPage++;
    getUsersInfo(currPage);
  }
});

getUsersInfo(currPage);

// 4) შექმენით ინფუთი სადაც იუზერი მხოლოდ რიცხვებს შეიყვანს, რიცხვის შეყვანის შემდეგ უნდა დაარექუესთოთ შემდეგ ეიპიაიზე https://myfakeapi.com/api/cars/10 10-ის ნაცვლად ჩაწერეთ იუზერის შეყვანილი ინფომრაცია, ეს ეიპიაი დაგიბრუნებთ მანქანის ინფორმაციას და გამოაჩინეტ ეს ინფორმაცია დომში. ასევე თუ არასწორი აიდი დაწერა მაგალითად 9999 ბექენდი დაგირტყავთ ერორს და გაჰენდლეთ ერორი და უთხარით იუზერს რომ სწორი აიდი შეიყვანოს, მაგალითად alert ის გამოყენებით.
const input = document.querySelector("Input");
const carInfo = document.querySelector(".carInfo");
input.addEventListener("change", async (e) => {
  const id = e.target.value;
  try {
    carInfo.innerHTML = "";
    const resp = await fetch(`https://myfakeapi.com/api/cars/${id}`);
    const data = await resp.json();

    const carDiv = document.createElement("div");
    const carName = document.createElement("p");
    const carModel = document.createElement("p");
    const carColor = document.createElement("p");
    const carYear = document.createElement("p");

    carName.textContent = `Name: ${data.Car.car}`;
    carModel.textContent = `Model: ${data.Car.car_model}`;
    carColor.textContent = `Color: ${data.Car.car_color}`;
    carYear.textContent = `Year: ${data.Car.car_model_year}`;

    carDiv.appendChild(carName);
    carDiv.appendChild(carModel);
    carDiv.appendChild(carColor);
    carDiv.appendChild(carYear);

    carDiv.style.border = "2px solid black";

    carInfo.appendChild(carDiv);
  } catch (error) {
    alert("Please enter a correct ID");
    carInfo.innerHTML = "";
  }
});
