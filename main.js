import './style.css'
import Phaser from 'phaser'
import './factsScreen'
import './minimap'

var player;
var platforms; // creating a variable of platform to use in a function then defined later in create.
var DmgPlatforms;
var camera;
var stars
var cursors ;
var isGameOver = false;


const CanvasSize = {
  width: 500,
  height: 900,
}
const gravityChange = {
  light: 200,
  normal:600,
  heavy: 900,
}
function GroundPlatform(x,y){
  platforms.create(x,y, 'ground');
}
function xAxisPlatform(x,y){
  platforms.create(x,y, 'X-axisPlatform');
}
function DmgXPlatform(x,y){
  DmgPlatforms.create(x,y, 'DamageX-axisPlatform');
}
function yAxisPlatform(x,y){
  platforms.create(x,y, "Y-axisPlatform")
}

class MazeRunnerDemo extends Phaser.Scene{
  constructor(){
    super();
  }
  preload(){
      this.load.image('backgroundImg', 'assets/Background.png')
      this.load.image('X-axisPlatform', '/assets/floorPlatform.png')
      this.load.image('DamageX-axisPlatform','/assets/floorPlatform.png') 
      this.load.spritesheet('idlePlayer', '/assets/IDLE.png',{frameWidth:44, frameHeight:45})
      this.load.spritesheet('runPlayer', '/assets/NEWHOBBITSHEET.png',{frameWidth:60, frameHeight:50})
      this.load.spritesheet('jumpPlayer', '/assets/JUMP.png',{frameWidth:26, frameHeight:32})
  
  }
  create(){
    this.add.image(250,310, 'backgroundImg')
    this.physics.world.setBounds(0,0,1200,900);

    platforms = this.physics.add.staticGroup();  //platforms was defined in a function above called GroundPlatform, we are now setting platforms to equal to a staticGroup which allows our character to jump on and not effect its physics 
    xAxisPlatform(230,850);
    xAxisPlatform(120,650);
    xAxisPlatform(400,450);
    xAxisPlatform(600,250);

    DmgPlatforms = this.physics.add.staticGroup();
    DmgXPlatform(600,150)


    player = this.physics.add.sprite(100,750, 'idlePlayer').setSize(42,50).setOffset(1,-2)
    player.setBounce(0.2)
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('runPlayer'),
      start: 3,
      end: 6,
      frameRate: 10,
    });
    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('idlePlayer'),
      start: 0,
      end: 4,
      frameRate: 20
  });
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('runPlayer'),
    start: 0,
    end: 3,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('jumpPlayer'),
    start: 0,
    end: 4,
    frameRate: 30,
    repeat: 1
  })
  cursors = this.input.keyboard.createCursorKeys()

  this.physics.add.collider(player,platforms);

  this.physics.add.collider(player, DmgPlatforms, function (player, DmgPlatforms) {
  
  })
  }
  update(){
    if (cursors.left.isDown)
    { 
      player.setFlipX(true);
      player.setVelocityX(-160); 
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {   player.setFlipX(false);
        player.setVelocityX(160);
    
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
    
        player.anims.play('idlePlayer');
    }
    if(cursors.up.isDown){
      player.anims.play('jump', true)
    }
    
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    if (cursors.up.isDown && player.body.touching.right){
        player.setVelocityY(-330);
    
    }
    
    if (cursors.up.isDown && player.body.touching.left){
      player.setVelocityY(-330);
    
    }
  }
}










const config = {
  type: Phaser.WEBGL,
  width: CanvasSize.width,
  height: CanvasSize.height,
  canvas:gameCanvas,
  physics:{
    default: 'arcade',
    arcade:{
      gravity:{y:gravityChange.light},
      debug:true
    }
  },
    scene: MazeRunnerDemo
};
const game = new Phaser.Game(config);
