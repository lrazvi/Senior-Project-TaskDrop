import Phaser from "phaser";
import m from './ghost_000.png';
import w from './sfx-animal-cat3.mp3'

export default class endscene extends Phaser.Scene{
    constructor(){
        super("end");
    }

    preload(){
        this.load.spritesheet('cat', m, { frameWidth: 32, frameHeight: 32 });
        this.load.audio('meow', w);
    }

    create(){
        const currMessage = 2;
        const cEvent = new CustomEvent('new-dialog', {detail: {currMessage},});
        window.dispatchEvent(cEvent);
        var meow = this.sound.add('meow', { loop: false });
        var sprite = this.add.sprite(500, 300, 'cat', 12);
        sprite.setScale(2, 2);

        this.anims.create({
            key: "idle",
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("cat", {start: 12, end:15}),
            repeat: -1
        });

        sprite.play("idle");
        meow.play();
    }
}