song="";
leftWristx= 0;
leftWristy= 0;
rightWristx= 0;
rightWristy= 0;
scoreLeftWrist= 0;
scoreRightWrist= 0;


function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,500,400);

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2)
    {
    circle(leftWristx,leftWristy,20);
    inNumberleftWristy=Number(leftWristy);
    remove_decimal=floor(inNumberleftWristy);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="volume ="+volume;
    song.setVolume(volume);
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristx+"leftWristy = "+leftWristy);

        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristx+"rightWristy = "+rightWristy);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score for left wrist "+scoreLeftWrist);

        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("score for right wrist "+scoreRightWrist);
    }
}

function modalLoaded()
{
    console.log("Modal is initialized");
}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop()
{
    song.stop();
}

function pause()
{
    song.pause();

}