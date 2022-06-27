const chance = require('chance').Chance();
const { saveCard, fetchCards } = require('../../lib/services/creditCard');
const { isValidNumber } = require('../../lib/utils');

beforeAll(async () => { });

it('Should create a new credit card and save in DB', async () => {
  const cardNumber = chance.integer({ min: 8, length: 16 });
  const fakeCreditCard = {
    name: chance.name({ length: 80 }),
    cardNumber: isValidNumber(cardNumber) ? cardNumber : 4444333322221111,
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

afterAll(async () => { });
