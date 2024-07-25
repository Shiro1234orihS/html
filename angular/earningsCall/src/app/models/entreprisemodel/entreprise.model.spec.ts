import { Entreprise } from './entreprise.model';

describe('Entreprise', () => {
  it('should create an instance', () => {
    expect(new Entreprise(1,"Ricardo","image","test")).toBeTruthy();
  });
});
