export class Tariff {
    id: number;
    name: string;
    type: string;
    baseCost: number;
    consumptionCost: number;
    annualCost?: number;
    limit?: number;
}