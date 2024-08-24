import { addNewCardSet, deleteCardSetFromApp, changeCardSetName } from '../CardSetMethods';
import { Application } from '../../types/Application';

describe('CardSetMethods', () => {
    let app: Application;

    beforeEach(() => {
        app = {
            cardSets: [
                { id: '1', name: 'Set 1', cards: [] },
                { id: '2', name: 'Set 2', cards: [] },
            ]
        };
    });

    test('addNewCardSet should add a new card set to the application', () => {
        const newApp = addNewCardSet(app, 'New Set');
        expect(newApp.cardSets.length).toBe(3);
        expect(newApp.cardSets[2].name).toBe('New Set');
    });

    test('deleteCardSetFromApp should delete the specified card set from the application', () => {
        const newApp = deleteCardSetFromApp(app, '1');
        expect(newApp.cardSets.length).toBe(1);
        expect(newApp.cardSets[0].id).toBe('2');
    });

    test('changeCardSetName should change the name of the specified card set', () => {
        const newApp = changeCardSetName(app, '1', 'Updated Set 1');
        expect(newApp.cardSets[0].name).toBe('Updated Set 1');
    });
});