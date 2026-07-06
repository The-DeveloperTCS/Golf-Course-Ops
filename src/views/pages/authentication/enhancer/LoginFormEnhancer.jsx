import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  }),
  mapPropsToValues: () => ({
    username: "",
    password: "",
  }),
  handleSubmit: async () => {},
  displayName: "LoginForm",
  enableReinitialize: true,
});

export default formikEnhancer;
