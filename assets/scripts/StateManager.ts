import { EventTarget } from "cc";

export enum GameState {
  START,
  PLAYING,
  GAME_OVER
}

export class StateManager extends EventTarget {
  private static instance: StateManager;
  currentScore: number = 0;
  private _gameState: GameState = GameState.START;

  private constructor() {
    super();
    // 私有构造函数，防止外部实例化
  }

  public static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  get gameState(): GameState {
    return this._gameState;
  }

  set gameState(value: GameState) {
    this._gameState = value;
    if (value === GameState.START) {
       this.currentScore = 0; // 游戏开始时重置分数
    }
    this.emit("gameStateChange");
  }
}
