define(["game","hud","background","startup","asteroids","cannon"],function(e,t,n,r,i,s){var o={game:null,physics:null,gamePaused:!1,asteroidCount:0,asteroids:null,HUDcontext:null,startup:null,hud:null,score:0,currentLevelData:null,pauseGame:function(e){o.gamePaused=e,o.asteroids.ready=!e},pause:function(){o.game.pause(o.hud.isPaused(),o.pauseGame)},init:function(u,a){function S(){o.score+=20,o.hud.scoreSpan.text(o.score)}function x(){o.startup.currentLevelIndex===0&&(o.score-=5),o.startup.currentLevelIndex==1&&(o.score-=10),o.startup.currentLevelIndex==2&&(o.score-=15),o.hud.scoreSpan.text(o.score)}function T(){return o.score}function N(){var e=y[o.startup.currentLevelIndex],t=e*d,n=b*20,r="Congrats "+$("#username").text()+"\n"+"Points at start: 2500"+"\n"+"Points spent on shots: "+t+" ("+d+" shots @ "+e+" points each)\n"+"Points gained for asteroid hits: "+n+" ("+b+" hits @ 20 points per hit)\n"+"Total points: "+o.score;return r}var f=o.game=new e({canvasWidth:u,canvasHeight:a}),l=o.physics=f.gamePhysics();f.preload([{id:"cannonBase",src:"imgs/cannon_base.png"},{id:"cannon",src:"imgs/cannon.png"},{id:"gameStart",src:"imgs/gameStart.png"},{id:"gameScore",src:"imgs/gameScore.png"},{id:"nightSkyBackground",src:"imgs/nightSkyBackground.png"},{id:"earthBackground",src:"imgs/earthBackground.png"}]);var c=!1,h="right",p=!0,d=0,v=0,m=[10,8,5],g=[500,400,300],y=[5,10,15],b=0,w=f.stageRect(),E=new s(f,{x:3,y:21,cannonBase:f.image("cannonBase"),cannon:f.image("cannon")});$(window).on("gameView",function(e,t){E.enableKeyboardControl(t)}),o.asteroids=new i(f.gamePhysics(),{contactCallback:function(e,t,n){this.id=="asteroid"&&n.id=="ball"&&(o.asteroids.explodeBody(this),f.destroyBody(n))}}),o.asteroids.makeAsteroids(),new n.Moving(f.gamePhysics(),{imageSource:f.image("nightSkyBackground"),move:"vertical",speed:.2}),new n.Static(f.gamePhysics(),{imageSource:f.image("earthBackground")}),$(window).on("asteroidExploded",function(){--o.asteroidCount,S(),b++}),$(window).on("shotFired",function(){++d,x(),d>g[o.startup.currentLevelIndex]&&(f.end(),o.asteroids.ready=!1)}),$(window).on("asteroidAboutToBeMade",function(){o.asteroidCount>m[o.startup.currentLevelIndex]&&(o.score=0,o.hud.scoreSpan.text(o.score),f.gameEndMessage="Ooops... Game End",f.end(),o.asteroids.ready=!1)}),$(window).on("asteroidMade",function(){++o.asteroidCount,++v,v>50&&(f.gameEndMessage="Game End",f.end(),o.asteroids.ready=!1)}),o.startup=new r({game:f,startGame:function(){o.hud.gameStarted(),f.pause(!1,o.pauseGame),f.start()},imageSrc:f.image("gameStart"),stageRect:w,levels:["Level 1","Level 2","Level 3"],levelExplaination:["Number of shots: 500\nCost of 1 shot: 5 points\nNumber of asteroids: 50\nAsteroids visible: < 11","Number of shots: 400\nCost of 1 shot: 10 points\nNumber of asteroids: 50\nAsteroids visible: < 8","Number of shots: 300\nCost of 1 shot: 15 points\nNumber of asteroids: 50\nAsteroids visible: < 5"]}),o.hud=new t({restart:function(){o.asteroids.destroyAllAsteroids(),o.asteroidCount=0,o.game.pause(!1,o.pauseGame),o.score=2500,o.hud.scoreSpan.text(o.score),d=0,v=0,b=0,$(window).trigger("gameStart")},levelChanged:function(){o.asteroids.destroyAllAsteroids(),o.asteroidCount=0,o.game.pause(!0,o.pauseGame),o.score=2500,o.hud.scoreSpan.text(o.score),d=0,v=0,b=0,o.startup.show()},pause:o.pause}),o.hud.scoreSpan.text(0),o.pauseGame(!0),f.initLeader(T,N),o.score=2500,o.hud.scoreSpan.text(o.score),f.smallScreen&&(E.enableKeyboardControl(!1),$("#arrowsDiv").css("top",-60),$("#fireButtonDiv").css("top",-40),$("*").addClass("nocursor"))}};return o});