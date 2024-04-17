import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    phoneNumber: Yup.string().required("Please enter your phone number"),
    otpCode: Yup.string().required(
      "Please enter the OTP code received on phone"
    ),
  }),
  mapPropsToValues: (props) => ({
    phoneNumber: "",
    otpCode: "",
  }),
  handleSubmit: async (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
