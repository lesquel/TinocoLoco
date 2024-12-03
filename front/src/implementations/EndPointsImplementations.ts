import { EndPointsFactory } from "../services/api/factories/EndPointsFactory.ts";

// Configuración global para los endpoints
const api = new EndPointsFactory({ Url: "http://127.0.0.1:8000/" });

// Crear instancias específicas
export const businessService = api.BusinessConfigurations();
