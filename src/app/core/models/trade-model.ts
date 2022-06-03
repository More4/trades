/**
 * Model for the Trade component.
 * @example
 * {
 *     entryDate: '29.10.2022, 15:00',
 *     entryPrice: 300,
 *     exitDate: '30.10.2022, 08:00',
 *     exitPrice: '350',
 * }
 */
export interface Trade {
    base: {
        entryDate: Date;
        entryPrice: number;
        exitDate: Date;
        exitPrice: number;
    }
    created? : boolean;
}