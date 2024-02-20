import React, { useContext } from "react";
import { Button, Typography, Card, CardContent, FormControlLabel, Checkbox, TextField } from '@mui/material';
import * as Yup from "yup";
import MultiStepFormContext from "./MultiFormContext";
import { useFormik } from "formik";

const Address = () => {
  const { formData, setFormData, requirementDetails, setRequirementDetails, next, prev } = useContext(MultiStepFormContext);

  const validationSchema = Yup.object({
    specialNotes: Yup.string().required('Special Notes is required'),
  });

  const formik = useFormik({
    initialValues: {
      specialNotes: requirementDetails.specialNotes || '',
      selectProduct: {
        icatalog: requirementDetails.selectProduct?.icatalog || false,
        proCatalog: requirementDetails.selectProduct?.proCatalog || false,
        ecomWebsite: requirementDetails.selectProduct?.ecomWebsite || false,
        evo: requirementDetails.selectProduct?.evo || false,
        expressApp: requirementDetails.selectProduct?.expressApp || false,
        tvApp: requirementDetails.selectProduct?.tvApp || false,
      }
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setRequirementDetails(values);
      setFormData(prevData => ({
        ...prevData,
        requirementDetails: values
      }));
      next();
    },
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    formik.setFieldValue(`selectProduct.${name}`, checked);
  };

  const handleChange = (event) => {
    formik.handleChange(event);
  };

  const onPrev = () => {
    prev();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card className='stepFormcard'>
        <CardContent>
          <Typography variant="body1" gutterBottom>Select Product:</Typography>
          <FormControlLabel
            control={<Checkbox checked={formik.values.selectProduct.icatalog} onChange={handleCheckboxChange} name="icatalog" />}
            label="ICatalog"
          />
          <FormControlLabel
            control={<Checkbox checked={formik?.selectProduct?.proCatalog} onChange={handleCheckboxChange} name="proCatalog" />}
            label="Pro Catalog"
          />
          <FormControlLabel
            control={<Checkbox checked={formik?.selectProduct?.ecomWebsite} onChange={handleCheckboxChange} name="ecomWebsite" />}
            label="Ecom Website"
          />
          <FormControlLabel
            control={<Checkbox checked={formik?.selectProduct?.evo} onChange={handleCheckboxChange} name="evo" />}
            label="EVO"
          />
          <FormControlLabel
            control={<Checkbox checked={formik?.selectProduct?.expressApp} onChange={handleCheckboxChange} name="expressApp" />}
            label="Express App"
          />
          <FormControlLabel
            control={<Checkbox checked={formik.values.tvApp} onChange={handleCheckboxChange} name="tvApp" />}
            label="TV App"
          />
          <div className='mt-3'>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              label="Special Notes"
              name="specialNotes"
              value={formik.values.specialNotes}
              onChange={handleChange}
              error={formik.touched.specialNotes && Boolean(formik.errors.specialNotes)}
              helperText={formik.touched.specialNotes && formik.errors.specialNotes}
            />
          </div>
        </CardContent>
      </Card>
      <div className='text-end mt-3'>
        <Button className='me-3' onClick={onPrev}>Back</Button>
        <Button variant="contained" type="submit">Next</Button>
      </div>
    </form>
  );
};

export default Address;

