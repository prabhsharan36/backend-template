import _ from "lodash";
import { getQueryManager } from "../core/dataLayes/manager";
import { City } from "../entity/city.entity";
import { Facility } from "../entity/facility.entity";
import { FacilityAmenity } from "../entity/facilityAmenity.entity";
import { FacilityPhone } from "../entity/facilityPhone.entity";
import { Media } from "../entity/media.entity";
import { ServiceProvider } from "../entity/serviceProvider.entity";
import { Slug } from "../entity/slug.entity";
import { SpecializationOwner } from "../entity/specializationOwner.entity";
import { State } from "../entity/state.entity";
import { container } from "../loaders/container";
import cls from "../plugins/cls";

class FacilityRepository {
  protected facilities: any;
  protected category: any;
  protected page: any;

  protected categoryRepo = container.cradle.categoryRepo;
  async listing({ pageType, category, city_state_country, area }) {
    this.page = await cls.get("page");
    this.facilities = getQueryManager()
      .createQueryBuilder(Facility, "facility")
      .select([
        "facility.id",
        "facility.type",
        "facility.name",
        // "facility.slug",
        // "facility.url",
        "facility.established_in",
        "facility.website",
        "facility.beds",
        "facility.ambulance",
        // "facility.calling_number",
        "facility.emergency_number",
        // "facility.doctors_count",
        // "facility.map_link",
        // "facility.open_status",
        // "facility.24x7",
        // "facility.open_hours",
        "facility.country_id",
        "media.name",
        "slug.slug",
        "faminity.name",
        "fphone.phone",
      ])
      .leftJoin(
        Media,
        "media",
        "media.entity_id = facility.id AND media.entity_type = 'Facility' AND media.purpose = 'logo'"
      )
      .leftJoin(
        Slug,
        "slug",
        "slug.sluggable_id = facility.id  AND slug.sluggable_type = 'Facility'"
      )
      .leftJoin(
        FacilityAmenity,
        "faminity",
        "faminity.facility_id = facility.id"
      )
      .leftJoin(FacilityPhone, "fphone", "fphone.facility_id = facility.id")
      .where("facility.status_id = 1");
    if (pageType === "hospital_city_listing") {
      // TODO
      // $this->listingType == 'hospital_city_listing' ? ['area.slug', 'city.slug'] : ['area', 'city'],
    }
    // console.log(pageType);

    switch (true) {
      case [
        "hospital_category_india_listing",
        "clinic_category_india_listing",
        "hospital_category_city_listing",
        "clinic_category_city_listing",
      ].includes(pageType):
        await this.prepareCategoryListingQuery({
          pageType,
          category,
          city_state_country,
        });
        break;
      case [
        "hospital_category_state_listing",
        "clinic_category_state_listing",
        "hospital_state_listing",
        "clinic_state_listing",
      ].includes(pageType):
        this.prepareHospitalStateOrClinicStateListingQuery({
          pageType,
          category,
          city_state_country,
        });
        break;
      case [
        "hospital_city_listing",
        "clinic_city_listing",
        "hospital_area_listing",
        "clinic_area_listing",
      ].includes(pageType):
        this.prepareCityAreaListingQuery({
          pageType,
          city_state_country,
          area,
        });
        break;
      case ["hospital_india", "clinic_india"].includes(pageType):
        this.prepareHospitalIndiaOrClinicIndiaListingQuery({
          pageType,
        });
        break;
      case [
        "hospital_country_listing",
        "hospital_category_country_listing",
        "clinic_country_listing",
      ].includes(pageType):
        await this.prepareHospitalOrClinicCountryListingQuery({
          pageType,
          category,
          city_state_country,
        });
        break;
      default:
        break;
    }

    await this.fetchFacilities();
    return this.facilities;
  }

  protected async prepareCategoryListingQuery({
    pageType,
    category,
    city_state_country,
  }) {
    let facilityType = "Hospital";
    if (
      [
        "clinic_category_india_listing', 'clinic_category_city_listing",
      ].includes(pageType)
    ) {
      facilityType = "Clinic";
    }
    let cityId = city_state_country;

    this.facilities.andWhere("facility.type = :facilityType", {
      facilityType,
    });

    if (cityId) {
      this.facilities.andWhere("facility.city_id = :cityId", { cityId });
    }
    // console.log(cityId);

    const ServiceIds = await this.categoryRepo.getCategoryServiceIds(
      category.category_id
    );
    const SpecializationIds =
      await this.categoryRepo.getCategorySpecializationIds(
        category.category_id
      );
    // console.log(SpecializationIds, "SpecializationIds");

    this.addServicesSpecializationsQuery(ServiceIds, SpecializationIds);
  }

  protected async prepareHospitalStateOrClinicStateListingQuery({
    pageType,
    category,
    city_state_country,
  }) {
    let facilityType = "Hospital";
    if (
      ["clinic_category_state_listing', 'clinic_state_listing"].includes(
        pageType
      )
    ) {
      facilityType = "Clinic";
    }

    this.facilities
      .andWhere("facility.type = :facilityType", { facilityType })
      .innerJoin(City, "city", "city.id = facility.city_id")
      .innerJoin(State, "state", "state.id = city.state_id")
      .andWhere("state.id = :stateId", { stateId: city_state_country });

    if (category) {
      const ServiceIds = await this.categoryRepo.getCategoryServiceIds(
        category.category_id
      );

      const SpecializationIds =
        await this.categoryRepo.getCategorySpecializationIds(
          category.category_id
        );
      this.addServicesSpecializationsQuery(ServiceIds, SpecializationIds);
    }
  }

  protected async prepareHospitalOrClinicCountryListingQuery({
    pageType,
    category,
    city_state_country,
  }) {
    let facilityType = "Hospital";
    if (
      ["clinic_category_country_listing', 'clinic_country_listing"].includes(
        pageType
      )
    ) {
      facilityType = "Clinic";
    }

    this.facilities
      .andWhere("facility.type = :facilityType", { facilityType })
      .andWhere("facility.country_id = :countryId", {
        countryId: city_state_country,
      });

    if (category) {
      const ServiceIds = await this.categoryRepo.getCategoryServiceIds(
        category.category_id
      );

      const SpecializationIds =
        await this.categoryRepo.getCategorySpecializationIds(
          category.category_id
        );
      await this.addServicesSpecializationsQuery(ServiceIds, SpecializationIds);
    } else {
      await this.addServicesSpecializationsQuery();
    }
  }

  protected async prepareCityAreaListingQuery({
    pageType,
    city_state_country,
    area,
  }) {
    let cityId = city_state_country;
    let facilityType = "Hospital";
    if (["clinic_city_listing", "clinic_area_listing"].includes(pageType)) {
      facilityType = "Clinic";
    }
    this.facilities.andWhere("facility.type = :facilityType", { facilityType });
    if (cityId && !area) {
      this.facilities.andWhere("facility.city_id = cityId", { cityId });
    } else if (cityId && area) {
      if (area?.area_meta_data?.nearby_localities?.length > 0) {
        // Ids of 5 nearby areas to the main area. Ids are odered in increasing order of distance from main Area.
        const LevelOneNearByAreaIds = area?.area_meta_data?.nearby_localities
          .sort((a, b) => {
            //sorting in ascending order
            return parseFloat(a) - parseFloat(b);
          })
          .map((obj) => {
            return obj.id;
          });
        let areaIds = [...area.area_id, ...LevelOneNearByAreaIds];
        this.facilities.andWhere("facility.area_id In (...:areaIds)", {
          areaIds,
        });
      }
      //in case the meta tag is absent then the else part will be used to display the hospitals only in the area given in the slug
      else {
        this.facilities.andWhere("facility.area_id = :areaId", {
          areaId: area.area_id,
        });
      }
    }
    this.addServicesSpecializationsQuery();
  }

  protected async prepareHospitalIndiaOrClinicIndiaListingQuery({ pageType }) {
    let facilityType = "Hospital";
    if (["clinic_india"].includes(pageType)) {
      facilityType = "Clinic";
    }
    this.facilities
      .andWhere("facility.type = :facilityType", { facilityType })
      .andWhere("facility.country_id = 101"); // for India
    this.addServicesSpecializationsQuery();
  }

  protected async addServicesSpecializationsQuery(
    serviceIds?: number[],
    specializationIds?: number[]
  ) {
    try {
      serviceIds =
        serviceIds?.concat(
          parseInt(this.page?.meta_data?.query_parameters?.services, 10) || []
        ) || [];

      specializationIds =
        specializationIds?.concat(
          parseInt(
            this.page?.meta_data?.query_parameters?.specializations,
            10
          ) || []
        ) || [];

      if (serviceIds?.length > 0 && specializationIds?.length > 0) {
        this.facilities
          .leftJoin(
            SpecializationOwner,
            "so",
            "so.specialization_owners_id = facility.id AND so.specialization_owners_id = 'Facility'"
          )
          .leftJoin(
            ServiceProvider,
            "sp",
            "sp.service_providers_id = facility.id AND sp.service_providers_type = 'Facility'"
          )
          .where("so.specialization_id IN (:...specializationIds)", {
            specializationIds,
          })
          .orWhere("sp.service_id IN (:...serviceIds)", { serviceIds });
      } else if (serviceIds?.length === 0 && specializationIds?.length > 0) {
        this.facilities
          .join(
            SpecializationOwner,
            "so",
            "so.specialization_owners_id = facility.id AND so.specialization_owners_id = 'Facility'"
          )
          .where("so.specialization_id IN (:...specializationIds)", {
            specializationIds,
          });
      } else if (serviceIds?.length > 0 && specializationIds?.length === 0) {
        this.facilities
          .join(
            ServiceProvider,
            "sp",
            "sp.specializationIds = facility.id AND sp.service_providers_type = 'Facility'"
          )
          .where("sp.service_id IN (:...serviceIds)", { serviceIds });
      }
    } catch (error) {
      console.log(error, "errro");
    }
  }

  protected async fetchFacilities() {
    let orderedFacilities: number[] = [];
    let pageMeta = await cls.get("page")?.meta_data?.ordered_facilities?.length;

    if (pageMeta > 0) {
      orderedFacilities = _.map(pageMeta, "id");
    }
    console.log(orderedFacilities, "orderedFacilities");
    if (orderedFacilities?.length > 0) {
      this.facilities = this.facilities.orderBy(
        `field(facility.id, ${orderedFacilities}) DESC`
      );
    }
    this.facilities = await this.facilities.limit(10).getRawMany();
  }
}

export default FacilityRepository;
