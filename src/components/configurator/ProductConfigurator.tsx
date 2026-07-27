import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Copy, RotateCcw, ShoppingCart, Undo2 } from 'lucide-react';
import type { ProductConfig } from '../../types/product';
import { useConfiguratorState } from '../../hooks/useConfiguratorState';
import { hasErrors, validateDesign } from '../../utils/validation';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';
import CharacterCountSelector from './CharacterCountSelector';
import ColorPaletteSelector from './ColorPaletteSelector';
import KeyCustomizer from './KeyCustomizer';
import ProductPreview from './ProductPreview';
import StepProgress, { type Step } from './StepProgress';

const STEPS: Step[] = [
  { id: 1, label: 'Bộ màu & số phím' },
  { id: 2, label: 'Nội dung & lưu ảnh' },
];

interface ProductConfiguratorProps {
  product: ProductConfig;
}

export default function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const { showToast } = useToast();
  const config = useConfiguratorState(product);
  const [step, setStep] = useState(1);
  const [maxReachedStep, setMaxReachedStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [capturing, setCapturing] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const embedMode = new URLSearchParams(window.location.search).get('embed') === '1';

  useEffect(() => {
    const handleParentMessage = (event: MessageEvent) => {
      const allowedParents = new Set([
        'https://raccoonie.vn',
        'https://www.raccoonie.vn',
        'https://qky4nh-kq.myshopify.com',
      ]);
      if (!allowedParents.has(event.origin)) return;
      if (event.data?.type !== 'RACCOONIE_CUSTOMIZER_ADD_ERROR') return;
      setFinishing(false);
      showToast(event.data.message || 'Không thể thêm thiết kế vào giỏ hàng.', 'error');
    };

    window.addEventListener('message', handleParentMessage);
    return () => window.removeEventListener('message', handleParentMessage);
  }, [showToast]);

  const palette = useMemo(
    () => product.palettes.find((item) => item.id === config.state.colorPaletteId),
    [product.palettes, config.state.colorPaletteId],
  );

  const goToStep = (next: number) => {
    if (next < 1 || next > STEPS.length) return;
    setStep(next);
    setMaxReachedStep((current) => Math.max(current, next));
    window.requestAnimationFrame(() =>
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    );
  };

  const handleReset = () => {
    config.reset();
    setStep(1);
    setMaxReachedStep(1);
    setErrors({});
    showToast('Đã bắt đầu một thiết kế mới.', 'info');
  };

  const validate = () => {
    const nextErrors = validateDesign(config.customData, product);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      showToast('Hãy nhập đủ nội dung cho tất cả các phím.', 'error');
      return false;
    }
    return true;
  };

  const makeImage = async (
    node: HTMLDivElement | null = previewRef.current,
    pixelRatio = 4,
  ) => {
    if (!node) throw new Error('Preview is unavailable');
    const { toPng } = await import('html-to-image');
    return toPng(node, {
      pixelRatio,
      backgroundColor: '#FFFFFF',
      cacheBust: true,
    });
  };

  const handleCopy = async () => {
    if (!validate()) return;
    if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
      showToast('Trình duyệt này chưa hỗ trợ copy ảnh. Hãy dùng nút Chụp ảnh sản phẩm.', 'info');
      return;
    }
    setCapturing(true);
    try {
      const dataUrl = await makeImage();
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      config.commit();
      showToast('Đã copy ảnh sản phẩm.', 'success');
    } catch {
      showToast('Không copy được ảnh. Hãy dùng nút Chụp ảnh sản phẩm.', 'error');
    } finally {
      setCapturing(false);
    }
  };

  const handleFinish = async () => {
    if (!validate()) return;

    const keyContents = config.customData.keys.map((key) =>
      key.type === 'text' ? key.value : `[ICON:${key.iconId}]`,
    );
    const keyColors = config.customData.keys.map((key) => key.keyColor ?? '');

    const allowedParents = new Set([
      'https://raccoonie.vn',
      'https://www.raccoonie.vn',
      'https://qky4nh-kq.myshopify.com',
    ]);
    let parentOrigin = 'https://raccoonie.vn';
    try {
      const referrerOrigin = new URL(document.referrer).origin;
      if (allowedParents.has(referrerOrigin)) parentOrigin = referrerOrigin;
    } catch {
      // Giữ domain chính khi trình duyệt không cung cấp referrer.
    }

    setFinishing(true);
    try {
      const imageDataUrl = await makeImage(previewRef.current, 2);
      const imageBlob = await (await fetch(imageDataUrl)).blob();
      const imageBytes = await imageBlob.arrayBuffer();
      const safeName =
        keyContents
          .map((value) => value.replace(/\[ICON:([^\]]+)\]/g, '$1'))
          .join('-')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 40) || 'custom';
      const designId = `RC-${Date.now().toString(36).toUpperCase()}`;

      window.parent.postMessage(
        {
          source: 'raccoonie-customizer',
          type: 'RACCOONIE_CUSTOMIZER_COMPLETE',
          payload: {
            version: 2,
            designId,
            productSlug: product.slug,
            productName: product.name,
            characterCount: config.customData.characterCount,
            colorPaletteId: config.customData.colorPaletteId,
            paletteName: palette?.name ?? '',
            keyContents,
            keyColors,
            displayName: keyContents.join(''),
            mockup: {
              fileName: `${designId}-${product.slug}-${safeName}.png`,
              mimeType: 'image/png',
              bytes: imageBytes,
            },
          },
        },
        parentOrigin,
        [imageBytes],
      );
      config.commit();
    } catch {
      showToast('Không tạo được ảnh mockup. Vui lòng thử lại.', 'error');
      setFinishing(false);
    }
  };

  return (
    <div ref={sectionRef} className="scroll-mt-20 px-4 pb-10">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
          {config.canRestore ? (
            <Button variant="secondary" size="sm" onClick={config.restorePrevious} icon={<Undo2 className="h-3.5 w-3.5" />}>
              Khôi phục thiết kế trước
            </Button>
          ) : null}
          <Button variant="ghost" size="sm" onClick={handleReset} icon={<RotateCcw className="h-3.5 w-3.5" />}>
            Bắt đầu lại
          </Button>
        </div>

        <StepProgress steps={STEPS} currentStep={step} maxReachedStep={maxReachedStep} onStepClick={goToStep} />

        <section className="rounded-[30px] border border-primary/20 bg-white px-5 py-6 shadow-[0_12px_40px_rgba(131,86,176,0.09)] sm:px-8 sm:py-8">
          <div>
            <h1 className="font-display text-xl font-bold text-primary sm:text-2xl">
              Bước {step} — {STEPS[step - 1]?.label}
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              {step === 1
                ? 'Chọn bộ màu và số phím cho sản phẩm.'
                : 'Nhập từng ký tự hoặc icon. Trên Mac, nhấn Cmd + Shift + 4 rồi khoanh vùng ảnh sản phẩm để có thumbnail kéo thả.'}
            </p>
          </div>

          <div className="mt-6 space-y-7">
            <ProductPreview product={product} customData={config.customData} palette={palette} captureRef={previewRef} compact />

            {step === 1 ? (
              <>
                <CharacterCountSelector product={product} value={config.state.characterCount} onChange={config.setCharacterCount} />
                {product.keyColors?.length ? (
                  <div>
                    <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-accent">Bảng màu phím</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.keyColors.map((color) => <div key={color.id} className="flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm"><span className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />{color.name}</div>)}
                    </div>
                    <p className="mt-2 text-xs text-ink-muted">Bạn sẽ chọn màu riêng cho từng phím ở bước tiếp theo. Chữ và icon luôn màu đen.</p>
                  </div>
                ) : <ColorPaletteSelector product={product} value={config.state.colorPaletteId} onChange={config.setPalette} />}
              </>
            ) : (
              <>
                <KeyCustomizer product={product} keys={config.state.keys} characterCount={config.state.characterCount} palette={palette} onSetKey={config.setKey} errorMessage={errors.keys} />
                <div className="rounded-2xl border border-line bg-cream/50 p-4 text-sm">
                  <p><strong>Sản phẩm:</strong> {product.name}</p>
                  <p className="mt-1"><strong>Bộ màu:</strong> {palette?.name} ({palette?.code})</p>
                  <p className="mt-1"><strong>Số phím:</strong> {config.state.characterCount}</p>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {step === 2 ? (
              <Button variant="secondary" size="lg" onClick={() => goToStep(1)} className="sm:flex-1" icon={<ArrowLeft className="h-4 w-4" />}>
                Quay lại
              </Button>
            ) : null}
            {step === 1 ? (
              <Button size="lg" onClick={() => goToStep(2)} className="ml-auto min-w-[220px]">
                Tiếp theo <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button variant="secondary" size="lg" onClick={handleCopy} disabled={capturing} className="sm:flex-1" icon={<Copy className="h-4 w-4" />}>
                  Copy ảnh
                </Button>
                {embedMode ? (
                  <Button
                    size="lg"
                    onClick={handleFinish}
                    disabled={finishing}
                    loading={finishing}
                    className="sm:flex-1"
                    icon={<ShoppingCart className="h-4 w-4" />}
                  >
                    {finishing ? 'Đang tạo ảnh mockup…' : 'Hoàn tất & thêm vào giỏ'}
                  </Button>
                ) : null}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
