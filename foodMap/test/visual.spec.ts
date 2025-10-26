import fs from 'fs';
import { test, expect } from '@playwright/test';

test('전체 페이지 캡처', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  await page.screenshot({
    path: 'current.png',
    fullPage: true,
  });

  const baseline = fs.readFileSync('baseline/full.png');
  const current = fs.readFileSync('current.png');

  expect(current).toEqual(baseline);
});
