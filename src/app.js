import React, {useEffect, useState, useCallback} from 'react';
import './style.css';
import Phaser from "phaser";
import App1 from "./components/app1";
import scene1 from "./components/s1";
import endscene from "./components/end";
import DialogBox from "./components/dialogbox";
import m from './components/ghost_000.png';
import g1 from './components/obj_0010_Layer-11.png'
import g2 from './components/obj_0011_Layer-12.png'
import g3 from './components/obj_0012_Layer-13.png'
import b from './components/mixkit-arcade-game-jump-coin-216.wav';


class TitleScene extends Phaser.Scene{
  constructor(){
      super({key: 'TitleScene'});
  }
  
  preload(){
    this.textures.addBase64('g1', g1);
    this.textures.addBase64('g2', g2);
    this.textures.addBase64('g3', g3);
    this.load.spritesheet('cat', m, { frameWidth: 32, frameHeight: 32 });
    this.load.audio('button', b);

  }
  create(){
    var button = this.sound.add('button', {loop: false});
    var gro1 =  this.add.image(30, 530, 'g1')
    .setScale(4);
    var gro2 =  this.add.image(90, 530, 'g2')
    .setScale(4);
    var gro21 =  this.add.image(150, 530, 'g2')
    .setScale(4);
    var gro22 =  this.add.image(210, 530, 'g2')
    .setScale(4);
    var gro23 =  this.add.image(270, 530, 'g2')
    .setScale(4);
    var gro24 =  this.add.image(330, 530, 'g2')
    .setScale(4);
    var gro25 =  this.add.image(390, 530, 'g2')
    .setScale(4);
    var gro26 =  this.add.image(450, 530, 'g2')
    .setScale(4);
    var gro27 =  this.add.image(510, 530, 'g2')
    .setScale(4);
    var gro28 =  this.add.image(570, 530, 'g2')
    .setScale(4);
    var gro29 =  this.add.image(630, 530, 'g2')
    .setScale(4);
    var gro30 =  this.add.image(690, 530, 'g2')
    .setScale(4);
    var gro31 =  this.add.image(750, 530, 'g2')
    .setScale(4);
    var gro32 =  this.add.image(810, 530, 'g2')
    .setScale(4);
    var gro33 =  this.add.image(870, 530, 'g2')
    .setScale(4);
    var gro34 =  this.add.image(930, 530, 'g2')
    .setScale(4);
    var gro3 =  this.add.image(990, 530, 'g3')
    .setScale(4);


    this.sprite = this.add.sprite(470, 480, 'cat', 32);
    this.sprite.setScale(3, 3);
    const clickButton = this.add.text(420, 250, 'START', { fill: '#0f0' })
    .setFontSize(60)
    .setInteractive()
    .setFontFamily('VT323')
    .on('pointerover', () => { clickButton.setStyle({fill: '#0000FF'}) })
    .on('pointerout', () => { clickButton.setStyle({fill: '#0f0'}) })
    .on('pointerdown', () =>  {
        console.log("meow");
        this.scene.start("scene1");
        button.play();
        const currMessage = 0;
        const cEvent = new CustomEvent('new-dialog', {detail: {currMessage},});
        window.dispatchEvent(cEvent);
    });

    this.anims.create({
      key: "walk",
      frameRate: 4,
      frames: this.anims.generateFrameNumbers("cat", {start: 32, end:35}),
      repeat: -1
    });

    this.sprite.anims.play('walk');
      
  }
  
}


function App() {
  const [messages, setMessage] = useState('');
  const [currMessage, setCurrMessage] = useState(0);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [showList, setShowList] = useState(false);
  
  
  const startMessage = [
    'hello user!',
    "Welcome to taskDrop, a productivity web app designed to help you have more fun while organizing your tasks",
    "As you can see, you have a little cat here to keep you company, you can click to make it walk or hover your mouse over it to play with it",
    "When you complete a certain amount of tasks you will gain affection points from your cat!",
    "Let's begin by adding some tasks you would like to complete today, try to add at least 3 tasks",
    "Click 'done' once you've finished entering the tasks you wish to complete."
  ];

  const nextMessage = [
    "great job!",
    "By listing and organizing the things you need to do, you have taken the first step towards accomplishing your tasks!",
    "If you have some more specific goals in mind that won't translate well into a list, click 'Other Goals' where you'll have more free space to write out your thoughts and plans.",
    "Now try working on these tasks, and if you need to add more tasks feel free to come back and add some",
    "When you're finished for the day, click 'finish'."
  ];

  const finishMessage = [
    "Congratulations!",
    "Accomplishing the tasks you need to do isn't always an easy thing, so whether or not you completed all of them, you should give yourself a pat on the back for getting through the day :)",
    "Come back again soon!"
  ];

  const dialogues = [startMessage, nextMessage, finishMessage];

  useEffect(() => {
    const game = new Phaser.Game({
        type: Phaser.AUTO,
        orientation: Phaser.Scale.LANDSCAPE,
        scale: {
          mode: Phaser.Scale.ENVELOP,
        },
        parent: 'phaser-game',
        scene: [TitleScene, scene1, endscene],
        backgroundColor: '#608cbc'
    });

    const dialogBoxEventListener = ({ detail }) => {
      setCurrMessage(detail.currMessage);
      setMessage(
        dialogues[detail.currMessage]
      );
      setShowDialogBox(true);
    };
    window.addEventListener('new-dialog', dialogBoxEventListener);

    const listEventListener = ({ detail }) => {
      setShowList(true);
    };
    window.addEventListener('new-list', listEventListener);

    const finishedEventListener = () => {
      setShowList(false);
    }
    window.addEventListener('finish', finishedEventListener);

    return () => {
        window.removeEventListener('new-list', listEventListener);
        window.removeEventListener('new-dialog', dialogBoxEventListener);
        window.removeEventListener('finish', finishedEventListener);
    };
  }, [setCurrMessage, setMessage]);

  const handleMessageIsDone = useCallback(() => {
    const customEvent = new CustomEvent(`end-${currMessage}-dialog`);
    window.dispatchEvent(customEvent);
    setMessage('');
    setCurrMessage('');
    setShowDialogBox(false);
    if(currMessage < 2){
      setShowList(true);
    }
    
  }, [currMessage]);


  return (
    <div id = "phaser-game">
      <div 
      style={
        {position: 'absolute',
        right: 500,
        padding: 70,
        }}>
        {showDialogBox ? 
          <>
            <DialogBox 
            messages = {messages}
            onDialogEnded={handleMessageIsDone}
            />    
          </>
          :null
        }

        {showList ?
          <App1
          currMessage = {currMessage}
          />
          :null
        }
      </div>
      <link href="https://fonts.cdnfonts.com/css/common-pixel" rel="stylesheet"></link>
      <link href='https://fonts.googleapis.com/css?family=VT323' rel='stylesheet' type='text/css'></link>
    
    </div>
  );


}
  
export default App;

  
  
    

  


  

  
  
  
  