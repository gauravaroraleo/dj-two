function setup() {
    c1 = createCanvas(500, 500);
    c1.center();
    v1 = createCapture(VIDEO);
    v1.hide();
    pn = ml5.poseNet(v1, modelLoaded);
    pn.on('pose', gotPoses)
}

function modelLoaded() {
    console.log("model loaded")


}

function draw() {
    image(v1, 0, 0, 500, 500);
    fill("red");
    s1status=s1.isPlaying();
    s2status=s2.isPlaying();
    if(rwscore>0.2){
        circle(rwx, rwy,20);
        s1.stop();
        if(s2status==false){
            s2.play();
            document.getElementById("song_name").innerHTML="playing music 2";

        }
        
    }
    if(lwscore>0.2){
        circle(lwx,lwy,20);
        s2.stop();
        if(s1status==false){
            s1.play();
                        document.getElementById("song_name").innerHTML="playing music 1";

            
        }
        
        
    }
    
    
    
    
    
    

}
s1 = ""
s2 = ""

function preload() {
    s1 = loadSound("music.mp3");
    s2 = loadSound("music2.mp3")
}
rwx = 0;
lwx = 0;
rwy = 0;
lwy = 0;
rwscore = 0;
lwscore = 0;
s1status="";
s2status="";

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        rwx = results[0].pose.rightWrist.x;
        lwx = results[0].pose.leftWrist.x;
        console.log("rwx=" + rwx + "lwx=" + lwx);
        rwy = results[0].pose.rightWrist.y;
        lwy = results[0].pose.leftWrist.y;
        console.log("lwy=" + lwy + "rwy=" + rwy);
        rwscore = results[0].pose.keypoints[10].score;
        lwscore = results[0].pose.keypoints[9].score;
console.log("rw score is"+rwscore);
        console.log("lw score is"+lwscore);

    }

}
