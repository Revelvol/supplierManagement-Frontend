import { object, string, mixed, boolean } from "yup";

const createDocumentSchema = (name) => {
  /* function to create a schema for a document
   * @param {string} */
  return mixed()
    .test("fileType", "Only PDF files are allowed", (value) => {
      return !value[0] || value[0].type === "application/pdf";
    })
    .test(
      "fileSize",
      "File size should be less than 10MB",
      (value) => !value[0] || value[0].size <= 10000000
    );
};

export const INGREDIENT_SCHEMA = object({
  supplier: string().required("this field is required"),
  name: string().required("this field is required"),
  price: string()
    .matches(
      /^-?\d{0,8}(?:\.\d{0,2})?$/,
      "Price must be a valid 8 digit decimal number with 2 digits after decimal point "
    )
    .required("This field is required"),
  quantity: string()
    .matches(
      /^-?\d{0,8}(?:\.\d{0,2})?$/,
      "Quantity must be a valid 8 digit decimal number with 2 digits after decimal point "
    )
    .required("This field is required"),
  is_used: boolean().required("this field is required"),
  function: string().required("this field is required"),
  unit: string().required("this field is required"),
  isoDocument: createDocumentSchema("isoDocument"),
  gmoDocument: createDocumentSchema("gmoDocument"),
  kosherDocument: createDocumentSchema("kosherDocument"),
  halalDocument: createDocumentSchema("halalDocument"),
  msdsDocument: createDocumentSchema("msdsDocument"),
  tdsDocument: createDocumentSchema("tdsDocument"),
  coaDocument: createDocumentSchema("coaDocument"),
  allergenDocument: createDocumentSchema("allergenDocument"),
});
