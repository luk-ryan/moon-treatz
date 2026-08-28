/**
 * useFlavourSelection Hook
 * ========================
 * Shared "menu filter" behaviour used by both the Classic and Specialty flavour
 * tabs: pick one item (or null for "Show All"), get back the list to render,
 * prev/next page-flip helpers, and a ref to scroll the results into view.
 */

import { useRef, useState } from "react";

export const useFlavourSelection = <T,>(items: T[]) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Scrolls the toggle/content area into view when a menu item is clicked.
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollToContent = () => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Selects an item by index (or null to show everything) and scrolls to the result.
  const select = (index: number | null) => {
    setSelectedIndex(index);
    scrollToContent();
  };

  const itemsToShow = selectedIndex === null ? items : [items[selectedIndex]];
  const hasPrev = selectedIndex !== null && selectedIndex > 0;
  const hasNext = selectedIndex !== null && selectedIndex < items.length - 1;
  const goPrev = () => { if (hasPrev) select(selectedIndex! - 1); };
  const goNext = () => { if (hasNext) select(selectedIndex! + 1); };

  return { selectedIndex, select, itemsToShow, contentRef, hasPrev, hasNext, goPrev, goNext };
};
