import { CLICKER_ICON_CATALOG } from '../../shared/icons';
import type { PricingConfig } from '../../shared/pricing';
import type { ProductConfig } from '../types/product';

const ROUND_CLICKER_PRICING: PricingConfig = {
  minCharacters: 3,
  maxCharacters: 10,
  fixedTable: {
    3: 79_000,
    4: 99_000,
    5: 119_000,
    6: 139_000,
    7: 149_000,
    8: 169_000,
    9: 189_000,
    10: 209_000,
  },
  extraFromCharacter: 10,
  extraBasePrice: 209_000,
  extraPricePerCharacter: 0,
};

export const roundClickerProduct: ProductConfig = {
  id: 'round-clicker',
  slug: 'round-clicker',
  name: 'Móc Khóa Clicky Bàn Phím Shape Tròn Custom Tên Theo Yêu Cầu',
  templateType: 'round-clicker',
  shortDescription: 'Móc khóa clicky phím tròn, custom từ 3–10 chữ hoặc icon theo yêu cầu.',
  longDescription: 'Cách custom giống clicker Raccoonie, sử dụng phím tròn và 7 phối màu riêng.',
  thumbnailUrl: '/products/round-clicker/cover.png',
  images: [
    { src: '/products/round-clicker/cover.png', alt: 'Bộ móc khóa clicky bàn phím shape tròn' },
    { src: '/products/round-clicker/variant-1-orange-yellow.png', alt: 'Khay cam phím vàng chữ xanh đậm' },
    { src: '/products/round-clicker/variant-2-aqua-blue.png', alt: 'Khay aqua phím xanh blue chữ vàng' },
    { src: '/products/round-clicker/variant-3-red-pink.png', alt: 'Khay đỏ phím hồng chữ đỏ' },
    { src: '/products/round-clicker/variant-4-pink-purple.png', alt: 'Khay hồng phím tím chữ trắng' },
    { src: '/products/round-clicker/variant-5-butter-purple.png', alt: 'Khay xanh bơ phím tím chữ trắng' },
    { src: '/products/round-clicker/variant-6-black-white.png', alt: 'Khay đen phím trắng chữ đen' },
    { src: '/products/round-clicker/variant-7-matcha-white.png', alt: 'Khay xanh matcha phím trắng chữ xanh matcha' },
  ],
  pricing: ROUND_CLICKER_PRICING,
  productionTime: 'Làm theo yêu cầu tại xưởng',
  palettes: [
    { id: 'orange-yellow', name: 'Cam – Vàng', code: 'CAM / VÀNG / XANH ĐẬM', tray: '#FF9818', key: '#FFD84D', text: '#214EAD' },
    { id: 'aqua-blue', name: 'Aqua – Blue', code: 'AQUA / BLUE / VÀNG', tray: '#86D8ED', key: '#35AFE8', text: '#FFE25A' },
    { id: 'red-pink', name: 'Đỏ – Hồng', code: 'ĐỎ / HỒNG / ĐỎ', tray: '#F33B3E', key: '#FFE8EA', text: '#F23A3D' },
    { id: 'pink-purple', name: 'Hồng – Tím', code: 'HỒNG / TÍM / TRẮNG', tray: '#F1C6D5', key: '#C8B1E6', text: '#FFFFFF' },
    { id: 'butter-purple', name: 'Xanh bơ – Tím', code: 'XANH BƠ / TÍM / TRẮNG', tray: '#DCE9A7', key: '#C6B0E2', text: '#FFFFFF' },
    { id: 'black-white', name: 'Đen – Trắng', code: 'ĐEN / TRẮNG / ĐEN', tray: '#242424', key: '#F7F6F2', text: '#222222' },
    { id: 'matcha-white', name: 'Matcha – Trắng', code: 'MATCHA / TRẮNG / MATCHA', tray: '#667B4E', key: '#F7F6EE', text: '#667B4E' },
  ],
  icons: CLICKER_ICON_CATALOG.map((icon) => ({ ...icon })),
  switches: [{ id: 'clicky', name: 'Clicky', description: '', soundTraits: [], sampleAudioUrl: '' }],
  benefits: [],
  notes: ['Phím shape tròn.', 'Custom từ 3–10 chữ hoặc icon.'],
  active: true,
};
