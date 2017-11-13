/**
 * localForage.js
 *
 * @author Philip Van Raalte
 * @date 2017-11-13
 */
import localForage from 'localforage';

localForage.config({
  name: "ultra-triv-dev",
  version: 1.0
});

// For Testing Only
window.localForage = localForage;

export default localForage;

export const DATA_SCORES = "data_scores";