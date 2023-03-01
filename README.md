# Code Architecture

I created my project with React and Phaser. All the files I coded in are located in the src folder and within that folder I have my main file app.js, and the rest of the files I coded are in the components folder (inside the src folder). I will go through some of the important functions in these files and explain what they do. The files I will be going over are:
* app.js
* app1.js
* dialogbox.js
* messageanim.js
* s1.js

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



