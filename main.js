status="";
objects=[];
function setup() {
    canvas=createCanvas(500,500);
    video=createCapture(VIDEO);
    video.hide();
    canvas.center();
}
function start() {
    objectdect=ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("status").innerHTML="Status: Object Detecting";
objectname_inputbox=document.getElementById("label_name").value;
}
function model_loaded() {
    console.log("Model is loaded");
    status=true;
}
function draw() {
    image(video,0,0,500,500);
    if (status!="") {
        objectdect.detect(video,gotresults);
        for (let counter = 0; counter < objects.length; counter++) {
    fill("blue");
    percent=floor(objects[counter].confidence*100);
    noFill();
    stroke("blue");
    rect(objects[counter].x,objects[counter].y,objects[counter].width,objects[counter].height);
    text(objects[counter].label +" "+percent+"%",objects[counter].x+15,objects[counter].y+15);
    
    if (objects[counter].label==objectname_inputbox) {
        video.stop();
        objectdect.detect(gotresults);
        document.getElementById('status').innerHTML=objectname_inputbox+" has been found";
        speech=window.speechSynthesis;
        utter=new SpeechSynthesisUtterance(objectname_inputbox+" has been found");
        speech.speak(utter);
    } else {
        document.getElementById('status').innerHTML=objectname_inputbox+" has not been found"; 
    }
        }
    }
}
function gotresults(error,results) {
    if (error) {
     console.log(error)
    } else {
        console.log(results);
        objects=results;
    }
     
 }