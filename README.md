# Code Architecture

I created my project with React and Phaser. All the files I coded in are located in the src folder and within that folder I have my main file app.js, and the rest of the files I coded are in the components folder (inside the src folder). I will go through some of the important functions in these files and explain what they do. The files I will be going over are:
* app.js
* app1.js
* dialogbox.js
* messageanim.js
* s1.js
Everything else in the components folder, except for the end scene, are assets for sprites, textures, and sounds.

# app.js
This file contains both the class for the Phaser start scene as well as the main function, App, where everything gets rendered, including functions from my other files.
The contend of my App function includes 4 useState hooks, 2 of them being used for keeping track of the messages in the dialogue box which are listed right under them, and the other 2 being booleans with their values determining whether or not the list and dialogue box will be displayed in the return method. 

After that, I have a useEffect hook in which I create the Phaser game and set up its initial settings, like the game canvas orientation, scale, background color, as well as the class names of all the Phaser scenes I will include in the game.
```javascript
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
```
Inside the same useEffect hook, I add some event listeners for showing the dialogue box, the list, and for finishing the game. 
```javascript
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
```
Outside of the useEffect hook I have a useCallback hook for when each dialogue message is finished. Inside the hook, I dispatch an event for the specific message finished, set the message to an empty string with the useState hook defined earlier and the dialogue box to false to make it disappear when the message is done.

Other than my App function in app.js, I actually have my start scene done in Phaser labeled as the class TitleScene. Inside TitleScene, I have the constructor which contains the key for the name of my scene, the preload, and the create function, which is how most Phaser scenes are set up. In the preload function, I load my assets which include the cat sprite, the floor tile textures, and the button audio. In the create function, I add these assets into the scene and create events for the start button, play the sounds, and create and play the animation.

Preload
```javascript
  preload(){
    this.textures.addBase64('g1', g1);
    this.textures.addBase64('g2', g2);
    this.textures.addBase64('g3', g3);
    this.load.spritesheet('cat', m, { frameWidth: 32, frameHeight: 32 });
    this.load.audio('button', b);
  }
```
Create and Play Animation
```javascript
    this.anims.create({
      key: "walk",
      frameRate: 4,
      frames: this.anims.generateFrameNumbers("cat", {start: 32, end:35}),
      repeat: -1
    });

    this.sprite.anims.play('walk');
```

# app1.js
This is the file where I created the to-do list and added the points.
I utilize an arrow function to create App1 which takes in the parameter currMessage...
At the very beginning of the function, I have many useState hooks for keeping track of the list content, inputs, points, etc.


