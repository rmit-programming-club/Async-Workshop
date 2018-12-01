/*
 * Welcome to the programming club async workshop!
 * I have decided that I would like to take some inspiration and go for a 
 * silent workshop. I wont be talking, but you can ask questions and I will
 * answer them in the comments.
 */


/*
 * I will be going through the following concepts:
 * - What is Async? Below
 * - Promises
 * - Common mistake with Async
 * - Async / Await syntax
 * - Considerations with asynchronous programming
 */


/*
 * Asynchronous programming is a way of running two things at the same time.
 * The need for it usually comes for when there is a task that takes some
 * time to complete and you want to do other things while you are waiting.
 * For instance, it can often take quite a bit of time to pull things from
 * web server, and you usually want to still interact with the user while
 * something is downloading. This requires asynchronous programming.
 *
 * The perfect analogy is putting on the kettle and doing other things while
 * waiting for the kettle to boil. Even though boiling a kettle doesn't require
 * that much effort, it requires a lot of time that is wasted if you don't spend
 * on other things. Once it is boiled, you usually want to do something with
 * the boiled water.
 *
 * Some of these concepts can be applied to threading. Threading is useful for updating progress bars when something
 * complicated is being computed as well as using the entire CPU and not only
 * one core for your application. It can greatly increase the performance of
 * performance critical applications if used correctly.
 *
 * That being said, in many implementations of async, one cpu core just runs a little
 * bit of each operation at a time to get all of them done. To truly have two
 * pieces of code running at the same time, you need something called threads.
 * The concepts here apply to threads as well. But using threads is where you
 * get the real performance benefits.
 *
 * JS doesn't support threads and prides itself on shielding it's users from their horrors
 * and bugs. So this is just plain old async.
 *
 * It is also useful for getting jobs! It's loved by employers.
 */

/*
 * Let's take a look at our first piece of asynchronous code. Something you
 * would likely see in js, fetching the content of another website.
 */


// Fetch exists in normal JS, but does not exist in nodejs, so I need to import
// it. If you are working with browsers, don't worry about this line
let fetch = require('node-fetch');

function callWhenDone(result){
  console.log("Got the website");
}

fetch("http://may.hazelfire.org").then(callWhenDone);

console.log("Started operation");

/*
 * One thing to note here is that although the logging of the website appears
 * before the code that prints that the "promise has started", "promise has started"
 * gets printed first, to demonstrate I'll excetute this.
 *
 * This often trips people up when they first see it. Be aware that the code
 * in the then function will be called well and truly later than the code
 * that's outside.
 */

/*
 * So how does this work exactly? It works through the use of callbacks. A callback
 * is a function you give that gets called later, in this case it is callWhenDone.
 */

/*
 * All asynchronous programs will make use of callbacks. However, there has
 * recently been a particular type of architecure for asynchronous programming
 * that has caught fire called Promises
 */

/* 
 * A promise is an object that essentially represents a promise to return something
 * in the future, it doesn't have it yet, but it may.
 *
 * The promise is then rejected or resolved depending on whether the operation was
 * successful or not. Let's take a look at what this looks like.
 */

function asyncCode(resolve, reject){
  setTimeout(() => resolve({shots: 2}), 1000 );
}

let promise = new Promise(asyncCode);

function callWhenDone(cofee){
  console.log(cofee);
}

promise.then(callWhenDone);

/* 
 * The .then method on the promise adds a function that gets called with the
 * result when the task is finished. If you haven't noticed already, fetch
 * also returns a promise.
 */

/*
 * In this example, the promise does get resolved successfully, and we get our
 * hot water for our coffee.
 */

/*
 * It can also be rejected, and the promise may not be fulfilled. To demonstate:
 */

function asyncCode(resolve, reject){
  setTimeout(() => reject({milk: 2, water: 1}), 1000 );
}

let promise = new Promise(asyncCode);

function callWhenDone(cofee){
  console.log(cofee);
}

function callWhenFail(notcofee){
  console.log("Failure to make Cofee");
  console.log(notcofee);
}

promise.then(callWhenDone).catch(callWhenFail);

/*
 * This is really cool, but it becomes a problem of nesting when there is a chain
 * of actions that are needed to be completed. To demonstate, the parsing of
 * a webpage into text is (for some reason that I am unaware of) an asynchronous
 * operation. So let's print the content of a webpage.
 */



let fetch = require('node-fetch');

function callWhenDone(result){
  console.log("Got the website");

  function callWhenFinallyFuckingParsed(text){
    console.log(text);
  }
  result.text().then(callWhenFinallyFuckingParsed);
}

fetch("http://may.hazelfire.org").then(callWhenDone);

console.log("Started operation");



/* 
 * This gets very bad very quickly. Imagine if you needed data from that page
 * to then fetch another page. It gets quite intense.
 */

/*
 * But we have something that can save us from all this! And it's the async / await
 * syntax.
 */

let fetch = require('node-fetch');

async function getMay(){
  let response = await fetch('http://may.hazelfire.org');
  let text = await response.text();

  return text;
}

getMay().then(console.log);

/*
 * With this, you create async functions, these are actually just promises
 * but with better syntax. To resolve a promise, you return a value. To reject
 * a promise, you raise an exception. Simple!
 */

/* 
 * But the coolest part is the await keyword, which allows us to wait until
 * something is finished before moving to the next line. Making the async code
 * look like normal everyday code
 */

/* Enough talk, lets code */












/* 
 * One last thing to look out for is that when two threaded pieces of code
 * access the same function or resource. Strange things can occur. For instance.
 * If we have a function that simply return the next number in a counter:
 */

let counter = 0;

function add1(){

  counter++;

  return counter;
}

/*
 * And we then have two threads that can access this function.
 * Then you get undesirable results. This is called a race condition.
 */

let promise1 = new Promise(add1);
let promise2 = new Promise(add1);

/*
 * For race conditions to exist, you need to have proper threads that truly
 * run two things at the same time, not the BS stuff that js has. But if js
 * was threaded, what would this look like?
 */ 


/* Awesome!! Any questions? */





/* 
 * Because you guys have been so good, I made a program for you!
 *
 * Pass the parcel using functions that return other functions! We'll start with
 * someone, and they get a gift from the parcel! Once you have opened the parcel,
 * you must give it to someone who has not been given the parcel yet.
 * I actually have the last gift in the center of the parcel. So the winner gets
 * a prize.
 *
 * I'll start with  Tom
 */

