import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { IconId } from '../types/product';
import { getIconComponent } from '../utils/icons';

const ICON_IDS: IconId[] = [
  'heart',
  'star',
  'flower',
  'dog_feet',
  'lucky_leaf',
  'camera',
  'tennis',
  'badminton',
  'plane',
  'pickle',
  'sun',
  'headphone',
  'moon',
  'ribbon',
];

describe('màu chữ và icon', () => {
  for (const iconId of ICON_IDS) {
    it(`${iconId} nhận màu hiện tại của bộ màu`, () => {
      const Icon = getIconComponent(iconId);
      assert.ok(Icon);

      const html = renderToStaticMarkup(
        createElement(Icon, {
          style: { color: 'rgb(18, 52, 86)' },
        }),
      );

      assert.match(html, /color:rgb\(18,\s*52,\s*86\)/);
      assert.match(html, /currentColor/);
    });
  }

  it('9 SVG tài sản được tô lại bằng mask thay vì giữ màu đen gốc', () => {
    const Icon = getIconComponent('pickle');
    assert.ok(Icon);

    const html = renderToStaticMarkup(createElement(Icon));
    assert.match(html, /<mask/);
    assert.match(html, /fill="currentColor"/);
    assert.match(html, /mask="url\(#clicker-icon-/);
  });
});
