import { fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';
import data from '../../server/db.json'

describe('Error boundry', () => {
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

      const { getByTestId } = render(<App />);

      await waitFor(() => {
        fireEvent.click(getByTestId(`Processor_${configuration.Processor}`));
        fireEvent.click(getByTestId(`Memory_${configuration.Memory}`));
        fireEvent.click(getByTestId(`Graphics_${configuration.Graphics}`));
        fireEvent.click(getByTestId(`Storage_${configuration.Storage}`));

        expect(getByTestId('total-price')).toHaveTextContent(`₹${configuration.price}`);
      });
    });
  });

  it('should render the error in error boundry if an error is thrown', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce(
        {
          json: () => Promise.resolve(data.price),
        }
      )
      .mockResolvedValueOnce(
        {
          json: () => Promise.resolve({
            ...data.components,
            "Processor": [
              {
                "serialNo": "a",
                "variant": "2.3GHz 8-core 9th-generation Intel Core processor, Turbo Boost up to 4.8GHz",
                "addOnPrice": 0,
                "default1": true
              },
              {
                "serialNo": "b",
                "variant": "2.4GHz 8-core 9th-generation Intel Core processor, Turbo Boost up to 5.0GHz",
                "addOnPrice": 20000,
                "default": false
              }
            ],
          }),
        }
      );

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText('Error Boundry has caught the error')).toBeDefined();
    });
  });
});