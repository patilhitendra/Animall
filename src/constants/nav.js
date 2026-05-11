import { ShoppingCart, PlusCircle, Home, ListChecks, Bell } from 'lucide-react';

// 5-tab bottom navigation. Center item is highlighted as the primary action.
export const BOTTOM_NAV_ITEMS = [
  { key: 'buy',         to: '/buy',         icon: ShoppingCart, labelKey: 'nav_buy' },
  { key: 'sell',        to: '/sell',        icon: PlusCircle,   labelKey: 'nav_sell' },
  { key: 'home',        to: '/',            icon: Home,         labelKey: 'nav_home', center: true },
  { key: 'my_listings', to: '/my-listings', icon: ListChecks,   labelKey: 'nav_my_listings' },
  { key: 'alerts',      to: '/alerts',      icon: Bell,         labelKey: 'nav_alerts', disabled: true },
];
