/**
 * Model for the SortedTrade component.
 * @example
 * {
 *     date: '29.10.2022, 15:00',
 *     price: 300,
 *     type: 'entry',
 * }
 */
export interface SortedTrade {
    date: Date;
    price: number;
    type: 'entry' | 'exit';
}