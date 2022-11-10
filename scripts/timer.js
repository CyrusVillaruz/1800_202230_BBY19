const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');

// Input
// const hr = 0;
// const min = 0;
// const sec = 10;

// const hours = hr * 3600000;
// const minutes = min * 60000;
// const seconds = sec * 1000;
// const setTime = hours + minutes + seconds;
// const startTime = Date.now();
// const futureTime = startTime + setTime;


// const timerLoop = setInterval(countDownTimer);
// countDownTimer();

// function countDownTimer() {
//     const currentTime = Date.now();
//     const remainingTime = futureTime - currentTime;
//     const angle = (remainingTime / setTime) * 360;

//     // progress indicator
//     if (angle > 180) {
//         semicircles[2].style.display ='none';
//         semicircles[0].style.transform = 'rotate(180deg)';
//         semicircles[1].style.transform = `rotate(${angle}deg)`;
//     } else {
//         semicircles[2].style.display ='block';
//         semicircles[0].style.transform = `rotate(${angle}deg)`;
//         semicircles[1].style.transform = `rotate(${angle}deg)`;
//     }

//     // timer
//     const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
//     const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
//     const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

//     timer.innerHTML = `
//     <div>${hrs}</div>
//     <div class="colon">:</div>
//     <div>${mins}</div>
//     <div class="colon">:</div>
//     <div>${secs}</div>`;

//     // 5-second condition
//     if(remainingTime <= 6000) {
//         semicircles[0].style.backgroundColor = "red";
//         semicircles[1].style.backgroundColor = "red";
//         timer.style.color = "red";
//     }


//     // end
//     if (remainingTime < 0) {
//             clearInterval(timerLoop);
//             semicircles[0].style.display ='none';
//             semicircles[1].style.display ='none';
//             semicircles[2].style.display ='none';

//             timer.innerHTML = `
//             <div>00</div>
//             <div class="colon">:</div>
//             <div>00</div>
//             <div class="colon">:</div>
//             <div>00</div>
//             `;
//             timer.style.color = "lightgray";
//         }
// }
function startTimer() {
    var duration = document.getElementById("duration").value;
    console.log(duration);
    countdown(duration);
}
function countdown(duration) {
    console.log("in countdownn " + duration);
    // Set the date we're counting down to
    // var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

    var newDate = new Date();
    newDate.setTime(newDate.getTime() + duration*60*1000);
    var countDownDate = newDate.getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        console.log("dist is: " + distance);

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("demo").innerHTML = days + "d " + hours + "h " +
            minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}