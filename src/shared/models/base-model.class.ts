export abstract class BaseModel {
  public abstract id: number;
  protected abstract fields(): string[];

  protected constructor(jsonFields: any) {
      this.fillModelFields(jsonFields);
  }

  fillModelFields(jsonFields: any): this {
    try {
      const dataValues = this.filterJsonFields(jsonFields);
      Object.keys(dataValues).forEach((key) => {
        this[key] = dataValues[key];
      });
    } catch (e) {
      console.error(e);
    }
    return this;
  }

  filterJsonFields(data: any): any {
    const json: any = {};
    this.fields().forEach((field) => {
      if (data.hasOwnProperty(field)) {
        json[field] = data[field];
      }
    });
    return json;
  }
}
