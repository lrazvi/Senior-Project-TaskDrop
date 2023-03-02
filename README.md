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
I utilize an arrow function to create App1 which is returned in app.js.
At the very beginning of the function, I have many useState hooks for keeping track of the list content, inputs, points, etc. After that, I have many smaller arrow functions that carry out the functionality of the to-do list such as adding, deleting, and completing tasks in the list as well other elements I made with React. 
Adding and Deleting list items
```javascript
    const addTodo = (todo) => {
      const newTodo = {
        id: Math.random(),
        todo: todo,
      };

      setCurrTodo(newTodo);
      // add the todo to the list
      setList([...list, newTodo]);
      // clear input box
      setInput("");
    };
    const deleteTodo = (id) => {
      // Filter out todo with the id
      const newList = list.filter((todo) => todo.id !== id);
      setList(newList);
    };
```
Completing a task had a couple more details in the function since I correlated it with gaining points and wanted to add sound effects for these events. I created CustomEvents for when I wanted a specific sound to play (the eventListeners were defined in s1.js)
Completing a list item
```javascript
    const completeTodo = (id) => {
      // Filter out todo with the id
      const newList = list.filter((todo) => todo.id !== id);
      
      setList(newList);
      setPoint(point + 1);

      if (point%3 === 0 && point > 2){
        setAff(aff + '\u2764');

        const mEvent = new CustomEvent('meow');
        window.dispatchEvent(mEvent);
      }
      else{
        const dEvent = new CustomEvent('ding');
        window.dispatchEvent(dEvent);
      }
    };
```
The rest of the functions in this file are meant for dispatching events (for dialogues, starting a new scene, etc.) and showing/hiding certain React elements such as the Other Thoughts/Goals section.

# dialogbox.js, messageanim.js
These two files are where the dialogue box and animation of the messages are created.
In dialogbox.js, I have an arrow function (DialogBox) that is returned in my main file app.js. Inside the function I have 2 useState hooks, one using a number to track the current message and the other for tracking whether or not the message has ended. Then, I have a useCallback hook for when the message has ended. Inside the hook, I dispatch a CustomEvent for the button sound effect and make adjustments to the useState hooks based off of whether or not the message ended and the current message number.
```javascript
    const handleClick = useCallback(() => {
        const bEvent = new CustomEvent('button');
        window.dispatchEvent(bEvent);
        if (messageEnded) {
            setMessageEnded(false);
            if (currentMessage < messages.length - 1) {
                setCurrentMessage(currentMessage + 1);
            } 
            else {
                setCurrentMessage(0);
                onDialogEnded();
            }
        }
        else{
            setMessageEnded(true);
        }
    }, [currentMessage, messageEnded, messages.length,  onDialogEnded]);
```

As for messageanim.js, I also create an arrow function (Message) that is returned in dialogbox.js. I utilize the React Spring library for creating a typewriter effect to the messages that show up in the dialogue box (specifically the useTransition and animated functions) as well as the useMemo hook to get each letter to show up individually. 
```javascript
    const  items  =  useMemo(()  =>
      message.split('').map((letter, index)  =>  ({
          item:  letter,
          key: index,
        })),
      [message]
    );
  
    const  transitions  =  useTransition(items,  {
      trail:  35,
      from:  { display:  "none"  },
      enter:  { display:  ""  },
      onRest: (item) => {
        if (item.key === items.length - 1) {
            onMessageEnded();
        }
      }
    });
```

# s1.js
This file contains the main scene that the user will spend the most time in when the project runs. Similarly to my TitleScene, a new Phaser class is created, labeled scene1, where it contains the constructor, preload, and create functions, as well as an update function that keeps track of when the player clicks (to make the cat sprite walk).

The preload function is quite similar to the TitleScene except for an extra few audios. In my create function, I add all the tiles, sprites, audios, as well as the eventListeners as mentioned earlier for the audios to play at certain times. 

One difference between this scene and the others is that the cat sprite is interactive where clicking will make it walk and hovering over it with the mouse will allow the user to play with it (both of these done by creating specific animations for these events). If the mouse pointer is moved away from the cat sprite, the idle animation is the default that will play.

```javascript
        this.sprite.setInteractive();
        this.sprite.on('pointerover', () => {
            this.sprite.anims.play("play");
        });
 
        this.sprite.on('pointerout', () => 
            {this.sprite.anims.play("idle")
        });
        
        this.sprite.anims.play("idle");
```
I also have file for a finish scene (end.js), but it essentially has the same code from the TitleScene and scene1.

