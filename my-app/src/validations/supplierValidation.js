import { object, string} from "yup";

let supplierSchema = object({
  name: string().required(),
  phone: string().matches(/^\+[1-9]{1}[0-9]{3,14}$/,{ excludeEmptyString: true }),
  location: string().required(),
});

export default supplierSchema;
