/* eslint-disable no-unused-vars */
import mock from './mock.json';
import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import uuid from 'react-uuid';
import MessageAlert from './components/MessageAlert';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const defaultEntry = () => {
  return {
    id: uuid(),
    description: '',
    average: '',
    quantity: 1,
    subEntries: [defaultSubEntry()],
  };
};

const defaultSubEntry = () => {
  return {
    id: uuid(),
    description: '',
    average: '',
    score: '',
    date: moment(),
  };
};

function App() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openMessageAlert, setMessageAlert] = useState(false);
  const [invalidEntries, setInvalidEntries] = useState([]);

  const schema = yup.object().shape({
    entries: yup.array().of(
      yup.object().shape({
        description: yup.string().required('description es requerido'),
        average: yup.string().required('average es requerido'),
        quantity: yup.string().required('quantity es requerido'),
        subEntries: yup.array().of(
          yup.object().shape({
            description: yup
              .string()
              .required('evaluation description requerido '),
            average: yup.string().required('evaluation avarage es requerido '),
            score: yup.string().required('score es requerido'),
            date: yup.string().required('date es requerido'),
          })
        ),
      })
    ),
  });

  const handleAlert = (state) => {
    setMessageAlert(state);
  };

  const handleCloseAlert = (index) => {
    const newInvalidEntries = [...invalidEntries];
    newInvalidEntries.splice(index, 1); // Elimina el índice de la entrada cerrada
    setInvalidEntries(newInvalidEntries);
  };

  const toggleSection = (id) => {
    setExpandedSections({ ...expandedSections, [id]: !expandedSections[id] });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      entries: [defaultEntry()],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'entries',
  });

  const addEntry = () => {
    const newEntry = defaultEntry();
    if (fields) console.log(fields);
    append(newEntry);
  };

  const removeEntry = (index) => {
    remove(index);
  };

  const addSubEntry = (entryIndex) => {
    const currentEntries = getValues('entries');
    const entry = currentEntries[entryIndex];
    const totalSubEntriesAverage = entry.subEntries.reduce(
      (total, subEntry) => total + parseFloat(subEntry.average),
      0
    );

    const entryAverage = parseFloat(entry.average);

    if (totalSubEntriesAverage > entryAverage) {
      handleAlert(true);
      setInvalidEntries([...invalidEntries, entryIndex]);
    } else {
      const newSubEntry = defaultSubEntry();
      currentEntries[entryIndex].subEntries.push(newSubEntry);

      const newQuantity = entry.quantity + 1;
      currentEntries[entryIndex].quantity = newQuantity;
      const newExpandedSections = { ...expandedSections };

      setValue('entries', currentEntries);

      newExpandedSections[newSubEntry.id] = true;
      setExpandedSections(newExpandedSections);
    }
  };

  const removeSubEntry = (entryIndex, subEntryIndex) => {
    const currentEntries = getValues('entries');
    currentEntries[entryIndex].quantity = currentEntries[entryIndex].quantity - 1;
    const removedSubEntry = currentEntries[entryIndex].subEntries.splice(
      subEntryIndex,
      1
    );
    const newExpandedSections = { ...expandedSections };
    setValue('entries', currentEntries);
    delete newExpandedSections[removedSubEntry[0].id];
    setExpandedSections(newExpandedSections);
  };

  const onSubmit = async (data) => {
    console.log(data.entries);
  };

  return (
    <Container className="py-8" maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="gap-4 mt-1">
          {fields.map((entries, index) => (
            <Box
              key={entries.id}
              className="bg-white rounded-lg shadow-md border-solid border-2 border-slate-100 p-4 flex flex-col w-full mb-3">
              {invalidEntries.includes(index) && (
                <MessageAlert
                  handleAlert={handleAlert}
                  open={true}
                  message={
                    '¡La suma de subEntries.average no puede superar la cantidad en entries.average!'
                  }
                  onClose={() => handleCloseAlert(index)}
                />
              )}
              <Box className="flex flex-row">
                <Controller
                  name={`entries[${index}].description`}
                  control={control}
                  defaultValue={entries.description}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Type Evaluation"
                      size="small"
                      placeholder="description"
                      variant="outlined"
                      className="w-full mb-2 px-2"
                      style={{ padding: '4px' }}
                      error={!!errors.entries?.[index]?.description}
                      helperText={errors.entries?.[index]?.description?.message}
                    />
                  )}
                />

                <Controller
                  name={`entries[${index}].average`}
                  control={control}
                  defaultValue={entries.average}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Average"
                      size="small"
                      placeholder="average"
                      variant="outlined"
                      className="w-full mb-2 px-2"
                      style={{ padding: '4px' }}
                      error={!!errors.entries?.[index]?.average}
                      helperText={errors.entries?.[index]?.average?.message}
                    />
                  )}
                />

                <Controller
                  name={`entries[${index}].quantity`}
                  control={control}
                  defaultValue={entries.quantity}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Quantity"
                      size="small"
                      placeholder="quantity"
                      variant="outlined"
                      className="w-full mb-2 px-2 pointer-events-none"
                      style={{ padding: '4px' }}
                      error={!!errors.entries?.[index]?.quantity}
                      helperText={errors.entries?.[index]?.quantity?.message}
                    />
                  )}
                />

                <Box className="flex justify-center items-center px-1">
                  <IconButton
                    sx={{
                      backgroundColor: '#f2f2f2',
                      boxShadow:
                        'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
                      '&:hover': {
                        backgroundColor: '#e6f2ff',
                      },
                    }}
                    color="info"
                    onClick={() => toggleSection(entries.id)}
                    aria-label="expand">
                    {expandedSections[entries.id] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>
                </Box>
                

                <Box className="flex justify-center items-center px-1">
                  <IconButton
                    sx={{
                      backgroundColor: '#f2f2f2',
                      boxShadow:
                        'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
                      '&:hover': {
                        backgroundColor: '#ffe6e6',
                      },
                    }}
                    onClick={() => removeEntry(index)}
                    color="error"
                    aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              

              {expandedSections && (
                <Box>
                  {entries.subEntries &&
                    entries.subEntries.map((subEntry, subIndex) => (
                      <Container key={subEntry.id} className="">
                     
                        <Box
                          className="flex flex-row  p-1 "
                          key={subEntry.id}>
                          <Controller
                            name={`entries[${index}].subEntries[${subIndex}].description`}
                            control={control}
                            defaultValue={subEntry.description}
                            render={({ field }) => (
                              <TextField
                                label="Description"
                                {...field}
                                size="small"
                                placeholder="description"
                                variant="outlined"
                                className="w-full mb-2 px-2"
                                style={{ padding: '4px' }}
                                error={
                                  !!errors.entries?.[index]?.subEntries?.[
                                    subIndex
                                  ]?.description
                                }
                                helperText={
                                  errors.entries?.[index]?.subEntries?.[
                                    subIndex
                                  ]?.description?.message
                                }
                              />
                            )}
                          />

                          <Controller
                            name={`entries[${index}].subEntries[${subIndex}].average`}
                            control={control}
                            defaultValue={subEntry.average}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                label="Average"
                                placeholder="average"
                                variant="outlined"
                                className="w-full mb-2 px-2"
                                style={{ padding: '4px' }}
                                error={
                                  !!errors.entries?.[index]?.subEntries?.[
                                    subIndex
                                  ]?.average
                                }
                                helperText={
                                  errors.entries?.[index]?.subEntries?.[
                                    subIndex
                                  ]?.average?.message
                                }
                              />
                            )}
                          />

                          <Controller
                            name={`entries[${index}].subEntries[${subIndex}].score`}
                            control={control}
                            defaultValue={subEntry.score}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                label="Score"
                                placeholder="score"
                                variant="outlined"
                                className="w-full mb-2 px-2"
                                style={{ padding: '4px' }}
                                error={
                                  !!errors.entries?.[index]?.subEntries?.[
                                    subIndex
                                  ]?.score
                                }
                                helperText={
                                  errors.entries?.[index]?.subEntries?.[
                                    subIndex
                                  ]?.score?.message
                                }
                              />
                            )}
                          />
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <Controller
                              name={`entries[${index}].subEntries[${subIndex}].date`}
                              control={control}
                              defaultValue={subEntry.date}
                              render={({ field: { onChange, value } }) => (
                                <DatePicker
                                  className="w-full mb-2 px-2"
                                  slotProps={{ textField: { size: 'small' } }}
                                  onChange={onChange}
                                  sx={{
                                    marginTop: '4px',
                                  }}
                                  required
                                  label="Date"
                                />
                              )}
                            />
                          </LocalizationProvider>

                          <Box className="flex justify-center items-center px-1">
                            <IconButton
                              sx={{
                                backgroundColor: '#f2f2f2',
                                boxShadow:
                                  'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
                                '&:hover': {
                                  backgroundColor: '#ffe6e6',
                                },
                              }}
                              size="small"
                              onClick={() => removeSubEntry(index)}
                              color="error"
                              aria-label="delete">
                              <DeleteIcon size="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Container>
                    ))}
                  <Container>
                    <Button
                      style={{ marginLeft: '9px' }}
                      variant="outlined"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={() => addSubEntry(index)}>
                      Agregar Evaluación
                    </Button>
                  </Container>
                </Box>
              )}
            </Box>
          ))}

          <Button
            style={{ marginTop: '0px' }}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={addEntry}>
            Nueva entrada
          </Button>

          <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />

          <Button
            sx={{ marginRight: '10px' }}
            type="submit"
            variant="contained"
            startIcon={<CloudUploadIcon />}>
            Enviar
          </Button>
          <Button
            type="button"
            variant="outlined"
            startIcon={<RestartAltIcon />}>
            Reiniciar
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default App;
