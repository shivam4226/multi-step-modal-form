import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import Details from "./Step1";
import Address from "./Step2";
import Review from "./Step3";
import CloseIcon from '@mui/icons-material/Close';
import { Provider } from './MultiFormContext';
import ThanksDialog from './Preview';

const AboutCustomer = {
    interestLevel: 0,
    scaleOfBusiness: 0,
    techFriendly: 0,
    fieldExpertise: 0,
    purchaseTimeData: {
        now: false,
        threeMonths: false,
        oneYear: false,
        noPlan: false
    }
};

const AboutRequirement = {
    selectProduct: {
        icatalog: false,
        proCatalog: false,
        ecomWebsite: false,
        evo: false,
        expressApp: false,
        tvApp: false,
    },
    specialNotes: '',
};

const AboutSalesPerson = {
    personName: '',
    eventName: '',
    potential: 0,
};

const steps = [
    "About Customer",
    "About Requirement",
    "About Sales Person"
];

const renderStep = (step) => {
    switch (step) {
        case 0:
            return <Details />;
        case 1:
            return <Address />;
        case 2:
            return <Review />;
        default:
            return null;
    }
};

const MultiStepForm = ({ open, handleClose, formDatas }) => {
    const [formData, setFormData] = useState(0);
    const [customerDetails, setCustomerDetails] = useState(AboutCustomer);
    const [requirementDetails, setRequirementDetails] = useState(AboutRequirement);
    const [salesPersonDetails, setSalesPersonDetails] = useState(AboutSalesPerson);
    const [currentStep, setCurrentStep] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [thanksDialogOpen, setThanksDialogOpen] = useState(false);

    const next = () => {
        if (currentStep === 2) {
            setCurrentStep(0);
            setCustomerDetails(AboutCustomer);
            setRequirementDetails(AboutRequirement);
            setSalesPersonDetails(AboutSalesPerson);
            setDialogOpen(false);
            handleClose();
            setThanksDialogOpen(true);
            return;
        }
        setCurrentStep(currentStep + 1);
    };
    const prev = () => setCurrentStep(currentStep - 1);

    const handleCloseThanksDialog = () => {
        setThanksDialogOpen(false);
    }
    
    return (
        <div>
            <Dialog open={open || dialogOpen} onClose={handleClose} fullWidth>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    About Customer
                    <div onClick={handleClose} color="inherit" style={{ cursor: "pointer" }}><CloseIcon /></div>
                </DialogTitle>
                <DialogContent>
                    <Provider value={{ formData, setFormData, customerDetails, setCustomerDetails, next, prev, requirementDetails, setRequirementDetails, salesPersonDetails, setSalesPersonDetails }}>
                        <Stepper activeStep={currentStep}>
                            {steps.map((label, index) => (
                                <Step key={index}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <main className='mt-4'>{renderStep(currentStep)}</main>
                    </Provider>
                </DialogContent>
            </Dialog>
            {thanksDialogOpen && (
                <ThanksDialog open={thanksDialogOpen} handleClose={handleCloseThanksDialog} formData={formData} />
            )}
        </div>
    );
};

export default MultiStepForm;
