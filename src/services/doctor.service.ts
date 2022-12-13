import { container } from "../loaders/container";
class DoctorService {
  protected doctorRepo = container.cradle.doctorRepo;

  getAreaDoctorIds(areaId: number, specializationId: number, doctorId: number) {
    return this.doctorRepo.getAreaDoctorIds(areaId, specializationId, doctorId);
  }

  getListingPages(doctorId: number) {
    return this.doctorRepo.getListingPages(doctorId);
  }
}

export default DoctorService;
