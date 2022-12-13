import _ from "lodash";

export function getFacilityListingData(facilities: any) {
  let result = _.map(facilities, {
    a: 1,
  });
  return result;
}
