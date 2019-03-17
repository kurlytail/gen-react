import Path from 'path';
// eslint-disable-next-line no-undef
const requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;
const baseModule = requireFunc.main.children.find(module => module.id.includes('gen-react/dist/react.min.js'));
let basePath;

if (!baseModule) {
    basePath = '.';
} else {
    basePath = Path.dirname(Path.dirname(baseModule.id));
}

const options = {
    // eslint-disable-next-line no-undef
    version: app.version,
    map: [`${basePath}/templates/map.json`]
};

export default options;