import {api} from 'src/api/index';
import type {ApiCompaniesType} from 'src/types/api';

const companies = '/companies';

export const getCompanies = async () => await api.get(companies);

export const getCompany = async (id: string) =>
  await api.get(`${companies}?company_id=${id}`);

export const createCompany = async (company: ApiCompaniesType) =>
  await api.post(companies, {...company});

export const deleteCompany = async (id: string) =>
  await api.delete(companies, {data: {id}});

export const updateCompany = async (company: ApiCompaniesType) =>
  await api.patch(companies, {...company});
