import { calculateAxisSteps } from '@/utils/calculateAxisSteps';

describe('calculateAxisSteps', () => {
  it('должна возвращать корректные шаги', () => {
    expect(calculateAxisSteps(20, 560, 6)).toEqual([0, 100, 200, 300, 400, 500, 600]);
    expect(calculateAxisSteps(1156, 8900, 6)).toEqual([0, 2000, 4000, 6000, 8000, 10000]);
    expect(calculateAxisSteps(156000, 201000, 5)).toEqual([140000, 160000, 180000, 200000, 220000]);
    expect(calculateAxisSteps(50, 78, 4)).toEqual([50, 60, 70, 80]);

    // Corner cases
    expect(calculateAxisSteps(510, 5100, 1)).toEqual([0, 2000, 4000, 6000]);
    expect(calculateAxisSteps(510, 510, 2)).toEqual([500, 510, 520]);
  })
});
