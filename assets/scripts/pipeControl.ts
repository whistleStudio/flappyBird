import { _decorator, Component, find, Node, Prefab, UITransform, instantiate } from "cc";
const { ccclass, property } = _decorator;
import { StateManager, GameState } from "./StateManager";

@ccclass("pipeControl")
export class pipeControl extends Component {
  @property
  speed: number = 50;

  pipeInterval: number = 0;

  protected onLoad(): void {
    StateManager.getInstance().on("gameStateChange", () => {
      if (StateManager.getInstance().gameState === GameState.START) {
        this.node.setPosition(130, Math.random() * 160 - 30); // 重置管道位置
      }
    }, this);
  }

  start() {
    this.pipeInterval = find("Canvas").getComponent(UITransform).width + this.node.children[0].getComponent(UITransform).width; // 获取管道的宽度
  }

  update(deltaTime: number) {
    if (StateManager.getInstance().gameState === GameState.GAME_OVER) return; // 如果游戏结束则不更新管道位置
    const {x, y} = this.node.position; // 获取管道的初始位置
    // 如果管道移出屏幕左侧，则将其移动到屏幕右侧
    if (x <= -this.pipeInterval/2) {
      this.node.setPosition(x + this.pipeInterval, Math.random() * 160 - 30); // y轴位置随机-30到130之间
    } else this.node.setPosition(x - this.speed * deltaTime, y);
    
  }
}
