export function toKhmerNumber(num: number): string {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return num
    .toString()
    .split('')
    .map((char) => {
      const digit = parseInt(char, 10);
      return isNaN(digit) ? char : khmerDigits[digit];
    })
    .join('');
}
