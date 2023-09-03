import { yupResolver } from '@hookform/resolvers/yup';import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { initialForm } from '../helpers/evaluation';

const EvaluationShema = () => {
  const schema = yup.object().shape({
    formFields: yup.array().of(
      yup.object().shape({
        id: yup.string(),
        description: yup.string().required('Description is required'),
        average: yup
          .number()
          .typeError('Average must be a number')
          .required('Average is required'),
        quantity: yup
          .number()
          .typeError('Quantity must be a number')
          .required('Quantity is required'),
        elements: yup.array(),
      })
    ),
  });

  const methods = useForm({
    // mode: 'onChange',
    defaultValues: { formFields: initialForm },
    resolver: yupResolver(schema),
  });

  return { methods, schema };
};

export default EvaluationShema;
