import { useState } from 'react';

import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Fade,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import EvaluationShema from './validations/evaluation.validation';
import { initialFormFields } from './helpers/evaluation';
import { icons } from './icons';

function App() {
  const [isTransition] = useState(true);
  const [rowValidation, setRowValidation] = useState(
    initialFormFields.map(() => true)
  );
  const { methods } = EvaluationShema();
  const { control, formState, handleSubmit } = methods;
  const { errors } = formState;

  const [formFields, setFormFields] = useState(initialFormFields);
  const [expandedRows, setExpandedRows] = useState(
    Array(initialFormFields.length).fill(false)
  );

  const onSubmit = (formData) => {
    console.log(formData);

    const updatedRowValidation = [...rowValidation];
    updatedRowValidation[formData.index] = true;
    setRowValidation(updatedRowValidation);
  };

  const addFields = (event) => {
    event.preventDefault();
    setFormFields([...formFields, { ...initialFormFields[0] }]);
    setExpandedRows([...expandedRows, false]);
  };

  const open = (index) => {
    const updatedExpandedRows = [...expandedRows];
    updatedExpandedRows[index] = !updatedExpandedRows[index];
    setExpandedRows(updatedExpandedRows);
  };

  const removeFields = (id) => {
    console.log(id)
    const updatedFormFields = formFields.filter(item => item.id !== id);
    console.log(updatedFormFields)
    setFormFields(updatedFormFields);
  };

  return (
    <Box className="">
      <Box className="">
        <Container className="py-8" maxWidth="lg">
          <Box className=" gap-4 mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {formFields.map((value, index) => (
                <Fade
                  key={index}
                  in={isTransition}
                  style={{ transitionDelay: isTransition ? '200ms' : '100ms' }}>
                  <Box className="">
                    <Badge
                      onClick={() => removeFields(value.id)}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#ea9e9d',
                          top: '10px',
                        },
                        '& .MuiBadge-badge:hover': {
                          backgroundColor: 'red',
                        },
                      }}
                      badgeContent="×"
                      color="warning"
                      className="w-full cursor-pointer"
                    />
                    <Box className=" bg-white rounded-lg shadow-md  border-solid border-2 border-slate-100 p-4 flex flex-col w-full mb-4">
                      <Box className="flex flex-row">
                        <Controller
                          name={`formFields[${index}].description`}
                          control={control}
                          defaultValue={value.description}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              size={'small'}
                              variant="outlined"
                              placeholder="Description"
                              error={!!errors.formFields?.[index]?.description}
                              helperText={
                                errors.formFields?.[index]?.description?.message
                              }
                              className="w-full  mb-2 px-2"
                              style={{ padding: '4px' }}
                            />
                          )}
                        />

                        <Controller
                          name={`formFields[${index}].average`}
                          control={control}
                          defaultValue={value.average}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              size={'small'}
                              variant="outlined"
                              placeholder="average"
                              error={!!errors.formFields?.[index]?.average}
                              helperText={
                                errors.formFields?.[index]?.average?.message
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                              className="w-full mb-2 px-2"
                              style={{ padding: '4px' }}
                            />
                          )}
                        />

                        <Controller
                          name={`formFields[${index}].quantity`}
                          control={control}
                          defaultValue={value.quantity}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              size={'small'}
                              variant="outlined"
                              placeholder="quantity"
                              error={!!errors.formFields?.[index]?.quantity}
                              helperText={
                                errors.formFields?.[index]?.quantity?.message
                              }
                              className="w-full mb-2 px-2"
                              style={{ padding: '4px' }}
                            />
                          )}
                        />
                        <Box
                          sx={{
                            width: '50px',
                            height: '50px',
                          }}
                          onClick={() => open(index)}
                          className="flex border-2 rounded-full justify-center items-center  cursor-pointer hover:bg-slate-100 p-1  ms-2">
                          {expandedRows[index]
                            ? icons.chevronUp()
                            : icons.chevronDown()}
                        </Box>
                      </Box>
                      <Box>
                        {expandedRows[index] && (
                          <Box className="flex flex-col bg-gray-100 mt-2 p-2 w-full">
                            <p>Contenido adicional aquí...</p>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              ))}
              <Button
                onClick={addFields}
                className="mb-4"
                variant="contained"
                color="primary">
                Nueva entrada
              </Button>
            </form>
            <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="secondary"
              type="submit">
              Agregar
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
