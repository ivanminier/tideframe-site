export interface ScreenshotEntry {
  /** Basename (no extension) under public/screenshots/. */
  id: string
  alt: string
  caption: string
}

// Add a new screenshot by dropping a matching file into public/screenshots/
// and adding an entry here. Missing files fall back to a placeholder automatically.
export const modeboardScreenshots: ScreenshotEntry[] = [
  {
    id: 'modeboard-overview',
    alt: 'Modeboard overview window listing saved profiles for work, rest, and study.',
    caption: 'Overview',
  },
  {
    id: 'modeboard-profile-editor',
    alt: 'Modeboard profile editor showing wallpaper, Dock, and appearance settings grouped under one profile.',
    caption: 'Profile editor',
  },
  {
    id: 'modeboard-wallpaper',
    alt: 'Modeboard wallpaper picker showing still and animated wallpaper options for a profile.',
    caption: 'Wallpaper',
  },
  {
    id: 'modeboard-dock',
    alt: 'Modeboard Dock settings showing a custom app arrangement saved to a profile.',
    caption: 'Dock',
  },
  {
    id: 'modeboard-backup-restore',
    alt: 'Modeboard backup and restore screen showing a snapshot of settings saved before a profile was applied.',
    caption: 'Backup & restore',
  },
  {
    id: 'modeboard-menu-bar',
    alt: 'Modeboard menu bar icon open, showing a dropdown for switching profiles without opening the app.',
    caption: 'Menu bar switching',
  },
]
