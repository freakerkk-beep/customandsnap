import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const ICON_IDS = [
  'camera',
  'tennis',
  'badminton',
  'plane',
  'pickle',
  'sun',
  'headphone',
  'moon',
  'ribbon',
] as const;

const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
const iconSource = readFileSync(`${projectRoot}src/utils/icons.tsx`, 'utf8');

describe('màu chữ và icon', () => {
  it('không còn dùng SVG mask làm icon biến mất trên một số trình duyệt', () => {
    assert.doesNotMatch(iconSource, /<mask\b/);
    assert.doesNotMatch(iconSource, /mask=\{/);
  });

  it('9 icon tài sản được đưa vào SVG nội tuyến và nhận currentColor', () => {
    assert.match(iconSource, /function inlineAssetIcon/);
    assert.match(iconSource, /fill="currentColor"/);

    for (const iconId of ICON_IDS) {
      assert.match(iconSource, new RegExp(`${iconId}: inlineAssetIcon\\(${iconId}Svg\\)`));
      const svg = readFileSync(`${projectRoot}src/assets/pencil-icons/${iconId}.svg`, 'utf8');
      assert.match(svg, /<svg\b/);
      assert.match(svg, /<path\b/);
    }
  });
});
