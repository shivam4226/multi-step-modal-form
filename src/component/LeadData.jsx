import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Card, CardHeader, InputAdornment, IconButton, Button, TablePagination, Link } from '@mui/material';
import { Clear } from '@mui/icons-material';
import jsonData from './data.json';
import MoreDetailsForm from "./ProgresiveForm";
// import ProgressiveForm from "./ProgressiveForm";

const columns = [
  { field: 'srno', label: 'SR No', width: 120 },
  { field: 'image', label: 'Image', width: 120 },
  { field: 'customer', label: 'Customer', width: 200 },
  { field: 'email', label: 'Email ID', width: 200 },
  { field: 'mobileno', label: 'Mobile No', width: 150 },
  { field: 'company', label: 'Company', width: 200 },
  { field: 'details', label: 'Remark', width: 200 },
  { field: 'more_details', label: 'More Details', width: 200 },
];

const LeadData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openRemarkModal, setOpenRemarkModal] = useState(false);
  const [openMoreDetailsModal, setOpenMoreDetailsModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [openProgressiveForm, setOpenProgressiveForm] = useState(false);
  const [progressiveFormData, setProgressiveFormData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenRemarkModal = (lead) => {
    setSelectedLead(lead);
    setOpenRemarkModal(true);
  };

  const handleCloseRemarkModal = () => {
    setOpenRemarkModal(false);
  };

  const handleOpenMoreDetailsModal = (lead) => {
    setSelectedLead(lead);
    setOpenProgressiveForm(true);
    setProgressiveFormData(lead);
  };

  const handleCloseMoreDetailsModal = () => {
    setOpenProgressiveForm(false);
    setProgressiveFormData(null);
  };

  const filteredRows = jsonData.leads.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const clearSearch = () => {
    setSearchTerm('')
  };
  return (
    <div className='container'>
      <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
        <CardHeader />
        <div className="text-end me-3 mb-4">
          <TextField
            type="text"
            placeholder="Search..."
            value={searchTerm}
            size='small'
            onChange={e => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchTerm && (
                    <IconButton onClick={clearSearch} size="small">
                      <Clear />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Box>
          <TableContainer>
            <Table>
              <TableHead style={{ backgroundColor: '#f6f6f7' }}>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.field} align="center" style={{ width: column.width, fontWeight: 'bold', textTransform: 'uppercase' }} >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover key={row.srno} >
                    {columns.map(column => (
                      <TableCell key={column.field} align="center" >
                        {column.field === 'details' ? (
                          <Link href="#" onClick={() => handleOpenRemarkModal(row)}>Remark</Link>
                        ) : column.field === 'image' ? (
                          <img src={row[column.field]} alt={``} style={{ width: '50px', height: '50px', border: "1px solid transparent", borderRadius: "50%" }} />
                        ) : column.field === 'more_details' ? (
                          <Link href="#" onClick={() => handleOpenMoreDetailsModal(row)}>More Details</Link>
                        ) : (
                          row[column.field]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
      </Card>
      <MoreDetailsForm open={openProgressiveForm} handleClose={handleCloseMoreDetailsModal} rowData={progressiveFormData} />
    </div>
  );
};

export default LeadData;