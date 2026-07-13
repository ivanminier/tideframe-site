export interface ScreenshotEntry {
  /** Basename (no extension) under public/screenshots/. */
  id: string
  alt: string
  caption: string
  /** Native width/height ratio of the source image, e.g. "1400 / 1056". Prevents cropping. */
  aspectRatio: string
  /** Pixel dimensions of the default (largest) served file — used for width/height attrs to prevent layout shift. */
  width: number
  height: number
  /**
   * True when a `<id>-700.png` smaller variant also exists under public/screenshots/,
   * enabling a srcset. Only set this when that file genuinely exists — a missing file
   * returns 200 + HTML (this site's SPA fallback), not a 404, so a srcset entry pointing
   * at a nonexistent file fails to decode instead of falling back gracefully.
   */
  hasThumbnail: boolean
}

// Add a new screenshot by dropping a matching file into public/screenshots/
// and adding an entry here. Missing files fall back to a placeholder automatically.
export const modeboardScreenshots: ScreenshotEntry[] = [
  {
    id: 'modeboard-overview',
    alt: 'Modeboard overview window listing saved profiles for work, rest, and study.',
    caption: 'Overview',
    aspectRatio: '1400 / 1056',
    width: 1400,
    height: 1056,
    hasThumbnail: true,
  },
  {
    id: 'modeboard-profile-editor',
    alt: 'Modeboard profile editor showing wallpaper, Dock, and appearance settings grouped under one profile.',
    caption: 'Profile editor',
    aspectRatio: '1400 / 1056',
    width: 1400,
    height: 1056,
    hasThumbnail: true,
  },
  {
    id: 'modeboard-wallpaper',
    alt: 'Modeboard wallpaper picker showing still and animated wallpaper options for a profile.',
    caption: 'Wallpaper',
    aspectRatio: '1400 / 1056',
    width: 1400,
    height: 1056,
    hasThumbnail: true,
  },
  {
    id: 'modeboard-dock',
    alt: 'Modeboard Dock settings showing a custom app arrangement saved to a profile.',
    caption: 'Dock',
    aspectRatio: '1400 / 1056',
    width: 1400,
    height: 1056,
    hasThumbnail: true,
  },
  {
    id: 'modeboard-desktop',
    alt: 'Modeboard Desktop settings showing which Desktop items are visible for a profile.',
    caption: 'Desktop',
    aspectRatio: '1400 / 1056',
    width: 1400,
    height: 1056,
    hasThumbnail: true,
  },
  {
    id: 'modeboard-backup-restore',
    alt: 'Modeboard backup and restore screen showing a snapshot of settings saved before a profile was applied.',
    caption: 'Backup & restore',
    aspectRatio: '1400 / 1056',
    width: 1400,
    height: 1056,
    hasThumbnail: true,
  },
  {
    id: 'modeboard-menu-bar',
    alt: 'Modeboard menu bar dropdown showing Switch Profile, Settings, and Emergency Restore.',
    caption: 'Menu bar switching',
    aspectRatio: '524 / 444',
    width: 524,
    height: 444,
    hasThumbnail: false,
  },
]
