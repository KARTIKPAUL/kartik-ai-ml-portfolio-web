import zomatoProject from "./zomato/project";
import zomatoSteps from "./zomato/steps";
import { getImage as getZomatoImage } from "./zomato/images";

import airbnbProject from "./airbnb/project";
import airbnbSteps from "./airbnb/steps";
import { getImage as getAirbnbImage } from "./airbnb/images";

// Add a new entry here every time you finish a new project folder.
// Each entry needs: project.js (metadata), steps.js (notebook cells),
// and images.js (the getImage lookup helper).
const registry = {
  zomato: {
    project: zomatoProject,
    steps: zomatoSteps,
    getImage: getZomatoImage,
  },
  airbnb: {
    project: airbnbProject,
    steps: airbnbSteps,
    getImage: getAirbnbImage,
  },
};

export default registry;