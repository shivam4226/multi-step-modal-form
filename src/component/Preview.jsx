import React, { useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Rating, Checkbox, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreDetailsForm from "./ProgresiveForm"
import MultiStepFormContext from "./MultiFormContext";

const PreviewLead = ({open, handleClose, formData}) => {
    // const { previewModalOpen, setPreviewModalOpen, formData} = useContext(MultiStepFormContext);

    const [openModal, setOpenModal] = useState(false);

    const handleEdit = () => {
        setTimeout(() => setOpenModal(false), 100);
    }

    // const handleClosePreviewModal = () => {
    //     setPreviewModalOpen(false);
    // };
    // console.log("pre-",previewModalOpen);

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Preview
                    <Button onClick={handleEdit} variant="outlined" startIcon={<EditIcon />}>
                        Edit
                    </Button>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">About Customer:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Interest Level</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rating value={formData?.customerDetails?.interestLevel} readOnly />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Scale of Business</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rating value={formData?.customerDetails?.scaleOfBusiness} readOnly />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Tech Friendly</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rating value={formData?.customerDetails?.techFriendly} readOnly />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Field Expertise</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rating value={formData?.customerDetails?.fieldExpertise} readOnly />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Purchase Time:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    {Object.entries(formData?.customerDetails?.purchaseTimeData)
                                        .filter(([key, value]) => value === true)
                                        .map(([key, value]) => (
                                            <Grid key={key} item xs={6}>
                                                <Typography variant="body1" style={{ textTransform: "capitalize" }}>{key} <Checkbox checked={value} readOnly /></Typography>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">About Requirement:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Select Product:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    {Object.entries(formData?.requirementDetails?.selectProduct)
                                        .filter(([key, value]) => value === true)
                                        .map(([key, value]) => (
                                            <Typography variant="body1" style={{ textTransform: "capitalize" }}>{key} <Checkbox checked={value} readOnly /></Typography>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Special Notes</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{formData?.requirementDetails?.specialNotes}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">About Sales Person:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Person Name</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{formData?.salesPersonDetails?.personName}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Event Name</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{formData.salesPersonDetails.eventName}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Potential</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rating value={formData?.salesPersonDetails?.potential} readOnly />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PreviewLead;

