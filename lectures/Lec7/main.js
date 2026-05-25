// function delay(ms, resolveValue) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(resolveValue);
//     }, ms);
//   });
// }

// async function main() {
//   console.time();
//   console.log(1);
//   const resp = await delay(3000, 1);
//   console.log(resp);
//   const resp2 = await delay(5000, 1);
//   console.log(resp2);
//   console.log(4);
//   console.timeEnd();
// }

// main();

// async function main() {
//   console.time();
//   console.log(1);
//   const [resp1, resp2] = await Promise.all([delay(3000, 2), delay(5000, 3)]);
//   console.log(4);
//   console.timeEnd();
// }
// main();

// const data = fetch("https://dummyjson.com/users")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// TASKS

// async function totalPrice() {
//   try {
//     const resp = await fetch("https://dummyjson.com/products");
//     const data = await resp.json();
//     const sumPrice = data.products.reduce((tot, cur) => tot + cur.price, 0);
//     return sumPrice;
//   } catch (e) {
//     console.log(e);
//   }
// }

// console.log(await totalPrice());

// const users = [];
// async function main() {
//   try {
//     const [resp1, resp2] = await Promise.all([
//       fetch("https://dummyjson.com/users"),
//       fetch("https://jsonplaceholder.typicode.com/users"),
//     ]);
//     const [data1, data2] = await Promise.all([resp1.json(), resp2.json()]);

//     data1.users.forEach((user) => {
//       users.push({
//         fullName: `${user.firstName} ${user.lastName}`,
//         email: user.email,
//         phone: user.phone,
//       });
//     });

//     data2.forEach((user) => {
//       users.push({
//         fullName: user.name,
//         email: user.email,
//         phone: user.phone,
//       });
//     });

//     console.log(users);
//   } catch (e) {
//     console.log(e);
//   }
// }

// main();
