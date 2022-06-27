const chance = require('chance').Chance();
const { saveCard, fetchCards } = require('../../lib/services/creditCard');

beforeAll(async () => { });

it('Should create a new credit card and save in DB', async () => {
  const fakeCreditCard = {
    name: chance.name({ length: 80 }),
    cardNumber: chance.integer({ min: 0, length:16 }),
    balance: 0,
    limit: chance.integer({ min: 0, max: 1000000 })
  };
  const card = await saveCard(fakeCreditCard);
  expect(card.cardNumber).toEqual(fakeCreditCard.cardNumber);
});

it('Should fetch existed creds from DB', async () => {
  const cards = await fetchCards();
  expect(cards).toHaveLength(cards.length);
});

afterAll(async () => {});
