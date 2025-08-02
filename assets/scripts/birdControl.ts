import { _decorator, Component, Node, RigidBody2D, v2, Collider2D, IPhysics2DContact, Contact2DType, find, UITransform, Label, Animation } from "cc";
const { ccclass, property } = _decorator;
import { StateManager, GameState } from "./StateManager";

@ccclass("birdControl")

export class birdControl extends Component {

  scoreNode: Node = null;

  protected onLoad(): void {
    StateManager.getInstance().on("gameStateChange", () => {
      if (StateManager.getInstance().gameState === GameState.START) {
        this.getComponent(RigidBody2D).wakeUp(); // 手动唤醒刚体；一个刚体一段时间内没有受到外力或者碰撞等原因可能进入休眠状态
        this.scoreNode.getComponent(Label).string = "score " + StateManager.getInstance().currentScore;
        this.node.setPosition(-50, 20);
        this.getComponent(Animation).play("fly");
        this.scheduleOnce(() => { StateManager.getInstance().gameState = GameState.PLAYING }, 0.1); // 应该没啥用
      }
    }, this);
  }

  start() {
    // 碰撞监听
    const collider = this.getComponent(Collider2D);
    console.log("collider:", collider);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    // 获取score节点
    this.scoreNode = find("Canvas/score");
    const height = find("Canvas").getComponent(UITransform).height;
    if (this.scoreNode) {
      this.scoreNode.setWorldPosition(35, height - 20, 0);
    }
  }

  update(deltaTime: number) {}

  fly () {
    // 设置向上飞行速度，受向下重力加速度影响，自然减速上升加速下降；而不是直接setPosition设置位置
    this.getComponent(RigidBody2D).linearVelocity = v2(0, 3); 
  }
  // 碰撞回调，决定加分、游戏结束
  onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    if (otherCollider.tag === 1) {
      // 加分逻辑
      StateManager.getInstance().currentScore += 1;
      this.scoreNode.getComponent(Label).string = "score " + StateManager.getInstance().currentScore;
      console.log("加分");
    } else {
      this.getComponent(Animation).stop();
      StateManager.getInstance().gameState = GameState.GAME_OVER;
      console.log("游戏结束");
    }
  }
}
