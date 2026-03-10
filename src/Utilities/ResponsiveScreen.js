import { useWindowDimensions, PixelRatio, Platform } from 'react-native';

// ── Breakpoints (customize to your design system) ────────────
const BREAKPOINTS = {
  smallPhone: 360,   // small Android phones  (e.g. Galaxy A03)
  phone: 414,        // standard phones       (e.g. iPhone 14)
  largePhone: 480,   // large phones          (e.g. iPhone 14 Pro Max)
  tablet: 768,       // tablets               (e.g. iPad Mini)
  largeTablet: 1024, // large tablets         (e.g. iPad Pro 12.9)
};

// ── Base design dimensions (match your Figma/design file) ────
const BASE_WIDTH  = 390;   // iPhone 14 Pro width  (design baseline)
const BASE_HEIGHT = 844;   // iPhone 14 Pro height (design baseline)

// ─────────────────────────────────────────────────────────────

const useResponsive = () => {
  const { width, height, fontScale } = useWindowDimensions();

  // ── Device Classification ───────────────────────────────────
  const isSmallPhone  = width < BREAKPOINTS.smallPhone;
  const isPhone       = width >= BREAKPOINTS.smallPhone && width < BREAKPOINTS.tablet;
  const isTablet      = width >= BREAKPOINTS.tablet;
  const isLargeTablet = width >= BREAKPOINTS.largeTablet;
  const isLandscape   = width > height;
  const isIOS         = Platform.OS === 'ios';
  const isAndroid     = Platform.OS === 'android';

  // ── Scale Ratios ────────────────────────────────────────────
  const widthRatio  = width  / BASE_WIDTH;
  const heightRatio = height / BASE_HEIGHT;

  // ── Width Percentage ────────────────────────────────────────
  // wp(50)  → 50% of current screen width
  const wp = (percent) => {
    return (width * percent) / 100;
  };

  // ── Height Percentage ───────────────────────────────────────
  // hp(30)  → 30% of current screen height
  const hp = (percent) => {
    return (height * percent) / 100;
  };

  // ── Scale (width-based, matches Figma pixel values) ─────────
  // scale(20) → scales 20px relative to base design width
  // Use for: widths, horizontal paddings, margins
  const scale = (size) => {
    return Math.round(size * widthRatio);
  };

  // ── Vertical Scale ──────────────────────────────────────────
  // vs(20) → scales 20px relative to base design height
  // Use for: heights, vertical paddings, margins
  const vs = (size) => {
    return Math.round(size * heightRatio);
  };

  // ── Moderate Scale (best for font sizes & icon sizes) ───────
  // Blends width scale with a dampening factor to avoid
  // text being too large on big screens
  // ms(16, 0.3) → scale 16px with 30% of the scale factor applied
  const ms = (size, factor = 0.5) => {
    return Math.round(size + (scale(size) - size) * factor);
  };

  // ── Responsive Font Size ────────────────────────────────────
  // Accounts for system font scale (accessibility settings)
  // Use for ALL font sizes
  const fs = (size) => {
    const scaled = ms(size);
    // Normalize against system font scale so text
    // doesn't double-scale with accessibility settings
    return scaled / fontScale;
  };

  // ── Responsive Value (pick value by device type) ────────────
  // rv({ phone: 16, tablet: 22, largeTablet: 28 })
  const rv = ({ smallPhone: sp, phone: ph, tablet: tb, largeTablet: lt } = {}) => {
    if (isLargeTablet && lt !== undefined) return lt;
    if (isTablet      && tb !== undefined) return tb;
    if (isSmallPhone  && sp !== undefined) return sp;
    return ph; // default: phone
  };

  // ── Safe Pixel (avoids subpixel blurriness on Android) ──────
  // Use for borders, dividers, hairlines
  const pixel = (size = 1) => {
    return 1 / PixelRatio.get() * size;
  };

  return {
    // ── Dimensions ───────────────────────────────────
    width,
    height,

    // ── Device flags ─────────────────────────────────
    isSmallPhone,
    isPhone,
    isTablet,
    isLargeTablet,
    isLandscape,
    isPortrait: !isLandscape,
    isIOS,
    isAndroid,

    // ── Utility functions ────────────────────────────
    wp,          // width percentage         → wp(50)
    hp,          // height percentage        → hp(30)
    scale,       // width-based scale        → scale(20)
    vs,          // height-based scale       → vs(20)
    ms,          // moderate scale (fonts)   → ms(16)
    fs,          // font size (a11y-safe)    → fs(16)
    rv,          // responsive value         → rv({ phone: 16, tablet: 22 })
    pixel,       // hairline pixel           → pixel(1)
  };
};

export default useResponsive;
