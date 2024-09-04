import { v4 as uuidv4 } from 'uuid';
import { createCard, changeCard, deleteCard, Card } from '../Card';

jest.mock('uuid', () => ({
    v4: jest.fn(),
}));

describe('Card Utilities', () => {
    beforeEach(() => {
        (uuidv4 as jest.Mock).mockClear();
    });

    test('createCard should create a card with a unique id', () => {
        const mockUuid = '1234-5678-91011';
        (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

        const frontside = 'Front Side';
        const backside = 'Back Side';

        const card = createCard(frontside, backside);

        expect(card).toEqual({
            id: mockUuid,
            frontside,
            backside,
        });
        expect(uuidv4).toHaveBeenCalledTimes(1);
    });

    test('changeCard should update the frontside and backside of an existing card', () => {
        const originalCard: Card = {
            id: 'existing-id',
            frontside: 'Original Front',
            backside: 'Original Back',
        };

        const newFrontside = 'New Front';
        const newBackside = 'New Back';

        const updatedCard = changeCard(originalCard, newFrontside, newBackside);

        expect(updatedCard).toEqual({
            id: 'existing-id',
            frontside: newFrontside,
            backside: newBackside,
        });
    });

    test('deleteCard should remove a card by id from an array of cards', () => {
        const cards: Card[] = [
            { id: '1', frontside: 'Front 1', backside: 'Back 1' },
            { id: '2', frontside: 'Front 2', backside: 'Back 2' },
            { id: '3', frontside: 'Front 3', backside: 'Back 3' },
        ];

        const cardIdToDelete = '2';

        const updatedCards = deleteCard(cards, cardIdToDelete);

        expect(updatedCards).toEqual([
            { id: '1', frontside: 'Front 1', backside: 'Back 1' },
            { id: '3', frontside: 'Front 3', backside: 'Back 3' },
        ]);
        expect(updatedCards.length).toBe(2);
        expect(updatedCards.find(card => card.id === cardIdToDelete)).toBeUndefined();
    });

    test('deleteCard should not remove any card if the id does not exist', () => {
        const cards: Card[] = [
            { id: '1', frontside: 'Front 1', backside: 'Back 1' },
            { id: '2', frontside: 'Front 2', backside: 'Back 2' },
        ];

        const nonExistentId = 'non-existent-id';

        const updatedCards = deleteCard(cards, nonExistentId);

        expect(updatedCards).toEqual(cards);
        expect(updatedCards.length).toBe(2);
    });
});