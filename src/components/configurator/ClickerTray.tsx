import type { CSSProperties } from 'react';
import type { KeyItem } from '../../../shared/orderSchema';
import type { ColorPalette, ProductConfig, SwitchType } from '../../types/product';
import { getIconComponent } from '../../utils/icons';

interface ClickerTrayProps {
  keys: KeyItem[];
  palette: ColorPalette | undefined;
  switchType: SwitchType;
  /** Ẩn ba nhãn phụ khi khay nằm trong card custom tối giản. */
  showMeta?: boolean;
  product?: ProductConfig;
}

const FALLBACK: ColorPalette = {
  id: 'fallback',
  name: 'Mặc định',
  tray: '#C9A227',
  key: '#EBD9C3',
  text: '#5F3B22',
  code: 'FALLBACK',
};

/**
 * Chọn số cột để phím luôn là hình vuông bo góc.
 * Từ 7 phím trở lên sẽ tự xuống dòng thay vì ép nhỏ/méo phím.
 */
function getColumnCount(count: number): number {
  if (count <= 6) return count;
  if (count <= 8) return 4;
  if (count <= 10) return 5;
  return 6;
}

export default function ClickerTray({
  keys,
  palette,
  switchType,
  showMeta = true,
  product,
}: ClickerTrayProps) {
  const colors = palette ?? FALLBACK;
  const count = Math.max(keys.length, 1);
  const columns = product?.templateType === 'round-clicker' ? count : getColumnCount(count);
  const gap = 8;
  const keyBasis = `calc((100% - ${(columns - 1) * gap}px) / ${columns})`;

  const trayStyle: CSSProperties = {
    backgroundColor: colors.tray,
    borderRadius: '24px',
    padding: '12px',
    boxShadow:
      'inset 0 2px 6px rgba(255,255,255,0.35), inset 0 -3px 8px rgba(0,0,0,0.18), 0 6px 22px rgba(122,55,50,0.15)',
  };

  if (product?.templateType === 'pencil') {
    return (
      <div className="w-full py-4">
        <div className="flex w-full items-stretch justify-center drop-shadow-lg">
          <div className="relative w-[14%] min-w-[42px] bg-[#F2D3AE] [clip-path:polygon(0_50%,100%_0,100%_100%)]">
            <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#171717]" />
          </div>
          <div className="flex min-w-0 flex-1 bg-[#F4C64F] p-1.5">
            {keys.map((item, index) => {
              const Icon = item.type === 'icon' ? getIconComponent(item.iconId) : null;
              const keyColor = product.keyColors?.find((color) => color.id === item.keyColor)?.hex ?? '#FFD447';
              return (
                <div key={index} className="mx-[2px] flex aspect-square min-w-0 flex-1 items-center justify-center rounded-[18%]" style={{ backgroundColor: keyColor, boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.14), inset 0 2px 0 rgba(255,255,255,.35)' }}>
                  {Icon ? <Icon className="h-[48%] w-[48%] text-black" /> : <span className="font-key text-[clamp(.8rem,4vw,2rem)] font-black leading-none text-black">{item.type === 'text' ? item.value || '·' : ''}</span>}
                </div>
              );
            })}
          </div>
          <div className="w-[9%] min-w-[30px] border-x-4 border-[#6F7880] bg-[repeating-linear-gradient(90deg,#aeb7bd_0,#aeb7bd_3px,#78828a_3px,#78828a_5px)]" />
          <div className="w-[10%] min-w-[34px] rounded-r-2xl bg-[#F2BCD5]" />
          <div className="relative w-5 shrink-0"><span className="absolute left-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-[3px] border-[#AAB1B7]" /></div>
        </div>
        {showMeta ? <p className="mt-3 text-center text-xs text-ink-muted">Đầu bút + {keys.length} phím custom + đuôi bút • chữ/icon màu đen</p> : null}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full shadow-lift" style={trayStyle}>
        <div className="flex w-full flex-wrap justify-center" style={{ gap }}>
          {keys.map((item, index) => {
            const Icon = item.type === 'icon' ? getIconComponent(item.iconId) : null;
            const text = item.type === 'text' ? item.value : '';

            return (
              <div
                key={index}
                className={`flex aspect-square shrink-0 items-center justify-center overflow-hidden ${product?.templateType === 'round-clicker' ? 'rounded-full border-[3px]' : 'rounded-[18%]'}`}
                style={{
                  flexBasis: keyBasis,
                  maxWidth: keyBasis,
                  backgroundColor: colors.key,
                  borderColor: product?.templateType === 'round-clicker' ? colors.text : 'transparent',
                  boxShadow:
                    'inset 0 -4px 0 rgba(0,0,0,0.12), inset 0 3px 0 rgba(255,255,255,0.5)',
                }}
              >
                {Icon ? (
                  <Icon
                    className="h-[46%] w-[46%]"
                    style={{ color: colors.text }}
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    className="max-w-full truncate px-1 text-center font-key text-[clamp(0.9rem,5vw,2rem)] font-black leading-none"
                    style={{ color: colors.text }}
                  >
                    {text || '·'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showMeta ? (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-ink-muted">
          <span className="rounded-full bg-white px-2.5 py-1 shadow-soft">{keys.length} phím</span>
          <span className="rounded-full bg-white px-2.5 py-1 shadow-soft">{colors.name}</span>
          <span className="rounded-full bg-white px-2.5 py-1 shadow-soft">
            Switch {switchType === 'clicky' ? 'Clicky' : 'Smooth'}
          </span>
        </div>
      ) : null}
    </div>
  );
}
