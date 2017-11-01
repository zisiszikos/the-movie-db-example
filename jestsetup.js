import enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
enzyme.configure({ adapter: new EnzymeAdapter() });
axios.defaults.adapter = httpAdapter;
axios.defaults.baseURL = 'http://localhost:3000';

global.shallow = enzyme.shallow;
global.render = enzyme.render;
global.mount = enzyme.mount;

global.delayTest = (time) => new Promise((resolve) => setTimeout(resolve, time));

// mock required csrf meta tag
var meta = document.createElement('meta');
meta.name = '_csrf';
meta.content = '';
document.getElementsByTagName('head')[0].appendChild(meta);
