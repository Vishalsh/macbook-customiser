import { render, waitFor } from '@testing-library/react';
import App from './App';
import data from '../server/db.json'

beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockResolvedValueOnce(
      {
        json: () => Promise.resolve(data.price),
      }
    )
    .mockResolvedValueOnce(
      {
        json: () => Promise.resolve(data.components),
      }
    );
});

test('show the default price of the macbook by default', async () => {

  const { getByTestId } = render(<App />);

  await waitFor(() => {
    expect(getByTestId('total-price')).toHaveTextContent('₹239900');
  });
});
