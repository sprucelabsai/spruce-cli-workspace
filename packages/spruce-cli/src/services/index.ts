import TypeService from './Type'

export interface IServices {
	types: TypeService
}

export const services: IServices = {
	types: new TypeService()
}
