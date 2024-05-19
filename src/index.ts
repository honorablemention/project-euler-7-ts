/**
 * Project Euler #7
 */
class Node<T> {
    data: T;
    left: Node<T>;
    right: Node<T>;
  
    constructor(data: T) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
const isDivisibleByX = (n: number, x: number) => n % x === 0;

const makeFactorTree = (root: Node<number>, max?: number): Node<number> => {
    let m = max ?? root.data;
    if (m === 1) {
      return root;
    }
    for (let i = 2; i <= m / 2; i++) {
      if (isDivisibleByX(m, i)) {
        root.left = new Node(i);
        root.right = new Node(m / i);
        makeFactorTree(root.right, m / i);
        return root;
      }
    }
    return root;
  };

export const getPrimeFactors = <T>(node: Node<T>, primes: T[] = []): T[] => {
    if (node === null) return primes;
    if (node.left === null && node.right === null) {
      primes.push(node.data);
    }
    getPrimeFactors(node.left, primes);
    getPrimeFactors(node.right, primes);
    return primes;
  };

const nthPrimeCL = process.argv[2];
const nthPrime = parseInt(nthPrimeCL, 10);
const primes = new Set([2]);
let i = 3;
while (primes.size < nthPrime) {
    const t = new Set(getPrimeFactors(makeFactorTree(new Node(i))));
    t.forEach((v) => primes.add(v));
    i++;
}
const primesArr = Array.from(primes.values());
console.log(primesArr.slice(-1));

