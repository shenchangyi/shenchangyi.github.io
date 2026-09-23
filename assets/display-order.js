(() => {
  const displayOrder = new Map([
    ["司马第", 1],
    ["永慕堂", 2],
    ["万寿宫", 3],
    ["中西合璧小教堂", 4],
    ["二七会议旧址", 5],
    ["文昌阁", 6],
    ["毛泽东故居", 7],
    ["古街", 8],
  ]);

  const applyDisplayOrder = (observer) => {
    const cards = [...document.querySelectorAll("[data-group-card]")];
    if (cards.length !== displayOrder.size) return;

    const parent = cards[0].parentElement;
    if (!parent || cards.some((card) => card.parentElement !== parent)) return;

    const labelFor = (card) =>
      [...displayOrder.keys()].find((name) => card.textContent.includes(name));

    cards
      .sort((first, second) =>
        displayOrder.get(labelFor(first)) - displayOrder.get(labelFor(second)),
      )
      .forEach((card) => parent.appendChild(card));

    parent.scrollLeft = 0;
    requestAnimationFrame(() => {
      parent.scrollLeft = 0;
      parent.dispatchEvent(new Event("scroll"));
    });
    observer.disconnect();
  };

  const observer = new MutationObserver(() => applyDisplayOrder(observer));
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
  applyDisplayOrder(observer);
})();
