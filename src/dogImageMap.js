import boxer from './images/boxer.jpeg';
import frenchBulldog from './images/french-bulldog.jpeg';
import goldenRetriever from './images/golden-retriever.jpeg';
import scottishTerrier from './images/scottish-terrier.jpeg';


export default function dogImageMap(path) {
  switch(path) {
    case 'images/boxer.jpeg': {
      return boxer;
    }

    case 'images/french-bulldog.jpeg': {
      return frenchBulldog;
    }

    case 'images/golden-retriever.jpeg': {
      return goldenRetriever;
    }

    default: {
      return scottishTerrier;
    }
  }
}
