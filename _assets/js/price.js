window.calculator = () => {
    return {
        itemRarity: "Uncommon",
        basePrice: between(100, 500),
        modifiers: {
            location: null,
            prosperity: null,
            competition: null,
            attitude: null,
        },
        rolls: {
            merchant: { roll: null, crit: false },
            player: { roll: null, crit: false },
        },

        get percentage() {
            const abs = Math.abs(this.basePrice - this.price);
            const avg = (this.basePrice + this.price) / 2;
            const diff = (abs / avg) * 100;
            if (this.basePrice > this.price) {
                return -(diff.toFixed(2));
            }
            return diff.toFixed(2);
        },

        get economy() {
            const mods = Object.values(this.modifiers).filter(m => m !== null);
            const sum = mods.reduce((a, b) => Number(a) + Number(b), 0);
            const avg = (sum / mods.length) || 1;

            return Math.round(avg * 100) / 100;
        },

        get discount() {
            if (!this.rolls.merchant.roll || !this.rolls.player.roll) {
                return 0;
            }

            const discount = this.rolls.merchant.roll - this.rolls.player.roll;
            const modifier = (this.rolls.merchant.crit || this.rolls.player.crit) ? 4 : 2;

            if (this.rolls.merchant.roll > this.rolls.player.roll) {
                return discount * modifier;
            }

            return -(discount * modifier);
        },

        get price() {
            const localPrice = Math.ceil(this.basePrice * this.economy);
            const discount = (this.discount / 100) * this.basePrice;

            return Math.ceil(localPrice - discount);
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
            { label: "Admire", value: 0.9},
            { label: "Appreciate", value: 1},
            { label: "Like", value: 1.1},
            { label: "Indifferent", value: 1.2},
            { label: "Hate", value: 1.3},
            { label: "Despise", value: 1.4},
            { label: "Abhor", value: 1.5},
        ],
    };
};

const between = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

window.between = between;
