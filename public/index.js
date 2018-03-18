/**
 * Created by HP-Indonesia on 22/03/2017.
 */
var TweetInputEl= document.getElementById('tweet-input-box');   //get the input box
var PrimButEl= document.getElementById('button-element');       //get message count
var tweetCountEl= document.getElementById('tweet-message-count');  //get post button: button
var TweetListContainerEl = document.getElementById("tweet-list-Container");   //get the yakker: ul container
var CipButtonEl= document.getElementById("button-element");

var maxMessageLength = 140;


function updateButton(messageLength){
    var isDisabled = messageLength === 0 || messageLength > maxMessageLength;
    PrimButEl.disabled= isDisabled;

}

function updateCharacterCount(messageLength){
    var newColor= Math.round(255 * Math.min(1,messageLength / maxMessageLength));

    tweetCountEl.innerText = maxMessageLength - messageLength;
    tweetCountEl.style.color = 'rgb(' + newColor + ',0,0)';


}

function sendMessage(){
    var CipText = TweetInputEl.value;

    if (CipText.length <= maxMessageLength) {
        var time = new Date();
        var timeText =time.getFullYear() + "-" + (time.getMonth() + 1) + '-' + time.getDate();

        var textEl = document.createElement("div");
        textEl.innerText = CipText;
        var timeEl = document.createElement("time");
        timeEl.innerText = timeText;
        var listItem = document.createElement("li");



        var data = {
            "message": CipText,
            "time": timeText
        };
        var request = new XMLHttpRequest();
        request.open("POST", "/yak");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));

        listItem.appendChild(textEl);
        listItem.appendChild(timeEl);

        //append el to the container
        TweetListContainerEl.appendChild(listItem);

        TweetInputEl.innerText = "";
        updateButton(0);
        updateCharacterCount(0);
    }

    }

    TweetInputEl.addEventListener('input', function(event){
        var messageLength = event.target.value.length;
        updateButton(messageLength);
        updateCharacterCount(messageLength);
    });


    TweetInputEl.addEventListener('keydown', function(event){
        //console.log('Test');
        if  (event.which === 13 ) {
            event.preventDefault();
            sendMessage();
        }
    });

getPosts(cb);

    document.getElementById("tweet-list-container")
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                document.getElementById("button-element").click();
            }
    });

    PrimButEl.addEventListener('click',sendMessage, false);

