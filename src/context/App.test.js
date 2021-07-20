import { fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';
import data from '../../server/db.json'

describe('Context', () => {
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

  const configurations = [
    {
      Processor: 'a',
      Memory: 'a',
      Graphics: 'a',
      Storage: 'a',
      price: 239900
    },
    {
      Processor: 'b',
      Memory: 'c',
      Graphics: 'c',
      Storage: 'a',
      price: 409900
    },
    {
      Processor: 'b',
      Memory: 'c',
      Graphics: 'c',
      Storage: 'd',
      price: 629900
    }
  ]

  configurations.forEach(configuration => {
    it(`should show the correct price when 
        Processor ${configuration.Processor},
        Memory ${configuration.Memory}, 
        Graphics ${configuration.Graphics} and 
        Storage ${configuration.Storage} 
      is selected`, async () => {

      const { getByTestId, debug } = render(<App />);

      await waitFor(() => {
        fireEvent.click(getByTestId(`Processor_${configuration.Processor}`));
        fireEvent.click(getByTestId(`Memory_${configuration.Memory}`));
        fireEvent.click(getByTestId(`Graphics_${configuration.Graphics}`));
        fireEvent.click(getByTestId(`Storage_${configuration.Storage}`));

        expect(getByTestId('total-price')).toHaveTextContent(`₹${configuration.price}`);
      });
    });
  });
});