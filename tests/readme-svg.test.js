import { esc, wrap, lines, plates } from '../scripts/readme/svg';

describe('the README drawing helpers', () => {
  test('should escape the characters XML reserves', () => {
    expect(esc(`R&D <"x">`)).toBe('R&amp;D &lt;&quot;x&quot;&gt;');
  });

  test('should break a line on a space within the budget', () => {
    expect(wrap('one two three four', 9, 3, 'x')).toEqual(['one two', 'three', 'four']);
  });

  test('should keep a word longer than the budget whole', () => {
    expect(wrap('a extraordinarily b', 5, 3, 'x')).toEqual(['a', 'extraordinarily', 'b']);
  });

  test('should stop and name text that needs more lines than it has', () => {
    expect(() => wrap('one two three four', 9, 2, 'Weather')).toThrow('"Weather" needs more than 2 lines');
  });

  test('should set lines one under the other', () => {
    expect(lines(['a', 'b'], 10, 20, 30)).toBe('<tspan x="10" y="20">a</tspan><tspan x="10" y="50">b</tspan>');
  });

  test('should escape what it sets', () => {
    expect(lines(['R&D'], 0, 0, 0)).toBe('<tspan x="0" y="0">R&amp;D</tspan>');
  });

  test('should lift the plates out of the sprite', () => {
    expect(plates('<svg width="0"><defs><pattern id="p"/></defs><symbol id="art-x"/></svg>')).toBe('<defs><pattern id="p"/></defs><symbol id="art-x"/>');
  });
});
