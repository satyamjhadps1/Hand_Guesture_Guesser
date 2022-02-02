prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});
Webcam.attach(document.getElementById("camera"));

function take_snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='cap' src='"+data_uri+"'>";
    });
}

console.log("Your Ml5 Version :" + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/rzvBm6vxW/model.json", modelloaded);

function modelloaded(){
    console.log("Model Loaded");
}

function check(){
    img = document.getElementById("cap");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if (error){
        console.log(error);
    }else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        if(prediction_1 == "Happy"){
            document.getElementById("emoji_update").innerHTML = "😀";
        }else if(prediction_1 == "Sad"){
            document.getElementById("emoji_update").innerHTML = "😔";
        }else if(prediction_1 == "Angry"){
            document.getElementById("emoji_update").innerHTML = "😤";
        }else if(prediction_1 == "Neutral"){
            document.getElementById("emoji_update").innerHTML = "Not Found";
        }

        if(prediction_2 == "Happy"){
            document.getElementById("emoji_update2").innerHTML = "😀";
        }else if(prediction_2 == "Sad"){
            document.getElementById("emoji_update2").innerHTML = "😔";
        }else if(prediction_2 == "Angry"){
            document.getElementById("emoji_update2").innerHTML = "😤";
        }else if(prediction_2 == "Neutral"){
            document.getElementById("emoji_update2").innerHTML = "Not Found";
        }
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "Your first prediction is" + prediction_1;
    speak_data_2 = "Your Second prediction is" + prediction_2;
    var utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    utter_this.rate = 1;
    synth.speak(utter_this);
}