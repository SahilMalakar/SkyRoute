import AirplaneRepository from "../repositories/airplane-respository.js";

// all business logic related to airplane will be here
const airplaneRepository = new AirplaneRepository();

console.log(`inside service`);

export async function createAirplane(data: {
  model: string;
  capacity: number;
}) {
  try {
    return await airplaneRepository.create(data);
  } catch (error) {
    throw error;
  }
}
