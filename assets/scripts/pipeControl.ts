import { _decorator, Component, find, Node, Prefab, UITransform, instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass("pipeControl")
export class pipeControl extends Component {
  @property
  speed: number = 50;

  pipeInterval: number = 0;

  start() {
    this.pipeInterval = find("Canvas").getComponent(UITransform).width + this.node.children[0].getComponent(UITransform).width; // 获取管道的宽度
  }

  update(deltaTime: number) {
    const {x, y} = this.node.position; // 获取管道的初始位置
    // 如果管道移出屏幕左侧，则将其移动到屏幕右侧
    if (x <= -this.pipeInterval/2) {
      this.node.setPosition(x + this.pipeInterval, y);
    } else this.node.setPosition(x - this.speed * deltaTime, y);
    
  }
}
