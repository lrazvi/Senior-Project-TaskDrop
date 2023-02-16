import React, {useEffect} from "react";
import Phaser from "phaser"; 
import m from './ghost_000.png';
import g1 from './obj_0010_Layer-11.png'
import g2 from './obj_0011_Layer-12.png'
import g3 from './obj_0012_Layer-13.png'
import s from './mixkit-bonus-earned-in-video-game-2058.wav'
import w from './sfx-animal-cat3.mp3'
import b from './mixkit-arcade-game-jump-coin-216.wav';

export default class scene1 extends Phaser.Scene{
    constructor(){
        super("scene1");
    }
    
    preload(){
        this.load.spritesheet('cat', m, { frameWidth: 32, frameHeight: 32 });
        this.textures.addBase64('g1', g1);
        this.textures.addBase64('g2', g2);
        this.textures.addBase64('g3', g3);
        this.load.audio('ding', s);
        this.load.audio('meow', w);
        this.load.audio('button', b);
    }
    create(){
        //
        var ding = this.sound.add('ding', { loop: false });
        var meow = this.sound.add('meow', { loop: false });
        var button = this.sound.add('button', {loop: false});
        this.sprite = this.add.sprite(300, 490, 'cat', 12);
        this.sprite.setScale(2, 2);

        
        const endEventListener = ({ detail }) => {
            this.scene.start("end");
        };
        window.addEventListener('endscene', endEventListener);

        const dingEventListener = () => {
            ding.play();
        }
        window.addEventListener('ding', dingEventListener);

        const meowEventListener = () => {
            meow.play();
        }
        window.addEventListener('meow', meowEventListener);

        const buttonEventListener = () => {
            button.play();
        }
        window.addEventListener('button', buttonEventListener);

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

        this.anims.create({
            key: "idle",
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("cat", {start: 12, end:15}),
            repeat: -1
        });

        this.anims.create({
            key: "walk",
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("cat", {start: 32, end:35}),
            repeat: -1
        });

        this.anims.create({
            key: "play",
            //x: 500,
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("cat", {start: 72, end:76}),
            repeat: -1
        });

        this.sprite.setInteractive();
        this.sprite.on('pointerover', () => {
            this.sprite.anims.play("play");
            //meow.play();
        });

        this.point = this.input.mousePointer
 
        this.sprite.on('pointerout', () => {this.sprite.anims.play("idle")});
        this.sprite.anims.play("idle");
    }
    update(){
        if(this.point.isDown){
            //console.log(this.point.x);
            //this.moveTo(this.point, this.point.x, this.sprite.y, 100);
            this.sprite.anims.play("walk");
                if (this.sprite.x >= 1040){
                    this.sprite.x = 50;
                    //console.log(sprite.x)
                }
            this.sprite.x += 8;
        }

        // if(!this.heart.visible){
        //     this.heart.visible = true;
        // }

    
    }
}