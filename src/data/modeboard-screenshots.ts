export interface ScreenshotEntry {
  /** Basename (no extension) under public/screenshots/. */
  id: string
  alt: string
  caption: string
  /** Native width/height ratio of the source image, e.g. "2184 / 1648". Prevents cropping. */
  aspectRatio: string
}

// Add a new screenshot by dropping a matching file into public/screenshots/
// and adding an entry here. Missing files fall back to a placeholder automatically.
// Set aspectRatio to the real image's width/height so it isn't stretched or cropped.
export const modeboardScreenshots: ScreenshotEntry[] = [
  {
    id: 'modeboard-overview',
    alt: 'Modeboard overview window listing saved profiles for work, rest, and study.',
    caption: 'Overview',
    aspectRatio: '2184 / 1648',
  },
  {
    id: 'modeboard-profile-editor',
    alt: 'Modeboard profile editor showing wallpaper, Dock, and appearance settings grouped under one profile.',
    caption: 'Profile editor',
    aspectRatio: '2184 / 1648',
  },
  {
    id: 'modeboard-wallpaper',
    alt: 'Modeboard wallpaper picker showing still and animated wallpaper options for a profile.',
    caption: 'Wallpaper',
    aspectRatio: '2184 / 1648',
  },
  {
    id: 'modeboard-dock',
    alt: 'Modeboard Dock settings showing a custom app arrangement saved to a profile.',
    caption: 'Dock',
    aspectRatio: '2184 / 1648',
  },
  {
    id: 'modeboard-backup-restore',
    alt: 'Modeboard backup and restore screen showing a snapshot of settings saved before a profile was applied.',
    caption: 'Backup & restore',
    aspectRatio: '2184 / 1648',
  },
  {
    id: 'modeboard-menu-bar',
    alt: 'Modeboard menu bar icon open, showing a dropdown for switching profiles without opening the app.',
    caption: 'Menu bar switching',
    aspectRatio: '552 / 876',
  },
]
