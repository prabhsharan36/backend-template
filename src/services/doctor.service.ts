// import { container } from "../loaders/container";
import DoctorRepository from "../repositories/doctor.repository";

class DoctorService {
//   protected doctorRepo = container.resolve("doctorRepository");

  constructor() {}

  static getAreaDoctorIds(areaId: number, specializationId: number) {
    return DoctorRepository.getAreaDoctorIds(areaId, specializationId);
  }

  static getListingPages(doctorId: number) {
    return DoctorRepository.getListingPages(doctorId);
  }
}

export default DoctorService;
