import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;
import { StateManager, GameState } from "./StateManager";

@ccclass("titleControl")
export class titleControl extends Component {
  protected onLoad(): void {
    StateManager.getInstance().on("gameStateChange", () => this.node.active = StateManager.getInstance().gameState === GameState.GAME_OVER, this);
    this.node.getChildByName("Button").on(Node.EventType.TOUCH_START, () => {
      StateManager.getInstance().gameState = GameState.START;
    }, this);
  }

  start() {
    this.node.active = false; // 初始时隐藏标题界面
  }

  update(deltaTime: number) {}
}
