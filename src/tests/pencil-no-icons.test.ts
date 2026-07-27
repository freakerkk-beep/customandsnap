import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { pencilClickerProduct } from '../products/pencil-clicker';
import { normalizeSingleKeyText } from '../../shared/sanitize';

describe('bút chì chỉ dùng chữ và số', () => {
  it('không cung cấp lựa chọn icon', () => {
    assert.deepEqual(pencilClickerProduct.icons, []);
  });

  it('chỉ giữ một chữ hoặc số và bỏ ký tự đặc biệt', () => {
    assert.equal(normalizeSingleKeyText('ế'), 'E');
    assert.equal(normalizeSingleKeyText('7'), '7');
    assert.equal(normalizeSingleKeyText('★'), '');
  });
});
