import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { GameService } from 'src/app/shared/services/game.service';

interface State {
  ctx?:      CanvasRenderingContext2D;
  cnvWidth:  number;
  cnvHeight: number;
  wires:     number[];
  gameSpeed: number;
}


class Background {
  public state!: State;
  public x1!: number;
  public x2!: number;
  public img = new Image();

  constructor(state: State) {
    this.state = state;
    this.x1 = 0;
    this.x2 = this.state.cnvWidth;
    this.img.src = '/assets/game-background.png';
  }

  public draw() {
    this.state.ctx?.drawImage(this.img, this.x1, 0, this.state.cnvWidth, this.state.cnvHeight);
    this.state.ctx?.drawImage(this.img, this.x2, 0, this.state.cnvWidth, this.state.cnvHeight);
    this.x1 -= this.state.gameSpeed;
    this.x2 -= this.state.gameSpeed;

    if (this.x1 <= -this.state.cnvWidth) this.x1 = this.state.cnvWidth;
    else if (this.x2 <= -this.state.cnvWidth) this.x2 = this.state.cnvWidth;
  }
}


class Bug {
  public state!: State;
  public x: number;
  public frame: number;
  public width: number;
  public height: number;
  public img = new Image();

  constructor(state: State) {
    this.state = state;
    this.x = 10;
    this.img.src = '/assets/bug_45x35.png';
    this.frame = 0;
    this.width = this.img.width / 15;
    this.height = this.img.height;
  }

  draw(y: number) {
    this.state.ctx?.drawImage(this.img, this.frame*this.width, 0, this.width, this.height, this.x, y-this.height, this.width, this.height);
    this.frame++;
    if (this.frame >= 15) this.frame = 0;
  }
}


class Obstacle {
  public state: State;
  public x: number;
  public y: number;
  public speed: number;
  public frame: number;
  public width: number;
  public height: number;
  private img = new Image();

  constructor (state: State, dv: number) {
    this.state = state;
    this.x = this.state.cnvWidth;
    this.y = this.state.wires[Math.floor(Math.random()*this.state.wires.length)];
    this.speed = Math.floor(this.state.gameSpeed + Math.random()*dv);
    this.img.src = '/assets/obstacle_36.56x40.png';
    this.frame = 0;
    this.width = this.img.width / 18;
    this.height = this.img.height;
  }

  public draw() {
    this.state.ctx?.drawImage(this.img, this.frame*this.width, 0, this.width, this.height, this.x, this.y-this.height, this.width, this.height);
    this.frame++;
    if (this.frame >= 18) this.frame = 0;
    this.x -= this.speed;
  }
}




@Component({
  selector: 'qd-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [ fadeIn ]
})
export class GameComponent implements AfterViewInit {
  @ViewChild('canvas')
  private canvas!: ElementRef;
  private cnv!: HTMLCanvasElement;

  private readonly cnvAspectRatio = 2;
  private readonly collideErr = 5;

  constructor (
    public game_: GameService,
  ) {}

  public state: State = {
    cnvWidth: 0,
    cnvHeight: 0,
    wires: [],
    gameSpeed: 0,
  }


  // Some variables that are used to hold the game's dynamic state and data
  public background!: Background;
  public bug!: Bug;
  public bugPosition = 1;
  public first = true;
  public gameOver = true;
  public obstacles: Obstacle[] = [];
  public staggerFrames = 0;
  public score = 0;
  public level = 100;


  ngAfterViewInit(): void {
    this.cnv = this.canvas.nativeElement;

    this.state.ctx = <CanvasRenderingContext2D>this.cnv.getContext('2d');
    this.state.cnvWidth = this.cnv.width = 980;
    this.state.cnvHeight = this.cnv.height = this.state.cnvWidth/this.cnvAspectRatio;
    this.state.wires = [176, 232, 288];

    this.state.ctx.font = "22px serif";
    this.state.ctx.fillStyle = "#444";

    this.state.gameSpeed = 2;
    this.background = new Background(this.state);
    this.bug = new Bug(this.state);

    this.background.img.onload = () => this.background.draw();
    this.bug.img.onload = () => this.bug.draw(this.state.wires[1]);
  }

  public startGame() {
    this.gameOver = false;
    this.bugPosition = 1;
    this.obstacles = [];
    this.staggerFrames = 0;
    this.score = 0;
    this.level = 100;
    this.animate();
  }

  private animate() {
    this.state.ctx?.clearRect(0, 0, this.state.cnvWidth, this.state.cnvHeight);

    this.background.draw();
    this.bug.draw(this.state.wires[this.bugPosition]);

    this.obstacles.forEach((obstacle) => {
      obstacle.draw();

      // collision detection
      if (obstacle.y === this.state.wires[this.bugPosition]) {
        if (this.bug.x < obstacle.x + obstacle.width + this.collideErr && this.bug.x + this.bug.width - this.collideErr > obstacle.x) {
          this.gameOver = true;
          this.first = false;
          if (Number(localStorage.getItem("highestScore")) < this.score) localStorage.setItem("highestScore", String(this.score));
        }
      }
    });

    // remove obstacle that is out from canvas and increase score
    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.x > -50) return obstacle;
      this.score++;
      this.level -= Math.ceil((this.score/this.level));
      return;
    });

    // generate obstacles
    if (this.staggerFrames > this.level) {
      this.obstacles.push(new Obstacle(this.state, 8));
      this.staggerFrames = 0;
      if (this.level < 40) this.level = 70;
    }
    this.staggerFrames++;

    this.state.ctx?.fillText(`Score: ${this.score}`, 20, 40);

    if (!this.gameOver) this.game_.gameLoopId = requestAnimationFrame(() => this.animate());
    else this.game_.cancelGame();
  }

  public restartGame(): void {
    this.background.x1 = 0;
    this.background.x2 = this.state.cnvWidth;
    this.startGame();
  }

  public highestScore(): number {
    return Number(localStorage.getItem('highestScore'));
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.key === "ArrowUp") {
      this.bugPosition--;
      if (this.bugPosition < 0) this.bugPosition = this.state.wires.length-1;
    } else if (event.key === "ArrowDown") {
      this.bugPosition++;
      if (this.bugPosition === this.state.wires.length) this.bugPosition = 0;
    }
  }
}
