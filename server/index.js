const md5File = require("md5-file");
const fs = require("fs");
const path = require("path");

// CSS styles will be imported on load and that complicates matters... ignore those bad boys!
const ignoreStyles = require("ignore-styles");
const register = ignoreStyles.default;

// We also want to ignore all image requests
// When running locally these will load from a standard import
// When running on the server, we want to load via their hashed version in the build folder
const extensions = [".gif", ".jpeg", ".jpg", ".png", ".svg"];

// Override the default style ignorer, also modifying all image requests
register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (!extensions.find(f => filename.endsWith(f))) {
    // If we find a style
    return ignoreStyles.noOp();
  }
  // for images that less than 10k, CRA will turn it into Base64 string, but here we have to do it again
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size / 1024;
  if (fileSizeInBytes <= 10) {
    mod.exports = `data:image/${mod.filename
      .split(".")
      .pop()};base64,${fs.readFileSync(mod.filename, {
      encoding: "base64"
    })}`;
    return ignoreStyles.noOp();
  }

  // If we find an image
  const hash = md5File.sync(filename).slice(0, 8);
  const bn = path.basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`);

  mod.exports = `/static/media/${bn}`;
});

require("@babel/polyfill");
require("@babel/register")({
  ignore: [/\/(build|node_modules)\//],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "dynamic-import-node",
  ],
  only: [__dirname + "/../../"],
  ignore: [__dirname + "/../../**/node_modules"],
});

// Now that the nonsense is over... load up the server entry point
require("./server");