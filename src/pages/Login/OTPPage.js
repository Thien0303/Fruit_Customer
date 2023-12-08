import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { confirmOTPPassword } from "../../redux/apiThunk/Password.js/PasswordThunk";
import { useNavigate } from "react-router-dom";
const PopupOTP = ({ open, onClose }) => {
  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{6}$/, "Mã OTP phải có 6 chữ số")
      .required("Vui lòng nhập mã OTP"),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const otp = {
        otp : values.otp,
      }
      await dispatch(confirmOTPPassword(otp));
      resetForm();
      onClose();
      navigate(`/`);
    } catch (error) {
      console.error("Error fetching otp data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: "18px", fontWeight: "bold", color: "red" }}>
        Xác nhận tài khoản
      </DialogTitle>
      <DialogContent style={{ width: "450px" }}>
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={otpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field
                name="otp"
                as={TextField}
                label="Mã OTP"
                type="text" // Dùng type="text" để gửi dữ liệu dưới dạng chuỗi
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!(touched.otp && errors.otp)}
                helperText={touched.otp && errors.otp}
              />

              <DialogActions>
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  disabled={isSubmitting}
                >
                  Xác nhận
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default PopupOTP;
