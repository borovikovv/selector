import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export function useScrollingRender(
  renderBatchSize = 0,
  totalRows: number,
  scrollContainer: HTMLElement = document.querySelector('html') as HTMLElement,
){
  const initialLastRowToRender = renderBatchSize || totalRows;
  const [lastRowToRender, setLastRowToRender] = useState(initialLastRowToRender);

  useLayoutEffect(() => {
    setLastRowToRender(initialLastRowToRender);
  }, [totalRows]);

  useLayoutEffect(() => {
    renderMoreIfAtBottom();
  });

  const renderMoreIfAtBottom = useCallback(() => {
    if (!scrollContainer || !renderBatchSize) {
      return;
    }
    const { scrollHeight, scrollTop, clientHeight } = scrollContainer;
    const scrolledToBottom = scrollHeight - scrollTop <= clientHeight;

    if (scrolledToBottom && lastRowToRender < totalRows) {
      setLastRowToRender((prev) => prev + renderBatchSize);
    }
  }, [scrollContainer, renderBatchSize, lastRowToRender, totalRows]);

  useEffect(() => {
    if (!scrollContainer || !renderBatchSize) {
      return;
    }
    scrollContainer.addEventListener('scroll', renderMoreIfAtBottom);

    return () => scrollContainer.removeEventListener('scroll', renderMoreIfAtBottom);
  }, [scrollContainer, renderMoreIfAtBottom, renderBatchSize]);

  return lastRowToRender;
};