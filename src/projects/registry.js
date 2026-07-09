import zomatoProject from "./zomato/project";
import zomatoSteps from "./zomato/steps";
import { getImage as getZomatoImage } from "./zomato/images";

import airbnbProject from "./airbnb/project";
import airbnbSteps from "./airbnb/steps";
import { getImage as getAirbnbImage } from "./airbnb/images";

import covidProject from "./covid/project";
import covidSteps from "./covid/steps";
import { getImage as getCovidImage } from "./covid/images";

import imdbProject from "./imdb/project";
import imdbSteps from "./imdb/steps";
import { getImage as getImdbImage } from "./imdb/images";

import spamProject from "./email-spam-detection/project";
import spamSteps from "./email-spam-detection/steps";
import { getImage as getSpamImage } from "./email-spam-detection/images";

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
  covid: {
    project: covidProject,
    steps: covidSteps,
    getImage: getCovidImage,
  },
  imdb: {
    project: imdbProject,
    steps: imdbSteps,
    getImage: getImdbImage,
  },
  "email-spam-detection": {
    project: spamProject,
    steps: spamSteps,
    getImage: getSpamImage,
  },
};

export default registry;