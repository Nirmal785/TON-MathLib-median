extends fun exp(self: Int): Int {
    if(self >= 0){
        return 1 << self;
    } else {
        return 1 >> (self * -1);
    }
}

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

inline fun avg(x: Int, y: Int): Int {
    let n: Int = (x + y) / 2;
    return n;
}

inline fun log2(x: Int): Int {
  let n: Int = 0;
  if (x >= 128.exp()) { 
    x = x >> 128; 
    n = n + 128; 
  }
  if (x >= 64.exp()) { 
    x = x >> 64;
    n = n + 64; 
  }
  if (x >= 32.exp()) {
    x = x >> 32; 
    n = n + 32; 
  }
  if (x >= 16.exp()) { 
    x = x >> 16; 
    n = n + 16; 
  }
  if (x >= 8.exp()) { 
    x = x >> 8; 
    n = n + 8; 
  }
  if (x >= 4.exp()) { 
    x = x >> 4; 
    n = n + 4; 
  }
  if (x >= 2.exp()) { 
    x = x >> 2; 
    n = n + 2; 
  }
  if (x >= 1.exp()) { 
    // x = x >> 1; 
    n = n + 1; 
  }
  return n;
}