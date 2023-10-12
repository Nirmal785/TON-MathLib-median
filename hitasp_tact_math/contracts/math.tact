import "@stdlib/deploy";
import "./math_ext";


contract Math with Deployable {
    init() {

    }

    get fun sqrt(a: Int): Int {
        return sqrt(a);
    }

    get fun avg(a: Int, b: Int): Int {
        return avg(a, b);
    }

    get fun exp(a: Int): Int {
        return a.exp();
    }

    get fun log2(a: Int): Int {
        return log2(a);
    }
}