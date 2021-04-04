import {BaseModel} from '../base-model.class';

export class User extends BaseModel {
  public id: number;
  public name: string;
  public email: string;

  protected fields(): string[] {
    return [
      'id',
      'name',
      'email',
    ];
  }
}
