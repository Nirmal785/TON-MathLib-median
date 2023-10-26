import "@stdlib/deploy";

contract QuadraticEquation with Deployable {
    init() {
        
    }

    get fun solve(a: Int, b: Int, c: Int): String {
        let result: Cell = solveQuadraticEquation(a, b, c);

        let slice: Slice = result.asSlice();
        if (slice.empty()) {
            return "no roots";
        } else {
            let x1: String = slice.loadInt(INT_LEN).toString();
            let x2: String = slice.loadInt(INT_LEN).toString();

            let out: StringBuilder = beginString();
            out.append(x1);
            out.append(", ");
            out.append(x2);

            return out.toString();
        }
    }
}

const INT_LEN: Int = 257;

inline fun solveQuadraticEquation(a: Int, b: Int, c: Int): Cell {
    if a == 0 {
        return emptyCell();
    }

    let d: Int = b * b - 4 * a * c;
    if (d < 0) {
        return emptyCell();
    } else {
        let x1: Int = (-b + sqrt(d)) / (2 * a);
        let x2: Int = (-b - sqrt(d)) / (2 * a);

        let result: Cell = beginCell().storeInt(x1, INT_LEN).storeInt(x2, INT_LEN).endCell();

        return result;
    }
}

// source: https://github.com/jokly/TON-MathLib/blob/main/hitasp_tact_math/contracts/math_ext.tact#L9
inline fun sqrt(x: Int): Int {
  if (x == 0){
    return 0;
  } else {
    if (x <= 3) {
      return 1;
    } else {
      let z: Int = (x + 1) / 2;
      let y: Int = x;
      while (z < y) {
          y = z;
          z = (x / z + z) / 2;
      }
      return y;
    }
  }
}
