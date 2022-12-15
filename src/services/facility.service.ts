import { container } from "../loaders/container";
import _, { indexOf, lowerCase, times } from "lodash";
import { DoctorVisit } from "../entity/doctorVisit.entity";
import { getQueryManager } from "../core/dataLayes/manager";
import { getImageUrl } from "./image.service";
import { time } from "console";

class FacilityService {
  protected facilityRepo = container.cradle.facitlityRepo;
  // protected getImageUrl = container.cradle.getImageUrl;
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
          full_address_line: await this.getFullAddressAttribute(
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
          doctors_count: await this.getDoctorsCount(facility?.facility_id),
          logo: this.getLogo(facility?.media_name),
          map_link: this.getMapLinkAttribute(
            facility?.facility_latitude,
            facility?.facility_longitude
          ),
          open_status: await this.getOpenStatusAttribute(
            facility?.facility_meta_data
          ),
          "24x7": await this.get24x7Attribute(facility?.facility_meta_data),
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

  getLogo(mediaName: string) {
    return {
      url: getImageUrl(mediaName, "facility_profile_desktop"),
    };
  }

  async getOpenStatusAttribute(meta_data) {
    let todayDate = new Date();

    /** For sorting open hours in order */
    const Weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let todayDay = Weekdays[todayDate.getDay()];

    let openHours = _.isEmpty(meta_data?.open_hours)
      ? null
      : meta_data?.open_hours;

    let _24x7 = meta_data?.["24x7"];

    if (!_24x7) {
      let sorted = {};
      if (openHours) {
        Weekdays.forEach((day: string) => {
          sorted[day] = openHours?.[day] || null;
        });
      }
      openHours = sorted;
      let openDays = Object.keys(openHours); // in sorted order.

      /* CHECK IF OPENS TODAY */
      if (openDays.indexOf(todayDay) > -1) {
        let openingTimes: number[] = [];
        let closingTimes: number[] = [];

        for (let timeSlot in openHours[todayDay]) {
          openingTimes.push(parseInt(openHours[todayDay][timeSlot]?.open));
          closingTimes.push(parseInt(openHours[todayDay][timeSlot]?.close));
        }
        // console.log(closingTimes);
        const CurrentTime = parseInt(
          todayDate
            .toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
            .toLocaleLowerCase()
        );

        console.log(
          closingTimes,
          Math.max(...closingTimes),
          "Math.max(...closingTimes)"
        );
        if (CurrentTime < Math.max(...closingTimes)) {
          let diffInNextOpenTime = 1440; // max value  =  no of minutes in 24hrs (i.e. 1440)
          let nextOpenTime;
          for (let index = 0; index < openingTimes.length; index++) {
            const openTime = openingTimes[index];
            if (
              openingTimes[index] <= CurrentTime &&
              CurrentTime < closingTimes[index]
            ) {
              // TODO (Find Difference)
              // let diffInMinutes = $current_time->diffInMinutes($closing_times[$i]);
              let diffInMinutes = 60;
              if (diffInMinutes < 60) {
                // less then 1hour before closing the facility
                return `Closes in ${diffInMinutes} ${
                  diffInMinutes > 1 ? "minutes" : "minute"
                }`;
              } else if (diffInMinutes < 120) {
                // less then 2 hours before closing the facility
                return `Open till `;
                // str_replace(':00', '', $closing_times[$i]->format('g:i a')); // using $open_hours to get beautified close time string.
              } else {
                return "Open Now";
              }
            } else {
              // data if the current time is not in any of the open slots
              if (openingTimes[index] > CurrentTime) {
                // TODO
                let diff = 0;
                // $_diff = $current_time->diffInMinutes($opening_times[$i]);
                if (diff < diffInNextOpenTime) {
                  diffInNextOpenTime = diff;
                  nextOpenTime = openingTimes[index];
                }
              }
            }
          }

          if (diffInNextOpenTime < 60) {
            // TODO
            // return 'Opens in ' .
            // 	$_diff_in_next_open_time .
            // 	' ' .
            // 	($_diff_in_next_open_time > 1 ? 'minutes' : 'minute');
          } else {
            // TODO
            // $_next_open_time = str_replace(':00', '', $_next_open_time->format('g:i a'));
            // return 'Opens at ' . $_next_open_time;
          }
          // If the current time matches a open time slot.
        } else {
          // TODO
          // return $this->nextAvailibilityStr($open_hours, $open_days);
        }
      } else {
        // TODO
        // return $this->nextAvailibilityStr($open_hours, $open_days);
      }
    } else {
      return "Open 24x7";
    }
  }

  async get24x7Attribute(facility_id) {}
  async getFullAddressAttribute(
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

  async getDoctorsCount(facility_id: number) {
    let doctor_count = await getQueryManager()
      .createQueryBuilder(DoctorVisit, "visits")
      .select(["visits.doctor_id"])
      .where("visits.facility_id=:id", { id: facility_id })
      .getRawMany();
    let count = Object.keys(doctor_count).length;
    return count;
  }

  getMapLinkAttribute(latitude: number, longitude: number): string | null {
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
}

export default FacilityService;
