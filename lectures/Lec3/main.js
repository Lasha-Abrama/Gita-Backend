// #1
// let nums = [];
// for (let i = 1; i <= 10; i++) {
//   nums.push(i);
// }

// #2
// let nums = [20, 54, 432, 65, 21, 757, 3, 63, 25];
// option 1
// const maxElement = Math.max(...nums);
// console.log(maxElement);
// option 2
// let maxElement = nums[0];
// for (let i = 1; i < nums.length; i++) {
//   if (nums[i] > maxElement) {
//     maxElement = nums[i];
//   }
// }
// console.log(maxElement);
// option 3
// const maxNum = nums.sort((a, b) => a - b)[nums.length - 1];
// console.log(maxNum);

// #3
// const arr = [1, "2", false, 3, {}, [1, 2], "test", 4];
// const numsArr = [];
// for (let i = 0; i < arr.length; i++) {
//   if (typeof arr[i] === "number") {
//     numsArr.push(arr[i]);
//   }
// }
// console.log(numsArr);

// #4
// const nums = [20, 54, 432, 65, 20, 757, 3, 65, 20];
//option 1
// console.log(Array.from(new Set(nums)));
//option 2(better)
// const uniqElements = [];
// for (let i = 0; i < nums.length; i++) {
//   if (!uniqElements.includes(nums[i])) {
//     uniqElements.push(nums[i]);
//   }
// }
// console.log(uniqElements);

// #5
// const nums = [20, 54, 432, 65, 25, 757, 3, 67, 28];
// const evenNums = [];
// const oddNums = [];
// for (let i = 0; i < nums.length; i++) {
//   if (nums[i] % 2 === 0) {
//     evenNums.push(nums[i]);
//   } else {
//     oddNums.push(nums[i]);
//   }
// }
// console.log(evenNums);
// console.log(oddNums);

// #6
// const nums = [20, 54, 432, 65, 25, 757, 3, 67, 28, -21, -53, -6, -19, -67];
// const result = [];
// let count = 0;
// let sumNegatives = 0;
// for (let i = 0; i < nums.length; i++) {
//   if (nums[i] > 0) {
//     count++;
//   } else {
//     sumNegatives += nums[i];
//   }
// }
// result.push(count);
// result.push(sumNegatives);
// console.log(result);

// #7
const nums = [20, 54, 432, 65, 20, 757, 3, 65, 20];
const uniqElements = [];
let sum = 0;
for (let i = 0; i < nums.length; i++) {
  if (!uniqElements.includes(nums[i])) {
    uniqElements.push(nums[i]);
    sum += nums[i];
  }
}
console.log(sum);
