
import hero from "./hero";
import about from "./about";
import service from "./service";
import membership from "./membership";
import trainer from "./trainer";
import schedule from "./schedule";
import testimonial from "./testimonial";
import contact from "./contact";
import promotion from "./promotion";
import gallery from "./gallery";
import member from "./member";
import payment from "./payment";

export const schemaTypes = [
  // Website content
  hero,
  about,
  service,
  testimonial,
  gallery,
  contact,

  // Gym management
  membership,
  trainer,
  schedule,
  promotion,

  // Member & Payment records
  member,
  payment,
];