import { Client, Entity, Schema } from 'redis-om';

class Person extends Entity {}

const personSchema = new Schema(Person, {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'string' },
  verified: { type: 'string' },
  location: { type: 'string' },
  locationUpdated: { type: 'string' },
  skills: { type: 'string' },
  personalStatement: { type: 'string' }
});

export const boostrapPersonSchema = async () => {
  const client = await new Client().open('redis://localhost:6379');
  const personRepository = client.fetchRepository(personSchema);
  return personRepository;
};
