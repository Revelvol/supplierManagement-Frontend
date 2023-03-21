import { object, string} from "yup";

let supplierSchema = object({
  name: string().required(),
  phone: string().oneOf(
    ['', /^\+[1-9][0-9]{1,14}$/],
  ),
  location: string().required(),
});

export default supplierSchema;
