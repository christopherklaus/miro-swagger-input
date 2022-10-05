import axios from 'axios';

const getSwaggerJSON = async () => {
  const { data } = await axios.get('https://petstore.swagger.io/v2/swagger.json');
  return data;
}

const style = {
  textAlign: 'left',
    textAlignVertical: 'top',
    fillColor: '#ffffff',
};

const offset = 200;

const shapesForPaths = (paths) => {
  return Object.keys(paths).reduce((carry, path, index) => {
    // const endpoints = paths[path];
    carry.push({
      shape: 'round_rectangle',
      content: `<p>${path}</p>`,
      x: index * offset,
      style,
    });
    return carry;
  }, []);
}

const methodsOfPaths = (paths, path) => {
    return Object.keys(paths[path]).reduce((carry, method, index) => {
      carry.push({
        shape: 'round_rectangle',
        content: `<p>${method}</p>`,
        x: index * offset,
        y: 200,
        style,
      });
      return carry;
    }, []);
}

const swaggerData = await getSwaggerJSON();
const pathShapes = shapesForPaths(swaggerData.paths);
const methodShapes = Object.keys(swaggerData.paths).map(path => methodsOfPaths(swaggerData.paths, path)).flat();

const shapes = [...pathShapes, ...methodShapes].map(shape => miro.board.createShape(shape));

Promise.all(shapes).then(() => {
  console.log('done');
});

// show prompt to input url for swagger json / yaml

// parse API endpoints and create shapes for entities and Endpoints
