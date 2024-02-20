import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Button, Typography, Card, CardContent, FormControlLabel, Checkbox } from '@mui/material';
import Rating from '@mui/material/Rating';
import * as Yup from "yup";
import MultiStepFormContext from "./MultiFormContext";

const Details = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { formData, setFormData, customerDetails, setCustomerDetails, next } = useContext(MultiStepFormContext);

  const validationSchema = Yup.object({
    interestLevel: Yup.number().required('Interest Level is required').min(1, 'Rating must be greater than 0'),
    scaleOfBusiness: Yup.number().required('Scale of Business is required').min(1, 'Rating must be greater than 0'),
    techFriendly: Yup.number().required('Tech Friendly is required').min(1, 'Rating must be greater than 0'),
    fieldExpertise: Yup.number().required('Field Expertise is required').min(1, 'Rating must be greater than 0'),
    purchaseTimeData: Yup.object().test('at-least-one-selected', 'At least one option must be selected', (value) => {
      return value.now || value.threeMonths || value.oneYear || value.noPlan;
    })
  });
  
  const formik = useFormik({
    initialValues: {
      interestLevel: customerDetails.interestLevel,
      scaleOfBusiness: customerDetails.scaleOfBusiness,
      techFriendly: customerDetails.techFriendly,
      fieldExpertise: customerDetails.fieldExpertise,
      purchaseTimeData: {
        now: customerDetails.purchaseTimeData.now || false,
        threeMonths:customerDetails.purchaseTimeData.threeMonths || false,
        oneYear: customerDetails.purchaseTimeData.oneYear || false,
        noPlan: customerDetails.purchaseTimeData.noPlan || false
      }
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setCustomerDetails(values);
      setFormData(prevData => ({
        ...prevData,
        customerDetails: values
      }));
      next();
    },
  });
  

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (selectedOption && selectedOption !== name) {
      formik.setFieldValue(`purchaseTimeData.${selectedOption}`, false);
    }
    formik.setFieldValue(`purchaseTimeData.${name}`, checked);
    setSelectedOption(checked ? name : "");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card className='stepFormcard'>
        <CardContent>
          <div className="mb-3 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center">
              <Typography variant="body1" className="me-auto">Interest Level</Typography>
              <Rating
                name="interestLevel"
                value={formik.values.interestLevel}
                onChange={(event, newValue) => {
                  formik.setFieldValue('interestLevel', newValue);
                }}
              />
            </div>
            {formik.touched.interestLevel && formik.errors.interestLevel ? (
              <Typography variant="body2" color="error">{formik.errors.interestLevel}</Typography>
            ) : null}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Typography variant="body1" className="me-auto">Scale of Business</Typography>
              <Rating
                name="scaleOfBusiness"
                value={formik.values.scaleOfBusiness}
                onChange={(event, newValue) => {
                  formik.setFieldValue('scaleOfBusiness', newValue);
                }}
              />
            </div>
            {formik.touched.scaleOfBusiness && formik.errors.scaleOfBusiness ? (
              <Typography variant="body2" color="error">{formik.errors.scaleOfBusiness}</Typography>
            ) : null}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Typography variant="body1" className="me-auto">Tech Friendly</Typography>
              <Rating
                name="techFriendly"
                value={formik.values.techFriendly}
                onChange={(event, newValue) => {
                  formik.setFieldValue('techFriendly', newValue);
                }}
              />
            </div>
            {formik.touched.techFriendly && formik.errors.techFriendly ? (
              <Typography variant="body2" color="error">{formik.errors.techFriendly}</Typography>
            ) : null}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Typography variant="body1" className="me-auto">Field Expertise</Typography>
              <Rating
                name="fieldExpertise"
                value={formik.values.fieldExpertise}
                onChange={(event, newValue) => {
                  formik.setFieldValue('fieldExpertise', newValue);
                }}
              />
            </div>
            {formik.touched.fieldExpertise && formik.errors.fieldExpertise ? (
              <Typography variant="body2" color="error">{formik.errors.fieldExpertise}</Typography>
            ) : null}
          </div>
          <div className='mt-3'>
            <Typography variant="body1" gutterBottom>Purchase Time:</Typography>
            <FormControlLabel
              control={<Checkbox checked={formData?.purchaseTimeData?.now || selectedOption === 'now'} onChange={handleCheckboxChange} name="now" />}
              label="Now"
            />
            <FormControlLabel
              control={<Checkbox checked={formData?.purchaseTimeData?.threeMonths || selectedOption === 'threeMonths'} onChange={handleCheckboxChange} name="threeMonths" />}
              label="3 months"
            />
            <FormControlLabel
              control={<Checkbox checked={formData?.purchaseTimeData?.oneYear || selectedOption === 'oneYear'} onChange={handleCheckboxChange} name="oneYear" />}
              label="1 year"
            />
            <FormControlLabel
              control={<Checkbox checked={formData?.purchaseTimeData?.noPlan || selectedOption === 'noPlan'} onChange={handleCheckboxChange} name="noPlan" />}
              label="No plan"
            />
          </div>
          {formik.touched.purchaseTimeData && formik.errors.purchaseTimeData ? (
              <Typography variant="body2" color="error">{formik.errors.purchaseTimeData}</Typography>
            ) : null}
        </CardContent>
      </Card>
      <div className='text-end mt-3'>
        <Button variant="contained" type="submit">Next</Button>
      </div>

    </form>
  );
};

export default Details;