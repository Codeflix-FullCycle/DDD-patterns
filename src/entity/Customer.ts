import Address from "./Address";

export default class Customer {
  private _id: string
  private _name: string
  private _email: string
  private _address: Address
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  set address(address: Address) {
    this._address = address;
  }

  isActive() {
    return this._active;
  }

  validate() {
    if (!this._name) {
      throw new Error('Name is required');
    }
    if (!this._email) {
      throw new Error('Email is required');
    }
    if (!this._id) {
      throw new Error('Id is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate()
  }

  activate() {
    if (!this._address) {
      throw new Error('Address is mandatory to activate customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}