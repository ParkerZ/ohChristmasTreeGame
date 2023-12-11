import * as ex from "excalibur";
import { Resources } from "../resources";
import { HoldableItem } from "./holdableItem";

export class Ornament extends HoldableItem {
  constructor(x: number, y: number) {
    super(x, y, 25, 20, Resources.bloop, ex.Color.Red, "ornament");
  }
}
