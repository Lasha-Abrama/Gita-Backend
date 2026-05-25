// 1) დაწერეთ ფუნქცია რომელიც წამოიღებს დეითას ამ საიტიდან https://jsonplaceholde.typicode.com,
// url სპეციალურად არის არასწორი თქვენი მიზანია რომ როდესაც რექუსთი დაფეილდება გააკეთოთ რეთრაი 5 ჯერ.

async function fetchWithRetry(url, retries = 5) {
  for (let i = 1; i <= retries; i++) {
    try {
      const resp = await fetch(url);
      const data = resp.json();
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }
}
// fetchWithRetry("https://jsonplaceholde.typicode.com");

// 2) დაწერეთ ფუნცქია რომელიც წამოიღებს მონაცემებს ამ ორი url-დან https://dummyjson.com/users და
// https://jsonplaceholder.typicode.com/users თქვენი მიზანია დალოგოთ მხოლოდ ის რომელიც მოასწრებს დარიზოლვებას.

async function fasterFetch(url1, url2) {
  try {
    const [resp1, resp2] = await Promise.all([fetch(url1), fetch(url2)]);
    const data = await Promise.race([resp1.json(), resp2.json()]);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

// fasterFetch(
//   "https://dummyjson.com/users",
//   "https://jsonplaceholder.typicode.com/users"
// );

// 3) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას https://dummyjson.com/products ამ url-დან,
// შემდეგ გაფილტავას და დალოგავს მხოლოდ იმ პროდუქტებს რომელთა ფასიც არის 10-ზე მეტი

async function priceMoreThan10(url, price = 10) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();

    const filteredData = data.products.filter((product) => product.price > 10);
    console.log(filteredData);
  } catch (e) {
    console.log(e);
  }
}
// priceMoreThan10("https://dummyjson.com/products");

// 4) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას ამ url-დან https://dummyjson.com/users,
// გაფილტრავს მხოლოდ ისეთ იუზერებს რომელთა პროფესია არის web developer და დალოგავს მხოლოდ შემდეგ ფროფერთებს:
// სახელი, გვარი, მისამართი(ქალაქი), იმეილი და ტელეფონის ნომერი.

async function filteredFetch(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const filteredData = data.users
      .filter((user) => user.company.title === "Web Developer")
      .map((user) => {
        return {
          firstname: user.firstName,
          lastname: user.lastName,
          address: user.address.city,
          email: user.email,
          phone: user.phone,
        };
      });
    console.log(filteredData);
  } catch (e) {
    console.log(e);
  }
}
// filteredFetch("https://dummyjson.com/users");

// 5) დაწერეთ ფუნქცია რომელიც წამოიღებს იმფორმაციას ერთდროულად შემდეგი  api-დან:
// https://dummyjson.com/recipes, https://dummyjson.com/comments, https://dummyjson.com/todos,
// https://dummyjson.com/quotes და ყველას დარიზოლვებულ და ჯეისონში გადმოტრანსფორმირებულ შედეგებს დალოგავთ.
// აუცილებელია რომ ყველა გაეშვას ერთდროულად

async function main() {
  try {
    const [resp1, resp2, resp3, resp4] = await Promise.all([
      fetch("https://dummyjson.com/recipes"),
      fetch("https://dummyjson.com/comments"),
      fetch("https://dummyjson.com/todos"),
      fetch("https://dummyjson.com/quotes"),
    ]);
    const [data1, data2, data3, data4] = await Promise.all([
      resp1.json(),
      resp2.json(),
      resp3.json(),
      resp4.json(),
    ]);
    console.log(data1, data2, data3, data4);
  } catch (e) {
    console.log(e.message);
  }
}
// main();
