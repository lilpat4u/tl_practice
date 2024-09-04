import { Application } from '../../types/Application';
import { createCard } from '../../types/Card';
import { createCardSet } from '../../types/CardSet';
import { addNewCardToCardSet, deleteCardFromCardSet, changeCardFrontsideInCardSet, changeCardBacksideInCardSet } from '../CardMethods';

describe('CardMethods', () => {
    let app: Application;

    beforeEach(() => {
        app = {
            cardSets: [
                createCardSet('Set 1'),
                createCardSet('Set 2'),
            ]
        };

        // Добавим тестовую карточку в первый набор
        app.cardSets[0].cards.push(createCard('Frontside 1', 'Backside 1'));
    });

    test('addNewCardToCardSet should add a new card to the specified card set', () => {
        const newApp = addNewCardToCardSet(app, app.cardSets[0].id, 'New Frontside', 'New Backside');
        expect(newApp.cardSets[0].cards.length).toBe(2);
        expect(newApp.cardSets[0].cards[1].frontside).toBe('New Frontside');
        expect(newApp.cardSets[0].cards[1].backside).toBe('New Backside');
    });

    test('deleteCardFromCardSet should delete the specified card from the card set', () => {
        const cardId = app.cardSets[0].cards[0].id;
        const newApp = deleteCardFromCardSet(app, app.cardSets[0].id, cardId);
        expect(newApp.cardSets[0].cards.length).toBe(0);
    });

    test('changeCardFrontsideInCardSet should change the frontside of the specified card', () => {
        const cardId = app.cardSets[0].cards[0].id;
        const newApp = changeCardFrontsideInCardSet(app, app.cardSets[0].id, cardId, 'Updated Frontside');
        expect(newApp.cardSets[0].cards[0].frontside).toBe('Updated Frontside');
    });

    test('changeCardBacksideInCardSet should change the backside of the specified card', () => {
        const cardId = app.cardSets[0].cards[0].id;
        const newApp = changeCardBacksideInCardSet(app, app.cardSets[0].id, cardId, 'Updated Backside');
        expect(newApp.cardSets[0].cards[0].backside).toBe('Updated Backside');
    });
});