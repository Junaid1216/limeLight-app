const VALID_INCENTIVE_SLABS = ['A', 'B', 'C', 'D', 'E'];

const parseAmount = value => {
  const parsed = Number(String(value ?? '').replace(/,/g, '').trim());

  return Number.isFinite(parsed) ? parsed : 0;
};

export const deriveSlabFromNetSale = netSale => {
  const amount = parseAmount(netSale);

  if (amount >= 80000) {
    return 'A';
  }

  if (amount >= 60000) {
    return 'B';
  }

  if (amount >= 40000) {
    return 'C';
  }

  if (amount >= 20000) {
    return 'D';
  }

  return 'E';
};

export const resolveIncentiveSlab = (slabValue, netSale) => {
  const slab = String(slabValue ?? '')
    .trim()
    .toUpperCase();

  if (VALID_INCENTIVE_SLABS.includes(slab) && slab !== '-') {
    return slab;
  }

  return deriveSlabFromNetSale(netSale);
};
