import { Poem } from '../data/poetryData';

export type CardTheme = 'emerald' | 'midnight' | 'gold' | 'parchment';

export async function generatePoetryCardImage(
  poem: Poem,
  theme: CardTheme = 'emerald',
  aspectRatio: 'square' | 'story' = 'square'
): Promise<string> {
  // Ensure custom Urdu web fonts are loaded prior to rendering on canvas
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // proceed if fonts ready promise rejects
    }
  }

  const canvas = document.createElement('canvas');
  const width = 1080;
  const height = aspectRatio === 'square' ? 1080 : 1920;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Backgrounds & Frame Borders
  if (theme === 'emerald') {
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#064e3b');
    bgGradient.addColorStop(0.5, '#043427');
    bgGradient.addColorStop(1, '#021e17');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative inner gold border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, width - 100, height - 100);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(64, 64, width - 128, height - 128);
  } else if (theme === 'midnight') {
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#0f172a');
    bgGradient.addColorStop(0.5, '#090d16');
    bgGradient.addColorStop(1, '#020617');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(50, 50, width - 100, height - 100);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(64, 64, width - 128, height - 128);
  } else if (theme === 'gold') {
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#261b0c');
    bgGradient.addColorStop(0.5, '#170f06');
    bgGradient.addColorStop(1, '#0a0602');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, width - 100, height - 100);

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(64, 64, width - 128, height - 128);
  } else {
    // Parchment / Antique Khushkhati
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#fef9ef');
    bgGradient.addColorStop(0.5, '#f7eee0');
    bgGradient.addColorStop(1, '#ecdcc7');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(50, 50, width - 100, height - 100);

    ctx.strokeStyle = 'rgba(120, 53, 15, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(64, 64, width - 128, height - 128);
  }

  // Draw corner ornaments
  drawCornerAccents(ctx, 50, 50, width - 100, height - 100, theme === 'parchment' ? '#78350f' : '#d4af37');

  // Header Branding: "KM DIGITAL EMPIRE #2"
  ctx.textAlign = 'center';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = theme === 'parchment' ? '#854d0e' : '#fbbf24';
  ctx.fillText('KM DIGITAL EMPIRE #2', width / 2, 115);

  ctx.font = '30px "Noto Nastaliq Urdu", "Gulzar", serif';
  ctx.fillStyle = theme === 'parchment' ? '#451a03' : '#a7f3d0';
  ctx.fillText('آل پوئٹری — ہر لہجے کی اردو شاعری', width / 2, 175);

  // Category badge
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = theme === 'parchment' ? '#b45309' : '#34d399';
  ctx.fillText(`• ${poem.category} •`, width / 2, 220);

  // Decorative divider
  drawFlourish(ctx, width / 2, 260, theme === 'parchment' ? '#b45309' : '#d4af37');

  // Verses rendering with crisp high-definition text
  const lines = poem.text.split('\n');
  const fontSize = lines.length > 2 ? 44 : 54;
  ctx.font = `600 ${fontSize}px "Noto Nastaliq Urdu", "Gulzar", serif`;
  ctx.fillStyle = theme === 'parchment' ? '#1c1917' : '#ffffff';
  ctx.textAlign = 'center';

  // Subtle glow / shadow for Nastaliq clarity
  if (theme !== 'parchment') {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 8;
  }

  const centerY = height / 2;
  const lineHeight = fontSize * 2.5;
  const startY = centerY - ((lines.length - 1) * lineHeight) / 2 - 20;

  lines.forEach((line, index) => {
    ctx.fillText(line.trim(), width / 2, startY + index * lineHeight);
  });

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Roman Urdu (if present)
  if (poem.romanUrdu) {
    ctx.font = 'italic 20px "Playfair Display", serif';
    ctx.fillStyle = theme === 'parchment' ? '#78716c' : '#cbd5e1';
    const romanY = startY + lines.length * lineHeight + 35;
    const truncatedRoman = poem.romanUrdu.length > 72 ? poem.romanUrdu.slice(0, 70) + '...' : poem.romanUrdu;
    ctx.fillText(truncatedRoman, width / 2, romanY);
  }

  // Poet attribution section
  const attributionY = height - 260;
  drawFlourish(ctx, width / 2, attributionY, theme === 'parchment' ? '#b45309' : '#d4af37');

  ctx.font = 'bold 38px "Noto Nastaliq Urdu", "Gulzar", serif';
  ctx.fillStyle = theme === 'parchment' ? '#78350f' : '#fbbf24';
  ctx.fillText(`شاعر: ${poem.poetUrdu || poem.poet}`, width / 2, attributionY + 65);

  ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = theme === 'parchment' ? '#a8a29e' : '#cbd5e1';
  ctx.fillText(`${poem.poet}`, width / 2, attributionY + 105);

  // Footer Tagline
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = theme === 'parchment' ? '#78716c' : '#94a3b8';
  ctx.fillText('KM DIGITAL EMPIRE #2 | #KMDigitalEmpire #UrduPoetry', width / 2, height - 90);

  return canvas.toDataURL('image/png');
}

function drawCornerAccents(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.fillStyle = color;
  const size = 20;
  const offset = 14;

  const corners = [
    [x + offset, y + offset],
    [x + w - offset, y + offset],
    [x + offset, y + h - offset],
    [x + w - offset, y + h - offset]
  ];

  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
  });
}

function drawFlourish(ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 150, cy);
  ctx.lineTo(cx - 30, cy);
  ctx.moveTo(cx + 30, cy);
  ctx.lineTo(cx + 150, cy);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx - 16, cy, 2.8, 0, Math.PI * 2);
  ctx.arc(cx + 16, cy, 2.8, 0, Math.PI * 2);
  ctx.fill();
}
