import { CLICKER_ICON_CATALOG } from '../../shared/icons';
import type { PricingConfig } from '../../shared/pricing';
import type { ProductConfig } from '../types/product';

const PENCIL_PRICING: PricingConfig = {
  minCharacters: 3,
  maxCharacters: 9,
  fixedTable: {
    3: 99_000,
    4: 119_000,
    5: 139_000,
    6: 159_000,
    7: 179_000,
    8: 189_000,
    9: 209_000,
  },
  extraFromCharacter: 9,
  extraBasePrice: 209_000,
  extraPricePerCharacter: 0,
};

export const pencilClickerProduct: ProductConfig = {
  id: 'pencil-clicker',
  slug: 'pencil-clicker',
  name: 'Móc Khóa Clicky Bút Chì Custom Tên Theo Yêu Cầu',
  templateType: 'pencil',
  shortDescription: 'Móc khóa clicky hình bút chì gồm đầu bút, 3–9 phím chữ hoặc icon và đuôi bút.',
  longDescription: 'Tự chọn nội dung và màu riêng cho từng phím. Chữ và icon luôn màu đen.',
  images: [
    { src: '/products/pencil-clicker/cover.png', alt: 'Móc khóa clicky bút chì custom tên' },
    { src: '/products/pencil-clicker/color-reference.png', alt: 'Bảng màu phím clicky bút chì' },
  ],
  thumbnailUrl: '/products/pencil-clicker/cover.png',
  pricing: PENCIL_PRICING,
  productionTime: 'Làm theo yêu cầu tại xưởng',
  palettes: [
    { id: 'pencil-standard', name: 'Bút chì tiêu chuẩn', code: '5 MÀU / CHỮ ĐEN', tray: '#F3C24D', key: '#FFD44F', text: '#111111' },
  ],
  keyColors: [
    { id: 'yellow', name: 'Vàng', hex: '#FFD447' },
    { id: 'red', name: 'Đỏ', hex: '#F1262D' },
    { id: 'green', name: 'Xanh lá', hex: '#28B866' },
    { id: 'blue', name: 'Xanh dương', hex: '#1767DF' },
    { id: 'orange', name: 'Cam', hex: '#FF8A20' },
  ],
  icons: CLICKER_ICON_CATALOG.map((icon) => ({ ...icon })),
  switches: [{ id: 'clicky', name: 'Clicky', description: '', soundTraits: [], sampleAudioUrl: '' }],
  benefits: [],
  notes: ['Mỗi sản phẩm gồm đầu bút, 3–9 phím custom và đuôi bút.', 'Chữ và icon màu đen.'],
  active: true,
};
