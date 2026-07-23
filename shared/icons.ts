/**
 * Danh sách icon duy nhất được phép dùng cho Custom Clicker.
 * Dùng chung giữa frontend và backend để không thể gửi icon ngoài danh mục.
 */
export const CLICKER_ICON_CATALOG = [
  { id: 'heart', label: 'Trái tim' },
  { id: 'star', label: 'Ngôi sao' },
  { id: 'flower', label: 'Hoa' },
  { id: 'dog_feet', label: 'Dấu chân thú' },
  { id: 'lucky_leaf', label: 'Cỏ bốn lá' },
  { id: 'camera', label: 'Máy ảnh' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'badminton', label: 'Cầu lông' },
  { id: 'plane', label: 'Máy bay' },
  { id: 'pickle', label: 'Pickleball' },
  { id: 'sun', label: 'Mặt trời' },
  { id: 'headphone', label: 'Tai nghe' },
  { id: 'moon', label: 'Mặt trăng' },
  { id: 'ribbon', label: 'Nơ' },
] as const;

export const CLICKER_ICON_IDS = ['heart', 'star', 'flower', 'dog_feet', 'lucky_leaf', 'camera', 'tennis', 'badminton', 'plane', 'pickle', 'sun', 'headphone', 'moon', 'ribbon'] as const;

export type ClickerIconId = (typeof CLICKER_ICON_IDS)[number];

export function isClickerIconId(value: string): value is ClickerIconId {
  return (CLICKER_ICON_IDS as readonly string[]).includes(value);
}
