import { container } from "../loaders/container";
import _ from "lodash";
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
    console.log(Facilities);

    let result = Facilities.map((facility) => {
      return {
        type: facility?.facility_type,
        name: facility?.facility_name,
        established_in: facility?.facility_established_in,
        website: facility?.facility_website,
        beds: facility?.facility_beds,
        ambulance: facility?.facility_ambulance,
        slug: facility?.slug_slug || "#",
      };
    });
    return result;
  }
}

function getLogo() {
  // $image = new Image($this->logo, 'facility_profile_desktop');
  // 	$image->set(['alt_text' => $this->name . "'s logo"]);
  // 	return $image;
}
export default FacilityService;
