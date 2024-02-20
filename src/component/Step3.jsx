import React, { useContext, useState } from "react";
import { Button, Card, CardContent, Typography, TextField } from "@mui/material";
import { Rating } from "@mui/material";
import * as Yup from "yup";
import MultiStepFormContext from "./MultiFormContext";
import { useFormik } from "formik"

const Review = () => {
    const { formData, setFormData, salesPersonDetails, setSalesPersonDetails, customerDetails, requirementDetails, prev, next } = useContext(MultiStepFormContext);
    const validationSchema = Yup.object({
        personName: Yup.string().required('Person Name is required'),
        eventName: Yup.string().required('Event Name is required'),
        potential: Yup.number().min(1, 'Potential must be at least 1').max(10, 'Potential must be at most 10'),
    });

    const formik = useFormik({
        initialValues: {
            personName: salesPersonDetails.personName || '',
            eventName: salesPersonDetails.eventName || '',
            potential: salesPersonDetails.potential || 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSalesPersonDetails(values);
            setFormData(prevData => ({
                ...prevData,
                salesPersonDetails: values
            }));
            next();
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <Card className='stepFormcard'>
                <CardContent>
                    <TextField
                        name="personName"
                        label="Person Name"
                        value={formik.values.personName}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                        error={formik.touched.personName && Boolean(formik.errors.personName)}
                        helperText={formik.touched.personName && formik.errors.personName}
                    />
                    <TextField
                        name="eventName"
                        label="Event Name"
                        value={formik.values.eventName}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                        error={formik.touched.eventName && Boolean(formik.errors.eventName)}
                        helperText={formik.touched.eventName && formik.errors.eventName}
                    />
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <Typography variant="body1" className="me-auto">Potential</Typography>
                        <Rating
                            max={10}
                            name="potential"
                            value={formik.values.potential}
                            onChange={(event, newValue) => {
                                formik.setFieldValue('potential', newValue);
                            }}
                        />
                    </div>
                    {formik.touched.potential && formik.errors.potential ? (
                        <Typography variant="body2" color="error">{formik.errors.potential}</Typography>
                    ) : null}
                </CardContent>
            </Card>
            <div className='text-end mt-3'>
                <Button className='me-3' onClick={prev}>Back</Button>
                <Button variant="contained" type="submit">Submit</Button>
            </div>
        </form>
    );
};

export default Review;

