// @flow

import Emmiter from 'events';

class GlobalEvents extends Emmiter {};

const events = new GlobalEvents();

export default events;
