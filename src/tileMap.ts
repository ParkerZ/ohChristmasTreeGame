import { MAP_LAYOUT, TILE_HEIGHT, TILE_WIDTH } from "./constants";
import { InteriorCornerLeftt } from "./floorTiles/InteriorCornerLeft";
import { CaneGreenTop } from "./floorTiles/caneGreenTop";
import { CaneGreenTrunk } from "./floorTiles/caneGreenTrunk";
import { CaneRedTop } from "./floorTiles/caneRedTop";
import { CaneRedTrunk } from "./floorTiles/caneRedTrunk";
import { Floor } from "./floorTiles/floor";
import { InteriorClosed } from "./floorTiles/interiorClosed";
import { InteriorCornerRight } from "./floorTiles/interiorCornerRight";
import { SurfaceClosed } from "./floorTiles/surfaceClosed";
import { SurfaceOpenLeft } from "./floorTiles/surfaceOpenLeft";
import { SurfaceOpenRight } from "./floorTiles/surfaceOpenRight";
import { SurfaceSlopedLeft } from "./floorTiles/surfaceSlopedLeft";
import { SurfaceSlopedRight } from "./floorTiles/surfaceSlopedRight";
import { Decor } from "./items/decor";
import { Firewood } from "./items/firewood";
import { Ornament } from "./items/ornament";
import { WaterBucket } from "./items/waterBucket";
import { randomBool, randomInt } from "./utils";

export class TileMap {
  private floorTiles: Floor[] = [];

  constructor(xCenter: number, yCenter: number) {
    const rowCount = MAP_LAYOUT.length;
    const colCount = MAP_LAYOUT[0].length;

    const xOffset = xCenter - (TILE_WIDTH * colCount) / 2;
    const yOffset = yCenter - (TILE_HEIGHT * rowCount) / 2;

    const dropIndices = new Array(5)
      .fill(0)
      .reduce(
        (acc, _curr, i) => ({ ...acc, [2 * i + randomInt(2)]: true }),
        {}
      );

    let waterIndex = 0;
    let woodIndex = 0;
    let ornamentIndex = 0;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        if (colIndex == 0)
          console.log(
            xOffset + TILE_WIDTH * colIndex,
            yOffset + TILE_HEIGHT * rowIndex
          );

        switch (MAP_LAYOUT[rowIndex][colIndex]) {
          case 1:
            this.floorTiles.push(
              new SurfaceClosed(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 2:
            this.floorTiles.push(
              new SurfaceOpenLeft(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 3:
            this.floorTiles.push(
              new SurfaceOpenRight(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 4:
            this.floorTiles.push(
              new SurfaceSlopedLeft(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 5:
            this.floorTiles.push(
              new SurfaceSlopedRight(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 6:
            this.floorTiles.push(
              new InteriorClosed(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 7:
            this.floorTiles.push(
              new InteriorCornerLeftt(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 8:
            this.floorTiles.push(
              new InteriorCornerRight(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 9:
            if (randomBool()) {
              this.floorTiles.push(
                new Decor(
                  xOffset + TILE_WIDTH * colIndex,
                  yOffset + TILE_HEIGHT * rowIndex
                )
              );
            }
            break;
          case 12:
            this.floorTiles.push(
              new CaneGreenTrunk(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 13:
            this.floorTiles.push(
              new CaneGreenTop(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 14:
            this.floorTiles.push(
              new CaneRedTrunk(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          case 15:
            this.floorTiles.push(
              new CaneRedTop(
                xOffset + TILE_WIDTH * colIndex,
                yOffset + TILE_HEIGHT * rowIndex
              )
            );
            break;
          // TODO: because the decay rate differs, the drop rate should chage
          case 20:
            if (dropIndices[waterIndex++]) {
              this.floorTiles.push(
                new WaterBucket(
                  xOffset + TILE_WIDTH * colIndex,
                  yOffset + TILE_HEIGHT * rowIndex
                )
              );
            }
            break;
          case 30:
            if (dropIndices[woodIndex++]) {
              this.floorTiles.push(
                new Firewood(
                  xOffset + TILE_WIDTH * colIndex,
                  yOffset + TILE_HEIGHT * rowIndex
                )
              );
            }
            break;
          case 40:
            if (dropIndices[ornamentIndex++]) {
              this.floorTiles.push(
                new Ornament(
                  xOffset + TILE_WIDTH * colIndex,
                  yOffset + TILE_HEIGHT * rowIndex
                )
              );
            }
            break;
          default:
            break;
        }
      }
    }
  }

  getFloorTiles(): Floor[] {
    return this.floorTiles;
  }
}
