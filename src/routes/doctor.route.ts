import { Router } from "express";
import { container } from "../loaders/container";
const router = Router();

const docController = container.cradle.doctorController;

router.get("/:specialization_or_service/:country_or_city", docController.listing);

// router.get("/:specialization_or_service/:city/:area?", (req, res) => {
//   const doctorController: any = new DoctorController(req, res);
//   doctorController.listing;
// });
export default router;

// enum DoctorListingPageType {
//   service_country = "service_country",
//   service_city = "service_city",
// }

// type Slug = {}
// class SlugRepository extends BaseRepository {
//   // L3
//   getSlugsBySlug(slugs: string[]): Slug[] {
//     // check ion cache and return if found

//     // fetch from DB

//     // set in cache
//     return [{}]
//   }
// }

// type DoctorListingPageData = {
//   doctors: {
//     name: string
//   }[],
//   topConttent: string,
//   faqs: {

//   }[]
// }

// type OnlyDoctor = Pick<DoctorListingPageData, 'doctors'>;

// type SendGridAPIResponse<T> = {
//   success:  boolean,
//   message: string,
//   data: T
// }

// enum SednGripsEmailStatus {
//   IN_QUEUE = "IN_QUEUE"
// }

// type SendGridSendEmailAPIResponse = SendGridAPIResponse<{
//   email: string,
//   status: SednGripsEmailStatus,
// }>

// const res: SendGridSendEmailAPIResponse = {};

// if (res.data.status == SednGripsEmailStatus.IN_QUEUE) {

// }

// class DoctorService {
//     protected slugRepository: SlugRepository;

//     constructor() {
//       this.slugRepository = new SlugRepository();
//     }

//     //L1
//     listing(input: {
//       slugs: {
//         slug1: string,
//         slug2: string,
//         slug3?: string,
//       },
//       page: number,
//       perPage: number
//     }): DoctorListingPageData {
//         const { slugs: _slugs } = input;
//         const slugs = this.slugRepository.getSlugsBySlug([ _slugs.slug1, _slugs.slug2, _slugs.slug3 ])
//         const pageType = this.getDoctorListingPageType(slugs);

//         let doctorIds: number[];
//         if (pageType == DoctorListingPageType.service_city) {
//           doctorIds =this.getDoctorIdsForServiceCityListing();
//         } else {

//         }

//         const doctors = this.getDoctorDetailsForListing(doctorIds);
//         const faqs = this.getFaqsForDoctorListing()

//         return {
//           doctors,
//           faqs
//         }
//     }

//     getFaqsForDoctorListing(input: {
//       serviceId?: number,
//       specId?: number,
//       cityId?: number
//     }) {
//       this.getFaqsForListing()
//     }

//     // L2
//     getDoctorListingPageType(slugs: Slug[]): DoctorListingPageType {
//       return DoctorListingPageType.service_city;
//     }

//     getDoctorsForServiceCityListing(serviceId: number, city: number, fetchType: ) {
//       // const service = this.serviceRepository.getServiceById(serviceId);
//       // const city = this.cityRepository.getCityId(cityId);
//       return this.doctorRepo.getDoctorIdsForServiceCityListing();
//     }

//     getDoctorDetailsForListing(): DoctorListingPageData['doctors'] {

//     }

//     // L3

//     getDoctorPageData() {

//     }
// }
