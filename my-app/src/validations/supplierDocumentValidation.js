import { object, mixed } from "yup";

const supplierDocumentSchema = object({
    isoDocument: mixed()
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => !value ||  value.type === "application/pdf"
      )
      .test(
        "fileSize",
        "File size should be less than 10MB",
        (value) => !value ||  value.size <= 10000000
      ),
    gmpDocument: mixed()
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => !value ||  value.type === "application/pdf"
      )
      .test(
        "fileSize",
        "File size should be less than 10MB",
        (value) => !value || value.size <= 10000000
      ),
    haccpDocument: mixed()
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => !value ||  value.type === "application/pdf"
      )
      .test(
        "fileSize",
        "File size should be less than 10MB",
        (value) => !value ||  value.size <= 10000000
      ),
  });
  
  export default supplierDocumentSchema;