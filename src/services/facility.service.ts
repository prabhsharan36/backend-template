import { container } from "../loaders/container";
import _, { lowerCase } from "lodash";
import { DoctorVisit } from "../entity/doctorVisit.entity";
import { getQueryManager } from "../core/dataLayes/manager";

class FacilityService {
  protected facilityRepo = container.cradle.facitlityRepo;
  // protected getFacilityListingData = container.cradle.getFacilityListingData;

  async listing({ pageType, category, city_state_country, area }) {
    const Facilities = await this.facilityRepo.listing({
      pageType,
      category,
      city_state_country,
      area,
    });

    let result = await Promise.all(
      Facilities.map(async (facility) => {
        return {
          id: facility?.facility_id,
          type: facility?.facility_type,
          name: facility?.facility_name,
          established_in: facility?.facility_established_in,
          website: facility?.facility_website,
          beds: facility?.facility_beds,
          ambulance: facility?.facility_ambulance,
          slug: facility?.slug_slug || null,
          calling_number: facility?.fphone_phones || null,
          emergency_number: facility?.facility_emergency_number,
          address_line: facility?.facility_address_line,
          additional_address_line: facility?.facility_additional_address_line,
          landmark: facility?.facility_landmark,
          full_address_line: await getFullAddressAttribute(
            facility?.facility_address_line,
            facility?.facility_additional_address_line,
            facility?.facility_landmark
          ),
          text_info: facility?.facility_about,

          url:
            facility?.facility_type &&
            facility?.slug_slug &&
            facility?.facility_status_id == 1
              ? "/" +
                lowerCase(facility?.facility_type) +
                "/" +
                facility?.slug_slug
              : null,
          doctors_count: await getDoctorsCount(facility?.facility_id),
          map_link: getMapLinkAttribute(
            facility?.facility_latitude,
            facility?.facility_longitude
          ),
          open_status: await getOpenStatusAttribute(
            facility?.facility_meta_data
          ),
          "24x7": await get24x7Attribute(facility?.facility_meta_data),
          city: {
            name: facility?.city_name,
          },
          area: {
            name: facility?.area_name,
            nearby_localities: facility?.area_metadata.nearby_localities,
          },
          country: {
            name: facility?.country_name,
          },
          amenities: {
            name: facility?.faminity_name,
            type: facility?.faminity_type,
          },
        };
      })
    );
    return result;
  }
}
async function getOpenStatusAttribute(meta_data) {
  let today_date = new Date();
  let date =
    today_date.getFullYear() +
    "-" +
    (today_date.getMonth() + 1) +
    "-" +
    today_date.getDate();
  let time =
    today_date.getHours() +
    ":" +
    today_date.getMinutes() +
    ":" +
    today_date.getSeconds();
  let current_time = date + " " + time;
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const d = new Date();
  let today = weekday[today_date.getDay()];
  // console.log(meta_data);

  // let current_time = now();
  // let today = current_time.format('l'); // carbon instance
  let open_hours =
    meta_data["open_hours"] !== "undefined" ? meta_data["open_hours"] : false;
  let _24x7 = meta_data["24x7"] !== "undefined" ? meta_data["24x7"] : false;
  // console.log(Object.keys(open_hours), "open_hours");
  // console.log(_24x7, "24x7");

  if (!_24x7) {
    // This is use to sort open_hours the array according to days
    let _sorted: string[] = [];
    let weekdays: string[] = weekday;
    // console.log(Object.keys(weekdays));

    // let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let day in Object.keys(weekdays)) {
      // console.log(typeof weekdays[day]);

      // if (Object.keys(open_hours)) {
      // console.log(Object.keys(open_hours).indexOf(weekdays[day]) > -1);

      if (Object.keys(open_hours).indexOf(weekdays[day]) > -1) {
        _sorted[day] = open_hours[day];
        // }
      }
    }
    console.log(_sorted, "sorted");

    open_hours = _sorted;
    let open_days = Object.keys(open_hours); // in sorted order.
    // console.log(open_days, "opendays");

    /* IF OPENS TODAY */
    if (today in open_days) {
      let closing_times = [];
      let opening_times = [];
      console.log(open_hours[today]);
    }
  }

  //     for(let time_slot in open_hours[today]) {
  //       closing_times.push(time_slot['close']);
  //       array_push(opening_times, Carbon::parse(_time_slot['open']));
  //     }

  //     if (current_time < max(closing_times)) {
  //       _diff_in_next_open_time = 1440; // max value  =  no of minutes in 24hrs (i.e. 1440)
  //       _next_open_time = null;

  //       for (i = 0; i < count(opening_times); i++) {
  //         // If the current time matches a open time slot.
  //         if (opening_times[i] <= current_time && current_time < closing_times[i]) {
  //           _diffInMinutes = current_time.diffInMinutes(closing_times[i]);
  //           if (_diffInMinutes < 60) {
  //             // less then 1hour before closing the facility
  //             return 'Closes in '.
  //             _diffInMinutes.
  //             ' '.
  //             (_diffInMinutes > 1 ? 'minutes' : 'minute');
  //           }
  //           elseif(_diffInMinutes < 120) {
  //             // less then 2 hours before closing the facility
  //             return 'Open till '.str_replace(':00', '', closing_times[i].format('g:i a')); // using open_hours to get beautified close time string.
  //           } else {
  //             return 'Open Now';
  //           }
  //         } else {
  //           // data if the current time is not in any of the open slots
  //           if (opening_times[i] > current_time) {
  //             _diff = current_time.diffInMinutes(opening_times[i]);
  //             if (_diff < _diff_in_next_open_time) {
  //               _diff_in_next_open_time = _diff;
  //               _next_open_time = opening_times[i];
  //             }
  //           }
  //         }
  //       }

  //       if (_diff_in_next_open_time < 60) {
  //         return 'Opens in '.
  //         _diff_in_next_open_time.
  //         ' '.
  //         (_diff_in_next_open_time > 1 ? 'minutes' : 'minute');
  //       } else {
  //         _next_open_time = str_replace(':00', '', _next_open_time.format('g:i a'));
  //         return 'Opens at '._next_open_time;
  //       }
  //     } else {
  //       return this.nextAvailibilityStr(open_hours, open_days);
  //     }
  //   } else {
  //     return this.nextAvailibilityStr(open_hours, open_days);
  //   }
  // } else {
  //   return 'Open 24x7';
  // }
  return "";
}
async function get24x7Attribute(facility_id) {}
async function getFullAddressAttribute(
  address_line,
  additional_address_line,
  landmark
) {
  address_line = address_line == null ? "" : address_line;
  additional_address_line =
    additional_address_line == null ? "" : ", " + additional_address_line;
  landmark = landmark == null ? "" : ", " + landmark;
  // console.log(address_line);
  return address_line + additional_address_line + landmark;
}

async function getDoctorsCount(facility_id: number) {
  let doctor_count = await getQueryManager()
    .createQueryBuilder(DoctorVisit, "visits")
    .select(["visits.doctor_id"])
    .where("visits.facility_id=:id", {
      id: facility_id,
    })
    .getRawMany();
  let count = Object.keys(doctor_count).length;
  return count;
}

function getMapLinkAttribute(
  latitude: number,
  longitude: number
): string | null {
  if (latitude && longitude) {
    return (
      "https://www.google.com/maps?saddr=My+Location&daddr=" +
      latitude +
      "," +
      longitude
    );
  }
  return null;
}
export default FacilityService;
