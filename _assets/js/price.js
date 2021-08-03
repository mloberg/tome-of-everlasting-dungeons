import Alpine from 'alpinejs';

const between = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

Alpine.data('calculator', () => ({
  itemRarity: "Uncommon",
  basePrice: between(100, 500),
  modifiers: {
    location: null,
    prosperity: null,
    competition: null,
    attitude: null,
    shoptype: null,
  },
  adjustment: 0,
  rolls: {
    merchant: 10,
    player: null,
    crit: false,
  },

  resetEconomy() {
    if (!confirm("Are you sure?")) {
      return;
    }
    this.modifiers.location = null;
    this.modifiers.prosperity = null;
    this.modifiers.competition = null;
    this.modifiers.attitude = null;
    this.modifiers.shoptype = null;
  },

  resetRolls() {
    if (!confirm("Are you sure?")) {
      return;
    }
    this.rolls.merchant = 10;
    this.rolls.player = null;
    this.rolls.crit = false;
  },

  get economy() {
    const mods = Object.values(this.modifiers).filter(m => m);
    const sum = mods.reduce((a, b) => Number(a) + Number(b), 0);
    const avg = (sum / mods.length) || 1;

    return -(100 - Math.round(avg * 100));
  },

  get discount() {
    if (!this.rolls.merchant || !this.rolls.player) {
      return 0;
    }

    const discount = this.rolls.merchant - this.rolls.player;
    const modifier = this.rolls.crit ? 4 : 2;

    return discount * modifier;
  },

  get price() {
    const discount = (-this.adjustment / 100) * this.basePrice;

    return Math.ceil(this.basePrice - discount);
  },

  recalculate(type) {
    const rarity = this.rarity.filter(r => type === r.label)[0];
    this.basePrice = between(rarity.min, rarity.max);
  },

  apply(value, add = false) {
    this.adjustment = Number(add ? this.adjustment : 0) + Number(value);
  },

  rarity: [
    {
      label: "Common",
      min: 50,
      max: 100
    },
    {
      label: "Uncommon",
      min: 100,
      max: 500,
    },
    {
      label: "Rare",
      min: 500,
      max: 5000,
    },
    {
      label: "Very Rare",
      min: 5000,
      max: 10000,
    },
  ],
  locations: [
    { label: "Metropolis", value: 0.9 },
    { label: "Large City", value: 1 },
    { label: "Small City", value: 1.1 },
    { label: "Large Town", value: 1.2 },
    { label: "Small Town", value: 1.3 },
    { label: "Village", value: 1.4 },
    { label: "Hamlet", value: 1.5 },
  ],
  prosperity: [
    { label: "Booming", value: 0.9 },
    { label: "Wealthy", value: 1 },
    { label: "Comfortable", value: 1.1 },
    { label: "Modest", value: 1.2 },
    { label: "Poor", value: 1.3 },
    { label: "Squalid", value: 1.4 },
    { label: "Wretched", value: 1.5 },
  ],
  competition: [
    { label: "None", value: 1.5 },
    { label: "Some", value: 1.25 },
    { label: "Moderate", value: 1 },
    { label: "Lots", value: 0.9 },
  ],
  attitude: [
    { label: "Admire", value: 0.9 },
    { label: "Appreciate", value: 1 },
    { label: "Like", value: 1.1 },
    { label: "Indifferent", value: 1.2 },
    { label: "Hate", value: 1.3 },
    { label: "Despise", value: 1.4 },
    { label: "Abhor", value: 1.5 },
  ],
  shoptype: [
    { label: "Travelling", value: 1.1 },
    { label: "General", value: 1.0 },
    { label: "Specialty", value: 0.95, },
  ],
}));

window.Alpine = Alpine;

Alpine.start();
