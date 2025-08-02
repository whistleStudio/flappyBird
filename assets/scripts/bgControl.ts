import { _decorator, Component, instantiate, Node, Prefab, resources, Sprite, SpriteFrame, UITransform } from "cc";
import { birdControl } from "./birdControl";
const { ccclass, property } = _decorator;
import { StateManager, GameState } from "./StateManager";

@ccclass("bgControl")
export class bgControl extends Component {
  @property
  speed: number = 20;

  @property(Prefab)
  bgPrefab: Prefab = null;

  @property(birdControl)
  birdControl: birdControl = null;

  width: number = 0;

  start() {
    // 创建一个精灵节点并设置其精灵帧
    const bg2Node = instantiate(this.bgPrefab);
    this.width = this.node.children[0].getComponent(UITransform).width;
    bg2Node.setPosition(this.width, 0); // 设置初始位置在屏幕右侧
    // 将精灵节点添加到场景中
    this.node.addChild(bg2Node);

    // 监听点击事件
    for (let bg of this.node.children) {
      bg.on(Node.EventType.TOUCH_START, () => {
        if (StateManager.getInstance().gameState === GameState.GAME_OVER) return
        this.birdControl.fly();
      }, this);
    }
  }

  update(deltaTime: number) {
    if (StateManager.getInstance().gameState === GameState.GAME_OVER) return
    // 滚屏
    for (let bg of this.node.children) {
      bg.setPosition(bg.position.x - this.speed * deltaTime, bg.position.y);
      // 如果背景移出屏幕左侧，则将其移动到屏幕右侧
      if (bg.position.x <= -this.width) {
        bg.setPosition(bg.position.x + 2 * this.width, bg.position.y);
      }
    }
  }
}
