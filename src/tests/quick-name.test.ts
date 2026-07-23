import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  normalizeQuickName,
  normalizeSingleKeyText,
  removeVietnameseDiacritics,
} from '../../shared/sanitize';

describe('nhập tên nhanh', () => {
  it('bỏ đúng dấu tiếng Việt, kể cả Đ/đ', () => {
    assert.equal(removeVietnameseDiacritics('NGUYỄN Đặng'), 'NGUYEN Dang');
  });

  it('NGUYỄN thành NGUYEN và tự bỏ khoảng trắng', () => {
    assert.equal(normalizeQuickName('NGUYỄN', 10), 'NGUYEN');
    assert.equal(normalizeQuickName('Nguyễn An', 10), 'NGUYENAN');
  });

  it('giới hạn tên theo số phím tối đa', () => {
    assert.equal(normalizeQuickName('ABCDEFGHIJK', 9), 'ABCDEFGHI');
  });

  it('clicker thường tự chuyển IN HOA', () => {
    assert.equal(normalizeSingleKeyText('ế'), 'E');
    assert.equal(normalizeQuickName('Nguyen', 10), 'NGUYEN');
  });

  it('clicker tròn giữ nguyên hoa và thường', () => {
    assert.equal(normalizeQuickName('Nguyễn', 10, true), 'Nguyen');
    assert.equal(normalizeSingleKeyText('g', true), 'g');
    assert.equal(normalizeSingleKeyText('G', true), 'G');
  });
});
