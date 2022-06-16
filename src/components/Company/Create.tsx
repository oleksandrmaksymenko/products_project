import React from 'react';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';
import {companiesApi} from 'src/api';
import {CreateCompanyType} from 'src/api/companies';

const CompanyCreate = () => {
  const {register, handleSubmit} = useForm<CreateCompanyType>();
  const {push} = useRouter();

  const createCompany: SubmitHandler<CreateCompanyType> = ({
    name,
    description,
  }) => {
    companiesApi
      .createCompany({
        name,
        description,
      })
      .then(() => {
        push('/', '/');
      });
  };

  return (
    <form onSubmit={handleSubmit(createCompany)}>
      <input type='text' {...register('name')} />
      <input type='text' {...register('description')} />
      <div>
        <button>Create</button>
      </div>
    </form>
  );
};

export default CompanyCreate;
