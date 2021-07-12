const DOMAIN = 'http://localhost:3004';

export const getDefaultPrice = async () => {
  try {
    const response = await fetch(`${DOMAIN}/price`);
    return response.json();
  }
  catch {
    throw new Error('could not fetch the default price');
  }
}

export const getCustomisableComponents = () => {
  return fetch(`${DOMAIN}/components`)
    .then(response => response.json())
    .then(data => {
      return Object.keys(data).reduce((componentsWithSelectedConfiguration, component) => {
        return {
          ...componentsWithSelectedConfiguration,
          [component]: data[component].map(c => ({
            ...c,
            selected: c.default
          }))
        }
      }, {})
    })
    .catch(() => {
      throw new Error('could not fetch the customisable components');
    });
}