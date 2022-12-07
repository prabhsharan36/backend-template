import { indexOf } from "lodash";
import { getQueryManager } from "../core/dataLayes/manager";
import { Area } from "../entity/area.entity";
// import { Doctor } from "../entity/doctor.entity";
import { DoctorVisit } from "../entity/doctorVisit.entity";
import { Facility } from "../entity/facility.entity";
import { Service } from "../entity/service.entity";
import { ServiceProvider } from "../entity/serviceProvider.entity";
// import { SpecializationOwner } from "../entity/specializationOwner.entity";
class DoctorRepository {
  async nearByAreaIds(areaId: number) {
    const metadata = await getQueryManager()
      .createQueryBuilder(Area, "area")
      .select(["area.metadata"])
      .where("id = :areaId", { areaId })
      .getRawOne();
    const nearByAreaIds = metadata?.area_metadata?.nearby_localities?.map(
      (obj: { id: number }) => {
        return obj.id;
      }
    );
    nearByAreaIds.push(areaId);
    return nearByAreaIds;
  }
  async getAreaDoctorIds(areaId: number, serviceId: number, doctorId: number) {
    try {
      const areaIds = await this.nearByAreaIds(areaId);

      let doctorIds: any = await getQueryManager()
        .createQueryBuilder(DoctorVisit, "doctor_visits")
        .select(["doctor.id AS doctorId"])
        .innerJoin(
          "doctor_visits.facility",
          "facility",
          "facility.area_id IN (:areaIds)",
          {
            areaIds,
          }
        )
        .innerJoin("doctor_visits.doctor", "doctor", "doctor.status_id = 1")
        .innerJoin(
          ServiceProvider,
          "sp",
          "sp.service_providers_id = doctor.id AND sp.service_providers_type = 'Doctor'"
        )
        .where("facility.deleted_at IS NULL")
        .andWhere("sp.service_id = :serviceId", {
          serviceId,
        })
        .groupBy("doctor.id")
        .orderBy("doctor.points", "DESC")
        .getRawMany<{
          doctorId: number;
        }>();
      doctorIds = doctorIds.map((obj: any) => {
        return obj.doctorId;
      });
      const MyPosition = doctorIds.indexOf(doctorId) + 1;
      return { doctorIds, myPosition: MyPosition };
    } catch (error) {
      console.log(error);
    }
  }

  async getListingPages(doctorId: number) {
    try {
      const result = await getQueryManager()
        .createQueryBuilder(Area, "area")
        .select(["area.name", "area.id", "service.name", "service.id"])
        .innerJoin(Facility, "facility", "facility.area_id = area.id")
        .innerJoin(
          DoctorVisit,
          "dv",
          "dv.facility_id = facility.id AND dv.doctor_id = :doctorId",
          { doctorId }
        )
        .innerJoin(
          ServiceProvider,
          "sp",
          "sp.service_providers_id = dv.doctor_id AND sp.service_providers_type = 'Doctor'"
        )
        .innerJoin(Service, "service", "service.id = sp.service_id")
        .getRawMany();
      return result;
    } catch (error) {}
  }
}

export default DoctorRepository;
