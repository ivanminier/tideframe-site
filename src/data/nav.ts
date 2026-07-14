export interface NavLink {
  to: string
  label: string
}

export interface FooterNavGroup {
  heading: string
  links: NavLink[]
}

// Header stays short on purpose. Add a link here if a page belongs in primary navigation.
export const headerNav: NavLink[] = [
  { to: '/modeboard', label: 'Modeboard' },
  { to: '/products', label: 'Products' },
  { to: '/support', label: 'Support' },
  { to: '/about', label: 'About' },
]

// Footer groups every route. Add a new page's link here so it stays reachable from the footer.
export const footerNav: FooterNavGroup[] = [
  {
    heading: 'Product',
    links: [
      { to: '/modeboard', label: 'Modeboard' },
      { to: '/products', label: 'All products' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/brand', label: 'Brand' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { to: '/support', label: 'Support' },
      { to: '/privacy', label: 'Privacy' },
      { to: '/terms', label: 'Terms' },
      { to: '/acknowledgments', label: 'Acknowledgments' },
    ],
  },
]
