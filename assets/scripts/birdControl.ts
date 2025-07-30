import { _decorator, Component, Node, RigidBody2D, v2 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("birdControl")

export class birdControl extends Component {


  start() {

  }

  update(deltaTime: number) {}

  fly () {
    this.getComponent(RigidBody2D).linearVelocity = v2(0, 2);
  }
}
