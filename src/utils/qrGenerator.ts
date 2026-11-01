import QRCode from 'qrcode';
import { QRDesignConfig } from '../types/qr';

export async function renderQRToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  design: QRDesignConfig
): Promise<void> {
  const { fgColor, bgColor, margin, errorCorrectionLevel, logoUrl, logoSizePercent } = design;

  // Enforce H error correction when logo is present for maximum readability
  const ecLevel = logoUrl ? 'H' : errorCorrectionLevel;

  await QRCode.toCanvas(canvas, text, {
    errorCorrectionLevel: ecLevel,
    margin,
    color: {
      dark: fgColor,
      light: bgColor === 'transparent' ? '#00000000' : bgColor,
    },
    width: canvas.width || 400,
  });

  if (logoUrl) {
    await drawLogoOnCanvas(canvas, logoUrl, logoSizePercent, bgColor);
  }
}

async function drawLogoOnCanvas(
  canvas: HTMLCanvasElement,
  logoUrl: string,
  logoSizePercent: number,
  bgColor: string
): Promise<void> {
  return new Promise((resolve) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve();

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const cw = canvas.width;
      const ch = canvas.height;

      // Safe size ratio (between 16% and 28% of total width)
      const ratio = Math.max(0.15, Math.min(0.28, (logoSizePercent || 20) / 100));
      const logoW = cw * ratio;
      const logoH = ch * ratio;
      const x = (cw - logoW) / 2;
      const y = (ch - logoH) / 2;

      const padding = logoW * 0.16;
      const boxX = x - padding;
      const boxY = y - padding;
      const boxW = logoW + padding * 2;
      const boxH = logoH + padding * 2;
      const radius = 12;

      // Draw background shield/card behind logo
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(boxX + radius, boxY);
      ctx.lineTo(boxX + boxW - radius, boxY);
      ctx.quadraticCurveTo(boxX + boxW, boxY, boxX + boxW, boxY + radius);
      ctx.lineTo(boxX + boxW, boxY + boxH - radius);
      ctx.quadraticCurveTo(boxX + boxW, boxY + boxH, boxX + boxW - radius, boxY + boxH);
      ctx.lineTo(boxX + radius, boxY + boxH);
      ctx.quadraticCurveTo(boxX, boxY + boxH, boxX, boxY + boxH - radius);
      ctx.lineTo(boxX, boxY + radius);
      ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
      ctx.closePath();

      ctx.fillStyle = bgColor === 'transparent' ? '#FFFFFF' : bgColor;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      ctx.fill();
      ctx.restore();

      // Clip and draw image
      ctx.save();
      ctx.beginPath();
      const imgRadius = 8;
      ctx.moveTo(x + imgRadius, y);
      ctx.lineTo(x + logoW - imgRadius, y);
      ctx.quadraticCurveTo(x + logoW, y, x + logoW, y + imgRadius);
      ctx.lineTo(x + logoW, y + logoH - imgRadius);
      ctx.quadraticCurveTo(x + logoW, y + logoH, x + logoW - imgRadius, y + logoH);
      ctx.lineTo(x + imgRadius, y + logoH);
      ctx.quadraticCurveTo(x, y + logoH, x, y + logoH - imgRadius);
      ctx.lineTo(x, y + imgRadius);
      ctx.quadraticCurveTo(x, y, x + imgRadius, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, logoW, logoH);
      ctx.restore();

      resolve();
    };

    img.onerror = () => {
      // Graceful fallback: resolve without crashing
      resolve();
    };

    img.src = logoUrl;
  });
}

export async function generateHighResPNG(
  text: string,
  design: QRDesignConfig,
  targetSize: number = 1024
): Promise<string> {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = targetSize;
  tempCanvas.height = targetSize;

  await renderQRToCanvas(tempCanvas, text, design);
  return tempCanvas.toDataURL('image/png');
}

export async function generateSVGString(
  text: string,
  design: QRDesignConfig
): Promise<string> {
  const { fgColor, bgColor, margin, errorCorrectionLevel, logoUrl, logoSizePercent } = design;
  const ecLevel = logoUrl ? 'H' : errorCorrectionLevel;

  const rawSvg = await QRCode.toString(text, {
    type: 'svg',
    errorCorrectionLevel: ecLevel,
    margin,
    color: {
      dark: fgColor,
      light: bgColor === 'transparent' ? '#00000000' : bgColor,
    },
  });

  if (!logoUrl) return rawSvg;

  // Embed logo image in SVG if present
  try {
    const ratio = Math.max(0.15, Math.min(0.28, (logoSizePercent || 20) / 100));
    // Determine viewBox from rawSvg or default to 100
    const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/);
    let vbW = 100;
    let vbH = 100;
    if (viewBoxMatch) {
      const parts = viewBoxMatch[1].split(/\s+/).map(Number);
      if (parts.length === 4) {
        vbW = parts[2];
        vbH = parts[3];
      }
    }
    const logoW = vbW * ratio;
    const logoH = vbH * ratio;
    const x = (vbW - logoW) / 2;
    const y = (vbH - logoH) / 2;
    const pad = logoW * 0.15;
    const boxW = logoW + pad * 2;
    const boxH = logoH + pad * 2;
    const boxX = x - pad;
    const boxY = y - pad;

    const bgShield = `<rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="3" fill="${bgColor === 'transparent' ? '#FFFFFF' : bgColor}" stroke="rgba(0,0,0,0.06)" stroke-width="0.5"/>`;
    const imageTag = `<image href="${logoUrl}" x="${x}" y="${y}" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet" />`;

    return rawSvg.replace('</svg>', `${bgShield}${imageTag}</svg>`);
  } catch {
    return rawSvg;
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return false;
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);
    return true;
  } catch (err) {
    console.warn('Clipboard write failed:', err);
    return false;
  }
}
